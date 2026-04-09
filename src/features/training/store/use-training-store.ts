import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BodyweightEntry } from '@/src/features/training/types';

type TrainingState = {
  activeWeek: number;
  completedWorkoutIds: string[];
  bodyweightHistory: BodyweightEntry[];
  setActiveWeek: (week: number) => void;
  toggleWorkoutCompletion: (workoutId: string) => void;
  addBodyweightEntry: (valueKg: number, recordedAt?: string) => void;
  resetProgress: () => void;
};

const initialBodyweightHistory: BodyweightEntry[] = [
  { recordedAt: '2026-04-01', valueKg: 82.4 },
  { recordedAt: '2026-04-08', valueKg: 81.8 },
];

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set) => ({
      activeWeek: 1,
      completedWorkoutIds: [],
      bodyweightHistory: initialBodyweightHistory,
      setActiveWeek: (week) => set({ activeWeek: week }),
      toggleWorkoutCompletion: (workoutId) =>
        set((state) => {
          const alreadyComplete = state.completedWorkoutIds.includes(workoutId);

          return {
            completedWorkoutIds: alreadyComplete
              ? state.completedWorkoutIds.filter((id) => id !== workoutId)
              : [...state.completedWorkoutIds, workoutId],
          };
        }),
      addBodyweightEntry: (valueKg, recordedAt = new Date().toISOString().slice(0, 10)) =>
        set((state) => ({
          bodyweightHistory: [...state.bodyweightHistory, { valueKg, recordedAt }].sort((left, right) =>
            left.recordedAt.localeCompare(right.recordedAt)
          ),
        })),
      resetProgress: () =>
        set({
          activeWeek: 1,
          completedWorkoutIds: [],
          bodyweightHistory: initialBodyweightHistory,
        }),
    }),
    {
      name: 'opus-xii-training-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeWeek: state.activeWeek,
        completedWorkoutIds: state.completedWorkoutIds,
        bodyweightHistory: state.bodyweightHistory,
      }),
    }
  )
);
