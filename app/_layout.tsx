import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./global.css"


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
      SplashScreen.hideAsync();
  }, []);

  return (
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
