import type { Theme as NavigationTheme } from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
  useTheme,
  type MD3Theme,
} from 'react-native-paper';

import { editorialTokens, radii } from '@/src/core/theme/tokens';

const fontConfig = {
  displayLarge: {
    fontFamily: 'Lexend_700Bold',
    fontWeight: '700' as const,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -1.12,
  },
  headlineLarge: {
    fontFamily: 'Lexend_700Bold',
    fontWeight: '700' as const,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.64,
  },
  titleLarge: {
    fontFamily: 'Inter_500Medium',
    fontWeight: '500' as const,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: 'Inter_400Regular',
    fontWeight: '400' as const,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: 'Inter_400Regular',
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelLarge: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600' as const,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1.4,
  },
  labelMedium: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600' as const,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
  },
};

type EditorialTheme = {
  surfaces: {
    canvas: string;
    section: string;
    sectionMuted: string;
    card: string;
    cardMuted: string;
    track: string;
  };
  glass: string;
  ghostBorder: string;
  gradient: [string, string];
  spacing: typeof editorialTokens.spacing;
  radii: typeof editorialTokens.radii;
  blur: number;
};

export type AppTheme = MD3Theme & {
  editorial: EditorialTheme;
};

const createAppTheme = (mode: 'light' | 'dark'): AppTheme => {
  const baseTheme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const tokens = editorialTokens[mode];

  return {
    ...baseTheme,
    dark: mode === 'dark',
    roundness: radii.md,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...baseTheme.colors,
      primary: mode === 'dark' ? '#F5F5F5' : '#000000',
      onPrimary: mode === 'dark' ? '#111111' : '#E2E2E2',
      primaryContainer: mode === 'dark' ? '#D0D0D0' : '#3B3B3B',
      onPrimaryContainer: mode === 'dark' ? '#111111' : '#F5F5F5',
      background: tokens.canvas,
      onBackground: mode === 'dark' ? '#F5F5F5' : '#1A1C1C',
      surface: tokens.canvas,
      onSurface: mode === 'dark' ? '#F5F5F5' : '#1A1C1C',
      surfaceVariant: tokens.section,
      onSurfaceVariant: mode === 'dark' ? '#D1D1D1' : '#565959',
      outline: mode === 'dark' ? '#8A8A8A' : '#777777',
      outlineVariant: '#C6C6C6',
      secondary: mode === 'dark' ? '#D6D6D6' : '#3B3B3B',
      tertiary: mode === 'dark' ? '#BDBDBD' : '#4B4B4B',
      elevation: {
        ...baseTheme.colors.elevation,
        level1: tokens.card,
        level2: tokens.sectionMuted,
        level3: tokens.track,
        level4: tokens.cardMuted,
        level5: tokens.card,
      },
    },
    editorial: {
      surfaces: {
        canvas: tokens.canvas,
        section: tokens.section,
        sectionMuted: tokens.sectionMuted,
        card: tokens.card,
        cardMuted: tokens.cardMuted,
        track: tokens.track,
      },
      glass: tokens.glass,
      ghostBorder: tokens.ghostBorder,
      gradient: [tokens.gradientStart, tokens.gradientEnd],
      spacing: editorialTokens.spacing,
      radii: editorialTokens.radii,
      blur: editorialTokens.blur,
    },
  };
};

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

export const getThemeForScheme = (scheme: 'light' | 'dark' | null | undefined) =>
  scheme === 'dark' ? darkTheme : lightTheme;

export const getNavigationTheme = (theme: AppTheme): NavigationTheme => ({
  dark: theme.dark,
  colors: {
    primary: theme.colors.primary,
    background: theme.editorial.surfaces.canvas,
    card: theme.editorial.glass,
    text: theme.colors.onSurface,
    border: 'transparent',
    notification: theme.colors.primary,
  },
  fonts: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Inter_700Bold',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Lexend_700Bold',
      fontWeight: '700',
    },
  },
});

export const useAppTheme = () => useTheme<AppTheme>();
