import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'cocoa-rn';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
      {/*
        Place <Toaster /> here — outside the Stack — so toasts render
        above every screen and navigation transition.
      */}
      <Toaster position="bottom-right" maxToasts={4} />
    </SafeAreaProvider>
  );
}
