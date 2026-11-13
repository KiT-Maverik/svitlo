# Create Lesson Flashcards — Question-first memory authoring

**Persona:** [Flashcard Learning Architect](../../personas/flashcard-learning-architect.persona.md). Read it fully, the [Methodologist Persona](../../personas/methodist.persona.md), root/applicable `AGENTS.md`, current Lesson/ContentBlock/Flashcard contracts, actual Text and Code renderers, [Lesson Workflow](./README.md), and [Lesson production coordinator](./manage-lesson-production.skill.md) when working in an authorized production scope.

## Purpose, ownership and storage

For each authorized Lesson, write or revise exactly one source-language editorial bank:

`content/<textbook>/data/lessons/<last-hex-digit>/<lesson-uuid>/flashcards/flashcards.yaml`

Use the actual resolved Lesson UUID path, not a guessed slug. The YAML describes cards and upstream references; it is **not** published runtime JSON or actual TypeScript. Validate it against [Lesson Flashcards schema](./lesson-flashcards.schema.json) and additional semantic gates. Do not overwrite existing Questions, methodology, Screenwriter content, or generated data.

**HARD QUESTION-FIRST BLOCKER:** This skill must not run as an independent authoring stage until the **approved Question bank has been completed for this exact Lesson**. Verify `questions/questions.yaml` or the corresponding approved canonical Question artifact and its stable slugs, version and source-language alignment. “We intend to write questions”, an unreviewed draft, a list of Quiz briefs, or an empty placeholder do not satisfy this prerequisite. Even when `assessmentPlan.quizRequired: false`, the Question bank remains required by this workflow; stop and escalate if the upstream plan contradicts that requirement. Continue other independently ready Lessons rather than bypassing the gate.

**Code-generation gate:** if a card references Question fields, actual typed `*_Question_Data` exports must exist before creating the card's final TypeScript. The YAML can describe verified approved Question bank references before those exports exist, but generator work stays blocked until the imports can be resolved.

Inputs: approved Lesson methodology, approved current `content.yaml` and exact source revisions, approved Question bank (including actual authored Question data when available), relevant existing Flashcards, locale plan, current Flashcard/ContentBlock contracts and renderers. Use the relevant target Skill descriptions; do not scan all taxonomy by default.

## Step 1 — Choose worthwhile recall targets

Read Lesson objectives, concepts, processes, distinctions, terminology, formulas, concrete examples and potential interference. Compare with the existing **full Question bank**, not just Question slugs selected into default Quiz Sections. A Flashcard may reuse any appropriate Question, including one available only through extra practice.

Select atomic recall targets. Do not demand one card per Question, per paragraph or per Skill. Reject duplicate, vague or unsafely simplified cards. Consider reverse retrieval, contrast or relationships only when they add genuine retention value.

### Atomicity and concise writing

- The `front` and `back` must be as short as possible while retaining an unambiguous educational target and all scientifically necessary qualifiers. No filler, introductions, rhetorical padding, unrelated examples or long summaries.
- **Mandatory punctuation/conjunction audit** for each `and`, `or`, comma, semicolon, slash, colon, parenthetical aside and enumeration on either side. Ask whether two independently recallable facts are being merged. If yes, split into distinct cards. Keep one list card when the _set_, its number or meaningful order is the learning target.
- A definition should rarely require a paragraph. When two directional cards target the same concept, each must be useful on its own.
- Do not put a long explanation on the back merely because the Lesson provides one; reserve explanation-heavy work for Lessons/Questions.
- When two cards retrieve the same concept in opposite directions, keep both only if each direction is independently useful, and connect them with `reverse`. Avoid duplicating the same direction with superficial rewording.
- For code cards, assess structure, context, behavior or actual writing competence rather than accidental variable names. For write-code prompts, back with the minimum working code/template. For predict-output prompts, provide the exact output and a one-sentence causal reason when needed. Use `code` ContentBlocks for code, not prose TextBlocks.

### Count flag for a list answer

When the back is a genuine multi-element enumeration, put one **typed list flag** in the card's `flags`: `{type: list, count: N}`, with integer N >= 2. Do not put an artificial `(N)` in the question, a duplicate `listAnswerCount` field, or a redundant numeral hint. The UI derives the list-count chip from this single canonical field. Enumerate answer items clearly when helpful, preserve meaningful order, and confirm the count after edits or Question source updates. A conjunction or incidental comma does **not** justify inventing a list.

## Step 2 — Reuse Question data, never duplicate its localized facts

If a Question field expresses the desired prompt, correct answer, date, term, number, code or media, specify a typed `questionField` reference as the **value** of the editorial ContentBlock instead of copying its rendered text. It has `questionSlug` and `fieldPath`, an array of exact property names and indices locating one field on the canonical Question data. Example paths are `[question, 0, value]` and `[answers, correct, straightLine, value]`. A referenced field must exist, be semantically correct for that card, and have the expected source type/localization.

During the **separately reviewed technical handoff and TypeScript completion** (not an automatic generic scaffolder step), resolve a Question by its globally unique slug and canonical type, locate the actual exported Question source, and emit a real import and type-safe field access, for example:

```ts
import { lightTravelsStraight_Question_Data } from '../questions/lightTravelsStraight';

const front = [{ id: '...', slug: 'front', type: 'text', value: lightTravelsStraight_Question_Data.question[0].value }];
const back = [
  {
    id: '...',
    slug: 'back',
    type: 'text',
    value: lightTravelsStraight_Question_Data.answers.correct.straightLine.value,
  },
];
```

These are **illustrations of the generated pattern**, not committed imports or a claim the generator exists. If an authorized preliminary TypeScript scaffold is created before its Question export is ready, it must contain a **conspicuous unresolved `TODO(question-import): <questionSlug> <fieldPath>` next to the intended assignment** and remain blocked from validation/publication; do not silently insert placeholder prose or freeze a copied source-language value. In the complete implementation the TODO is replaced by the real imported `Question_Data` property access. The source Question must remain the localizable authority. Generate stable Flashcard ContentBlock IDs and slugs, but **never reuse Question ContentBlock IDs blindly**. Reject dangling paths, wrong types, incorrect options or duplicate source text. Never quietly substitute English literals when import resolution fails. Where the Question offers no reusable value, author concise independent source-language copy.

## Step 3 — Use ContentBlocks purposefully

Every `front`, `back` and `hint` is an **ordered array of editorial ContentBlocks**; the future generator maps them to actual typed ContentBlocks. Know all available block types from current Contracts and UI Kit; avoid promising renderer support based merely on a type's presence.

- `text`: plain brief prompts/answers; use `%_%id: personName; value: Maria%_%` for named inline fragments. The identifier must be `camelCase` (e.g. `personName`, `year`, `planetName`) and must match a key in the `variables` object when styling is configured (e.g. `variables: { personName: { applyStyle: ['variable'] } }`). Text keeps the visible value directly inside the marker. This emphasizes a generalizable variable, **not automatic random replacement**.
- `code`: actual programming syntax/algorithms, with correct `language` and optional localized `variables`. Use `%_%VARIABLE_NAME%_%` with UPPER_SNAKE_CASE identifiers matching keys of the `variables` object (not an array of `{ id, value }` entries). Code substitutes values before highlighting; unlike Text, it does not embed an `id`/`value` pair in the source marker.
- `markdown`: only when concise mathematical/structured notation benefits from it.
- `image`/other media: only when the stimulus itself is the recall target or needed for access, with real approved asset or explicit pending `assetRequest`/dependency and a non-revealing accessible alternative.
- Avoid decorative videos, scenes, carousels or checklists inside a small flashcard. If a valid card needs a ContentBlock that this editorial schema cannot yet describe with enough type safety, report a specific generator extension rather than silently replacing it with prose.
- Use `hint` for helpful cues that are not already supplied by typed flags; never repeat the list count there or leak the answer. Preserve meaningful LTR/RTL and literacy adaptations.

## Step 4 — Author typed flags, including optional acronyms

Use the discriminated `flags` array on each card. The canonical output contract has four variants:

```yaml
flags:
  - { type: list, count: 4 }
  - { type: warning }
  - type: acronym
    value: PaRFUME
    localePolicy: needsLocalizedVersion
    parts:
      - { kind: source, item: Paper, letters: P }
      - { kind: connector, letters: a }
      - { kind: source, item: Rope, letters: R }
      # Include all remaining pieces to spell the complete value.
  - { type: custom, value: 'Review this', color: info, icon: star }
```

This shows shape only: an actual acronym's complete `parts` MUST concatenate to its `value`, and uppercase source letters must actually match the remembered list. Do not force an acronym if it does not improve memory. Connector letters added for pronounceability must be lowercase; actual first one or two letters must be uppercase, preserving list meaning and intended sequence.

- `list`: `count` integer >= 2. One list count flag, not duplicated in the front, hints or separate fields.
- `warning`: a predefined caution chip; its learner-facing text comes from UI Kit's localized messages.
- `acronym`: required editorial `value`, `localePolicy` and `parts`; generated runtime flag only needs `{type: 'acronym', value}`. `localePolicy: needsLocalizedVersion` blocks publication until a valid mnemonic exists for every supported locale. `invariant` is acceptable only if the same mnemonic genuinely applies to every locale. Never use a blanket fallback to the source language.
- `custom`: `value` (learner-facing string), `color` (one canonical MUI Chip palette value) and optional `icon` (one known serialized icon token). Its text must be translated by the normal Lesson localization workflow unless truly invariant. Do not emit `ReactElement`, arbitrary SVG, import expressions or unsanitized CSS in authored data.

The four flag variants are **serialized data**, not ad hoc Storybook `labels`. The UI Kit's Flashcard flag adapter renders their icons, fixed colors and labels. Do not duplicate generated flag metadata or alter the Card's actual answer to show a flag.

## Step 5 — Author canonical typed card relationships

Write each relationship **only once** at the YAML bank root. Its `type` must be exactly one of the nine canonical `FlashcardRelationType` values from `FLASHCARD_RELATION_TYPES` in Contracts:

- **Symmetric**: `reverse`, `equivalent`, `contrast`, `complementary`.
- **Directed**: `prerequisite` (prerequisite → dependent), `partOf` (part → whole), `exampleOf` (example → category), `causes` (cause → effect), `precedes` (earlier → later).

Example:

```yaml
relationships:
  - key: reciprocal-retrieval
    source: prompt-to-answer
    target: answer-to-prompt
    type: reverse
    rationale: Independently practice both retrieval directions
  - key: meaningful-sequence
    source: step-one
    target: step-two
    type: precedes
    rationale: Distinguish process order
```

**Do not author `directed`, arbitrary `kind`, or duplicate reverse edges.** Directionality is determined by the canonical type. For symmetric relations, source and target order has no effect. Each card may participate in any number of distinct relationships and may have several **different relation types with the same partner**. Use a relationship only when the educational semantics are real and defensible.

**Generated dual-sided links:** for each editorial edge, the builder must resolve both card slugs to their **actual stable Flashcard IDs** and create one `FlashcardLink` with a stable `relationshipId` derived from `key`. It then calls `linkFlashcards(flashcards, links)` from `@svitlo/engine/builders` **exactly once**, before Lesson serialization. This helper attaches an adjacency entry on _both cards_, with the same `relationshipId` and `type`, the other card's ID in `relatedFlashcardId`, and a position:

- `peer` / `peer` for symmetric types.
- `source` / `target` for directed types.

The actual Flashcard data/response contracts include the optional `relationships` property for compatibility with older cards. The builder helper rejects self-links, unknown IDs, duplicate links and already populated adjacency. **No requirement to author both sides manually**, and no redundancy inside editorial YAML. Generated links are structural/invariant: they do not need locale translations.

Do not interpret `reverse` as shared mastery or adjust spaced repetition automatically. Relation metadata is supported as stored data; UI behaviors and scheduler semantics remain separate implementations.

## Step 6 — One source language and approvals

Write only `documentLanguage` (normally `en`), included in the Lesson's original `supportedLanguages` list. Copy that list for planned localization without creating any translated strings or making up unsupported locale values. Reference Questions whenever localizable wording can be inherited. Do not overwrite the upstream Question YAML or generated Question source.

The YAML's required groups are `schemaVersion`, `kind`, `status`, `lessonId`, `documentLanguage`, `supportedLanguages`, `sources`, `flashcards`, `relationships`, and `unresolvedDependencies`. See [schema](./lesson-flashcards.schema.json).

**Minimal illustrative fragment (not production-ready IDs/approval):**

```yaml
schemaVersion: 1
kind: lesson-flashcard-bank
status: draft
lessonId: '00000000-0000-0000-0000-000000000000'
documentLanguage: en
supportedLanguages: [en, uk]
sources:
  methodology: { path: ../methodology.md }
  content: { path: ../content.yaml }
  questions: { path: ../questions/questions.yaml, revision: verified-commit-or-blob }
flashcards:
  - slug: light-recall
    isDefault: true
    front:
      - type: text
        value:
          kind: questionField
          questionSlug: light-travels-straight
          fieldPath: [question, 0, value]
    back:
      - type: text
        value:
          kind: questionField
          questionSlug: light-travels-straight
          fieldPath: [answers, correct, straightLine, value]
    hint: []
    tags: [light]
    flags:
      - { type: custom, value: 'Practice', color: success, icon: check }
relationships: []
unresolvedDependencies: []
```

The UUID and source revision are **placeholders**, not approved identifiers. The `questionSlug` and paths must be verified against the real approved bank and Question TS exports before generation.

## Projection to the Engine Flashcard Config (separate technical stage)

The bank above follows `lesson-flashcards.schema.json`, an **editorial** schema. After independent approval, a technical editor projects the cards into the Engine Lesson `flashcards: { items, order }` collection. Every Flashcard needs `type: flashcard`, stable UUID/camelCase slug, `parameters.tags`, named `parameters.flags: { items, order }` (typed `list`/`warning`/`acronym`/`custom`), optional named relationships, and named `content.front/back/hint: { items, order }` with nested, explicitly typed ContentBlock Configs. `documentLanguage` remains outside the Config and only source-locale `locale` values are populated. Question-field references and relationship IDs must be **resolved from real approved sources**; do not pretend the generic `define*` draft scaffolder performs editorial matching or invents imports. See [Engine YAML handoff and example](../../docs/architecture/yaml-config-scaffolding.md).

## Semantic validation and handoff

Validate schema and additionally verify:

1. Approved nonempty upstream Question bank, accurate provenance and stable IDs/slugs. **No Question source = no Flashcard authoring**.
2. Every Question reference resolves to a genuine, correct field in the **actual bank**; for typed code generation, a real export exists, has compatible locales and matches generated TypeScript property access.
3. Atomized content, concise independent prompts/answers, explicit punctuation/conjunction audit, zero meaningless duplicate cards.
4. For list answers, a single typed `flags: [{type: list, count: N}]` matches actual elements; no numeral is redundantly authored into the front, hints or another metadata field. For `custom`, verify its required value/color and optional allowed icon token.
5. Variables use meaningful names and correct TextBlock/CodeBlock marker conventions. No claim that styling generates randomized values.
6. Acronym source letters and connectors match uppercase/lowercase rules and the original items, and any locale-specific mnemonic translations are pending until independently verified.
7. Relationship slugs exist; types belong to the canonical nine-value enum, both endpoints receive mirrored links with the other card's actual ID and correct `position`, and no self-links or duplicate edges survive. Runtime graph storage is supported by Contracts/Engine; UI and scheduling actions are **not** implied.
8. ContentBlock descriptions can actually be implemented or have precise recorded dependencies; no invented assets.
9. One authored source language; no duplicated Question localizations, invented locales or hidden publication blockers.
10. A changed Question bank invalidates dependent cards until rechecked; editorial reviewer pass is not approval.

Use a Draft PR and the existing fixed-scope Lesson Production Issue when doing authorized content production. A later Coding Agent consumes the **approved editorial bank plus its reviewed Config-shaped projection**, resolves actual Question imports, and completes TypeScript Flashcards. The generic scaffolder only emits a draft; it does not certify complete, compiling or publishable Flashcards.
