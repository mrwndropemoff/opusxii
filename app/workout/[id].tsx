import { useLocalSearchParams } from 'expo-router';

import { WorkoutDetailScreen } from '@/src/features/training/screens/workout-detail-screen';

export default function WorkoutDetailRoute() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const workoutId = Array.isArray(params.id) ? params.id[0] : params.id;

  return <WorkoutDetailScreen workoutId={workoutId ?? ''} />;
}
