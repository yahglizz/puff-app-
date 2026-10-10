# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Puff Pop — a mock app. The repo is freshly initialized (no commits, no source, no stack chosen yet). Do not assume a framework; pick the stack with the user, then record build/lint/test commands here.

## Team roles

- **Claude (you): lead senior dev.** Owns architecture, stack choice, data/state/logic, API and mock-data layer, tooling, tests, and review of Codex's work. Sets the component contracts (props/types) Codex builds against.
- **Codex: UI/UX dev.** Owns visual design, layout, styling, interaction polish, accessibility, and presentational components. Instructions for Codex live in `AGENTS.md`.

Handoff rule: Claude defines the structure and data contracts first; Codex fills in the UI against them. Keep logic out of presentational components and styling out of logic modules so both can work in parallel without conflicts. Don't rewrite files in the other's area without flagging it.

## Notes

- `.claude-flow/` is local tooling state; don't commit it. `._*` files are macOS drive artifacts — ignore them (add to `.gitignore` when one is created).
- Update this file (commands, architecture) as soon as the stack and first modules exist.

## UI scaffold — October 9, 2026

User explicitly approved Expo and a minimal iOS UI scaffold. App lives in `mobile/`.
Expo SDK 57, React Native, TypeScript. No services, persistence, accounts, AI,
notifications, or business logic are implemented. Local screen selection only
provides navigation between the twelve reference screens. Text fields are visual
previews; their content is not saved or sent.

Commands from `mobile/`:
- `npm install`
- `npm run ios` — start Expo and open iOS Simulator.
- `npm run web` — responsive browser preview.
- `npm run typecheck` — TypeScript check.

For this external-drive checkout, `mobile/node_modules` points to a local cache at
`/Users/yg4st/.cache/puff-pop-ui/node_modules`. Metro watches the resolved dependency
directory. Normal installs also work with the same Metro configuration.

UI files:
- `App.tsx`: font loading, safe areas, local preview navigation.
- `src/theme.ts`: design tokens, original artwork references, screen names.
- `src/components.tsx`: presentational UI primitives.
- `src/Onboarding.tsx`: five onboarding layouts.
- `src/Screens.tsx`: Home, Chat, Progress, Check-In, Journal, Community, Profile.
- `scripts/extract-art.py`: reproducible crops from original `ui mock ups ` folder.

Screen components accept `{ screen, navigate }`. `navigate` switches previews only;
replace it with lead-dev-provided navigation when functional app contracts exist.
All displayed content is fixed to the supplied mockups. Static artwork comes
from the originals; the October 10 motion pass adds Higgsfield-derived videos.
Header artwork masks screenshot lettering so headings remain native text.

## Motion pass — October 10, 2026

Flag for lead developer: user requested Higgsfield animation for every section.
Adding SDK-compatible `expo-video`, `expo-asset`, `react-native-reanimated`, and
`react-native-worklets` for presentational playback and onboarding entrances only.
No architecture, data contracts, account flow, selections, saves, or API behavior
changes. Existing reference artwork supplies the animation inputs.

Motion files: `src/MotionArt.tsx` owns decorative playback, native Reduce Motion
and AppState handling; web playback catches canceled play promises.
`src/motion-clips.ts` references twelve bundled local clips (~3 MB).
`assets/motion/manifest.json` records model, prompt, jobs, failed attempts,
processing, and local file names. `scripts/process-motion.py` validates crops,
checks silent playback, and compares first/last frames after reversible looping.
