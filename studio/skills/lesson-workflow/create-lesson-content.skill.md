# Create Lesson Content Skill

**Mandatory first action:** Read [Educational Screenwriter Persona](../../personas/educational-screenwriter.persona.md) **in full**, then follow this task-specific workflow. This is a **Lesson content/specification authoring task**, **not** application implementation. The persona owns the creative/pedagogical presentation; this Skill defines required inputs, actual platform contracts, deliverables, editorial gates and handoffs.

**Mission:** Transform an **approved Methodologist Brief** of a specifically selected Lesson into a factual, audience-native, rich, **Program-neutral Lesson Content**: an editorial plan of ordered, typed Sections and content blocks, with separate Scene specifications when bespoke Scenes are needed. Refer to [Lesson](../../docs/entities/lesson.md), [Lesson Content](../../docs/entities/lesson-content.md), [Section](../../docs/entities/section.md) and [Program](../../docs/entities/program.md) for authoritative entity boundaries; do not duplicate their definitions in this Skill. [Design Scene](../design-scene.skill.md) implements approved Scene specifications later.

The Lesson must **teach, illustrate, invite prediction and meaningful action, explain results, and support understanding/transfer** as the subject requires. Reject the default pattern of a long Markdown lecture followed by a token quiz. Do **not** force a fixed recipe or gratuitous activity quota: the best experience is the simplest one that makes the particular learning goal clear and memorable.

## USER-DEFINED WORK SCOPE

This Skill works on **existing Lesson directories selected or identified by the user**, not arbitrary new Lesson topics.

- If the user names a textbook, directory, one Lesson, several Lessons or another unambiguous natural-language selection, resolve the exact existing directories under `<PackageRoot>/data/lessons/<bucket>/<uuid>/`. Read those folders; **do not ask the user to repeat already clear scope**.
- The user may also ask to **find Lessons with a Methodologist Brief / methodology outline but no `content.md`**. Inspect the specified textbook or subtree across UUID buckets, recognizing `methodology.md`, `methodologist-brief.md` and verifiable legacy methodical filenames. Treat `content.md` as the canonical Lesson Content filename; inspect legacy `script.md`, `*.lesson-script.md`, and other existing authored content documents before calling a Lesson missing authored Lesson Content. A legacy file is not an instruction to overwrite or silently duplicate it. Report the matching Lesson paths and methodical approval states. **Discovery alone does not authorize authoring Lesson Content**.
- If the user has not identified any textbook/Lesson/search scope, ask **which Lesson(s) or textbook/folder** to work with. Do not choose Playground or random Lessons as a substitute.
- For multiple explicitly assigned Lessons, read and audit each Brief independently, preserve each Lesson's folder/bucket, write **one `content.md` per approved Lesson**, and report blocked/unapproved Lessons rather than silently skipping them or applying one Brief to another.
- Do not create a Lesson folder, move Lessons between buckets, change a Lesson's camelCase slug, or write `content.md` for unspecified Lessons. Revisions edit the existing `content.md` in place after reviewing it.

## NON-NEGOTIABLE START CONDITIONS

**Do not author `content.md` until the following are verified:**

1. **Approved Methodologist input in each chosen Lesson directory:** read `methodology.md` or legacy `methodologist-brief.md` with `Methodologist status: Approved`, or an explicitly verified, editor-approved legacy methodology outline with equivalent substance. Confirm target outcomes, factual content/sources, audience, prerequisites, **the direct canonical `*.data.ts` links in the Brief's Target Skills list (complete filenames as link labels)** and restrictions. Confirm that every relative link structurally targets the **planned `<PackageRoot>/Data/skills/` tree**, not `src/`, and its label matches the target `.data.ts` filename. If the destination does not yet exist because Skills migration is pending, **report the unresolved link explicitly**, consult the approved Skill semantics from currently available canonical/staging sources, and do not claim the future file exists. Do not replace the approved Skill set with inferred descriptions, generated-taxonomy links or invented locations. A draft, a Curriculum label or the folder slug alone is **not enough**. If missing/unapproved, stop authoring for that Lesson and report the blocker; do not create or approve the Brief on the Screenwriter's behalf.
2. **Selected Lesson folder and context:** identify the standalone textbook package root (`<PackageRoot>`), actual UUID Lesson folder, intended output language and learner profile. The user determines the scope. The `content.md` file is stored **beside the Brief**, never in `studio/` or an automatically chosen Playground directory.
3. **Read relevant architecture:** all [Svitlo Architecture & Product Principles](../../docs/architecture/README.md), particularly the [Learning Philosophy](../../docs/architecture/learning-experience-philosophy.md), [Notes concept](../../docs/architecture/lesson-notes.md), [Localization & Accessibility](../../docs/architecture/internationalization-and-accessibility.md) and [Offline/Device Compatibility](../../docs/architecture/offline-first-and-device-compatibility.md). Also read [Roles Proposition](../../Roles%20Proposition.md), [Long Chat Overture](../../Long%20Chat%20Overture.md), the current code contracts/renderers below, applicable `AGENTS.md` and local instructions. Historical concepts are design intent, not evidence of already implemented APIs.
4. **Inspect existing lesson content:** read any applicable existing Lesson, Section, Question, Scene, content-resource and accessibility/localization patterns in the selected app, plus useful reference demonstrations in `content/playground`. Verify the _present_ implementation before authoring platform-specific specifications.
5. **Editorial integrity:** where the Methodologist input conflicts with reliable facts, is ambiguous, or presupposes nonexistent assessment behavior, **report the exact blocker and proposed clarification**. Do not silently change competencies, learning goals or scoring rules.

## 1. ENTITY MODEL AND TYPED CONTENT

**Mandatory reading:** [Lesson](../../docs/entities/lesson.md), [Lesson Content](../../docs/entities/lesson-content.md), [Section](../../docs/entities/section.md), [Program](../../docs/entities/program.md). These focused documents define autonomy, Program-neutrality, independent methodology/Content ownership, Section purposes, verified types and the single-column ordering invariant.

- **Actual Section contract:** `LessonSection_Content = LessonSection_Config | Quiz_Config`; `LessonSection_Config.content` is a **nonempty ordered Resource array**. A Quiz is a distinct section-like assessment config, **not** a normal resource-column Section. See [Section](../../docs/entities/section.md) for examples of Theory, Practice, interactive activity, flashcards, coding and kids' block-based coding **pedagogical purposes**, which are _not_ currently separate TypeScript Section discriminants.
- **Actual Resource contract:** generic Section blocks are discriminated by `Resource_Config.blockType`. Every block in the authored Lesson Content plan must name an existing `blockType` or be unambiguously labeled **proposed**; a UI widget or Question type is not automatically a Resource type.
- **Binding layout invariant:** a general Section is a **single vertical column of content blocks in specified top-to-bottom order**. Never propose arbitrary side-by-side sibling Resources. One custom Scene block can internally use flexible 2D/3D layouts without changing the outer Section order.
- **No Program plot inside Lesson material:** the Lesson's explanatory pacing, prediction, interaction and reveal are pedagogical sequencing; Program characters, quests, missions and rewards are external. An independently authored Lesson must teach coherently with no Program attached.
- **No fixed Section recipe:** choose as many/few Sections as necessary to meet approved outcomes. `Theory → Practice → Flashcards → Quiz` is an example of _purposes_, not an implemented universal type list or prescribed sequence.

## 2. MANDATORY SOURCE CODE RECONNAISSANCE

The following are **direct links to the current repository's source of truth**. Read the actual files before describing platform support; type sets and renderers can diverge.

| Source                                                                                                                                                                                                            | What the Screenwriter must learn                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Lesson and Section contracts](../../../shared/contracts/src/types/content/lesson.types.ts)                                                                                                                       | Canonical `Lesson_Config`, `LessonSection_Config`, `LessonSection_Content`, `sceneLocales`, ordered content and `LessonState`; conceptual Section purposes live in [Section](../../docs/entities/section.md) |
| [Typed content resource contracts](../../../shared/contracts/src/types/content/resource.types.ts)                                                                                                                 | `Resource_Type`, `Resource_Config` discriminated union, block-specific fields and `SceneResource_Config`                                                                                                     |
| [Quiz contracts](../../../shared/contracts/src/types/content/quiz.types.ts)                                                                                                                                       | `Quiz_Config`, intro/results settings, progress/answer state and what belongs to assessment                                                                                                                  |
| [Question contracts](../../../shared/contracts/src/types/content/question.types.ts)                                                                                                                               | `QuestionType`, Question content, flashcard association, accessibility restrictions; **declared types are not proof of implemented lesson widgets**                                                          |
| [Actual Lesson Section renderer](../../../content/playground/src/components/pages/Lesson/LessonSectionContent/LessonSectionContent.tsx)                                                                           | Which `blockType` values can actually render in a generic Section **today**                                                                                                                                  |
| [Actual Lesson assembly](../../../content/playground/src/components/pages/Lesson/Lesson.tsx)                                                                                                                      | Current `Lesson` composition, providers and navigation assumptions                                                                                                                                           |
| [Lesson → Question widget adapter](../../../content/playground/src/components/pages/Lesson/adapters/toQuestionWidgets.ts)                                                                                         | Which Question kind this Lesson UI currently renders                                                                                                                                                         |
| [Live lesson example](../../../content/playground/src/data/howLightMoves/howLightMoves.data.ts)                                                                                                                   | Actual ordering and Lesson-level `sceneLocales` wiring                                                                                                                                                       |
| [Theory Section](../../../content/playground/src/data/howLightMoves/sections/theory/theory.data.ts) and [Practice Section](../../../content/playground/src/data/howLightMoves/sections/practice/practice.data.ts) | Mixed ordered resources and interactive scenes                                                                                                                                                               |
| [Example Quiz Section](../../../content/playground/src/data/howLightMoves/sections/quiz/quiz.data.ts)                                                                                                             | Distinct Quiz structure and current question integration                                                                                                                                                     |
| [Scene Designer workflow](../design-scene.skill.md)                                                                                                                                                               | Separate handoff contract for fully specified, prop-free, localized and LTR/RTL-aware custom Scenes                                                                                                          |

### Current resource and rendering capability map — VERIFY AGAINST CODE

**Important: the types below are what the engine declares; not a promise that every block works in the current Lesson renderer.**

| `Resource_Type` | What it can describe pedagogically                                                                                       | Current technical boundary                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`          | Short instructions, prompts, labels, explanations and localized prose                                                    | Typed config **and currently handled by the generic Section renderer**                                                                                                  |
| `markdown`      | Structured explanation, formulas, tables, readable long-form content and links                                           | Typed config **and currently rendered**; do not let it replace needed models/practice                                                                                   |
| `scene`         | Bespoke animated/interactive simulations, SVG diagrams, playable manipulatives, dynamic explorations, guided interaction | Typed config **and currently rendered** as a React element; implementation requires a **separate Scene specification**                                                  |
| `code`          | Localized code snippets/resources; potential future runnable editors, visualized algorithms or code challenges           | **Typed resource/builder available; generic Section renderer does not currently handle this block type.** Executable challenges need separately verified infrastructure |
| `image`         | Illustrations, graphs, maps, diagrams, visual evidence                                                                   | **Typed resource/builder available; generic Section renderer does not currently handle it**; other widgets may have image support                                       |
| `audio`         | Speech, narrated explanation, sound comparison, audio experiments                                                        | **Typed resource/builder available; generic Section renderer does not currently handle it**; verify any widget-specific playback                                        |
| `video`         | Short demonstrations, recordings and media requiring pause/captions/transcripts                                          | **Typed resource/builder available; generic Section renderer does not currently handle it**; verify actual player support                                               |
| `youtube`       | Externally hosted video — conceptual/embed option                                                                        | The literal occurs in `Resource_Type` but is **not in the current `Resource_Config` union or generic renderer**. Treat it as **not implemented** for authoring          |

**Static `image` authoring rule:** For each proposed `image` resource, provide an **Image prompt** in one or two clear sentences: what the image should show, its essential objects, and any spatial/action relationships needed to explain the concept. Add detail only if it is instructionally or factually necessary; do not produce long artistic prompts, model parameters or exhaustive styling instructions. Alongside (not inside) the prompt, note the **educational purpose**, **accessibility/alt-text intent**, and **asset status: pending editor/media production**. Do **not** generate the image, invent its URL/path, or claim it has been produced. This is a instructional media brief, **not** a new `Resource_Config` field. Classify a generic Section `image` block as **typed-only** until its actual renderer is verified; distinguish a static image from a custom interactive `scene` requiring its own specification.

**Renderer caveat:** The currently inspected generic `LessonSectionContent` handles **only `text`, `markdown` and `scene`**; unsupported kinds cause an error. `buildResource` can build other typed resources without automatically making them renderable. Existing nested widgets may render image/audio/video in their own slots, which is **not** general-section support.

**Section / exercise caveat:** As established in [Section](../../docs/entities/section.md), `Quiz_Config` is a distinct section contract. The current engine lists **nine QuestionType values** (`select-one-answer`, `select-multiple-answers`, `match-blocks`, `answer-with-text`, `answer-with-number`, `order-sequence`, `build-answer-with-blocks`, `fill-blanks-with-blocks`, `fill-blanks-with-text`), but the current `toQuestionWidgets` adapter supports **only `select-one-answer`** in the inspected Lesson UI. A `flashcardConfig` exists on Question data, **not** as proof of a first-class Flashcard Section. Standalone flashcard, coding, dynamic generation or other Sections require real integration verification.

### Knowledge Checkpoint — reflection, not assessment

Read the shared [`KnowledgeCheckpoint` widget](../../../shared/ui-kit/src/components/widgets/KnowledgeCheckpoint/KnowledgeCheckpoint.tsx), its [props/interaction contract](../../../shared/ui-kit/src/components/widgets/KnowledgeCheckpoint/KnowledgeCheckpoint.types.ts), the [existing wrapper Scene](../../../content/playground/src/data/howLightMoves/sections/theory/resources/scenes/Checkpoint/Checkpoint.tsx) and the [Section entity's checkpoint semantics](../../docs/entities/section.md#knowledge-checkpoint).

This is a **voluntary cognitive pause** inside teaching, often after a theory explanation or demonstration: the learner sees a question/prompt, opens an accordion to **reveal explanatory material**, and may mark the item as reviewed. The callback reports acknowledged prompts, **not correctness, a score, Quiz completion or Skill mastery**. Never call this a `Quiz_Config`, attach a grading threshold, or force a Checkpoint after every Section.

The widget is already in UI Kit, but `knowledgeCheckpoint` is **not** a `Resource_Config.blockType`. The existing Lesson example embeds it through a `blockType: 'scene'` wrapper; specify that real integration shape and the necessary accessible/language-aware presentation. Reusing the current component is not itself a request to invent a new assessment API or write a new custom educational Scene scenario. Write the actual reflective prompts, concise revealed explanations, placement and purpose.

**Design rule:** Distinguish each planned experience as:

- **Available now:** verified type, renderer and related UI/runtime behavior.
- **Typed/partially integrated:** defined contracts or existing widgets, but required Section wiring is missing.
- **New capability / proposed:** new component, custom Scene, renderer, backend, generator, browser integration, API or Program feature; **no implementation claim**.

A Screenwriter may **pitch ambitious features**, but the content must clearly mark their feasibility status and include an accessible, pedagogically adequate alternative or **explicit dependency for approval**. Do not downgrade the entire Lesson to passive text simply because a richer feature requires engineering.

## 3. SCREENWRITER PEDAGOGICAL AND EXPERIENCE DESIGN

Apply the following as **design choices justified by the particular brief**, not compulsory toys or marketing claims.

### Audience-native communication

- Explain in the audience's own language, concrete vocabulary and existing mental models. Introduce technical terms carefully and retain scientific precision. Prefer **one clean example at a time** before complexity.
- **Match the delivery to the actual age and abilities specified in the Methodologist Brief**, not just the written copy. For young children, choose short comprehensible prompts, age-appropriate interactions, perceptible controls and accessible alternatives; for older learners or adults choose the appropriate depth and interaction complexity. Match visual models, animation, pacing, feedback, prerequisite assumptions and reading load to the same audience. Do not choose interaction patterns merely because they look child-friendly; each interaction must teach the approved concept.
- Open curiosity with a meaningful question, observed contradiction, problem or scenario anchored in the _subject_, not a random narrative plot. Invite a prediction before the reveal when it supports learning.
- Use **short explanation → meaningful illustration/demonstration → learner action → interpretation** rather than long unbroken prose. "Illustration" may mean **an interactive model, manipulation, physical experiment, timeline, animation, sound or comparative visualization**, not necessarily a static image.
- Respect self-paced controls and meaningful pauses; avoid uninterrupted autoplay, endless gamification, overwhelming sensory input and repetitive clicking without cognitive value.

### Evidence-informed learning mechanics

- **Active prediction and feedback:** ask what learners think will happen, let them vary an input, then explain results and misconceptions. A click alone is not evidence of learning.
- **Retrieval practice and spaced review:** offer purposeful recall after explanations and mark future opportunities for recurrence. Do **not** claim that a Lesson's presentation alone implements a spaced-repetition scheduler or mastery tracking.
- **Worked examples → guided practice → independent transfer:** scaffold novice learning, progressively remove help and apply the concept to new contexts where appropriate.
- **Interleaving and varied practice:** contrast confusable cases or mix relevant tasks when it helps discrimination; do not force it when prerequisite knowledge is absent.
- **Multimedia design:** use coherence, signaling, proximity of text to the referenced element, segmentation, optional replay and learner-controlled pace. Avoid irrelevant animated decoration, gratuitous sound or duplicated speech/captions that increase load without purpose.
- **Reflection, choice and autonomy:** let learners compare hypotheses, inspect multiple representations and notice errors without humiliation. Encourage curiosity and autonomy rather than manipulative psychological rewards.
- **Cognitive and developmental fit:** limit new concepts per step; provide prior-knowledge cues, progressive disclosure and support for language learners and diverse literacy levels.

**Rationale sources to consult when relevant (guidelines, not an excuse to invent scientific claims):**

- [EEF: Cognitive science approaches in the classroom](https://educationendowmentfoundation.org.uk/education-evidence/evidence-reviews/cognitive-science-approaches-in-the-classroom) — evidence/context for cognitive approaches.
- [EEF: Using Digital Technology to Improve Learning](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/digital) — technology must serve an identified learning need.
- [Cambridge Handbook: segmenting, pre-training, modality](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888) — manage essential cognitive processing.
- [CAST Universal Design for Learning Guidelines 3.0](https://udlguidelines.cast.org/) — multiple means of engagement, representation, action and expression.
- [MDN: WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) and [MDN: WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) — browser 3D/compute options; **WebGPU is not universally available**.

No claim that "biohacking", neuro-stimulation or any particular visual effect **guarantees** better learning. Identify the intended learning mechanism and what meaningful learner behavior it supports.

### Programmatic video as an intentional experience

When the approved teaching need benefits from animation or audiovisual explanation, propose a **Remotion-authored programmable composition** as a candidate—not a compulsory solution. Distinguish (a) a time-driven interactive browser demonstration via Remotion Player inside a Scene, (b) pre-rendered locally hosted/offline-capable video, and (c) an optional published YouTube rendition. Give the Coding Agent a precise visual/narrative brief and which interaction **must** remain manipulable; let [Create Remotion Video Skill](../create-remotion-video.skill.md) own implementation, export, Full HD/Story layout, codecs and rendering decisions. Do not mistake video playback for a learner-controlled experiment or assume YouTube works offline.

### Think in interactive, explorable systems

Explore opportunities such as:

- An **interactive solar-system model**: switch viewpoints, compare orbits/scales, pause and inspect motion, ask a prediction, inspect how models simplify real sizes/distances, avoid scientifically inaccurate conclusions from unmarked scale changes.
- A **virtual science laboratory**: vary one independent variable, observe a graph, reset conditions and interpret outcomes; label what a simulation can and cannot demonstrate.
- A **math construction space**: manipulate geometry, compare a formula's prediction with the figure, explore exceptions and inspect numerical/visual correspondence.
- A **history/geography exploration**: compare layers of a map, time slider, causality and evidence with verifiable source material.
- A **language/listening interaction**: hear samples, compare sounds, replay at learner-selected pace, read transcripts and practice meaningfully.
- A **programming or algorithm visualization**: step through changes to program state, make a hypothesis, inspect intermediate values, attempt a minimal exercise and get constructive feedback.

These are **creative exemplars**, not built-in products or required sections. A static, accessible explanation is sometimes better. If a complex 3D experience adds no insight over an SVG or simple control, choose the simpler representation. Specify optional low-performance and nonvisual modes.

### Accessible by design, in every locale

Plan meaningful access for users with visual, auditory, motor, cognitive and other disabilities, not merely "add ARIA later". Define alternatives to drag-only, color-only, motion-only and audio-only teaching; captions/transcripts, accessible data tables for plots, keyboard control, perceivable focus, plain-language summaries and reduced-motion/static states where applicable. Use RTL-aware semantics, localized units/numbers, translated controls and accessible names. **Any unavoidable barrier must be explicitly flagged for editor/engineering review**, not quietly omitted.

## 4. CREATIVE AND TECHNICAL OWNERSHIP

**Educational Screenwriter owns the scenario. Coding Agent owns implementation. Assessment Architect owns scoring.**

| The Screenwriter SHOULD specify                                                       | The Screenwriter MUST NOT invent                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Key concept and accurate learner-facing explanation                                   | New competencies, changed learning outcomes or unverified facts                                   |
| Section sequence and why each Section exists                                          | A new hidden Program story inside the canonical Lesson                                            |
| Which typed content blocks are envisioned                                             | Unimplemented code paths or fake `Resource_Config` properties                                     |
| Animation/Scene purpose, learner controls and conceptual model                        | Low-level React component architecture as a binding requirement                                   |
| Interaction stages, visible states, valid/invalid model behavior and feedback meaning | Question scoring, diagnostic validity, grading threshold or mastery inference                     |
| Media directions and alternatives for accessibility/localization                      | Already-working SDKs, APIs, offline sync, injection/event pipeline or browser-wide WebGPU support |
| Opportunities for practice, retrieval and reflection                                  | A working spaced scheduler or analytics system without evidence                                   |
| What the Coding Agent must build and what remains blocked                             | Changes to existing app, shared engine and tests merely by writing this Content                   |

A visually sophisticated experience may legitimately require a new **Scene** or renderer. Specify the **experience contract**, ask for a technical feasibility review where necessary, and preserve design intent through the handoff. Do not hide speculative functionality in prose as if already available.

For **Quiz/question** sequences, describe the pedagogical **purpose and position** plus the concepts/misconceptions that need assessment. The Learning Assessment Architect owns actual validated items, answer criteria, Skill-to-question mapping, weights, retries and evidence. A draft example may illustrate the experience, but label it editorially illustrative until assessed.

## 5. EXECUTION PROTOCOL

1. **Load persona and validate inputs.** Read the approved Methodologist brief and actual audience specification; confirm target package, scope, output language, factual references and existing Skills. Stop if approval/essential input is absent.
2. **Inspect the current runtime.** Read the linked engine Lesson/Resource/Question/Quiz types, the actual Lesson/Section renderer, adapter and existing example. Distinguish present, typed-only and proposed capabilities.
3. **Reconstruct the learner's journey.** State what the learner knows at entry, what must change in their mental model, where prediction/observation/explanation/practice belongs and how the learning objective remains Program-neutral.
4. **Design the Section architecture.** Divide the approved content into coherent Sections, with meaningful purpose and audience-facing title. Classify each using the **real** `LessonSection_Config` / `Quiz_Config` shape or an explicitly proposed extension. Follow the [Section entity](../../docs/entities/section.md); theory, flashcards, interactive, coding and kids' coding are _purposes_, not automatically existing discriminants.
5. **Compose ordered content blocks in one vertical column.** Within each general Section, document **every** block in exact top-to-bottom presentation order, with its real `blockType`, pedagogical purpose, substantive content, learner action/feedback, locale/accessibility requirements and **readiness status**. Do not place sibling resource blocks side by side. Custom Scene internals may have spatial layouts. Use a Knowledge Checkpoint for a reflective pause where warranted, never as a scored Quiz.
6. **Write audience-ready educational content.** Provide actual examples of key explanations, prompts, model annotations and feedback in the output language; do not hand engineers "put something engaging here". Use verifiable sources and the Methodologist's approved terminology.
7. **Author each custom Scene specification separately.** Include goal and factual model, trigger/entry, objects/variables, sequence of events, learner inputs, state transitions, expected visual/auditory/text outputs, constraints, feedback content, edge cases, RTL/localization, accessibility alternatives, reduced motion and acceptance scenarios. **Do not author the implementation**. The spec must stand alone as the mandatory input for [Design Scene](../design-scene.skill.md).
8. **Plan unlocked Lesson Notes.** In the Lesson Content, include **short, atomic recall cues** for significant concepts (not paragraph summaries), each with its intended Section/teaching moment and **proposed unlock trigger**. Author the Notes plan even though the runtime is not implemented; mark it **planned / not wired** and do not invent Note fields or note-unlocked events. Follow the [Notes concept](../../docs/architecture/lesson-notes.md).
9. **Design practice/review handoffs.** Locate retrieval/checkpoints, useful flashcards or practice where warranted; identify **Assessment Architect-owned** questions and validity/scoring decisions. Mark spacing/repetition needs as future-system dependencies unless actually supported.
10. **Audit for realism and pedagogy.** Check accuracy, target learner voice, cognitive load, meaningful interactivity, lack of Program plot, type/renderer feasibility, section flow, accessibility, RTL, locale, **complete offline-content design and low-device compatibility without silently reducing learning functionality**, copyright/source attribution, Notes plan and explicit gaps. Raise any genuine educational/performance trade-off for editorial review.
11. **Stop for editor review.** Deliver the Lesson Content + Scene specs and a short **readiness/dependency report**. Do not auto-run Scene Design, Question implementation, application coding, Program scripting or the next authoring Skill.

## 6. REQUIRED DOCUMENT OUTPUTS

**Create Markdown editorial artifacts inside the selected textbook package, never under the monorepo root's `studio/` and never automatically in the playground:**

```text
<PackageRoot>/
└── Data/
    └── Lessons/
        └── <existingUuidBucket>/
            └── <existingLessonUuid>/
                ├── methodology.md            # or legacy methodologist-brief.md; do not modify
                ├── content.md                 # Screenwriter-authored output
                └── scenes/                  # only if custom Scenes are specified
                    ├── <sceneNameCamelCase>.scene-spec.md
                    └── ...
```

Use the **existing UUID Lesson directory** chosen by the user. Do not create a parallel `docs/lessons` tree, move a Lesson, or invent its bucket/slug. Keep the Methodologist Brief unchanged and write or update only `content.md` plus independently required `scenes/*.scene-spec.md` artifacts. Scan the directory for an existing legacy `script.md`, `*.lesson-script.md`, or other authored Lesson content before creating `content.md`; flag migration conflicts rather than silently duplicating or moving it.

### Lesson Content format (the generated document, not this instruction)

Use these **mandatory sections**, adjusting details and counts to the real Lesson. Replace every placeholder (including the Methodologist link) with verified content and a real path relative to the authored `content.md`. Write in the approved **learner/editorial language**; do not copy this English guidance verbatim.

```md
# <Lesson Title> — Content

Status: Draft
Target Lesson: <actual existing Lesson directory and textbook>
Audience: <age/stage, prior knowledge, language, accessibility constraints>
Approved Methodologist source: [Methodologist Brief](%VERIFIED_RELATIVE_BRIEF_LINK%) <or exact approved legacy file>
Learning outcomes: <from the approved Methodologist document>
Target Skills: As approved in the linked Methodologist Brief (inspect the planned `Data/skills/` source-file links, verify existing targets, disclose any migration-pending targets; do not keep a competing copied list here)
Program dependence: None

## INSTRUCTIONAL CONCEPT

<What must become clear, the core conceptual progression, and the learner's active role>

## LEARNER JOURNEY

<Short ordered description of the intended teaching arc and deliberate pacing>

## SECTION PLAN

### <Section 1 — audience-friendly name>

- Purpose / learning outcome:
- Current implementation shape: <LessonSection_Config | Quiz_Config | proposed specialized section>
- Ordered content blocks (one vertical column, top to bottom):
  1. <real Resource_Config.blockType; actual reader-facing explanation or interaction; accessibility/locale plan; capability: available | typed-only | proposed>
  2. ...
- Optional Knowledge Checkpoint (if pedagogically justified): <placement, reflective prompt, reveal answer/explanation; widget via scene resource; NOT assessment>
- Core explanation and learner-facing text:
- Illustration / model / experiment / interaction:
- Image brief(s), **only when `image` blocks are proposed**: `Image prompt: <one or two short sentences describing the necessary scene/objects and relationships>`; `Educational purpose: <why this visual helps>`; `Accessibility/alt-text intent: <meaning to convey without the image>`; `Asset status: pending editor/media production`.
- Learner action, observations and explanatory feedback:
- Navigation and transition:
- Accessibility, locale and RTL requirements:
- Proposed unlocked Note(s) at this moment (brief recall cues; planned, not wired):
- Implementation dependencies and review notes:

### <Section 2>

...

## CUSTOM SCENE SPECIFICATIONS

- <Scene name>: <verified relative link to scenes/<scene>.scene-spec.md>

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- <Each concise, localized, standalone recall Note; one key idea, not a Lesson recap>
- <For each: Section/moment, proposed unlock condition and intended order>
- <Status: planned; no current Note type/event/persistence or generated revision-sheet runtime>
- <The future learner revision sheet consists only of their unlocked Notes>

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

- <Where learners practice or retrieve; what Assessment Architect must specify>
- <Spaced repetition opportunities vs actual scheduling support>

## GLOBAL ACCESSIBILITY AND LOCALIZATION

<Meaningful alternatives, internationalization, RTL, reduced-motion/mobile/low-end considerations>

## PRODUCTION / PLATFORM DEPENDENCIES

<Each gap marked as available, typed-only, or proposed with responsible role and next decision>

## EDITORIAL SOURCES AND OPEN QUESTIONS

<Source references, unresolved factual/accessibility/technical/pedagogical issues>

## HANDOFF

<What is ready for Scene Designer, Assessment Architect, Coding Agent and what requires editorial approval>
```

### Independent Scene Specification format

Every **custom interactive or animated Scene** must have an individual, sufficiently precise **Screenwriter-owned** document:

```md
# <Scene Title> — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: <verified lesson and section reference>
Methodologist objective(s): <approved goal; do not invent new Skills>

## LEARNER PURPOSE AND CONCEPT

<What the learner will understand; why this form of interaction is needed>

## ACCURATE CONTENT AND MODEL LIMITATIONS

<Relevant facts, variables/units, physical/conceptual invariants, simplifying assumptions>

## EXPERIENCE BEATS AND LEARNER ACTIONS

<Ordered stages, exact learner-facing prompts, interaction choices, reveal and feedback>

## INTERACTIVE OBJECTS, STATES AND RULES

<Objects/controls, state changes, input ranges, reset/pause behavior, outcomes and edge cases>

## VISUAL / AUDIO / MEDIA DIRECTION

<What is represented and animated; artistic flexibility vs mandatory semantics>

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

<Required messages, RTL layout/geometry, alt descriptions, keyboard/touch,
captions/transcripts, reduced motion, accessible alternatives>

## ACCEPTANCE SCENARIOS

<Observable expected behavior for representative inputs and boundary cases,
including LTR, RTL, reduced motion and assistive-technology use>

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

<Existing Scene/renderer capabilities vs explicitly proposed work>
```

**Critical handoff contract:** The Scene Specification is the **approved mandatory scenario input** consumed by [Design Scene Skill](../design-scene.skill.md). On initial creation it is `Draft` and must receive editor approval **before** a Coding Agent starts that Scene. Keep Lesson Content and Scene specs in sync through explicit editorial review, not by silently improvising changes during implementation.

## 7. ACCEPTANCE CHECKLIST

- [ ] User-selected Lesson scope resolved; every assigned Lesson has an approved Methodologist Brief **actually read**; each Target Skill link targets the future canonical `Data/skills/` tree and is labeled with its exact `.data.ts` filename; existing links are resolved, migration-pending links are explicitly disclosed (not silently redirected to `src/`); discovery-only searches do not auto-author.
- [ ] Lesson is genuinely **Program-neutral**, factually correct and independently useful; pedagogical scenario is distinguished from Program story.
- [ ] Section plan uses actual `LessonSection_Content` semantics and **ordered, single-column typed Resource blocks**; distinguishes `Section`, `Resource` and `Question`.
- [ ] All **eight declared Resource_Type labels** are understood, including the **unimplemented `youtube` config**, and renderer readiness was checked rather than inferred.
- [ ] Theory, practice, flashcards, coding, kids' block coding, interactive activities and Quiz are classified by **real** current contracts vs editorial purposes; no fictional Section types/widgets.
- [ ] Content contains actual learner-facing explanations, demonstrations and interactions, not a generic Markdown lecture or vague creative wish list; any Knowledge Checkpoint is a reflection/reveal via `scene`, not a scored quiz.
- [ ] Language, examples, interface interactions, instructions, media, feedback, reading load and pacing are suitable for the audience specified in the approved Methodologist Brief (including age and prior experience).
- [ ] Activity choices make pedagogical sense: cognitive load, meaningful retrieval/feedback, worked examples and transfer are considered without compulsory gimmicks.
- [ ] Each custom Scene has an independent **full specification**, with observable behavior, accurate model, states, learner actions, accessible alternatives and acceptance scenarios.
- [ ] The Lesson Content contains a **planned, concise Notes/unlock plan** for recall, without reproducing entire Sections or claiming Note APIs/sync exist.
- [ ] Every proposed `image` resource has a concise scene/object Image prompt, separate learning purpose and accessibility intent, and an explicit pending-asset status. No image was generated and no nonexistent asset URL/path or renderer was presented as implemented.
- [ ] Every specialized or unsupported experience has an honest feasibility classification and clear engineering dependency; no imaginary API/schema.
- [ ] Accessibility, localization, responsive/mobile/low-end delivery, reduced motion, LTR/RTL, cultural adaptation and **complete offline lesson delivery** were planned. Any case requiring an actual sacrifice of functionality to support weak devices was escalated; no content was silently dropped.
- [ ] Quiz/Question scoring, correct-answer validity, mastery and retry policies are left to **Assessment Architect**, not silently decided by Screenwriter.
- [ ] Links to approved sources, Methodologist brief, existing Skills and Scene specs are **real and relative to output files**; all uncertainties and unresolved dependencies are explicit.
- [ ] Generated Lesson Content and Scene specs are handed off for **editor approval**, with no automatic runtime implementation.

## RESULT

Provide:

1. **One** draft `content.md` per explicitly assigned, approved Lesson, **including a planned Lesson Notes/unlock section**, inside that Lesson's existing `data/lessons/<bucket>/<uuid>/` folder.
2. **One specification per custom Scene**, with real relative links from the Lesson Content. A purely text or existing-widget Lesson need not create an empty Scene specification.
3. A concise editorial report stating the **most important interactive concepts**, how the Lesson avoids passive content without losing clarity, the chosen Sections/Resource blocks, **verified runtime capabilities vs proposed features**, accessibility/localization decisions, any source/technical gaps and which artifacts are waiting for approval.

**Stop after documentation and handoff.** The Coding Agent, Design Scene and Learning Assessment Architect perform their own separately authorized stages. Never author production code, invent new Question correctness rules, register fake resource types, or attach a Program narrative to the canonical Lesson.
---

## REMAINING OPEN DECISION — PER-BLOCK LOCALE COVERAGE

**Status: proposal only; not a new runtime field.** The former proposal to make ordered Section content a **single vertical column** is now approved and incorporated above, so it is no longer an open issue.

A separate proposal would have the `content.md` specification explicitly describe each content block's supported locales, including cases equivalent to "all", "all except a named set" or "only a named set". Current resource configs vary: many expose `allLocales: true | false` and locale-keyed values; Scenes have Lesson-level `sceneLocales`. A literal `all-except` type or locale visibility policy is **not established**. For now describe actual localization needs and known exceptions without inventing TypeScript fields, fallback semantics or a general locale-visibility system. Escalate requests for a new universal per-block locale scheme to the editor/engineering workflow.
