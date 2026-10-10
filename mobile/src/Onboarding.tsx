import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import Animated, { Easing, FadeInDown, ReduceMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors as c, art, Screen, Navigate } from './theme';
import { Heading, Body, Card, Primary, Dots, Logo, CircleButton, Art, Icon } from './components';
import { MotionArt } from './MotionArt';

const order: Screen[] = ['welcome', 'habit', 'motivation', 'plan', 'ready'];
const labels = ['Get Started', 'Continue', 'Keep Going', 'Build My Plan', 'Turn On Reminders'];
const initialPanelHeights = [155, 295, 300, 355, 365];
const artworkRatios = [745 / 740, 542 / 740, 596 / 740, 441 / 740, 589 / 740];
export function Onboarding({ screen, navigate }: { screen: Screen; navigate: Navigate }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const index = order.indexOf(screen);
  const [frame, setFrame] = useState({ width: Math.min(width, 480), height: height - insets.top - insets.bottom });
  const [panelHeight, setPanelHeight] = useState(initialPanelHeights[index]);
  const [footerHeight, setFooterHeight] = useState(screen === 'welcome' || screen === 'ready' ? 130 : 96);
  const heroHeight = Math.max(140, Math.min(frame.width * artworkRatios[index], frame.height - footerHeight - 64 - panelHeight + 20));
  const titleSize = frame.width < 370 ? 30 : 32;
  return <View style={styles.screen} onLayout={({ nativeEvent: { layout } }) => setFrame(previous => previous.width === layout.width && previous.height === layout.height ? previous : { width: layout.width, height: layout.height })}>
    <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <View style={styles.brand}><Logo large /></View>
    <MotionArt screen={screen} poster={art[screen as 'welcome']} fit="contain" style={{ width: '100%', height: heroHeight }} />
    <Animated.View onLayout={({ nativeEvent: { layout } }) => setPanelHeight(layout.height)} entering={FadeInDown.duration(300).easing(Easing.bezier(0.23, 1, 0.32, 1)).reduceMotion(ReduceMotion.System).withInitialValues({ opacity: 0, transform: [{ translateY: 12 }] })} style={styles.panel}>
      {screen === 'welcome' && <>
        <Heading size={titleSize} style={styles.center}>Quit smoking{ '\n' }<Text style={{ color: c.teal }}>without</Text> feeling alone</Heading>
        <Body style={styles.intro}>Tiny daily wins, fun streaks, and a plan{ '\n' }that actually sticks.</Body>
      </>}
      {screen === 'habit' && <>
        <Heading size={titleSize} style={styles.center}>Tell us about{ '\n' }<Text style={{ color: c.teal }}>your</Text> habit</Heading>
        <Body style={styles.intro}>We’ll personalize your quit plan{ '\n' }in under a minute.</Body>
        <Card style={{ marginTop: 9 }}><Heading size={21}>How many cigarettes do you{ '\n' }smoke per day?</Heading><View style={styles.grid}>{['1–5', '6–10', '11–20', '20+'].map((label, i) => <View key={label} style={[styles.option, { backgroundColor: [c.mint, c.peach, c.softYellow, c.lavender][i] }, i === 1 && { borderColor: c.coral }]}><View style={[styles.radio, i === 1 && { borderColor: c.coral }]}>{i === 1 && <View style={[styles.radioFill, { backgroundColor: c.coral }]} />}</View><Heading size={22}>{label}</Heading></View>)}</View></Card>
      </>}
      {screen === 'motivation' && <>
        <Heading size={titleSize} style={styles.center}>Why do you want{ '\n' }<Text style={{ color: c.teal }}>to quit?</Text></Heading><Body style={styles.intro}>Pick what matters most — we’ll keep{ '\n' }you motivated.</Body>
        <View style={[styles.grid, { marginTop: 14 }]}>{[['Health', art.health, c.mint, c.teal], ['Save Money', art.money, c.softYellow, '#FFB800'], ['Family', art.family, c.lavender, '#E7E1F4'], ['Fitness', art.fitness, c.blue, '#009AFF']].map(([label, source, tint, border], i) => <View key={String(label)} style={[styles.reason, { backgroundColor: tint as string, borderColor: border as string }]}><Art source={source as any} size={54} /><Heading size={17}>{label as string}</Heading><View style={styles.reasonCheck}><Icon name={i === 2 ? 'ellipse-outline' : 'checkmark-circle'} color={i === 2 ? '#CBD0DA' : border as string} size={22} /></View></View>)}</View>
      </>}
      {screen === 'plan' && <>
        <Heading size={Math.min(titleSize, 30)} style={styles.center}>Set your <Text style={{ color: c.teal }}>quit plan</Text></Heading><Body style={styles.intro}>Choose the approach that feels realistic{ '\n' }for you.</Body>
        <Card style={styles.planRow}><View style={styles.planIcon}><Icon name="calendar" size={32} color={c.coral} /></View><View style={{ flex: 1 }}><Body style={{ fontSize: 12, letterSpacing: 0.8 }}>MY QUIT DATE</Body><Heading size={26}>October 20</Heading></View><Icon name="chevron-forward" size={23} /></Card>
        <View style={[styles.planRow, styles.planChoice, { backgroundColor: '#F1FDFD', borderColor: c.teal }]}><Art source={art.rocket} size={56} /><View style={{ flex: 1 }}><Heading size={22}>Quit now</Heading><Body style={{ fontSize: 13 }}>Stop completely on your quit date.</Body></View><Icon name="radio-button-on" color={c.teal} /></View>
        <View style={[styles.planRow, styles.planChoice]}><View style={styles.planIcon}><Icon name="stats-chart" size={32} color={c.teal} /></View><View style={{ flex: 1 }}><Heading size={21}>Reduce gradually</Heading><Body style={{ fontSize: 13 }}>Cut down over time with small steps.</Body></View><Icon name="ellipse-outline" color={c.muted} /></View>
        <Body style={{ textAlign: 'center', marginVertical: 10, fontSize: 13 }}>ⓘ  You can change this anytime.</Body>
      </>}
      {screen === 'ready' && <>
        <Heading size={titleSize} style={styles.center}>You’re ready for{ '\n' }a <Text style={{ color: c.teal }}>fresh start</Text></Heading><Body style={styles.intro}>We’ll help you beat cravings, save money,{ '\n' }and celebrate every smoke-free day.</Body>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 13 }}>{[['Daily Streaks', art.streak, c.softYellow], ['Craving SOS', art.heart, c.blue], ['Money Saved', art.coins, c.mint]].map(([label, image, tint]) => <View key={String(label)} style={[styles.feature, { backgroundColor: tint as string }]}><Art source={image as any} size={44} /><Heading size={14} style={styles.center}>{label as string}</Heading><View style={{ height: 4, width: 35, backgroundColor: '#FFFFFFAA', borderRadius: 3, marginTop: 6 }} /></View>)}</View>
        <View style={[styles.planRow, { backgroundColor: '#EFF2F8', borderRadius: 22, marginTop: 10, padding: 10 }]}><Art source={art.bell} size={48} /><View style={{ flex: 1 }}><Heading size={19}>Get gentle reminders</Heading><Body style={{ fontSize: 13, lineHeight: 16 }}>We’ll send you friendly reminders{ '\n' }to check in, stay on track, and keep{ '\n' }your momentum going.</Body></View></View>
      </>}
    </Animated.View>
    </ScrollView>
    <View style={styles.footer} onLayout={({ nativeEvent: { layout } }) => setFooterHeight(layout.height)}>
      <View style={styles.footerRow}>{index > 0 && <CircleButton name="chevron-back" label="Previous screen" onPress={() => navigate(order[index - 1])} />}<View style={{ flex: 1 }}><Primary label={labels[index]} onPress={() => navigate(order[index + 1] ?? 'home')} /></View></View>
      {(screen === 'welcome' || screen === 'ready') && <Pressable accessibilityRole="button" onPress={() => navigate('home')} style={styles.secondary}><Body style={{ color: '#008CFF', textAlign: 'center', fontSize: 15 }}>{screen === 'welcome' ? 'I already have an account' : 'Maybe later'}</Body></Pressable>}
      <View style={styles.progress}><Dots index={index} /></View>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1 }, brand: { alignItems: 'center', height: 64, justifyContent: 'center' },
  panel: { marginTop: -20, paddingHorizontal: 19, paddingTop: 14, paddingBottom: 12, backgroundColor: c.cream, borderTopLeftRadius: 40, borderTopRightRadius: 40 }, center: { textAlign: 'center' },
  intro: { textAlign: 'center', fontSize: 15, lineHeight: 20, marginTop: 8 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 12 },
  option: { width: '48%', minHeight: 52, borderRadius: 15, flexDirection: 'row', alignItems: 'center', padding: 10, gap: 13, borderWidth: 2, borderColor: 'transparent' },
  radio: { width: 25, height: 25, borderRadius: 15, borderWidth: 2, borderColor: '#CDD3DE', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }, radioFill: { width: 17, height: 17, borderRadius: 10 },
  reason: { width: '48%', minHeight: 76, borderRadius: 18, borderWidth: 2, padding: 9, flexDirection: 'row', alignItems: 'center', gap: 5 }, reasonCheck: { position: 'absolute', right: 5, top: 5 },
  footer: { paddingHorizontal: 19, paddingBottom: 2, backgroundColor: c.cream }, footerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 }, secondary: { minHeight: 36, justifyContent: 'center' }, progress: { marginVertical: -7 }, planRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginTop: 9 },
  planIcon: { width: 55, height: 55, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F5F8' }, planChoice: { borderWidth: 1.5, borderColor: '#ECEBE9', backgroundColor: c.white, borderRadius: 20 },
  feature: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 18 },
});
