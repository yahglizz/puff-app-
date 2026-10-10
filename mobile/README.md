# Puff Pop UI

Twelve native Expo UI screens recreated from the supplied mockups. Illustrations,
avatars, and illustrated icons are cropped from the original PNGs. All text,
buttons, cards, selection indicators, charts, and navigation are rendered in code.

## Run

```sh
cd "/Volumes/Untitled/puff pop/mobile"
npm install
npm run ios
```

`npm run web` opens the responsive preview; `npm run typecheck` verifies TypeScript.
The live development server in this session uses port 8087.

Welcome → Get Started walks through onboarding. The account link opens Home.
Bottom navigation opens Chat, Progress, Community, and Profile. Home's mood
section opens Daily Check-In; Quick Actions → Notes opens Journal. Profile's
bottom link returns to Welcome.

## Scope

UI only. Numbers, dates, selections, messages, and entries reproduce the mockups.
Navigation switches screens locally. Inputs allow inspecting keyboard behavior;
saves, chat, notifications, community posting, and preferences have no services or
persistence. The app never requests notification, microphone, or camera permission.

Fonts: Fredoka SemiBold and Nunito, bundled by their Expo font packages. Colors,
spacing, and shared visual elements live in `src/theme.ts` and `src/components.tsx`.
The reference's illustrated type is approximated with live text rather than baked
into a screenshot. Screens scroll on smaller devices so content remains reachable.

Original artwork extraction, if Pillow is available:

```sh
python3 scripts/extract-art.py
```

Screenshots live at `../output/simulator/` and `../output/playwright/`.

## Motion

All twelve sections use decorative Higgsfield loops derived from the original
illustrations. Eleven clips use budget Kling 2.6; Welcome keeps its existing
Seedance pilot. Text and controls stay native. The five onboarding screens now
use consistent progress dots and short panel entrances. Reduce Motion uses
original stills; backgrounding pauses playback.

See [MOTION-PLAN.md](MOTION-PLAN.md) for each section’s idea and generation
provenance. Clips live in `assets/motion/`; full prompts and job IDs are in
`assets/motion/manifest.json`. Only processed local clips enter the runtime bundle.
Original source videos and references remain available for review.

[Simulator onboarding recording](../output/motion/onboarding-ios.mp4).
