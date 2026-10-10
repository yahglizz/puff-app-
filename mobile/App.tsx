import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { Nunito_600SemiBold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { colors, Screen } from './src/theme';
import { Onboarding } from './src/Onboarding';
import { Screens } from './src/Screens';
import { TabBar } from './src/components';
import { MotionProvider } from './src/MotionArt';

export default function App() {
  // Local screen selection is preview navigation only; nothing is saved or sent.
  const [screen, setScreen] = useState<Screen>('welcome');
  const [fontsLoaded, fontError] = useFonts({ Fredoka_600SemiBold, Nunito_600SemiBold, Nunito_800ExtraBold });
  const onboarding = ['welcome', 'habit', 'motivation', 'plan', 'ready'].includes(screen);
  if (!fontsLoaded && !fontError) return <View style={styles.loading}><ActivityIndicator color={colors.teal} /></View>;
  return <SafeAreaProvider><StatusBar style="dark" /><SafeAreaView style={styles.safe}>
    <MotionProvider><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.app}>
      {onboarding ? <Onboarding key={screen} screen={screen} navigate={setScreen} /> : <><Screens key={screen} screen={screen} navigate={setScreen} /><TabBar screen={screen} navigate={setScreen} /></>}
    </KeyboardAvoidingView></MotionProvider>
  </SafeAreaView></SafeAreaProvider>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, app: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', backgroundColor: colors.cream },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
});
