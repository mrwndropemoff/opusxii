export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
};

export type WorkoutIntensity = 'base' | 'build' | 'peak' | 'deload';

export type WorkoutSession = {
  id: string;
  week: number;
  day: number;
  dayLabel: string;
  title: string;
  focus: string;
  durationMinutes: number;
  intensity: WorkoutIntensity;
  exercises: Exercise[];
  coachingNote: string;
};

export type WeekPlan = {
  week: number;
  phase: 'Foundation' | 'Build' | 'Peak' | 'Deload';
  focus: string;
  summary: string;
  recoveryGoal: string;
  workouts: WorkoutSession[];
};

export type BodyweightEntry = {
  recordedAt: string;
  valueKg: number;
};

export type WorkoutLog = {
  workoutId: string;
  completedAt: string;
};
