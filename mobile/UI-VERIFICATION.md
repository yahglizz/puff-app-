# UI verification — October 9, 2026

Scope: twelve UI screens using original supplied mockup artwork. No application
services or persistence. User approved Expo scaffold and then requested original
artwork only; generated artwork is not referenced or copied into this project.

Passed:
- `npm run typecheck`.
- Native rendering in Expo Go SDK 57 on iPhone 17 Pro, iOS Simulator 26.4.
- Preview navigation through all five onboarding screens and seven main screens.
- Journal and Daily Check-In text fields render; bottom navigation stays visible.
- Profile scrolling exposes avatar customization and welcome-screen return link.
- Browser layouts at 375 × 812, 393 × 852, and 1440 × 1000.
- No horizontal overflow across five primary tabs at 393px.
- Final browser console: zero errors or warnings.
- Original extraction pipeline validates source count and crop bounds; 36 regions.

Evidence: `../output/simulator/` contains a screenshot for every native screen,
including `profile-bottom.jpg`. Browser images are in `../output/playwright/`.

Limits: reference typography is approximated with Fredoka and Nunito. Native
emoji and system icons differ slightly from illustrated reference icons. Longer
screens scroll rather than compressing content to one device height. Physical
devices, Android, VoiceOver, and large Dynamic Type settings were not checked.
This is an Expo Go UI preview, not a standalone store-ready build.

## Motion verification — October 10, 2026

- Twelve successful Higgsfield source clips: eleven Kling 2.6, existing Welcome
  Seedance 2.5 pilot retained. Seven failed header jobs were retried successfully
  with larger reference canvases. Billing/refunds for those failures are unverified.
- Twelve local H.264 loops, no audio tracks, approximately 3.2–5 seconds, about
  2.96 MB total. Processing asserts crop bounds, duration, and near-identical first
  and last decoded frames. Header masks remove generated lettering from UI areas.
- `npm run typecheck` passes after native playback and browser cleanup changes.
- Native iOS Simulator walkthrough: Habit, Motivation, Plan, Ready, Home transitions
  verified from semantic UI snapshots. Welcome rendered before the walkthrough.
- Browser onboarding: all five indicators, Back to Welcome, and Home exit pass.
- Browser Reduce Motion: players disappear in favor of original stills; restoring
  motion mounts playback again. No generated text replaces native headings.
- Seven main browser screens: decoded frames advance; each player is muted and
  looping. No horizontal overflow at 375px. Desktop rendering checked at 1440px.
- Final browser console: zero errors or warnings.
- `../output/motion/onboarding-ios.mp4` records real Simulator rendering;
  `onboarding-preview.mp4` is its smaller preview. Browser proof images and asset
  contact sheets are in the same directory.

Hardware/release performance, native Reduce Motion via iOS Settings, and physical
device background playback were not tested. Background pause and native preference
subscriptions are implemented; browser preference switching was exercised.

## Onboarding frame fit — October 10, 2026

- Five onboarding steps share a consistent logo area, heading scale, action row,
  and progress indicator. Removed duplicated inline navigation controls.
- Artwork uses containment, preserving proportions without stretching or clipping.
  Its height follows measured safe-area frame, content panel, and pinned footer.
- Compact Fresh Start feature/reminder cards leave more room for its illustration.
  Content remains scrollable on short frames; primary actions remain pinned.
- Browser assert checks pass across all five steps at 375 × 812, 320 × 568, and
  1440 × 1000: one primary action, action/dots inside viewport, no horizontal
  overflow. Back navigation and decoded muted looping video also pass. Fresh
  browser run has zero console errors or warnings.
- Native walkthroughs pass on iPhone 17 Pro and iPhone 17e in Expo Go. All five
  steps render with their buttons visible. Native startup also passes after moving
  browser asset resolution into the web player and restarting Metro.
- `npm run typecheck` and `git diff --check` pass.
- Evidence: `../output/frame-fit/` contains browser proof, both simulator sizes,
  and browser check results in `checks.json`.

Physical devices and large accessibility text sizes were not checked. Very short
frames use content scrolling. No backend or product behavior was added.
