import React, { PropsWithChildren } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors as c, fonts as f, art, Screen, Navigate } from './theme';
import { MotionArt } from './MotionArt';

export function Heading({ children, size = 23, style }: PropsWithChildren<{ size?: number; style?: any }>) {
  return <Text style={[s.heading, { fontSize: size, lineHeight: size * 1.12 }, style]}>{children}</Text>;
}
export function Body({ children, style }: PropsWithChildren<{ style?: any }>) {
  return <Text style={[s.body, style]}>{children}</Text>;
}
export function Spark({ small = false }: { small?: boolean }) {
  return <View accessibilityElementsHidden style={{ width: small ? 15 : 24, height: small ? 18 : 27, transform: [{ rotate: '10deg' }] }}>
    <View style={[s.ray, { left: 1, top: 0, transform: [{ rotate: '-20deg' }] }]} />
    <View style={[s.ray, { left: 11, top: 4, transform: [{ rotate: '45deg' }] }]} />
    <View style={[s.ray, { left: 15, top: 16, height: 9, transform: [{ rotate: '80deg' }] }]} />
  </View>;
}
export function Logo({ large = false }: { large?: boolean }) {
  return <View accessibilityLabel="Puff Pop" style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Heading size={large ? 53 : 30} style={{ color: c.teal, letterSpacing: -1.4 }}>Puff<Text style={{ color: c.coral }}>Pop</Text></Heading><Spark />
  </View>;
}
export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[s.card, style]}>{children}</View>;
}
export function Icon({ name, size = 24, color = c.navy }: { name: keyof typeof Ionicons.glyphMap; size?: number; color?: string }) {
  return <Ionicons accessible={false} name={name} size={size} color={color} />;
}
export function Art({ source, size = 46, style }: { source: ImageSourcePropType; size?: number; style?: any }) {
  return <Image accessible={false} source={source} resizeMode="contain" style={[{ width: size, height: size }, style]} />;
}
export function Primary({ label, onPress }: { label: string; onPress?: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={!onPress} onPress={onPress} style={({ pressed }) => [s.primary, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}>
    <LinearGradient colors={['#FF7770', '#FF524F']} style={s.primaryFill}>
      <Heading size={23} style={{ color: c.white, textAlign: 'center' }}>{label}</Heading><View style={s.primaryArrow}><Icon name="arrow-forward" size={27} color="white" /></View>
    </LinearGradient>
  </Pressable>;
}
export function Link({ label, onPress }: { label: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} disabled={!onPress} accessibilityRole="button" accessibilityLabel={label} hitSlop={6} style={s.link}><Body style={{ color: '#008CFF', fontSize: 13 }}>{label}</Body><Icon name="arrow-forward" color="#008CFF" size={18} /></Pressable>;
}
export function SectionTitle({ children }: PropsWithChildren) {
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Heading size={20}>{children}</Heading><Spark small /></View>;
}
export function Dots({ index, count = 5 }: { index: number; count?: number }) {
  return <View accessibilityLabel={`Step ${index + 1} of ${count}`} style={s.dots}>{Array.from({ length: count }, (_, i) => <View key={i} style={[s.dot, { backgroundColor: i === index ? c.teal : '#DDDFE5' }]} />)}</View>;
}
export function CircleButton({ name, onPress, label }: { name: keyof typeof Ionicons.glyphMap; onPress?: () => void; label: string }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={6} onPress={onPress} disabled={!onPress} style={s.circleButton}><Icon name={name} size={22} /></Pressable>;
}
export function Header({ screen, title, subtitle, back, navigate }: { screen: Exclude<Screen, 'welcome' | 'habit' | 'motivation' | 'plan' | 'ready'>; title: string; subtitle: string; back?: boolean; navigate: Navigate }) {
  return <View style={[s.header, screen === "chat" && { height: 112 }]}>
    <MotionArt screen={screen} poster={art[screen]} style={s.headerArt} fit="fill" />
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{back && <CircleButton name="chevron-back" label="Back to Home" onPress={() => navigate('home')} />}{screen !== "chat" && <Logo />}</View>
    <View style={[s.headerCopy, screen === "chat" && { marginTop: 26 }]}><Heading size={screen === "home" ? 26 : screen === "chat" ? 31 : 29}>{screen === "chat" ? <>Chat with <Text style={{ color: c.teal }}>Puff</Text></> : title}</Heading><Body style={{ fontSize: 14, lineHeight: 18, maxWidth: screen === 'journal' ? 240 : 200, marginTop: 7 }}>{subtitle}</Body></View>
    {['home', 'community', 'profile'].includes(screen) && <View style={s.headerTools}><CircleButton name="notifications-outline" label="Reminders preview" onPress={() => navigate('ready')} /><CircleButton name={screen === 'profile' ? 'settings-sharp' : 'person'} label="Profile" onPress={() => navigate('profile')} /></View>}
  </View>;
}
const moods = [ ['😟', 'Not great', c.blue], ['😐', 'Meh', c.softYellow], ['🙂', 'Good', c.mint], ['😊', 'Great', c.peach], ['🤩', 'Amazing', c.pink] ];
export function Moods({ selected = false, onPress }: { selected?: boolean; onPress?: () => void }) {
  return <View style={s.moods}>{moods.map(([face, label, color], i) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: selected && i === 2 }} disabled={!onPress} onPress={onPress} style={[s.mood, { backgroundColor: color }, selected && i === 2 && { borderColor: c.teal }]}><Text style={{ fontSize: 28, lineHeight: 28, textAlign: 'center' }}>{face}</Text><Body style={{ color: c.navy, fontSize: 10.5, lineHeight: 13, textAlign: 'center', marginTop: 3 }}>{label}</Body></Pressable>)}</View>;
}
export function CravingScale() {
  return <View accessibilityLabel="Current cravings: 3 out of 10" style={{ marginTop: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Heading size={16}>Current cravings (1–10)</Heading><Body style={{ fontSize: 12 }}>Right now: <Text style={{ color: c.teal, fontFamily: f.bold, fontSize: 19 }}>3</Text></Body></View>
    <View style={s.track}><LinearGradient colors={['#00BAC5', '#37CCD1']} style={{ width: '23%', height: 9, borderRadius: 8 }} /><View style={s.thumb} /></View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>{Array.from({ length: 10 }, (_, i) => <Body key={i} style={{ fontSize: 10, lineHeight: 14 }}>{i + 1}</Body>)}</View>
  </View>;
}
export function Stat({ name, value, label, tint = c.mint, color = c.teal, vertical = false }: { name: keyof typeof Ionicons.glyphMap; value: string; label: string; tint?: string; color?: string; vertical?: boolean }) {
  return <View style={[s.stat, vertical && { flexDirection: 'column', flex: 1, gap: 4, alignItems: 'center' }]}><View style={[s.statIcon, { backgroundColor: tint }]}><Icon name={name} color={color} size={25} /></View><View style={vertical && { alignItems: 'center' }}><Heading size={23}>{value}</Heading><Body style={{ fontSize: 12, lineHeight: 15, textAlign: vertical ? 'center' : 'left' }}>{label}</Body></View></View>;
}
const tabs: { screen: Screen; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { screen: 'home', label: 'Home', icon: 'home' }, { screen: 'chat', label: 'Chat', icon: 'chatbubble-ellipses-outline' },
  { screen: 'progress', label: 'Progress', icon: 'stats-chart' }, { screen: 'community', label: 'Community', icon: 'people' }, { screen: 'profile', label: 'Profile', icon: 'person' },
];
export function TabBar({ screen, navigate }: { screen: Screen; navigate: Navigate }) {
  return <View style={s.tabs}>{tabs.map(tab => { const active = screen === tab.screen || screen === 'checkin' && tab.screen === 'home'; return <Pressable key={tab.screen} onPress={() => navigate(tab.screen)} accessibilityRole={Platform.OS === "web" ? "tab" : "button"} accessibilityLabel={tab.label} accessibilityState={{ selected: active }} style={s.tab}><View style={{ flexDirection: 'row' }}><Icon name={tab.icon} size={25} color={active ? c.teal : c.muted} />{active && <View style={{ position: 'absolute', left: 23, top: -4 }}><Spark small /></View>}</View><Body style={{ fontSize: 11, color: active ? c.teal : c.muted, marginTop: 3 }}>{tab.label}</Body></Pressable>; })}</View>;
}
export const s = StyleSheet.create({
  heading: { fontFamily: f.heading, color: c.navy }, body: { fontFamily: f.body, color: c.muted, fontSize: 15, lineHeight: 20 },
  card: { borderRadius: 20, padding: 14, backgroundColor: c.white, shadowColor: '#8F7965', shadowOpacity: 0.045, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } },
  ray: { width: 5, height: 12, borderRadius: 4, backgroundColor: c.yellow },
  primary: { borderRadius: 36, overflow: 'hidden', borderTopWidth: 2, borderTopColor: '#FFA09B', shadowColor: '#FF554E', shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, marginTop: 10 },
  primaryFill: { minHeight: 56, justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 12 }, primaryArrow: { position: 'absolute', right: 20 },
  link: { backgroundColor: c.blue, borderRadius: 18, paddingVertical: 5, paddingHorizontal: 9, flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 24 },
  dots: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginVertical: 15 }, dot: { width: 10, height: 10, borderRadius: 6 },
  circleButton: { width: 36, height: 36, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFFD9' },
  header: { height: 153, paddingHorizontal: 18, paddingTop: 5, overflow: 'hidden' }, headerArt: { position: 'absolute', right: 0, top: 0, width: '100%', height: '100%' },
  headerFade: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '69%' }, headerCopy: { marginTop: 10 }, headerTools: { position: 'absolute', top: 6, right: 14, flexDirection: 'row', gap: 8 },
  moods: { flexDirection: 'row', gap: 6, marginTop: 8 }, mood: { flex: 1, paddingVertical: 4, borderRadius: 15, borderWidth: 2, borderColor: 'transparent', minHeight: 56 },
  track: { height: 9, backgroundColor: '#E3E6EA', borderRadius: 8, marginTop: 8, marginBottom: 5 }, thumb: { width: 22, height: 22, borderRadius: 13, borderWidth: 3, borderColor: c.white, backgroundColor: c.teal, position: 'absolute', left: '22%', top: -7, shadowColor: c.teal, shadowOpacity: 0.5, shadowRadius: 3 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 10 }, statIcon: { width: 39, height: 39, alignItems: 'center', justifyContent: 'center', borderRadius: 17 },
  tabs: { flexDirection: 'row', borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#FFFFFFF5', paddingTop: 10, paddingBottom: 5, shadowColor: '#6F695F', shadowOpacity: 0.07, shadowRadius: 12, shadowOffset: { width: 0, height: -3 } }, tab: { flex: 1, alignItems: 'center', minHeight: 48 },
});
