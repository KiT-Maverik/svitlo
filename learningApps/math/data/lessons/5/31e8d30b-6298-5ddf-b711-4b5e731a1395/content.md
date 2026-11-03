# Equal Fractions, Different Pieces — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not formally approved.**
**Audience:** Grade 3 (approximately 8–9).
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skill:** [equivalentVisual.data.ts](../../../../data/skills/fractions/representation/skills/equivalentVisual.data.ts).
**Standalone:** No Program story, imported Quiz, scored Question, progress gate, runtime Lesson code or assembled locale bundle is created.

## Learner experience and teaching logic

Use aligned visual representations of the same-sized whole to demonstrate that different numerator/denominator pairs can cover the same fraction of a whole, especially 1/2 = 2/4 and 1/3 = 2/6.

Earlier Lessons established a reference whole, unit fractions, multiple equal parts and how the numerator/denominator are read. The visual conservation of amount follows directly before symbolic comparison or fraction arithmetic. The activity builds toward an explanation by the learner, not automatic mastery from making a choice. Two parallel, same-start bars with independently selectable partitions of one reference length (12 units) and shading presets 1/2, 2/4, 1/3, 2/6; all comparisons expose the shaded length and the selected-part count. A clearly labelled alternative 24-unit whole appears only for whole-dependence transfer.

**Scope boundary:** Defer simplification algorithms, multiplying numerator and denominator symbolically, all fraction arithmetic, common-denominator comparison and values above one. Describe the preserving relation conceptually; do not assume equivalence is established by looking at different-sized wholes.

The Sections below use the existing block types `text`, `markdown` and `scene`, arranged in one **vertical top-to-bottom column**. `EquivalentFractionStudio` is **proposed** and is not a registered/implemented Scene. There are no invented custom Resource discriminators or server APIs.

## Learning journey

1. **One whole, different cuts.** Show that equal absolute shaded length in equal-sized strips is conserved.
2. **What stays equal when parts change?.** Connect both numerator/denominator changes to the constant covered amount.
3. **A second pair—and a near miss.** Generalize to thirds/sixths while ruling out look-alike numerators.
4. **Why the whole must be clear.** Distinguish fraction equality from the area drawn on differently sized wholes.

## Section scripts (ordered Resources)

### Section 1: One whole, different cuts

**Purpose:** Show that equal absolute shaded length in equal-sized strips is conserved.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Here are two strips the same length. Shade one of two equal parts on the first. Shade two of four equal parts on the second. Will the shaded lengths match?”

2. **`scene` (existing Resource type; Scene proposed).** [EquivalentFractionStudio](./scenes/EquivalentFractionStudio.scene-spec.md). Two 12-unit aligned strips; top split 2×6 with 1 shaded, bottom split 4×3 with 2 shaded. Predict same/different, then place a movable but controlled alignment marker and reveal matched shaded length 6 units.

3. **`markdown` (existing Resource type).** “Yes. One of two equal parts covers the same amount as two of four equal parts. We write 1/2 = 2/4.”

**Learner's actual move:** Predict, shade by selecting preset fractional partitions, and inspect the matched shaded endpoints.

**Misconception-specific explanation:** For ‘2/4 must be bigger because two parts’: “Each quarter is smaller than each half. Two quarters together cover the same 6 of 12 units as one half.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 2: What stays equal when parts change?

**Purpose:** Connect both numerator/denominator changes to the constant covered amount.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “The same 12-unit strip can be cut into more, smaller equal pieces. Count the shaded units, not just the shaded pieces.”

2. **`scene` (existing Resource type; Scene proposed).** [EquivalentFractionStudio](./scenes/EquivalentFractionStudio.scene-spec.md). Toggle between 1/2 and 2/4 partition presets while keeping the same whole and the same 6-unit shaded segment. Display selected parts and total equal parts.

3. **`markdown` (existing Resource type).** “The piece count changes, but the portion of the whole does not. The denominator tells the number of equal pieces; the numerator tells how many are selected.”

**Learner's actual move:** Identify which quantities change and which remain constant; explain without using a new algorithm.

**Misconception-specific explanation:** For ‘the whole got larger’: “The strip is still 12 units long. Only the cuts and how many cut pieces are shaded changed.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 3: A second pair—and a near miss

**Purpose:** Generalize to thirds/sixths while ruling out look-alike numerators.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Try thirds and sixths. Is 1/3 equal to 2/6? Is 1/2 also equal to 2/6?”

2. **`scene` (existing Resource type; Scene proposed).** [EquivalentFractionStudio](./scenes/EquivalentFractionStudio.scene-spec.md). Same 12-unit reference: 1/3 shades 4 units; 2/6 shades 4; 1/2 shades 6. Choose pairs, compare aligned endpoints, reveal matched and unmatched numerical lengths.

3. **`markdown` (existing Resource type).** “1/3 = 2/6, because both cover 4 of 12 units. But 1/2 does not equal 2/6: it covers 6 units rather than 4.”

**Learner's actual move:** State one valid equivalence and one non-equivalence with evidence.

**Misconception-specific explanation:** For ‘1/2 = 2/6’: “Keep both wholes the same size: half reaches 6 units and two sixths reach only 4.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 4: Why the whole must be clear

**Purpose:** Distinguish fraction equality from the area drawn on differently sized wholes.

**Block sequence — a single column:**

1. **`markdown` (existing Resource type).** “What if one strip is 12 units and another is 24? Half of each is still one half—but the shaded lengths are 6 and 12. Are the fractions different?”

2. **`scene` (existing Resource type; Scene proposed).** [EquivalentFractionStudio](./scenes/EquivalentFractionStudio.scene-spec.md). Switch one display between same-sized and larger strips. The labels 1/2 and 2/4 remain equivalent as numbers; the shaded physical lengths no longer match if wholes differ. Require the model to name both reference wholes.

3. **`text` (existing Resource type).** “Equal fractions describe equal portions of their own wholes. To compare shaded lengths directly, choose the same-sized whole. A bigger whole can have a bigger half.”

**Learner's actual move:** Explain both fraction equivalence and the visual model's reference-whole condition without conflating them.

**Misconception-specific explanation:** For ‘the fractions stopped being equal’: “The fraction 1/2 is still equal to 2/4. Their drawn shaded lengths differ only because the wholes are different sizes.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

## Bespoke interactive Scene — provisional

- [EquivalentFractionStudio](./scenes/EquivalentFractionStudio.scene-spec.md) is a proposed **self-contained, prop-free** Scene. It owns only its local learning model and explanation state. It has no runtime implementation yet; if reused by multiple sections, each instance should maintain independent state.

## Independent transfer prompt

On two same-sized strips, show 1/3 and 2/6. State why these names are equal, and contrast 1/2 with 2/6 without relying on the symbols alone.

Learners should first predict or justify their thinking without copying the original example. Reveal a correct worked explanation only on request or after an attempt. This remains instruction, **not scored mastery assessment**.

## Proposed Lesson Note — product concept only

“Equivalent fractions cover the same part of a chosen whole: 1/2 = 2/4 and 1/3 = 2/6.”

**Editorial unlock proposal:** Make this cue available after the learner inspects the explicit misconception contrast in Section 3 and explains it. The Note entity, unlock API, offline notes persistence and automatic spaced review are not implemented by this content plan; the explanation stays available regardless.

## Source verification and content constraints

The canonical [equivalentVisual.data.ts](../../../../data/skills/fractions/representation/skills/equivalentVisual.data.ts) governs Skill meaning; its UUID, definition and multilingual translations are unchanged. With the identical 12-unit reference strip: 1/2 = 6 units, 2/4 = 6 units, 1/3 = 4 units, 2/6 = 4 units; 2/6 ≠ 1/2. Splits are equal size within each model. Side-by-side aligned strips have a common starting edge. Use counted lengths and accessible textual numeric comparisons as a full alternative to graphics.

All runtime copy requires complete, authentic translation into every configured locale; this English editorial script is _not_ runtime locale coverage. The proposed Scene's essential functions need nonvisual equivalence, mobile usability, semantic RTL, and offline availability. These are requirements for implementation review, not a declaration that they pass.

## Approvals and implementation boundary

**Methodologist approval pending. Screenwriter and Scene editorial approval pending.** Assessment Architect owns any Questions/Quiz, scoring and competency evidence. Coding Agent owns runtime Lesson/Scene, provider-free public Scene interface, localizations, tests and offline support. No scoring, Program content or runtime configuration is added.
