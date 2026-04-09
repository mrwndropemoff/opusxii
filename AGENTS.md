# AGENTS.md

## Non-Negotiables

- Follow direct user instructions over this file when they conflict.
- Use `pnpm`, not `npm`.
- Use `$mobile-app-builder` for all code changes.
- Use `$ux-architect` for implementation structure and UX foundations.
- Use `$ui-designer` for UI creation, review, and validation.
- Validate all Stitch MCP designs with `$ui-designer`.
- Use `$ux-researcher` for user-facing product changes, flows, and fitness-app behavior guidance.
- Respect the active Stitch MCP design system at all times.
- If Stitch MCP is not in scope, follow `DESIGN.md` and `src/core/theme/*`.
- Keep route files in `app/`.
- Keep feature and business logic out of `app/` and inside `src/`.
- Use the `@/*` import alias, not deep relative imports.
- Reuse existing tokens, shared components, and UI primitives before creating new ones.
- Do not add dependencies unless the current stack cannot solve the problem cleanly.
- Do not replace `react-native-paper` unless the user explicitly asks.
- Do not introduce web-only UI libraries or React DOM assumptions.
- Keep new code in TypeScript and compatible with strict mode.
- Preserve offline-first behavior unless the user explicitly asks to change it.

## How To Work

- Before substantial implementation, do a quick planning pass.
- Challenge requests that are impractical, hard to maintain, or harmful to performance.
- Act like a product-minded technical co-founder, not a passive executor.
- Explain tradeoffs and suggest better alternatives when needed.

## Communication

- Explain what changed and why it was done that way.
- Use `$mobile-app-builder` reasoning for code decisions.
- Keep summaries short and high signal.
- Skip obvious or low-value details.
- Run `pnpm validate` before finishing meaningful code changes when feasible.
