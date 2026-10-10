# Puff Pop motion plan — October 10, 2026

Animate the supplied illustrations, keep typography and controls native and still.
Each scene is a silent five-second loop, with a locked camera and low-amplitude
movement. The source palette, cloud identity, framing, and illustrated style stay
recognizable. First and last frames use the same reference image.

| Section | Illustration motion | UI treatment |
| --- | --- | --- |
| Welcome | One little buoyant hop and friendly wave; smoke curls softly | Short panel entrance; primary press feedback |
| Habit | Puff nods, clipboard tilts slightly, existing checks shimmer | Question card settles once; selection remains the reference preview |
| Motivation | Heart, piggy bank, lungs, sneaker float a few pixels around Puff | Goal choices stay stationary and readable |
| Quit plan | One calendar page gently lifts and settles; date check glints | Date and plan rows stay fixed |
| Ready | Puff cheers; existing confetti drifts, then returns to start | Feature cards stay still; reminder action remains a preview |
| Home | Friendly wave and calm body bob; sun rays shimmer | Stats and craving scale stay fixed; no tab-slide animation |
| Chat | Gentle attentive nod and tiny raised-arm motion | Messages stay readable; no fake typing or invented replies |
| Progress | Small celebratory bounce and gentle rays | Calendar, chart, numbers, and milestones remain fixed |
| Daily Check-In | One encouraging nod and slow breathing bob | Mood tiles and inputs remain stable |
| Journal | Pencil makes two small writing strokes in the existing open book | Editable text stays live, without generated writing overlays |
| Community | Puff squeezes the existing heart once, then relaxes | Feed and posting field remain stable |
| Profile | Puff gives a small proud wave; existing landscape sways | Avatar choices and personal stats remain fixed |

## Asset pipeline

Inputs: existing `assets/mockups/` crops, flattened against brand cream for video.
Upload references: `assets/motion/references/`. Originals remain unchanged.
Higgsfield models: Kling 2.6 for eleven clips; the already-completed Welcome
pilot uses Seedance 2.5. All source clips are five seconds and silent.
Quotes: 5 credits per Kling clip; 35 credits for the existing Welcome pilot.
Successful-clip quotes total 90 credits. Seven failed wide-reference attempts
were also quoted at 5 credits each; their final billing/refunds were not verified.
The Welcome pilot was checked first. Seven initial header jobs failed; larger
reference canvases succeeded for all seven. Raw AI clips sometimes invent text
or drift in later frames, so runtime loops use clean early segments, mask label
regions with brand cream, and reverse back to their starting pose. Runtime loop
durations are approximately 3.2–5 seconds. All loop endpoints are checked.
Completed media, model, exact prompts, job IDs, and verification are recorded in
`assets/motion/manifest.json`.

Runtime: bundled local clips; one player per visible screen, disposed on navigation.
Still illustrations remain the loading/error fallback. Reduce Motion uses those
stills. Playback pauses when the app backgrounds. Onboarding panel entrances use
transform and opacity on the UI thread; frequently used tabs do not slide.

## Onboarding review

Sequence: Welcome → Habit → Motivation → Quit plan → Ready → Home.
Welcome's original three-dot indicator conflicts with the five-step sequence;
all five screens now show five dots consistently. Back navigation is checked through
the existing callbacks. Choices, date, login, and reminder actions remain visual
previews; no services or business behavior are added.
