import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Lexend_700Bold } from '@expo-google-fonts/lexend';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AppProviders } from '@/src/core/providers/app-providers';
import { getNavigationTheme, getThemeForScheme } from '@/src/core/theme/paper-theme';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore duplicate calls in development reloads.
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = getThemeForScheme(colorScheme);
  const navigationTheme = getNavigationTheme(theme);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Lexend_700Bold,
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.editorial.surfaces.canvas).catch(() => {
      // No-op on platforms that ignore system background color changes.
    });
  }, [theme.editorial.surfaces.canvas]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore splash lifecycle noise during development.
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProviders theme={theme}>
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.editorial.surfaces.canvas,
            },
          }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="workout/[id]"
            options={{
              headerShown: true,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: theme.editorial.surfaces.canvas,
              },
              headerTintColor: theme.colors.onSurface,
            }}
          />
        </Stack>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
      </ThemeProvider>
    </AppProviders>
  );
}
