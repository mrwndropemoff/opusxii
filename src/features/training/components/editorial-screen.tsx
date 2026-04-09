import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppScreenHeader } from '@/src/core/components/app-screen-header';
import { useAppTheme } from '@/src/core/theme/paper-theme';

type EditorialScreenProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  topMeta?: string;
  action?: ReactNode;
}>;

export function EditorialScreen({
  eyebrow,
  title,
  subtitle,
  topMeta,
  action,
  children,
}: EditorialScreenProps) {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safeArea, { backgroundColor: theme.editorial.surfaces.canvas }]}>
      <ScrollView
        style={styles.scroll}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={false}
        contentContainerStyle={[
          styles.content,
          {
            backgroundColor: theme.editorial.surfaces.canvas,
            paddingHorizontal: theme.editorial.spacing.sm,
            paddingBottom: theme.editorial.spacing.xxl,
            gap: theme.editorial.spacing.lg,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <AppScreenHeader />
        <View style={[styles.intro, { gap: theme.editorial.spacing.sm }]}>
          {eyebrow || topMeta ? (
            <View style={styles.metaRow}>
              {eyebrow ? (
                <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {eyebrow}
                </Text>
              ) : null}
              {topMeta ? (
                <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {topMeta}
                </Text>
              ) : null}
            </View>
          ) : null}

          <View style={styles.titleRow}>
            <View style={[styles.titleCopy, { gap: 10 }]}>
              <Text variant="headlineLarge" style={{ color: theme.colors.onSurface }}>
                {title}
              </Text>
              {subtitle ? (
                <Text
                  variant="bodyMedium"
                  style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
            {action ? <View style={styles.action}>{action}</View> : null}
          </View>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  intro: {
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
  titleCopy: {
    flex: 1,
  },
  subtitle: {
    maxWidth: '92%',
  },
  action: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
