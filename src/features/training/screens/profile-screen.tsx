import { Button } from "react-native-paper";

import { EditorialScreen } from "@/src/features/training/components/editorial-screen";
import { WeekSection } from "@/src/features/training/components/week-section";
import { trainingPlan } from "@/src/features/training/data/plan";
import { useTrainingStore } from "@/src/features/training/store/use-training-store";
import { useAppTheme } from "@/src/core/theme/paper-theme";

export function ProfileScreen() {
  const theme = useAppTheme();
  const activeWeek = useTrainingStore((state) => state.activeWeek);
  const completedWorkoutIds = useTrainingStore(
    (state) => state.completedWorkoutIds,
  );
  const setActiveWeek = useTrainingStore((state) => state.setActiveWeek);
  const toggleWorkoutCompletion = useTrainingStore(
    (state) => state.toggleWorkoutCompletion,
  );

  return (
    <EditorialScreen
      eyebrow="Program"
      title="12-week plan"
      subtitle="Feature slices are organized for workout programming, completion state, and future sync."
    >
      {trainingPlan.map((weekPlan) => (
        <WeekSection
          key={weekPlan.week}
          weekPlan={weekPlan}
          completedWorkoutIds={completedWorkoutIds}
          onSelectWeek={setActiveWeek}
          onToggleCompletion={toggleWorkoutCompletion}
        />
      ))}

      <Button
        mode="outlined"
        textColor={theme.colors.onSurface}
        style={{ borderColor: theme.editorial.ghostBorder }}
        onPress={() => setActiveWeek(activeWeek === 1 ? 12 : activeWeek - 1)}
      >
        Review previous week
      </Button>
    </EditorialScreen>
  );
}
