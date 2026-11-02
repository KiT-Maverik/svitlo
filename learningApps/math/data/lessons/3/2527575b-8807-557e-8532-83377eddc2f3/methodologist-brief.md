# Which Container Holds More? — Methodologist Brief

Date: 2026-10-31
Lesson slug: comparingContainerCapacity
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Explain **capacity** as the maximum a container can hold, distinct from the amount currently inside. Children investigate why a tall, narrow container may hold less than a shorter, wider one, and compare capacities fairly by transferring contents or repeatedly using the **same** scoop.

## Target audience

**Grade 1 (approximately ages 6–7).** Grade 1 children (ages 6–7) familiar with cups/containers and more/less/equal. All operations are virtual and controllable by buttons, with a complete verbal ledger; water play in real life is optional, never required, and does not involve pouring boiling or hazardous liquids.

## Prerequisites

Understand full/empty and **more/less/same**, compare small counts to six, and follow a simple cause-and-effect sequence ('fill', 'pour', 'what remains'). No reading liters, milliliters, volume formulas, or familiarity with the physical width-versus-height tradeoff is required; the Lesson establishes it.

## Target Skills

- [capacityConcept.data.ts](../../../../data/skills/measurement/capacity/skills/capacityConcept.data.ts)

## Expected learning outcomes

- Explain **capacity** as the amount a container can hold when filled to its designated **full mark**, not merely its current fill level.
- Compare two differently shaped containers using a **fair transfer of a filled amount** or **identical scoop units**, determining which has greater capacity even when heights mislead.
- Explain why a short wide container may hold **more** than a taller narrow one, and why height or color alone is not enough evidence.
- Recognize and correct invalid comparisons made with partly filled starting containers or scoops of different sizes, and identify an equal-capacity pair with different shapes.

## Essential subject matter

**Capacity** is the **maximum** volume a particular container can hold under consistent conditions, here its modeled fill line. An **empty** container still has capacity; current contents are a different quantity. Use a fair virtual comparison with identical scoop size and no spills: tall narrow container A holds **4 model scoops**, short wide B holds **6 of the same scoops**. Fill A to its full mark, then transfer its 4 scoops into **empty B**: B has room for 2 more, so B capacity > A. Conversely, fill B to 6, transfer into empty A without spilling: A becomes full after 4, and **2 scoops remain in B**, so again B has greater capacity. Two other differently shaped containers can each hold **5** identical scoops and therefore have equal capacities. On a transfer comparison the initial container must really be full and the recipient empty; otherwise remaining room/leftover cannot directly establish which **full capacity** is larger. Do not compare count of scoops if scoop sizes differ. This is a discrete explanatory simulation, **not a calibrated fluid-volume solver** or a claim that screen pixels measure physical liters.

## Conceptual progression and dependencies

Start with A tall narrow/B short wide, invite height-based prediction but explicitly say it is uncertain. Reveal identical-scoop fill behavior and ask children to update the prediction. Next compare by transferring a full A to empty B and observing B's spare space, then repeat the reverse direction and inspect what remains; explain both as evidence about maximum capacity. Contrasting different-shaped **equal-capacity** containers proves appearance is unreliable. End with a deliberately unfair comparison—one source only half full or two different scoops—and ask for a fair test before giving a capacity claim.

## Misconceptions, examples and boundaries

Taller means greater capacity; currently empty means zero capacity; current fill level equals maximum capacity; two cups at different fill levels show which container holds more; using one large scoop for A and one small scoop for B yields comparable numbers; after 6→4 transfer the extra 2 must disappear or 'spill' without being accounted for; equal capacity requires equal shape.

**Depth exclusions:** Small virtual containers, discrete complete scoop counts 4–6 of an **identical** modeled volume, virtual fill/transfer with no spill, no fractional scoops, real fluid dynamics or liquid shape prediction, liters/mL conversions, density, heat, pressure, arbitrary uneven container calibration, or actual household handling. Do not equate mass with capacity; this is independent of the mass Lesson. These boundaries govern a **Lesson**, not the grade-independent canonical Skill definition.

## Localization, accessibility and offline intent

Authentically localize every future learner-facing prompt, explanation, feedback message, geometry/measurement term, numerical description, accessible name, optional sound transcript, Scene control and recall Note in the supported locale set. No fake translations or English text fallbacks. Adopt meaning-preserving LTR/RTL: changing reading direction must never silently invert geometric surface structure, left/right pan behavior, amount ordering or 3D/2D membership. Use keyboard/switch-operable controls and complete nonvisual text-ledger alternatives; visual rotation or pouring effects are optional enhancements, never the only way to understand. Favor small controllable steps, reduced-motion versions, large mobile targets, visible focus, WCAG 2.2 AA and identical learning outcomes on weak devices. All essential model data, localized copy, Scene assets and explanations must be **downloadable for full offline use**; this is a product goal, not verified runtime support. If a later design cannot supply equivalent nonvisual/low-end modes, surface that as an editorial blocker, not a silent simplification.

## Sources and factual verification

- [capacityConcept.data.ts](../../../../data/skills/measurement/capacity/skills/capacityConcept.data.ts) — canonical source migrated verbatim from Mathematics `main`, including UUID, translations and methodological description.
- [Methodologist Persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) — governing editorial scope, autonomy and approval.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) — a **coordinator-owned generated view** that has **not been regenerated** to include these pending Skill imports. Canonical `*.data.ts` source files above are the verified sources.

The examples are pedagogically simplified as specifically described; they make no national Curriculum alignment or experimental instructional-effectiveness claims.

## Curriculum / Program compatibility

No Program or national Curriculum has been assigned. The Lesson is independently coherent and may be referenced by future Programs. Grade 1 is a provisional **lesson-audience choice**, never a change to the taxonomy or new Skill assessment level.

## Open editorial decisions

- Editor to approve the discrete equal-scoop model and a no-spill transfer representation, with fairness made explicit. Exact container silhouette may be simplified but must not imply false real-world fluid behavior; capacity labels stay conceptual, not absolute liters.
- **Explicit approval still required.** This Methodologist Brief is **Draft**. The accompanying Content and custom Scene specification are **Provisional Drafts** prepared under the user's batch-level authorization, not formally approved under the Studio's standard handoff gate.

## Methodologist handoff

Editor/Methodologist reviews learning depth, prerequisite accuracy, conceptual definition, examples and accessibility equivalence. Screenwriter may review and revise provisional Content and Scene documents, but they must not be treated as approved source for Coding Agent implementation before sign-off. Questions, Quizzes, scoring, analytics, full translation production, local persistence, Notes unlocking and runtime Lesson configuration are outside this batch.
