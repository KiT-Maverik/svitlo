# Read the Mass on a Graduated Scale — Methodologist Brief

Date: 2026-10-31
Lesson slug: readingMassScale
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Advance from a qualitative **equal-arm balance comparison** to reporting a **numerical mass with a unit** by reading an explicitly calibrated graduated scale. The learner must infer the value of equal divisions, understand between-mark values and include **g** in the result. Scale reading is distinct from comparing which pan went down.

## Target audience

**Primary audience: Grade 3, approximately ages 8–9.** Grade 3 (approximately 8–9), learners who know 0–600 in hundreds and have counted equal intervals on a ruler. Any analog pointer is supplemented by exact ordered tick descriptions and selectable numeric labels; no real heavy object, precision dragging, compulsory equipment or sighted response required.

## Prerequisites

- [compareMass.data.ts](../../../../data/skills/measurement/mass/skills/compareMass.data.ts): compare masses qualitatively by a fair equal-arm balance, without expecting numerical units.
- [useRuler.data.ts](../../../../data/skills/measurement/length/skills/useRuler.data.ts): read evenly spaced calibration marks and count intervals rather than tick labels. Recognize 0, 100, 200, …, 600 and the halfway interval to 50.

## Target Skills

- [weighObject.data.ts](../../../../data/skills/measurement/mass/skills/weighObject.data.ts)

## Expected learning outcomes

- Read a simple **gram-calibrated** mass scale with equal 100 g major divisions and recognize an unlabeled midpoint as **50 g** above the previous major mark.
- Report mass readings of **200 g**, **350 g**, or **450 g** with the **gram (g)** unit, not merely a bare number or a label from the wrong mark.
- Identify a misplaced zero/tare as a source of invalid reading and describe resetting an empty scale to zero **before** placing the object.
- Explain that the same numerical object mass is preserved when a display changes its decorative appearance or a scale is read in another orientation, assuming correct calibration, and distinguish numerical mass measurement from the earlier heavier/lighter balance comparison.

## Essential subject matter

A schematic **mass scale calibrated in grams** (g) has equal major tick marks 0,100,200,300,400,500,600 g, separated by **100 g** each, with a single **50 g** minor tick midway between each pair. If the pointer is at 350 g (midway between 300 and 400), report **350 g**, not 300, 400, 3.5 or 350 with no unit. If at 450 g, report **450 g**. The scale should read 0 g with the empty weighing surface (**tare/zeroed**) before an object is placed; if an empty scale already reads 100 g, its uncorrected reading under load cannot be trusted as the object's mass. A digital 350 g readout can confirm the same result but must not bypass understanding graduated tick intervals. In physical devices the force/weight response may be calibrated to _display mass_ under specified conditions; the children's model does not claim universal gravity-free direct mass sensing. The lower pan of a separate equal-arm balance showed **relative** mass, not a measured number; no instrument is presumed physically accurate from rendered pixels.

## Conceptual progression and dependencies

Begin with a fair balance that says only which object has more mass. Introduce a numeric graduated display with clearly labeled **g** and a visible empty zero state. Read 200 g at a major tick, then inspect the 300–400 gap and discover a 50 g halfway tick, yielding 350 g. Show a 450 g example with a new pointer placement; use an optional digital readout only **after** a scale-based prediction. Expose an empty display incorrectly sitting at 100 g and ask for a tare/reset before trusting any object's mass. End with an independent labeled 550 g reading and a full number-and-unit explanation.

## Misconceptions, examples and boundaries

One pointer step always means 1 g; only printed major labels can be read; midpoint 300–400 is 305 or 400; a larger drawn dial means a heavier item; empty scale nonzero reading may be ignored; reporting 350 without units is a valid measurement; the scale reads the object's container-plus-object mass after tare without considering setup; digital output makes the underlying unit irrelevant.

**Instructional depth / explicit exclusions:** Schematic gram-calibrated mass scale with 0–600 g major 100 g ticks and one midpoint per interval, **whole tens/hundreds only** (multiples of 50), zero/tare check; no kilograms-to-grams conversion, complex analog dial angles, density, force equations, center of gravity, real instruments or mass at other gravitational fields. These are **Lesson boundaries**; the canonical Skill object remains grade-neutral and unchanged.

## Localization, accessibility and offline intent

Every learner-visible prompt, feedback, dynamic state description, diagram label, ruler/scale symbol, unit expression, alt description, optional transcript and proposed recall Note requires authentic localization into **every supported textbook locale**, with **no silent English fallback or placeholder translation**. Reading direction can change layout but must never change the invariant square-cell area, rigid-piece count, one-liter measure or scale tick values. For nonvisual learners provide a complete meaningful ordered list of the model's unit cells, pieces, pours or graduation marks. Each manipulation must be operable via touch, keyboard/switch and appropriately labeled controls without precision dragging. Use WCAG 2.2 AA targets/contrast/focus, understandable low-reading-load copy, accessible text scaling, reduced motion, equivalent low-end performance and complete post-download offline activity. These are design requirements, **not existing infrastructure claims**.

## Sources and factual verification

- [weighObject.data.ts](../../../../data/skills/measurement/mass/skills/weighObject.data.ts) — canonical Mathematics Skill source from `learningApps/math/`; copied byte-for-byte (UUID, multilingual data, methodological description unchanged) into this textbook's local Skill tree.
- [Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [separate editorial artifact policy](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity definition](../../../../../../studio/docs/entities/lesson.md) — editorial roles, Program-neutral scope and approval boundaries.
- [Playground generated taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — **stale for newly transferred Skills** until coordinator integration/regeneration; the canonical source files above, not this view, are the identity authority.

Mathematical/measurement illustrative cases must be reviewed against the exact Skill definition; no country-specific curriculum was assigned and no external instrument calibration has been verified.

## Curriculum / Program compatibility

No national Program or Curriculum specified. The Lesson is independently usable and may be sequenced differently by future Programs. Grade 3 denotes bounded **pedagogical depth**, not a modification to the global Skill's definition.

## Open editorial decisions

- Editor: approve Grade 3 handling of 50 g midpoint subdivisions and the explicit caveat that a schematic scale is **calibrated to display mass in grams** rather than literally measuring mass from onscreen pixel positions.
- **Methodologist approval required:** This Brief is Draft. Associated `content.md` and `scenes/*.scene-spec.md` in this batch are **provisional screenwriter drafts**, prepared under user batch authorization ahead of formal Brief approval. They must be revised if this Brief changes.

## Methodologist handoff

Review prerequisites, mathematical examples, misconceptions and audience demands before any explicit Approved status. The Screenwriter owns the provisional Section experience; future approved Scene Designer work must remain within it. Assessment Architect separately owns any Question, Quiz, grading and evidence model. No React Scene, runtime Lesson config, published locale content, Note persistence or generated registries is included.
