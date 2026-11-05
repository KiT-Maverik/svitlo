# Section

**Entity category:** ordered, pedagogically coherent unit inside a [Lesson](./lesson.md).

A **Section** is one navigable learning step that groups content for a recognizable purpose. **Examples of pedagogical purposes** include theory/explanation, guided practice, learner-controlled exploration, a bespoke interactive component, Quiz (a set of Questions), flashcard study/review, coding task, and **kids' block-based coding task**. Choose a purpose that serves the approved learning outcomes; these labels are **not automatically TypeScript discriminators or implemented Section types**.

## CURRENT TYPE CONTRACT VS EDUCATIONAL INTENT

**Observed in Code:** [`LessonSection_Content`](../../../shared/contracts/src/types/content/lesson.types.ts) is currently `LessonSection_Config | Quiz_Config`.

- **`LessonSection_Config`** holds an ordered, **nonempty** `content: NonEmptyArray<Resource_Config>`, a Section name/ID, parent Lesson ID, skippable policy and optional presentation icon. Use it for general teaching/practice/exploration content when the necessary blocks are actually supported.
- **`Quiz_Config`** is a **different** Section-shaped assessment structure with a question bank and settings; it is **not** a regular vertical array of general Resource blocks. Scoring, mastery attribution and correct-response validity are assessment-owned, not Screenwriter-owned.
- **Theory, practice, flashcards, interactive, coding, kids' block coding** are currently _editorial categories/capability proposals_ rather than established additional `Section` discriminators. Do not add `sectionType: 'theory'` or a new `Quiz_Config` field merely because a category is useful. A first-class type requires explicit architecture and implementation approval.
- Existing shared Flashcard widgets do **not** by themselves imply a supported standalone Flashcard Section. Likewise, a coding editor or block programming area needs verified renderer/integration or a proposed Scene.

## VERTICAL CONTENT-BLOCK CONTRACT

**Binding authoring invariant:** within each general Section, render/plan Resource blocks as a **single vertical column**, from top to bottom, in their declared order. Do not design side-by-side **sibling Resource blocks** or treat a Section as an arbitrary multi-column grid. A **Scene** is one typed block and may implement its own internal interactive layout, including diagrams or columns, without breaking the outer Section order.

A content block is strictly typed by [`Resource_Config`](../../../shared/contracts/src/types/content/resource.types.ts) and `blockType` (currently `text`, `markdown`, `code`, `audio`, `video`, `image`, `scene`; `youtube` appears in the label type but not the config union). The actual generic Lesson renderer currently supports only `text`, `markdown`, `scene`; other typed blocks are **not automatically renderable**. A Content must distinguish supported, typed-only/partial and proposed functionality. Read the live renderer before declaring readiness.

## KNOWLEDGE CHECKPOINT

The existing [`KnowledgeCheckpoint`](../../../shared/ui-kit/src/components/widgets/KnowledgeCheckpoint/KnowledgeCheckpoint.tsx) is a **reflection and self-explanation pause**, not a Quiz, scored Question type, grade, mastery gate or test of correctness.

- Present a prompt/question in an accordion header. The learner can expand it to reveal explanatory content, think before revealing and optionally mark it as reviewed/checked.
- The widget tracks which prompts have been acknowledged via `onProgressChange`; it does **not** verify the learner's answer. A `complete` callback means items have been marked, **not** that understanding or mastery was demonstrated.
- Insert where a deliberate pause adds understanding, e.g. after a Theory explanation, model, comparison or interaction. **Do not require one per Section**, infer correctness, or award scores from clicks.
- **Existing integration:** in `content/playground/src/data/howLightMoves`, a prop-free `Checkpoint` Scene wraps the widget and is placed as a `blockType: 'scene'` Resource in the Theory Section. `KnowledgeCheckpoint` itself is not a `Resource_Config.blockType` and not a `Quiz_Config`.
- The Screenwriter must specify meaningful questions, reveal content and placement; a Coding Agent verifies actual integration, locale, keyboard/RTL and progress semantics before implementation.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md), [Program](./program.md).
