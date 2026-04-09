# OPUS XII

OPUS XII is a React Native fitness app built on Expo Router for a 12-week workout plan experience with workout sessions, progress tracking, and an offline-first foundation.

## Stack

- Expo 54 + React Native 0.81
- Expo Router for navigation
- React Native Paper for Material Design 3 UI
- Zustand + AsyncStorage for persisted local state
- TanStack Query for future remote data orchestration
- Inter + Lexend typography via Expo Google Fonts

## Why React Native Paper

This repo uses `react-native-paper` as the Material Design layer. MUI targets React DOM and is not the right UI foundation for a native Expo app. Paper gives the project a native-compatible Material Design system while still allowing the editorial grayscale treatment defined in [DESIGN.md](/home/mrwn/git/OPUS-XII/DESIGN.md).

## App Structure

```text
app/
  (tabs)/
    index.tsx
    plan.tsx
    progress.tsx
    _layout.tsx
  workout/
    [id].tsx
  _layout.tsx

src/
  core/
    providers/
    theme/
  features/
    training/
      components/
      data/
      screens/
      store/
      utils/
  lib/
```

## Foundation Decisions

- Navigation stays in `app/` and features live in `src/`.
- The training plan is seeded locally in `src/features/training/data/plan.ts`.
- Completion state and bodyweight logs persist offline through Zustand middleware.
- Theme tokens map the editorial system from `DESIGN.md` onto a Material 3-compatible Paper theme.
- Query infrastructure is installed now so API work can be added without reworking the provider tree later.

## Screens Included

- `Dashboard`: active week, next session, and program overview
- `Plan`: all 12 weeks with completion state
- `Progress`: adherence and bodyweight tracking
- `Workout Detail`: per-session exercise list and completion control

## Commands

```bash
pnpm install
pnpm start
pnpm lint
pnpm typecheck
pnpm validate
```

## Next Build Steps

1. Add authentication and profile onboarding.
2. Replace seeded plan data with a synced backend model.
3. Add exercise media, timers, and richer workout logging.
4. Add tests for selectors, store actions, and route-level rendering.
