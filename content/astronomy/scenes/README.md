# skyChangesOverview Scene implementation handoff

Three Scene components correspond to immutable Scene UUIDs and the already-reviewed
Lesson Configs and `specification.md` sources in
`data/lessons/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/`.
Do not edit the instructional specs to make implementation easier. Their full
approved copies are stored next to each executable component for review.

## Implemented behavior

- `DayScene`: two matching fictional SVG landscapes with meaningful sky changes,
  one lighting-vs-place choice, nonblocking feedback, reset and responsive
  accessible text. The **real photographic evidence step remains disabled**.
- `MoonScene`: identical-diameter quarter/full disks with authored dates and
  text alternatives, two separate questions (visible illumination and physical
  shape), independent show/hide cloud counterexample, nonblocking feedback/reset.
- `ReflectScene`: independent day/Moon topics, ready-made complete question
  selection, voluntary own-question route and separate confirmation, optional
  nonpersisted typed input, skip/back/review/reset and two independent
  acknowledgement flags; no scoring, recording or mastery claim.
- Lazy Scene registry by UUID, responsive layout, keyboard-native controls and
  explicit live-feedback regions. Co-located deterministic model tests and
  renderer markup tests accompany every Scene.

## Mandatory unresolved resources

- **DayScene photo evidence**: two **real** documented daytime/nighttime frames
  with a meaningful visible sky, original provenance, photographer, rights,
  place, date, local timestamp and timezone, astronomical solar cross-check,
  accessible day/night descriptions and authentic localized attributions. The
  illustration SVGs cannot substitute for this evidence. Scene UUID
  `80ecd1b4-8405-41ad-ac71-bd97d0f2c9e8`, approved specification in
  `8/80ecd1b4-8405-41ad-ac71-bd97d0f2c9e8/specification.md`.
- **Scene audio**: verified offline UK spoken clips for every voiceControl key
  in each of three specifications and any later photo attribution keys. Native
  offline TTS is acceptable only after supported-device Ukrainian voice
  availability and airplane-mode tests. Do not wire in network TTS or silently
  skip the pre-reader equivalent. The current implementation intentionally
  makes **no claim to supply playable narration**.
- **Production acceptance**: full Scene interaction/keyboard/SR tests in a
  browser, offline device tests, actual media availability, truthful
  localization of new photo metadata, real typed content build and package
  portability. No tests were executed in the authoring session that added these
  sources; a green focused CI run must be recorded separately.

Do not mark Stage 6.3, independent Scene review or Lesson Ready passed while
these essential media/accessibility barriers remain.
