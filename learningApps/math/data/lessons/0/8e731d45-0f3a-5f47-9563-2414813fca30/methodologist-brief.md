# One Liter at a Time — Methodologist Brief

Date: 2026-10-31
Lesson slug: measuringCapacityInLiters
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Extend the earlier comparison of **how much a container can hold** into a standard capacity unit: one **liter**. Use a known one-liter reference to estimate and then measure target capacities by counting repeated identical full-liter portions. Container shape can mislead; a fair numerical answer requires a consistent unit and actual full-volume comparison.

## Target audience

**Primary audience: Grade 2, approximately ages 7–8.** Grade 2 (approximately 7–8), comfortable counting to six and differentiating an empty container's capacity from its current contents. The learner uses a virtual full-liter measure and explicit count steps; no real liquid, physical lifting, precise pouring, vision or pointer dragging is mandatory.

## Prerequisites

- [capacityConcept.data.ts](../../../../data/skills/measurement/capacity/skills/capacityConcept.data.ts): capacity is maximum volume a container can hold; compare containers by identical scoops or a full-to-empty fair transfer.
- Count 1–6 identical units, understand full/empty and distinguish a marked reference cup's **one-liter capacity** from the amount it currently contains.

## Target Skills

- [liter.data.ts](../../../../data/skills/measurement/capacity/skills/liter.data.ts)

## Expected learning outcomes

- Identify **1 liter (1 L)** as one named standard unit of volume/capacity, separate from a container's height or mass.
- Use a full, fixed **1 L reference** repeatedly with no losses/overlap to determine that a container filled by exactly three portions has **capacity 3 L**.
- Make a reasoned approximate estimate from a one-liter reference **before measuring**, compare the estimate with the final whole-liter result, and report both values with the unit L.
- Explain why different shapes can hold the same liters, why a half-full reference cup does not count as 1 L poured, and why using two unequally sized scoops gives an invalid comparison.

## Essential subject matter

One **liter (L)** is a standard unit of **volume**, often used for container capacity. A reference vessel marked **1 L** holds exactly one liter when correctly filled to its calibrated line. To measure capacity of a fixed target, start with the target empty, repeatedly empty exactly one **full 1 L** reference into it, and count portions while avoiding spill/loss. A model **3 L** container holds precisely three complete one-liter portions, irrespective of its short-wide/tall-narrow picture. A **2 L** and **4 L** capacity can similarly be compared by exact full-liter pours. Repeating three half-full portions does **not** provide three liters; each half-full reference portion contributes **less than one liter**. The current amount can be 0 L in an empty container while its capacity remains e.g. 3 L. Two full containers of different appearance may both be 3 L. A visual one-liter benchmark is a **calibrated label within the simulation**, not a claim of device-measured real volume; don't compute liquid flow from pixel heights, and don't silently equate weight to capacity.

## Conceptual progression and dependencies

Revisit the capacity comparison without numerical labels: tall and short containers can hold different amounts. Present a sealed/fixed _reference_ model labeled 1 L (the amount when filled to its marked line). Invite a rough estimate 'about 2 L, 3 L or 4 L' for a known-looking target before pouring. Repeatedly empty a **full 1 L** portion into the empty 3 L target; after the third it reaches full, 3 L. Contrast two differently shaped 3 L containers. Test unfair measurement with a half-full reference, then transfer to an unfamiliar 4 L target with prediction first and complete counts afterward.

## Misconceptions, examples and boundaries

A liter is a weight; a 1 L cup contains 1 L even when half-full; a taller-looking container must hold more; liquid height is linearly proportional to volume in arbitrary shaped containers; one pour counts as 1 L regardless of the source's fill level; a capacity label equals current contents; three pours from different-sized references are comparable.

**Instructional depth / explicit exclusions:** Virtual exact whole-liter capacities **1–5 L** and exactly full 1 L increments; limited learner estimates before reveal; no real fluid simulation, liquid density, liters-to-milliliters conversion, half-liter quantitative calculations, physical calibration or unit conversion. Unfair partial pour is recognized **qualitatively**, not measured in fractions. These are **Lesson boundaries**; the canonical Skill object remains grade-neutral and unchanged.

## Localization, accessibility and offline intent

Every learner-visible prompt, feedback, dynamic state description, diagram label, ruler/scale symbol, unit expression, alt description, optional transcript and proposed recall Note requires authentic localization into **every supported textbook locale**, with **no silent English fallback or placeholder translation**. Reading direction can change layout but must never change the invariant square-cell area, rigid-piece count, one-liter measure or scale tick values. For nonvisual learners provide a complete meaningful ordered list of the model's unit cells, pieces, pours or graduation marks. Each manipulation must be operable via touch, keyboard/switch and appropriately labeled controls without precision dragging. Use WCAG 2.2 AA targets/contrast/focus, understandable low-reading-load copy, accessible text scaling, reduced motion, equivalent low-end performance and complete post-download offline activity. These are design requirements, **not existing infrastructure claims**.

## Sources and factual verification

- [liter.data.ts](../../../../data/skills/measurement/capacity/skills/liter.data.ts) — canonical Mathematics Skill source from `learningApps/math/`; copied byte-for-byte (UUID, multilingual data, methodological description unchanged) into this textbook's local Skill tree.
- [Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [separate editorial artifact policy](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity definition](../../../../../../studio/docs/entities/lesson.md) — editorial roles, Program-neutral scope and approval boundaries.
- [Playground generated taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — **stale for newly transferred Skills** until coordinator integration/regeneration; the canonical source files above, not this view, are the identity authority.

Mathematical/measurement illustrative cases must be reviewed against the exact Skill definition; no country-specific curriculum was assigned and no external instrument calibration has been verified.

## Curriculum / Program compatibility

No national Program or Curriculum specified. The Lesson is independently usable and may be sequenced differently by future Programs. Grade 2 denotes bounded **pedagogical depth**, not a modification to the global Skill's definition.

## Open editorial decisions

- Editor: confirm simulation clearly labels full reference vessel as calibrated exactly one liter and makes shape representation consistent with the data; avoid misleading pixel-height-to-liter assumptions.
- **Methodologist approval required:** This Brief is Draft. Associated `content.md` and `scenes/*.scene-spec.md` in this batch are **provisional screenwriter drafts**, prepared under user batch authorization ahead of formal Brief approval. They must be revised if this Brief changes.

## Methodologist handoff

Review prerequisites, mathematical examples, misconceptions and audience demands before any explicit Approved status. The Screenwriter owns the provisional Section experience; future approved Scene Designer work must remain within it. Assessment Architect separately owns any Question, Quiz, grading and evidence model. No React Scene, runtime Lesson config, published locale content, Note persistence or generated registries is included.
