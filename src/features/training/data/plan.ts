import type { Exercise, WeekPlan, WorkoutIntensity, WorkoutSession } from '@/src/features/training/types';

const dayLabels = ['Mon', 'Wed', 'Fri'] as const;

const phaseForWeek = (week: number): WeekPlan['phase'] => {
  if (week <= 4) {
    return 'Foundation';
  }

  if (week <= 8) {
    return 'Build';
  }

  if (week <= 11) {
    return 'Peak';
  }

  return 'Deload';
};

const intensityForWeek = (week: number): WorkoutIntensity => {
  if (week === 12) {
    return 'deload';
  }

  if (week >= 9) {
    return 'peak';
  }

  if (week >= 5) {
    return 'build';
  }

  return 'base';
};

const focusForPhase = (phase: WeekPlan['phase']) => {
  switch (phase) {
    case 'Foundation':
      return 'Technique, consistency, and work capacity';
    case 'Build':
      return 'Volume accumulation and progressive overload';
    case 'Peak':
      return 'Heavy intent and performance expression';
    case 'Deload':
      return 'Recovery, mobility, and adaptation';
  }
};

const recoveryGoalForPhase = (phase: WeekPlan['phase']) => {
  switch (phase) {
    case 'Foundation':
      return 'Sleep 7.5h+, hit protein, and keep daily walks above 8k.';
    case 'Build':
      return 'Prioritize meal timing and post-session mobility for load tolerance.';
    case 'Peak':
      return 'Protect recovery windows and reduce non-essential fatigue.';
    case 'Deload':
      return 'Move lightly, reload motivation, and review the next cycle.';
  }
};

const repSchemeForIntensity = (intensity: WorkoutIntensity) => {
  switch (intensity) {
    case 'base':
      return {
        mainLift: '4 x 8',
        secondaryLift: '3 x 10',
        accessory: '3 x 12',
        conditioning: '5 rounds',
      };
    case 'build':
      return {
        mainLift: '5 x 6',
        secondaryLift: '4 x 8',
        accessory: '3 x 10',
        conditioning: '6 rounds',
      };
    case 'peak':
      return {
        mainLift: '6 x 4',
        secondaryLift: '4 x 6',
        accessory: '3 x 8',
        conditioning: '8 rounds',
      };
    case 'deload':
      return {
        mainLift: '3 x 5',
        secondaryLift: '2 x 8',
        accessory: '2 x 10',
        conditioning: '4 rounds',
      };
  }
};

const createExercise = (
  name: string,
  sets: number,
  reps: string,
  restSeconds: number,
  notes?: string
): Exercise => ({
  id: name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
  name,
  sets,
  reps,
  restSeconds,
  notes,
});

const createWorkout = (
  week: number,
  day: number,
  title: string,
  focus: string,
  durationMinutes: number,
  intensity: WorkoutIntensity,
  exercises: Exercise[],
  coachingNote: string
): WorkoutSession => ({
  id: `week-${week}-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`,
  week,
  day,
  dayLabel: dayLabels[day - 1],
  title,
  focus,
  durationMinutes,
  intensity,
  exercises,
  coachingNote,
});

const buildWeek = (week: number): WeekPlan => {
  const phase = phaseForWeek(week);
  const intensity = intensityForWeek(week);
  const repScheme = repSchemeForIntensity(intensity);

  return {
    week,
    phase,
    focus: focusForPhase(phase),
    summary:
      phase === 'Deload'
        ? 'Reduce volume, keep movement quality high, and close the cycle cleanly.'
        : `Week ${week} sharpens the ${phase.toLowerCase()} phase with deliberate progression.`,
    recoveryGoal: recoveryGoalForPhase(phase),
    workouts: [
      createWorkout(
        week,
        1,
        'Lower Strength',
        'Squat pattern, hinge strength, unilateral control',
        phase === 'Peak' ? 72 : 64,
        intensity,
        [
          createExercise('Back Squat', Number(repScheme.mainLift[0]), repScheme.mainLift.split(' x ')[1], 150),
          createExercise('Romanian Deadlift', Number(repScheme.secondaryLift[0]), repScheme.secondaryLift.split(' x ')[1], 120),
          createExercise('Rear Foot Elevated Split Squat', 3, intensity === 'peak' ? '8 / side' : '10 / side', 90),
          createExercise('Hamstring Curl', 3, repScheme.accessory.split(' x ')[1], 75),
          createExercise('Dead Bug ISO', 3, '30 sec', 45, 'Exhale fully on every rep.'),
        ],
        'Own the eccentric on every main lift. Technical intent matters more than load creep.'
      ),
      createWorkout(
        week,
        2,
        'Upper Push Pull',
        'Pressing balance, rowing volume, shoulder stability',
        phase === 'Peak' ? 70 : 60,
        intensity,
        [
          createExercise('Bench Press', Number(repScheme.mainLift[0]), repScheme.mainLift.split(' x ')[1], 150),
          createExercise('Chest Supported Row', Number(repScheme.secondaryLift[0]), repScheme.secondaryLift.split(' x ')[1], 105),
          createExercise('Half Kneeling Landmine Press', 3, intensity === 'peak' ? '8 / side' : '10 / side', 75),
          createExercise('Neutral Grip Pulldown', 3, repScheme.accessory.split(' x ')[1], 75),
          createExercise('Face Pull', 2, '15', 45, 'Pause at the fully retracted position.'),
        ],
        'Move crisp, leave one clean rep in reserve, and keep shoulders stacked.'
      ),
      createWorkout(
        week,
        3,
        'Conditioning + Core',
        'Athletic work capacity, trunk control, durability',
        phase === 'Peak' ? 58 : 52,
        intensity,
        [
          createExercise('Sled Push', 5, repScheme.conditioning, 60, 'Steady pressure through the floor.'),
          createExercise('Kettlebell Swing', 4, intensity === 'peak' ? '12' : '15', 60),
          createExercise('Walking Lunge', 3, '12 / side', 60),
          createExercise('Tall Plank Shoulder Tap', 3, '20 taps', 45),
          createExercise('Zone 2 Finisher', 1, phase === 'Deload' ? '8 min' : '12 min', 0, 'Nasal breathing if possible.'),
        ],
        'Stay smooth. Conditioning days should build engine without burying recovery.'
      ),
    ],
  };
};

export const trainingPlan: WeekPlan[] = Array.from({ length: 12 }, (_, index) => buildWeek(index + 1));
