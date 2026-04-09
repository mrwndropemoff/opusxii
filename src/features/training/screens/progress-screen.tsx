import { StyleSheet, View } from 'react-native';
import { Button, ProgressBar, Surface, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';

import { EditorialScreen } from '@/src/features/training/components/editorial-screen';
import { HeroMetric } from '@/src/features/training/components/hero-metric';
import { useTrainingStore } from '@/src/features/training/store/use-training-store';
import { getCompletionRate, getWeekCompletionRate } from '@/src/features/training/utils/selectors';
import { trainingPlan } from '@/src/features/training/data/plan';
import { useAppTheme } from '@/src/core/theme/paper-theme';

export function ProgressScreen() {
  const theme = useAppTheme();
  const completedWorkoutIds = useTrainingStore((state) => state.completedWorkoutIds);
  const bodyweightHistory = useTrainingStore((state) => state.bodyweightHistory);
  const addBodyweightEntry = useTrainingStore((state) => state.addBodyweightEntry);
  const resetProgress = useTrainingStore((state) => state.resetProgress);
  const [bodyweightInput, setBodyweightInput] = useState('');

  const completionRate = getCompletionRate(completedWorkoutIds);
  const latestBodyweight = bodyweightHistory.at(-1)?.valueKg ?? 0;
  const firstBodyweight = bodyweightHistory[0]?.valueKg ?? latestBodyweight;
  const delta = latestBodyweight - firstBodyweight;

  return (
    <EditorialScreen
      eyebrow="Progress"
      title="Metrics and adherence"
      subtitle="Progress is stored locally first through a persisted Zustand store, ready for future sync.">
      <HeroMetric
        label="Completion"
        value={`${Math.round(completionRate * 100)}%`}
        supportingText={`Bodyweight trend ${delta >= 0 ? '+' : ''}${delta.toFixed(1)} kg from the start of the block.`}
        meta={`${bodyweightHistory.length} weigh-ins saved offline`}
      />

      <Surface
        elevation={0}
        style={[
          styles.section,
          {
            backgroundColor: theme.editorial.surfaces.section,
            borderRadius: theme.editorial.radii.xl,
            padding: theme.editorial.spacing.md,
            gap: theme.editorial.spacing.md,
          },
        ]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionCopy}>
            <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Weekly adherence
            </Text>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              Progression by block
            </Text>
          </View>
        </View>

        {trainingPlan.map((weekPlan) => {
          const progress = getWeekCompletionRate(weekPlan.week, completedWorkoutIds);

          return (
            <View key={weekPlan.week} style={{ gap: 8 }}>
              <View style={styles.progressRow}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                  Week {weekPlan.week}
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {Math.round(progress * 100)}%
                </Text>
              </View>
              <ProgressBar
                progress={progress}
                color={theme.colors.primary}
                style={{
                  height: 10,
                  borderRadius: theme.editorial.radii.pill,
                  backgroundColor: theme.editorial.surfaces.track,
                }}
              />
            </View>
          );
        })}
      </Surface>

      <Surface
        elevation={0}
        style={[
          styles.section,
          {
            backgroundColor: theme.editorial.surfaces.section,
            borderRadius: theme.editorial.radii.xl,
            padding: theme.editorial.spacing.md,
            gap: theme.editorial.spacing.md,
          },
        ]}>
        <View style={styles.sectionCopy}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Bodyweight log
          </Text>
          <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
            Quick capture
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Latest entry: {latestBodyweight.toFixed(1)} kg
          </Text>
        </View>

        <TextInput
          mode="outlined"
          label="Bodyweight (kg)"
          value={bodyweightInput}
          onChangeText={setBodyweightInput}
          keyboardType="decimal-pad"
          outlineStyle={{ borderColor: theme.editorial.ghostBorder }}
          activeOutlineColor={theme.colors.primary}
        />

        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => {
              const parsedValue = Number(bodyweightInput);

              if (Number.isFinite(parsedValue) && parsedValue > 0) {
                addBodyweightEntry(parsedValue);
                setBodyweightInput('');
              }
            }}>
            Save entry
          </Button>
          <Button
            mode="text"
            textColor={theme.colors.onSurface}
            onPress={resetProgress}>
            Reset progress
          </Button>
        </View>
      </Surface>
    </EditorialScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
  sectionCopy: {
    gap: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
