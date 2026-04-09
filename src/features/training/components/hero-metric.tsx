import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/src/core/theme/paper-theme';

type HeroMetricProps = {
  label: string;
  value: string;
  supportingText: string;
  meta: string;
};

export function HeroMetric({ label, value, supportingText, meta }: HeroMetricProps) {
  const theme = useAppTheme();

  return (
    <LinearGradient
      colors={theme.editorial.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        {
          borderRadius: theme.editorial.radii.xl,
          padding: theme.editorial.spacing.md,
        },
      ]}>
      <View style={styles.row}>
        <View style={styles.valueBlock}>
          <Text variant="labelMedium" style={{ color: theme.colors.onPrimary, opacity: 0.72 }}>
            {label}
          </Text>
          <Text variant="displayLarge" style={{ color: theme.colors.onPrimary }}>
            {value}
          </Text>
        </View>
        <Text variant="bodyMedium" style={[styles.meta, { color: theme.colors.onPrimary }]}>
          {meta}
        </Text>
      </View>
      <Text variant="bodyMedium" style={{ color: theme.colors.onPrimary, opacity: 0.82 }}>
        {supportingText}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  valueBlock: {
    flex: 1,
    gap: 8,
  },
  meta: {
    maxWidth: 120,
    textAlign: 'right',
  },
});
