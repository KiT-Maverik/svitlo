# Morning, Afternoon, Evening, Night — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not formally approved.**
**Audience:** Grade 1 (approximately 6–7).
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skill:** [daySequence.data.ts](../../../../data/skills/time/calendar/skills/daySequence.data.ts).
**Standalone:** No Program story, imported Quiz, scored Question, progress gate, runtime Lesson code or assembled locale bundle is created.

## Learner experience and teaching logic

Sequence morning, afternoon, evening and night as a repeating daily cycle, and match plausible everyday situations to approximate periods without declaring fixed boundaries.

The clock lessons already establish readings at an instant; this introduces recurring qualitative periods before calendar dates or duration calculations. The activity builds toward an explanation by the learner, not automatic mastery from making a choice. A locally driven, labelled four-state cycle where moving forward or backward highlights the adjacent period; one alternate display shows contextual activities as examples but no numerical start/end clock thresholds.

**Scope boundary:** Do not teach weekdays, dates, months, leap years, elapsed time, clock-hour start/end thresholds or time-zone conversions. The neighboring canonical `weekMonthYear` Skill is not included.

The Sections below use the existing block types `text`, `markdown` and `scene`, arranged in one **vertical top-to-bottom column**. `DayCycleExplorer` is **proposed** and is not a registered/implemented Scene. There are no invented custom Resource discriminators or server APIs.

## Learning journey

1. **A day has a repeating pattern.** Introduce a cyclical order rather than a fixed four-slot clock.
2. **Before and after.** Use adjacent positions in the period cycle without relying on a personal schedule.
3. **Daily activities are clues, not rules.** Connect period labels to lived contexts without stereotype or false universal schedules.
4. **Find your way around the cycle.** Independent sequence transfer from an unfamiliar starting position.

## Section scripts (ordered Resources)

### Section 1: A day has a repeating pattern

**Purpose:** Introduce a cyclical order rather than a fixed four-slot clock.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Here are four parts of the day: morning, afternoon, evening and night. After night, what comes next?”

2. **`scene` (existing Resource type; Scene proposed).** [DayCycleExplorer](./scenes/DayCycleExplorer.scene-spec.md). Show the four labelled periods in a linear cycle and let the learner step forward with a Next-period control. Keep the next morning visible after night.

3. **`markdown` (existing Resource type).** “Morning comes after night. The four names repeat in a cycle, so we can start at any part and keep going.”

**Learner's actual move:** Predict the period after night, step through the cycle and name the full sequence.

**Misconception-specific explanation:** If the learner says ‘nothing follows night’, show the night-to-next-morning link and explain that the sequence repeats. Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 2: Before and after

**Purpose:** Use adjacent positions in the period cycle without relying on a personal schedule.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “What comes right before evening? What comes right after afternoon?”

2. **`scene` (existing Resource type; Scene proposed).** [DayCycleExplorer](./scenes/DayCycleExplorer.scene-spec.md). Choose one named period to highlight and use Before or After. For evening, Before shows afternoon. For afternoon, After shows evening.

3. **`markdown` (existing Resource type).** “In our four-part model, afternoon comes before evening, and evening comes after afternoon. Night comes after evening.”

**Learner's actual move:** Identify adjacency in both directions. Reveal the neighboring named period only after prediction or when requested.

**Misconception-specific explanation:** For ‘night comes before evening’, trace the sequence afternoon → evening → night rather than using a clock reading. Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 3: Daily activities are clues, not rules

**Purpose:** Connect period labels to lived contexts without stereotype or false universal schedules.

**Block sequence — a single column:**

1. **`markdown` (existing Resource type).** “Many children get ready for school in the morning. Some people study or work in the evening or at night. Activities can happen at different times.”

2. **`scene` (existing Resource type; Scene proposed).** [DayCycleExplorer](./scenes/DayCycleExplorer.scene-spec.md). Show three illustrative context cards (a morning outdoor walk, an afternoon game, a nighttime shift) with period labels. Let the learner choose a plausible time and inspect alternative schedules.

3. **`text` (existing Resource type).** “A routine can help us describe the day, but it does not decide the exact time when morning or evening begins for everyone.”

**Learner's actual move:** Match examples to plausible periods; inspect why a different routine can also be valid.

**Misconception-specific explanation:** If the child claims an activity can happen only in one period, show a different person's routine and explain that these are examples, not definitions. Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 4: Find your way around the cycle

**Purpose:** Independent sequence transfer from an unfamiliar starting position.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Start at evening. Name the next three periods without starting again from morning.”

2. **`scene` (existing Resource type; Scene proposed).** [DayCycleExplorer](./scenes/DayCycleExplorer.scene-spec.md). Hide the future labels initially; provide an evening start and three revealable following spaces: night, morning, afternoon. Offer the full cycle as an optional hint.

3. **`markdown` (existing Resource type).** “Evening → night → morning → afternoon. The order stays the same even if we start in the middle.”

**Learner's actual move:** Complete a three-step forward traversal from evening and explain why morning follows night.

**Misconception-specific explanation:** If morning is omitted, show the closed cycle and highlight the link night → morning. Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

## Bespoke interactive Scene — provisional

- [DayCycleExplorer](./scenes/DayCycleExplorer.scene-spec.md) is a proposed **self-contained, prop-free** Scene. It owns only its local learning model and explanation state. It has no runtime implementation yet; if reused by multiple sections, each instance should maintain independent state.

## Independent transfer prompt

A learner says, ‘Night is always the last part of a day, so nothing happens next.’ Explain the mistake using the next morning and the idea of a cycle.

Learners should first predict or justify their thinking without copying the original example. Reveal a correct worked explanation only on request or after an attempt. This remains instruction, **not scored mastery assessment**.

## Proposed Lesson Note — product concept only

“Morning, afternoon, evening and night repeat in order; their clock-time boundaries can vary.”

**Editorial unlock proposal:** Make this cue available after the learner inspects the explicit misconception contrast in Section 3 and explains it. The Note entity, unlock API, offline notes persistence and automatic spaced review are not implemented by this content plan; the explanation stays available regardless.

## Source verification and content constraints

The canonical [daySequence.data.ts](../../../../data/skills/time/calendar/skills/daySequence.data.ts) governs Skill meaning; its UUID, definition and multilingual translations are unchanged. Use morning → afternoon → evening → night → next morning. Activities are examples only: breakfast can happen in morning for some families, but a nurse can work at night and someone can eat dinner earlier or later. Explicitly prevent an activity stereotype from becoming a formal definition.

All runtime copy requires complete, authentic translation into every configured locale; this English editorial script is _not_ runtime locale coverage. The proposed Scene's essential functions need nonvisual equivalence, mobile usability, semantic RTL, and offline availability. These are requirements for implementation review, not a declaration that they pass.

## Approvals and implementation boundary

**Methodologist approval pending. Screenwriter and Scene editorial approval pending.** Assessment Architect owns any Questions/Quiz, scoring and competency evidence. Coding Agent owns runtime Lesson/Scene, provider-free public Scene interface, localizations, tests and offline support. No scoring, Program content or runtime configuration is added.
