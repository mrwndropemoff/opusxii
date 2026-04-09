export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 56,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const editorialTokens = {
  spacing,
  radii,
  blur: 16,
  light: {
    canvas: '#F9F9F9',
    section: '#EEEEEE',
    sectionMuted: '#F3F3F3',
    card: '#FFFFFF',
    cardMuted: '#FAFAFA',
    track: '#E2E2E2',
    glass: 'rgba(249, 249, 249, 0.80)',
    ghostBorder: 'rgba(198, 198, 198, 0.20)',
    gradientStart: '#000000',
    gradientEnd: '#3B3B3B',
  },
  dark: {
    canvas: '#111111',
    section: '#1A1A1A',
    sectionMuted: '#202020',
    card: '#262626',
    cardMuted: '#2D2D2D',
    track: '#3A3A3A',
    glass: 'rgba(17, 17, 17, 0.82)',
    ghostBorder: 'rgba(198, 198, 198, 0.24)',
    gradientStart: '#F5F5F5',
    gradientEnd: '#BDBDBD',
  },
} as const;
