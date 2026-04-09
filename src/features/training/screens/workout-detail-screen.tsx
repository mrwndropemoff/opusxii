import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { Button, Chip, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/src/core/theme/paper-theme';
import { useTrainingStore } from '@/src/features/training/store/use-training-store';
import { getWorkoutById } from '@/src/features/training/utils/selectors';

type WorkoutDetailScreenProps = {
  workoutId: string;
};

export function WorkoutDetailScreen({ workoutId }: WorkoutDetailScreenProps) {
  const theme = useAppTheme();
  const workout = getWorkoutById(workoutId);
  const completedWorkoutIds = useTrainingStore((state) => state.completedWorkoutIds);
  const toggleWorkoutCompletion = useTrainingStore((state) => state.toggleWorkoutCompletion);

  if (!workout) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.editorial.surfaces.canvas }}>
        <Stack.Screen options={{ title: 'Workout' }} />
        <View style={[styles.emptyState, { padding: theme.editorial.spacing.md }]}>
          <Text variant="headlineLarge" style={{ color: theme.colors.onSurface }}>
            Workout not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isComplete = completedWorkoutIds.includes(workout.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.editorial.surfaces.canvas }}>
      <Stack.Screen options={{ title: workout.title }} />
      <View style={[styles.container, { padding: theme.editorial.spacing.sm, gap: theme.editorial.spacing.md }]}>
        <Surface
          elevation={0}
          style={[
            styles.hero,
            {
              backgroundColor: theme.editorial.surfaces.section,
              borderRadius: theme.editorial.radii.xl,
              padding: theme.editorial.spacing.md,
              gap: theme.editorial.spacing.sm,
            },
          ]}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Week {workout.week} · {workout.dayLabel}
          </Text>
          <Text variant="headlineLarge" style={{ color: theme.colors.onSurface }}>
            {workout.title}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {workout.focus}
          </Text>
          <View style={styles.heroMeta}>
            <Chip style={{ backgroundColor: theme.editorial.surfaces.card }}>
              {workout.durationMinutes} min
            </Chip>
            <Chip style={{ backgroundColor: theme.editorial.surfaces.card }}>
              {workout.intensity}
            </Chip>
          </View>
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
          <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
            Exercise sequence
          </Text>

          {workout.exercises.map((exercise, index) => (
            <View
              key={exercise.id}
              style={[
                styles.exerciseRow,
                {
                  backgroundColor:
                    index % 2 === 0
                      ? theme.editorial.surfaces.card
                      : theme.editorial.surfaces.sectionMuted,
                  borderRadius: theme.editorial.radii.lg,
                  padding: theme.editorial.spacing.sm,
                },
              ]}>
              <View style={styles.exerciseCopy}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                  {exercise.name}
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {exercise.sets} sets · {exercise.reps} · {exercise.restSeconds}s rest
                </Text>
                {exercise.notes ? (
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {exercise.notes}
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </Surface>

        <Surface
          elevation={0}
          style={[
            styles.section,
            {
              backgroundColor: theme.editorial.surfaces.section,
              borderRadius: theme.editorial.radii.xl,
              padding: theme.editorial.spacing.md,
              gap: theme.editorial.spacing.sm,
            },
          ]}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Coaching note
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {workout.coachingNote}
          </Text>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => toggleWorkoutCompletion(workout.id)}>
            {isComplete ? 'Undo completion' : 'Mark workout complete'}
          </Button>
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
  hero: {
    width: '100%',
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  section: {
    width: '100%',
  },
  exerciseRow: {
    width: '100%',
  },
  exerciseCopy: {
    gap: 6,
  },
});
