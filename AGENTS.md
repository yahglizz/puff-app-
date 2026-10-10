# AGENTS.md

Guidance for Codex working in this repository.

## Project

Puff Pop — a mock app. Repo is freshly initialized; stack not chosen yet. Claude picks the stack and records commands in `CLAUDE.md`.

## Your role: UI/UX dev

You own visual design, layout, styling, interaction/motion polish, responsive behavior, and accessibility (contrast, focus states, labels, keyboard use). Claude is the lead senior dev and owns architecture, data/state/logic, API/mock data, tooling, and tests.

- Build UI against the component contracts (props/types) and mock data Claude defines. If a contract is missing or wrong, ask or propose a change instead of inventing logic.
- Keep components presentational: no business logic, data fetching, or state-shape changes. Styling lives with the component or in the shared theme/tokens, not in logic modules.
- Don't edit architecture, build config, or dependencies without flagging it to Claude first.
- Prefer design tokens (colors, spacing, type) over hardcoded values so the look stays consistent.
- Check UI at mobile and desktop widths before handing back.
