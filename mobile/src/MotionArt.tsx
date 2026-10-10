import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, AppState, Image, ImageSourcePropType, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { colors, Screen } from './theme';
import { motionClips } from './motion-clips';

const MotionContext = createContext({ reduced: true, active: true });

export function MotionProvider({ children }: PropsWithChildren) {
  const [reduced, setReduced] = useState(true);
  const [active, setActive] = useState(AppState.currentState === 'active');
  useEffect(() => {
    const appState = AppState.addEventListener('change', state => setActive(state === 'active'));
    if (Platform.OS === 'web') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(media.matches);
      update();
      media.addEventListener('change', update);
      return () => { media.removeEventListener('change', update); appState.remove(); };
    }
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (mounted) setReduced(value); }).catch(() => { if (mounted) setReduced(true); });
    const preference = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => { mounted = false; preference.remove(); appState.remove(); };
  }, []);
  return <MotionContext.Provider value={{ reduced, active }}>{children}</MotionContext.Provider>;
}

export function MotionArt({ screen, poster, style, fit = 'cover' }: { screen: Screen; poster: ImageSourcePropType; style: StyleProp<ViewStyle>; fit?: 'cover' | 'fill' | 'contain' }) {
  const { reduced, active } = useContext(MotionContext);
  const clip = motionClips[screen];
  return <View pointerEvents="none" accessible={false} style={[{ overflow: 'hidden', backgroundColor: colors.cream }, style]}>
    <Image source={poster} resizeMode={fit === 'fill' ? 'stretch' : fit} style={StyleSheet.absoluteFill} accessible={false} />
    {!reduced && clip && (Platform.OS === 'web' ? <WebArtworkLoop clip={clip} active={active} fit={fit} /> : <ArtworkLoop clip={clip} active={active} fit={fit} />)}
  </View>;
}

function WebArtworkLoop({ clip, active, fit }: { clip: number; active: boolean; fit: 'cover' | 'fill' | 'contain' }) {
  // Resolve a browser URL only when the web player mounts.
  const uri: string = require('expo-asset').Asset.fromModule(clip).uri;
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active) element.play().catch(error => {
      // Navigation can remove a video while its browser play promise is pending.
      if (error.name !== 'AbortError') setFailed(true);
    });
    else element.pause();
    return () => element.pause();
  }, [active]);
  return <video ref={video} src={uri} muted loop playsInline preload="auto" onLoadedData={() => setReady(true)} onError={() => setFailed(true)} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, opacity: ready && !failed ? 1 : 0, pointerEvents: 'none' }} />;
}

function ArtworkLoop({ clip, active, fit }: { clip: number; active: boolean; fit: 'cover' | 'fill' | 'contain' }) {
  const [firstFrame, setFirstFrame] = useState(false);
  const player = useVideoPlayer(clip, video => {
    video.muted = true;
    video.loop = true;
    video.audioMixingMode = 'mixWithOthers';
  });
  const { status } = useEvent(player, 'statusChange', { status: player.status });
  useEffect(() => { if (active) player.play(); else player.pause(); }, [active, player]);
  if (status === 'error') return null;
  return <VideoView player={player} contentFit={fit} nativeControls={false} allowsPictureInPicture={false} allowsVideoFrameAnalysis={false} onFirstFrameRender={() => setFirstFrame(true)} style={[StyleSheet.absoluteFill, { opacity: firstFrame ? 1 : 0, backgroundColor: colors.cream }]} accessible={false} />;
}
