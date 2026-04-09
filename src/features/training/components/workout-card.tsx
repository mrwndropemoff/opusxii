import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Chip, Surface, Text } from 'react-native-paper';

import { useAppTheme } from '@/src/core/theme/paper-theme';
import type { WorkoutSession } from '@/src/features/training/types';

type WorkoutCardProps = {
  workout: WorkoutSession;
  completed: boolean;
  compact?: boolean;
  onToggleCompletion?: (workoutId: string) => void;
};

export function WorkoutCard({
  workout,
  completed,
  compact = false,
  onToggleCompletion,
}: WorkoutCardProps) {
  const theme = useAppTheme();

  return (
    <Surface
      elevation={0}
      style={[
        styles.card,
        {
          backgroundColor: theme.editorial.surfaces.card,
          borderRadius: theme.editorial.radii.lg,
          padding: compact ? theme.editorial.spacing.sm : theme.editorial.spacing.md,
        },
      ]}>
      <View style={[styles.header, { marginBottom: theme.editorial.spacing.sm }]}>
        <View style={styles.headerCopy}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {workout.dayLabel}
          </Text>
          <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
            {workout.title}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {workout.focus}
          </Text>
        </View>
        <Chip
          compact
          style={{
            backgroundColor: completed
              ? theme.colors.primary
              : theme.editorial.surfaces.sectionMuted,
          }}
          textStyle={{
            color: completed ? theme.colors.onPrimary : theme.colors.onSurface,
            fontFamily: 'Inter_600SemiBold',
          }}>
          {completed ? 'Complete' : `${workout.durationMinutes} min`}
        </Chip>
      </View>

      <View style={[styles.exercisePreview, { marginBottom: theme.editorial.spacing.sm }]}>
        {workout.exercises.slice(0, compact ? 2 : 3).map((exercise) => (
          <Text key={exercise.id} variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {exercise.name}
          </Text>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          onPress={() => router.push({ pathname: '/workout/[id]', params: { id: workout.id } })}>
          View session
        </Button>
        {onToggleCompletion ? (
          <Button
            mode={completed ? 'text' : 'outlined'}
            textColor={theme.colors.onSurface}
            style={[
              styles.secondaryAction,
              completed
                ? undefined
                : {
                    borderColor: theme.editorial.ghostBorder,
                  },
            ]}
            onPress={() => onToggleCompletion(workout.id)}>
            {completed ? 'Undo' : 'Mark done'}
          </Button>
        ) : null}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  exercisePreview: {
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  secondaryAction: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
