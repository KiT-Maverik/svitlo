# DayCycleExplorer — Screenwriter Scene Specification

**Status: Provisional Draft — Methodologist has not approved the Brief; Scene editorial review remains pending.**
**Lesson:** [Morning, Afternoon, Evening, Night Content](../content.md)
**Brief:** [Methodologist Draft](../methodologist-brief.md)
**Target Skill:** [daySequence.data.ts](../../../../../data/skills/time/calendar/skills/daySequence.data.ts)
**Implementation:** Not built or registered

## Why this Scene needs to be interactive

Sequence morning, afternoon, evening and night as a repeating daily cycle, and match plausible everyday situations to approximate periods without declaring fixed boundaries.

A locally driven, labelled four-state cycle where moving forward or backward highlights the adjacent period; one alternate display shows contextual activities as examples but no numerical start/end clock thresholds.

This is a pedagogical model whose learner-controlled state makes a mathematical or logical contrast visible. A static picture cannot equally expose prediction, changed conditions and the conceptual explanation. Do not turn it into reward/score mechanics or a mandatory graded Question.

## Mathematical content and source-of-truth conditions

Use morning → afternoon → evening → night → next morning. Activities are examples only: breakfast can happen in morning for some families, but a nurse can work at night and someone can eat dinner earlier or later. Explicitly prevent an activity stereotype from becoming a formal definition.

**Hard limits:** Do not teach weekdays, dates, months, leap years, elapsed time, clock-hour start/end thresholds or time-zone conversions. The neighboring canonical `weekMonthYear` Skill is not included.

## Required observable states

| State                | Data or model facts                                                | Correct interpretation                     |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| Initial              | Four named periods, focus on morning; night leads back to morning. | Cycle has four recurring states.           |
| Evening forward      | Evening selected; next step highlights night.                      | Evening precedes night.                    |
| Night forward        | Night selected; next step highlights morning.                      | Night precedes next morning.               |
| Independent transfer | Evening chosen as a start; three hidden successors.                | Next states are night, morning, afternoon. |

## Required learning interaction

1. Present a fully specified initial state and ask a prediction in short child-facing copy; make the initial assumptions and labels inspectable before a decision.
2. Offer named, keyboard-operable controls that select a preset, a label or an explanatory reveal, matching the Section contexts without inventing new narrative or formal assessment.
3. Apply the action to a **deterministic**, locally owned, verifiable model. Announce the changed state with both an accessible text model and meaningful visual indication.
4. Show why the response matches or differs from the mathematical condition, including a counterexample; allow independent revisits, learner-controlled explanations, reveal and retry without scoring.
5. Expose Reset to the initial state. Keep all state local. The Scene root accepts **no props**; if separate Lesson Sections use it, state is fresh by instance, with no parent-provided chapter/mode/solution.
6. Provide an accessible independent-transfer route that hides the explanation initially but never makes it inaccessible.

## Exact misconception and explanation cases

- **A day has a repeating pattern:** If the learner says ‘nothing follows night’, show the night-to-next-morning link and explain that the sequence repeats.
- **Before and after:** For ‘night comes before evening’, trace the sequence afternoon → evening → night rather than using a clock reading.
- **Daily activities are clues, not rules:** If the child claims an activity can happen only in one period, show a different person's routine and explain that these are examples, not definitions.
- **Find your way around the cycle:** If morning is omitted, show the closed cycle and highlight the link night → morning.

## Nonvisual, motor and cognitive equivalence

Display an ordered list of four named periods with an explicit ‘repeats at morning’ marker. Expose current and next names as live text; allow named buttons Next, Previous, Pick period, Reset, Show explanation. Accessible text is semantically equivalent to the ring.

Do not rely on sound, color alone, animation, detailed drawing, drag precision, long reading, limited response time or knowledge of an English-only label. Give labels for all decision buttons; preserve focus and announce state without excessive live-region noise. Permit responsive larger text and clear logical navigation.

## Localization / RTL / offline / performance handoff

Every instruction, control, unit, category, event, counter and error explanation needs **genuine** translations for all required textbook locales; English here is source-only editorial text, not a real translation bundle. Preserve numerical mathematics and chronological relations when adapting layout and RTL reading order. Avoid mirroring data values, fraction wholes or abstract cycle meaning. After future PWA content installation, the full interaction including all variants, explanations and assistive alternatives must function offline; prefer static/local lightweight assets and static alternatives for motion-sensitive learners.

## Engineer-facing constraints and test coverage (not implementation)

The coding specialist will own a self-contained component with no props, localized context data, co-located Scene-specific unit tests, appropriate deterministic fixtures, keyboard/screen-reader tests, RTL review and offline-device verification. Those files are not generated in this batch, and current availability of a generic `scene` Resource type does not imply this named Scene is registered.

## Approval boundary

This text is **provisional**. The Methodologist's Brief must be explicitly reviewed, and any scenario-level changes must be authorized by the Screenwriter before Scene engineering. No Question correctness engine, reward, assessment score, Note unlock, Program plot or runtime Lesson is created.
