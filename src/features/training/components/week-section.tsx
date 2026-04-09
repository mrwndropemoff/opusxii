import { StyleSheet, View } from 'react-native';
import { ProgressBar, Surface, Text } from 'react-native-paper';

import { useAppTheme } from '@/src/core/theme/paper-theme';
import { WorkoutCard } from '@/src/features/training/components/workout-card';
import type { WeekPlan } from '@/src/features/training/types';

type WeekSectionProps = {
  weekPlan: WeekPlan;
  completedWorkoutIds: string[];
  onSelectWeek: (week: number) => void;
  onToggleCompletion: (workoutId: string) => void;
};

export function WeekSection({
  weekPlan,
  completedWorkoutIds,
  onSelectWeek,
  onToggleCompletion,
}: WeekSectionProps) {
  const theme = useAppTheme();
  const completedCount = weekPlan.workouts.filter((workout) =>
    completedWorkoutIds.includes(workout.id)
  ).length;
  const progress = completedCount / weekPlan.workouts.length;

  return (
    <Surface
      elevation={0}
      style={[
        styles.container,
        {
          backgroundColor: theme.editorial.surfaces.section,
          borderRadius: theme.editorial.radii.xl,
          padding: theme.editorial.spacing.md,
          gap: theme.editorial.spacing.md,
        },
      ]}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Week {weekPlan.week} · {weekPlan.phase}
          </Text>
          <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
            {weekPlan.focus}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {weekPlan.summary}
          </Text>
        </View>
        <Text
          variant="labelLarge"
          style={{ color: theme.colors.onSurface }}
          onPress={() => onSelectWeek(weekPlan.week)}>
          Open
        </Text>
      </View>

      <ProgressBar
        progress={progress}
        color={theme.colors.primary}
        style={{
          backgroundColor: theme.editorial.surfaces.track,
          borderRadius: theme.editorial.radii.pill,
          height: 10,
        }}
      />

      <View style={styles.workouts}>
        {weekPlan.workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            compact
            workout={workout}
            completed={completedWorkoutIds.includes(workout.id)}
            onToggleCompletion={onToggleCompletion}
          />
        ))}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 8,
  },
  workouts: {
    gap: 16,
  },
});
