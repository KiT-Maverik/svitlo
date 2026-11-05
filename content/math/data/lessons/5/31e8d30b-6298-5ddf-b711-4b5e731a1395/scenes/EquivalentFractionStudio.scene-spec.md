# EquivalentFractionStudio — Screenwriter Scene Specification

**Status: Provisional Draft — Methodologist has not approved the Brief; Scene editorial review remains pending.**
**Lesson:** [Equal Fractions, Different Pieces Content](../content.md)
**Brief:** [Methodologist Draft](../methodologist-brief.md)
**Target Skill:** [equivalentVisual.data.ts](../../../../../data/skills/fractions/representation/skills/equivalentVisual.data.ts)
**Implementation:** Not built or registered

## Why this Scene needs to be interactive

Use aligned visual representations of the same-sized whole to demonstrate that different numerator/denominator pairs can cover the same fraction of a whole, especially 1/2 = 2/4 and 1/3 = 2/6.

Two parallel, same-start bars with independently selectable partitions of one reference length (12 units) and shading presets 1/2, 2/4, 1/3, 2/6; all comparisons expose the shaded length and the selected-part count. A clearly labelled alternative 24-unit whole appears only for whole-dependence transfer.

This is a pedagogical model whose learner-controlled state makes a mathematical or logical contrast visible. A static picture cannot equally expose prediction, changed conditions and the conceptual explanation. Do not turn it into reward/score mechanics or a mandatory graded Question.

## Mathematical content and source-of-truth conditions

With the identical 12-unit reference strip: 1/2 = 6 units, 2/4 = 6 units, 1/3 = 4 units, 2/6 = 4 units; 2/6 ≠ 1/2. Splits are equal size within each model. Side-by-side aligned strips have a common starting edge. Use counted lengths and accessible textual numeric comparisons as a full alternative to graphics.

**Hard limits:** Defer simplification algorithms, multiplying numerator and denominator symbolically, all fraction arithmetic, common-denominator comparison and values above one. Describe the preserving relation conceptually; do not assume equivalence is established by looking at different-sized wholes.

## Required observable states

| State              | Data or model facts                                      | Correct interpretation                                           |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------------------------- |
| Halves vs quarters | Two 12-unit strips: 1/2 shades 6 units, 2/4 shades 6.    | Equivalent fractions, same whole.                                |
| Thirds vs sixths   | Two 12-unit strips: 1/3 shades 4 units, 2/6 shades 4.    | Equivalent fractions, same whole.                                |
| Near miss          | 12-unit strips: 1/2 shades 6 units, 2/6 shades 4.        | Not equivalent.                                                  |
| Different wholes   | 12-unit strip 1/2 shades 6; 24-unit strip 2/4 shades 12. | Fractions remain equivalent, but absolute shaded lengths differ. |

## Required learning interaction

1. Present a fully specified initial state and ask a prediction in short child-facing copy; make the initial assumptions and labels inspectable before a decision.
2. Offer named, keyboard-operable controls that select a preset, a label or an explanatory reveal, matching the Section contexts without inventing new narrative or formal assessment.
3. Apply the action to a **deterministic**, locally owned, verifiable model. Announce the changed state with both an accessible text model and meaningful visual indication.
4. Show why the response matches or differs from the mathematical condition, including a counterexample; allow independent revisits, learner-controlled explanations, reveal and retry without scoring.
5. Expose Reset to the initial state. Keep all state local. The Scene root accepts **no props**; if separate Lesson Sections use it, state is fresh by instance, with no parent-provided chapter/mode/solution.
6. Provide an accessible independent-transfer route that hides the explanation initially but never makes it inaccessible.

## Exact misconception and explanation cases

- **One whole, different cuts:** For ‘2/4 must be bigger because two parts’: “Each quarter is smaller than each half. Two quarters together cover the same 6 of 12 units as one half.”
- **What stays equal when parts change?:** For ‘the whole got larger’: “The strip is still 12 units long. Only the cuts and how many cut pieces are shaded changed.”
- **A second pair—and a near miss:** For ‘1/2 = 2/6’: “Keep both wholes the same size: half reaches 6 units and two sixths reach only 4.”
- **Why the whole must be clear:** For ‘the fractions stopped being equal’: “The fraction 1/2 is still equal to 2/4. Their drawn shaded lengths differ only because the wholes are different sizes.”

## Nonvisual, motor and cognitive equivalence

Represent each bar as twelve numbered unit cells in an accessible selectable list. Speak/print ‘12-unit whole; 6 shaded’ versus ‘12-unit whole; 4 shaded’ and the exact fraction. Include same/different reasoning, not a picture-only equivalence judgement.

Do not rely on sound, color alone, animation, detailed drawing, drag precision, long reading, limited response time or knowledge of an English-only label. Give labels for all decision buttons; preserve focus and announce state without excessive live-region noise. Permit responsive larger text and clear logical navigation.

## Localization / RTL / offline / performance handoff

Every instruction, control, unit, category, event, counter and error explanation needs **genuine** translations for all required textbook locales; English here is source-only editorial text, not a real translation bundle. Preserve numerical mathematics and chronological relations when adapting layout and RTL reading order. Avoid mirroring data values, fraction wholes or abstract cycle meaning. After future PWA content installation, the full interaction including all variants, explanations and assistive alternatives must function offline; prefer static/local lightweight assets and static alternatives for motion-sensitive learners.

## Engineer-facing constraints and test coverage (not implementation)

The coding specialist will own a self-contained component with no props, localized context data, co-located Scene-specific unit tests, appropriate deterministic fixtures, keyboard/screen-reader tests, RTL review and offline-device verification. Those files are not generated in this batch, and current availability of a generic `scene` Resource type does not imply this named Scene is registered.

## Approval boundary

This text is **provisional**. The Methodologist's Brief must be explicitly reviewed, and any scenario-level changes must be authorized by the Screenwriter before Scene engineering. No Question correctness engine, reward, assessment score, Note unlock, Program plot or runtime Lesson is created.
