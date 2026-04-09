import { trainingPlan } from '@/src/features/training/data/plan';

export const getWeekPlan = (week: number) =>
  trainingPlan.find((planWeek) => planWeek.week === week) ?? trainingPlan[0];

export const getWorkoutById = (workoutId: string) =>
  trainingPlan.flatMap((week) => week.workouts).find((workout) => workout.id === workoutId);

export const getCompletedWorkoutCount = (completedWorkoutIds: string[]) => completedWorkoutIds.length;

export const getCompletionRate = (completedWorkoutIds: string[]) =>
  completedWorkoutIds.length / trainingPlan.flatMap((week) => week.workouts).length;

export const getNextWorkout = (completedWorkoutIds: string[]) =>
  trainingPlan
    .flatMap((week) => week.workouts)
    .find((workout) => !completedWorkoutIds.includes(workout.id));

export const getWeekCompletionRate = (week: number, completedWorkoutIds: string[]) => {
  const weekPlan = getWeekPlan(week);
  const completedCount = weekPlan.workouts.filter((workout) =>
    completedWorkoutIds.includes(workout.id)
  ).length;

  return completedCount / weekPlan.workouts.length;
};
