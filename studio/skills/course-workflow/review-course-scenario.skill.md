# Review Course Scenario

**Role:** Independent Course scenario reviewer with educational screenwriting expertise. Read the [Educational Screenwriter Persona](../../personas/educational-screenwriter.persona.md), the [Course entity](../../docs/entities/course.md), [Course Workflow](./README.md), [Course Lesson Overrides](./course-overrides.md), applicable `AGENTS.md` and current authored contracts before reviewing. The reviewer **must not be the author of the Course scenario being reviewed**.

## When this review applies

Run this specialist review **only when a Course actually has an authored scenario layer** (Episodes, story-based transitions, Course-owned Sections/ContentBlocks, or scenario/event overlays). A Course without a scenario does not need a fictitious scenario review or empty report. `scenarioMode: 'story'` signals intent, **not** proof that scenario assets exist or are approved. If the planned narrative is missing, mark the scenario gate blocked rather than passing an absent source.

This is an independent review of Course-specific integration, not a rewrite of standalone Lessons. It comes after the relevant Course screenwriting work and before authorization to generate the final composed Course; the methodological review is independent but must consider accepted scenario changes.

## Required sources

For the selected exact Course UUID under `content/<book>/data/courses/<bucket>/<courseId>/`, inspect:

- Approved Course `methodology.md`, the current `toc.yaml` with resolved Lesson slots and actual Lesson configuration for every affected slot.
- The current authored Course story/episode/scene specifications and **existing** Course-owned TS sources, plus their editorial approvals. Do not invent a nonexistent Course Screenwriting skill or imply that story authoring is implemented by this review.
- `overrides.yaml` when present, including the origin/rationale for scenario changes in linked editorial artifacts; inspect applicable Section and ContentBlock slugs and original Lesson Data.
- Existing independent Lesson reviews or approval links when a Course change would alter their educational content.

If original Lesson Data, an applicable scene specification or a required approval is missing, record a precise blocker. Never assume that `toc.yaml` alone supplies runtime Section slugs or Lesson parameters.

## Review criteria

1. **Narrative coherence:** Episodes, transitions, characters, actions and state/event expectations remain consistent across Course/Module/Chapter/Lesson boundaries, without continuity gaps.
2. **Learning integration:** the story reinforces, rather than replaces or distorts, the approved learning outcomes; pacing, agency, cognitive load, engagement and feedback remain appropriate.
3. **Source ownership:** standalone Lessons work without the Course narrative. Course-owned additions and sparse overrides do not copy or mutate Lesson sources. All replacements and new Sections/blocks have separately approved author-owned sources.
4. **Override compatibility:** every proposed scenario override has a clear narrative purpose and applies to a real Lesson slot/Section/block; identify conflicts with methodological constraints rather than silently removing them. Check ordering, events, slug references and source paths against the [approved overrides contract](./course-overrides.schema.json).
5. **Accessibility and localization:** meaningful nonvisual alternatives, captions/transcripts, keyboard/touch paths, reduced-motion behavior and correct locale/RTL semantics are planned; no hidden story dependency makes an outcome inaccessible.
6. **Implementation truthfulness:** distinguish implemented Course-owned resources from proposed Scenes/behavior. Missing assets, runtime support or approval must remain visible blockers, not fabricated output.

## Output and review gate

Write or update `scenario-review.md` beside the Course `toc.yaml` with: Course UUID, reviewer role, date, the **exact Git commit/blob revisions** of `methodology.md`, `toc.yaml`, `overrides.yaml` (or explicit absence), and scenario source files; verdict `pass | changes-requested | blocked`; evidence by episode/slot/Section/block; issues with severity, owner and concrete correction; accessibility and narrative continuity findings; required re-review/sign-off.

A `pass` is a recommendation **only**. An authorized editor must sign off against the reviewed source revisions. Return story or Course-owned content edits to their authors rather than independently writing and approving them. A change to the story or any scenario-affecting override after a `pass` invalidates affected review evidence and requires a focused re-review. A subsequent Methodological Review may run independently, but it cannot declare the scenario gate approved or override the scenario author's decisions.

**Boundary:** Do not create or translate Course narrative, standalone Lessons, Question banks, typed Course configuration or output from the Course Builder. Use an appropriately labeled Draft PR and link the Course's coordination Issue when one exists; do not auto-merge.


## Quest Section in Course-owned Episode scenarios

Consult [Quest](../../docs/entities/quest.md) when an Episode proposes a branching interactive mission. Evaluate story consequences, safe recovery from failed tasks, pedagogical usefulness, exact Stage/Task branch responsibilities and alternatives for deaf, blind, motor-impaired and reduced-motion learners. A Quest is a Section in an Episode, not an Episode replacement. Its Engine Build contract does not yet mean runtime support, so document the player/Section integration dependency before approving a playable scenario.
