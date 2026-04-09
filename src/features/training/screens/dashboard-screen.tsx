import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Surface, Text } from 'react-native-paper';

import { HeroMetric } from '@/src/features/training/components/hero-metric';
import { EditorialScreen } from '@/src/features/training/components/editorial-screen';
import { WorkoutCard } from '@/src/features/training/components/workout-card';
import { useTrainingStore } from '@/src/features/training/store/use-training-store';
import {
  getCompletedWorkoutCount,
  getCompletionRate,
  getNextWorkout,
  getWeekPlan,
} from '@/src/features/training/utils/selectors';
import { trainingPlan } from '@/src/features/training/data/plan';
import { useAppTheme } from '@/src/core/theme/paper-theme';

export function DashboardScreen() {
  const theme = useAppTheme();
  const activeWeek = useTrainingStore((state) => state.activeWeek);
  const completedWorkoutIds = useTrainingStore((state) => state.completedWorkoutIds);
  const toggleWorkoutCompletion = useTrainingStore((state) => state.toggleWorkoutCompletion);

  const activePlanWeek = getWeekPlan(activeWeek);
  const nextWorkout = getNextWorkout(completedWorkoutIds) ?? activePlanWeek.workouts[0];
  const completionRate = getCompletionRate(completedWorkoutIds);
  const completedCount = getCompletedWorkoutCount(completedWorkoutIds);

  return (
    <EditorialScreen
      eyebrow="OPUS XII"
      title="Dashboard"
      subtitle="Your 12-week plan, key metrics, and next actions in one quiet control surface."
      topMeta={`Week 0${activeWeek}`}>
      <HeroMetric
        label="Active week"
        value={`0${activeWeek}`}
        supportingText={activePlanWeek.focus}
        meta={`${completedCount} sessions completed`}
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
              Today
            </Text>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              Dashboard skeleton
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              This is the default structure to build the real dashboard content into.
            </Text>
          </View>
          <Chip style={{ backgroundColor: theme.editorial.surfaces.card }}>
            {Math.round(completionRate * 100)}% adherence
          </Chip>
        </View>

        <View style={styles.quickStatsRow}>
          <MetricTile
            label="Current phase"
            value={activePlanWeek.phase}
            icon="calendar-week"
          />
          <MetricTile
            label="Recovery"
            value="Good"
            icon="weather-night"
          />
          <MetricTile
            label="Next lift"
            value={nextWorkout.title}
            icon="dumbbell"
          />
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
        <View style={styles.sectionHeader}>
          <View style={styles.sectionCopy}>
            <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Next session
            </Text>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              Resume the plan
            </Text>
          </View>
          <Button
            mode="text"
            textColor={theme.colors.onSurface}
            onPress={() => router.push('/program')}>
            View full plan
          </Button>
        </View>

        <WorkoutCard
          workout={nextWorkout}
          completed={completedWorkoutIds.includes(nextWorkout.id)}
          onToggleCompletion={toggleWorkoutCompletion}
        />
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
        <View style={styles.sectionHeader}>
          <View style={styles.sectionCopy}>
            <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              This week
            </Text>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              Focus areas
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              A simple row-based skeleton for weekly priorities and program context.
            </Text>
          </View>
        </View>

        <View style={styles.phaseList}>
          <FocusRow
            label="Primary focus"
            value={activePlanWeek.focus}
          />
          <FocusRow
            label="Recovery goal"
            value={activePlanWeek.recoveryGoal}
          />
          <FocusRow
            label="Block status"
            value={`${activePlanWeek.phase} · Week ${activeWeek} of ${trainingPlan.length}`}
          />
        </View>

        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          onPress={() => useTrainingStore.getState().setActiveWeek(Math.min(activeWeek + 1, 12))}>
          Advance active week
        </Button>
      </Surface>
    </EditorialScreen>
  );
}

function MetricTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.metricTile,
        {
          backgroundColor: theme.editorial.surfaces.card,
          borderRadius: theme.editorial.radii.lg,
          padding: theme.editorial.spacing.sm,
        },
      ]}>
      <MaterialCommunityIcons name={icon} size={20} color={theme.colors.onSurface} />
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
        {value}
      </Text>
    </View>
  );
}

function FocusRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.phaseRow,
        {
          backgroundColor: theme.editorial.surfaces.card,
          borderRadius: theme.editorial.radii.lg,
          padding: theme.editorial.spacing.sm,
        },
      ]}>
      <View style={styles.phaseCopy}>
        <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          {label}
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  quickStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
  sectionCopy: {
    flex: 1,
    gap: 8,
  },
  phaseList: {
    gap: 12,
  },
  metricTile: {
    minWidth: '30%',
    flex: 1,
    gap: 8,
  },
  phaseRow: {
    width: '100%',
  },
  phaseCopy: {
    gap: 6,
  },
});
