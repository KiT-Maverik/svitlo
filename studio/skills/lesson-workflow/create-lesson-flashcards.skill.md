# Create Lesson Flashcards — Question-first memory authoring

**Persona:** [Flashcard Learning Architect](../../personas/flashcard-learning-architect.persona.md). Read it fully, the [Methodologist Persona](../../personas/methodist.persona.md), root/applicable `AGENTS.md`, current Lesson/ContentBlock/Flashcard contracts, actual Text and Code renderers, [Lesson Workflow](./README.md), and [Lesson production coordinator](./manage-lesson-production.skill.md) when working in an authorized production scope.

## Purpose, ownership and storage

For each authorized Lesson, write or revise exactly one source-language editorial bank:

`content/<textbook>/data/lessons/<last-hex-digit>/<lesson-uuid>/flashcards.yaml`

Use the actual resolved Lesson UUID path, not a guessed slug. This is a **single complete Engine-shaped technical bank YAML**, not a second editorial-only format or published Props. Validate each card with `yamlFlashcard_Schema`, based directly on Engine `flashcard_Config_Schema`; use the [Create Flashcards Flow](./create-flashcards-flow.skill.md) PR stage tracker and [Flashcard converter](../../../shared/engine/scripts/flashcardBuilder/README.md). Do not overwrite existing Questions, methodology, Screenwriter content or generated data.

**HARD QUESTION-FIRST BLOCKER:** Before authoring, verify the completed and independently approved full Question bank for this exact Lesson (source revision, identities and language alignment). **Only exception:** the owning Lesson PR explicitly records `Questions = Not Applicable` with verified Methodologist rationale; then design from approved Lesson content without Question references. Pending, missing, unreviewed, empty and blocked Questions do not qualify, and the absence of a built-in Quiz does not imply `Not Applicable`. Continue independently ready Lessons instead of bypassing this gate.

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

Every `front`, `back` and `hint` is an **ordered array of editorial ContentBlocks**; the future generator maps them to actual typed ContentBlocks. Know all available block types from current Engine schemas and UI Kit; avoid promising renderer support based merely on a type's presence.

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

## Step 5 — Author one canonical typed relationship graph

The bank has exactly one named `relationships: { items, order }` collection. Each entry is `{ relationshipId, type, source, target }`, where source and target are real Flashcard **slugs** in `flashcards.items`, and type is one of the nine current Engine `flashcardRelationshipTypes` values. The deterministic builder materializes the same `relationshipId` on each endpoint, with the other Flashcard's **UUID** in `relatedFlashcardId` and the proper `position`: `peer` for symmetric `reverse/equivalent/contrast/complementary`, `source` → `target` for directed `prerequisite/partOf/exampleOf/causes/precedes`. Never author duplicate or self-referential edges. Do not assume this changes learner mastery or scheduling.

The graph is a property of the bank, not a second copy of each card's `parameters.relationships`. The [Flashcard builder](../../../shared/engine/scripts/flashcardBuilder/README.md) projects these canonical edges to complete authored Configs. Link the same source media UUID only when meaningful for the retrieval objective, but give **each Flashcard ContentBlock a new UUID**.

## Step 6 — One Engine-shaped source-language bank

Write **one** `content/<textbook>/data/lessons/<bucket>/<lesson-uuid>/flashcards.yaml`. The following is a shape example, **not** an editorial approval, complete Lesson, or publishable translation:

```yaml
lessonId: d3048d21-8690-5255-b62c-984c69ac272c
documentLanguage: en
supportedLanguages: [en, uk]
flashcards:
  items:
    identifyOrbit:
      id: 00000000-0000-4000-8000-000000000001
      slug: identifyOrbit
      parameters:
        tags: [astronomy]
        disabilities: []
        flags: { items: {}, order: [] }
      content:
        front:
          items:
            prompt:
              id: 00000000-0000-4000-8000-000000000011
              slug: prompt
              type: text
              params: {}
              locale: { value: { en: 'What is an orbit?' } }
          order: [prompt]
        back:
          items:
            answer:
              id: 00000000-0000-4000-8000-000000000012
              slug: answer
              type: text
              params: {}
              locale: { value: { en: 'The path an object follows around another body.' } }
          order: [answer]
  order: [identifyOrbit]
relationships: { items: {}, order: [] }
```

This example uses placeholder UUIDs and **must not be placed into a real Lesson** without verified unique IDs and meaningful content. Real authors add only the source language's actual translations while retaining the Lesson's planned language scope. The top-level `type: flashcard` is not authored; `defineFlashcard` derives it internally for published Props. **Other ContentBlock/flag/relation discriminators remain required.** `status`, `approved`, `draft`, `kind`, `schemaVersion`, speculative media and redundant editorial `sources` objects do not belong in bank Config/YAML; the PR description holds the process/evidence.

**Reference source:** read the purpose-`flashcards` Lesson Markdown output from #645 at the exact Lesson SHA. Its curated media references are the **only** broad media candidate index. Verify a specific referenced source file if needed; do not inventory arbitrary assets. Source language, supported languages, verified Questions/Methodologist N/A and media review belong in the PR production record.

**Typed Question references:** never copy localized Question facts into literal Flashcard strings. Read the actual typed Question exports and source SHA, validate exact existing properties, then emit imports and direct type-safe references. The currently implemented Flashcard builder deliberately **rejects** Question/media-driven fields until verified integration, rather than generating broken placeholders or fabricated values; keep such authoring cases blocked until the converter supports them. Source-only TS is not final translation or approval.

## Semantic validation and review handoff

Validate every actual card and its engine-derived YAML source against:

1. Approved Lesson Markdown/methodology and either approved complete Question bank or verified `Not Applicable` rationale.
2. One assessable fact/concept per card, short independent front/back, justified retrieval variations, no same-direction duplicates.
3. Question field reference integrity and localized value reuse; verified IDs, slugs, locale coverage and correct type.
4. List counts, acronym letter/connector proof, invariant vs translated mnemonics, flag/color/icon enums.
5. Valid ordered ContentBlock sides, clean media purpose and no answer leakage; accessibility equivalents considered before restriction metadata.
6. Exact `parameters.disabilities` from the existing Engine union; unique values chosen **per retrieval direction**, including optional empty array.
7. Canonical unique relationship edges, correct direction, real endpoint IDs and both mirrored materialized entries.
8. Accurate original Lesson planned language set and separately required translation/review evidence; no fabricated locale copies.
9. Nonoverwriting TS scaffold, existing authored source preservation, no missing referenced asset/Question, no silent YAML deletion.
10. Independent Memory Design Review on the exact source SHA; syntactic validation, checked box or author's own review is not approval.

Use the **existing Lesson-owned child Draft Flashcards PR** under [Create Flashcards Flow](./create-flashcards-flow.skill.md) for the seven-stage checklist, findings and final QA. Keep `flashcards.yaml` until materialization and independent approval can actually be verified; no duplicate editorial schema or new Lesson Production Issue is created merely for this bank workflow.
