# BarChartReader — Screenwriter Scene Specification

**Status: Provisional Draft — Methodologist has not approved the Brief; Scene editorial review remains pending.**
**Lesson:** [Reading a Bar Chart Content](../content.md)
**Brief:** [Methodologist Draft](../methodologist-brief.md)
**Target Skill:** [readBarChart.data.ts](../../../../../data/skills/data/presentation/skills/readBarChart.data.ts)
**Implementation:** Not built or registered

## Why this Scene needs to be interactive

Read categorical counts from a bar chart using its category labels, baseline and numerical scale, then compare values without treating bar width or decoration as the count.

An inspectable bar-chart model with a numbered 0–6 y-axis, fixed unit scale 1, categorical x-axis and labelled count table; a deliberately misleading variable-width view is clearly marked as a bad design and can never replace the canonical model.

This is a pedagogical model whose learner-controlled state makes a mathematical or logical contrast visible. A static picture cannot equally expose prediction, changed conditions and the conceptual explanation. Do not turn it into reward/score mechanics or a mandatory graded Question.

## Mathematical content and source-of-truth conditions

Use apples=4, pears=2, plums=5, y-axis 0 to 6 in unit steps; 5 > 4 > 2. For transfer, use books read by three fictional readers or library shelf categories: red=3, blue=5, yellow=1 with a zero baseline and count unit 1. All charts have explicit unit names and source context.

**Hard limits:** Do not teach constructing bar charts (separate Skill), unequal numeric steps, broken baselines, frequency ratios, 2D bar area interpretation, multiplication with scale values, histogram bins, percentages or statistical conclusions beyond simple comparisons.

## Required observable states

| State                 | Data or model facts                                                                | Correct interpretation             |
| --------------------- | ---------------------------------------------------------------------------------- | ---------------------------------- |
| Initial chart         | Apples 4, pears 2, plums 5; all bars equal width; scale 0–6.                       | Bar height encodes category count. |
| Selected category     | Apples selected; highlight baseline 0, tick 4, bar top at 4.                       | Apples count equals 4.             |
| Misleading decoration | Pear bar artificially wide but still ends at 2; warning states width is not count. | Pears remain 2, plums remain 5.    |
| New dataset           | Three equally wide bars red=3, blue=5, yellow=1 with same baseline.                | Smallest yellow 1; highest blue 5. |

## Required learning interaction

1. Present a fully specified initial state and ask a prediction in short child-facing copy; make the initial assumptions and labels inspectable before a decision.
2. Offer named, keyboard-operable controls that select a preset, a label or an explanatory reveal, matching the Section contexts without inventing new narrative or formal assessment.
3. Apply the action to a **deterministic**, locally owned, verifiable model. Announce the changed state with both an accessible text model and meaningful visual indication.
4. Show why the response matches or differs from the mathematical condition, including a counterexample; allow independent revisits, learner-controlled explanations, reveal and retry without scoring.
5. Expose Reset to the initial state. Keep all state local. The Scene root accepts **no props**; if separate Lesson Sections use it, state is fresh by instance, with no parent-provided chapter/mode/solution.
6. Provide an accessible independent-transfer route that hides the explanation initially but never makes it inaccessible.

## Exact misconception and explanation cases

- **A bar's length stands for a number:** If the child counts a bar's decorative width: “The number goes up the scale, not across the width of the bar.”
- **Read three values:** If apples are read as 5: “The apple bar stops at the tick marked 4. The plum bar is the one that reaches 5.”
- **Which group has more?:** If pears are called most because the pear bar is wide: “Read height against the scale: pears are 2, plums are 5. Width is not the count.”
- **Read a new chart without a model answer:** For smallest red: “Follow the yellow bar to the 1 mark and red to the 3 mark; 1 is smaller than 3.”

## Nonvisual, motor and cognitive equivalence

Provide a plain semantic table of category/value pairs alongside a numerically described chart, reachable through the same selection controls. State baseline 0 and tick step 1. Use meaningful labels in addition to visual highlights; compare numeric values by keyboard and speech without relying on color or pointer tracing.

Do not rely on sound, color alone, animation, detailed drawing, drag precision, long reading, limited response time or knowledge of an English-only label. Give labels for all decision buttons; preserve focus and announce state without excessive live-region noise. Permit responsive larger text and clear logical navigation.

## Localization / RTL / offline / performance handoff

Every instruction, control, unit, category, event, counter and error explanation needs **genuine** translations for all required textbook locales; English here is source-only editorial text, not a real translation bundle. Preserve numerical mathematics and chronological relations when adapting layout and RTL reading order. Avoid mirroring data values, fraction wholes or abstract cycle meaning. After future PWA content installation, the full interaction including all variants, explanations and assistive alternatives must function offline; prefer static/local lightweight assets and static alternatives for motion-sensitive learners.

## Engineer-facing constraints and test coverage (not implementation)

The coding specialist will own a self-contained component with no props, localized context data, co-located Scene-specific unit tests, appropriate deterministic fixtures, keyboard/screen-reader tests, RTL review and offline-device verification. Those files are not generated in this batch, and current availability of a generic `scene` Resource type does not imply this named Scene is registered.

## Approval boundary

This text is **provisional**. The Methodologist's Brief must be explicitly reviewed, and any scenario-level changes must be authorized by the Screenwriter before Scene engineering. No Question correctness engine, reward, assessment score, Note unlock, Program plot or runtime Lesson is created.
