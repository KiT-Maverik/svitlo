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
- **Mandatory punctuation/conjunction audit** for each `and`, `or`, comma, semicolon, slash, colon, parenthetical aside and enumeration on either side. Ask whether two independently recallable facts are being merged. If yes, split into distinct cards. Keep one list card when the *set*, its number or meaningful order is the learning target.
- A definition should rarely require a paragraph. When two directional cards target the same concept, each must be useful on its own.
- Do not put a long explanation on the back merely because the Lesson provides one; reserve explanation-heavy work for Lessons/Questions.

### List count hint

If the answer contains a true list of **N** independent elements, set `listAnswerCount: N` (N >= 2) and put a brief `text` ContentBlock with the numeral alone, e.g. `hint: [{type: text, value: "4"}]`. It tells the learner how many parts to recall without showing the parts. Recheck the count if the answer is linked to Question data or edited later. No count for a singular fact or a sentence with incidental punctuation.

## Step 2 — Reuse Question data, never duplicate its localized facts

If a Question field expresses the desired prompt, correct answer, date, term, number, code or media, specify a typed `questionField` reference as the **value** of the editorial ContentBlock instead of copying its rendered text. It has `questionSlug` and `fieldPath`, an array of exact property names and indices locating one field on the canonical Question data. Example paths are `[question, 0, value]` and `[answers, correct, straightLine, value]`. A referenced field must exist, be semantically correct for that card, and have the expected source type/localization.

On subsequent **YAML-to-TypeScript generation**, resolve a Question by its globally unique slug and canonical type, locate the actual exported Question_Data object, and emit a real import and type-safe field access, for example:

```ts
import { lightTravelsStraight_Question_Data } from '../questions/lightTravelsStraight';

const front = [{ id: '...', slug: 'front', type: 'text',
  value: lightTravelsStraight_Question_Data.question[0].value }];
const back = [{ id: '...', slug: 'back', type: 'text',
  value: lightTravelsStraight_Question_Data.answers.correct.straightLine.value }];
```

These are **illustrations of the generated pattern**, not committed imports or a claim the generator exists. If an authorized preliminary TypeScript scaffold is created before its Question export is ready, it must contain a **conspicuous unresolved `TODO(question-import): <questionSlug> <fieldPath>` next to the intended assignment** and remain blocked from validation/publication; do not silently insert placeholder prose or freeze a copied source-language value. In the complete implementation the TODO is replaced by the real imported `Question_Data` property access. The source Question must remain the localizable authority. Generate stable Flashcard ContentBlock IDs and slugs, but **never reuse Question ContentBlock IDs blindly**. Reject dangling paths, wrong types, incorrect options or duplicate source text. Never quietly substitute English literals when import resolution fails. Where the Question offers no reusable value, author concise independent source-language copy.

## Step 3 — Use ContentBlocks purposefully

Every `front`, `back` and `hint` is an **ordered array of editorial ContentBlocks**; the future generator maps them to actual typed ContentBlocks. Know all available block types from current Contracts and UI Kit; avoid promising renderer support based merely on a type's presence.

- `text`: plain brief prompts/answers; use identified **variable fragments** for replaceable exemplars, e.g. `{{id: personName; value: Maria}}`, and matching `styling` rule with `applyStyle: [variable]`. Use clear names such as `personName`, `year`, `planetName`. This highlights a generalizable variable, **not automatic random replacement**.
- `code`: actual programming syntax/algorithms, with correct `language` and optional `variables`. CodeBlock `{{id}}` placeholders differ from TextBlock's inline fragment format.
- `markdown`: only when concise mathematical/structured notation benefits from it.
- `image`/other media: only when the stimulus itself is the recall target or needed for access, with real approved asset or explicit pending `assetRequest`/dependency and a non-revealing accessible alternative.
- Avoid decorative videos, scenes, carousels or checklists inside a small flashcard. If a valid card needs a ContentBlock that this editorial schema cannot yet describe with enough type safety, report a specific generator extension rather than silently replacing it with prose.
- Use `hint` for helpful cues (especially list counts), not answer leaks. Preserve meaningful LTR/RTL and literacy adaptations.

## Step 4 — Optional pronounceable acronym

For meaningful enumerations, optionally produce an `acronym` object:

`{value, localePolicy, parts: [{kind: source, item, letters}, {kind: connector, letters}, ...]}`.

Its `value` must equal the concatenation of `parts[].letters` in order. Every `source` part uses one or two genuine initial letters of its item in **UPPERCASE**; connector letters added for pronounceability are **lowercase**. Never invent an extra list item to force the mnemonic. Reject awkward or misleading acronyms rather than forcing one.

`localePolicy: invariant` is allowed only when the mnemonic truly works unchanged in all Lesson languages; its raw `value` can then be included in generated `Flashcard.flags` as a label, deduplicated with authored `flags`. `localePolicy: needsLocalizedVersion` flags a **real blocker for multilingual flag publication**: current `flags: string[]` is not localizable. Do not publish untranslated source-language mnemonic as if it encoded every translated list. Require editorial solution (e.g. localized mnemonic content or a localized flag contract); record in `unresolvedDependencies`. Do not invent a runtime `acronym` property.

A count hint is required regardless of whether an acronym is available.

## Step 5 — Model generic card-to-card relationships

Write **top-level `relationships`** as graph edges, not as a closed pair of term/definition directions:

```yaml
relationships:
  - key: cause-to-effect
    source: cause-recall
    target: effect-prediction
    kind: causeEffect
    directed: true
    rationale: Recalls an upstream cause and its observable consequence
  - key: two-representations
    source: verbal-rule
    target: diagram-rule
    kind: sameConcept
    directed: false
    rationale: Two independent representations of the same relationship
```

`kind` is a **semantic extensible string** (e.g. `reciprocalRecall`, `prerequisite`, `contrast`, `partOf`, `causeEffect`, `sameConcept` or another defensible category), not a fixed enum and **not** specifically “termToDefinition”/“definitionToTerm.” Use consistent names within the bank, documented by actual meaning. `directed` expresses directionality of the relationship, not flip direction of a single card. Multiple relationships may share endpoints; no self-links, stale references or duplicate edges. Do not fabricate relationships where cards are independent.

**Current runtime `Flashcard` has no relationships field**. Treat the graph as authoring metadata for a **future separately specified sidecar/index or contract extension**. Do not serialize it into `flags`/`tags` or claim linked scheduling works today. Preserve exact graph structure for a future builder and log the missing runtime integration as a known dependency, not an authoring failure.

## Step 6 — One source language and approvals

Write only `documentLanguage` (normally `en`), included in the Lesson's original `supportedLanguages` list. Copy that list for planned localization without creating any translated strings or making up unsupported locale values. Reference Questions whenever localizable wording can be inherited. Do not overwrite the upstream Question YAML or generated Question source.

The YAML's required groups are `schemaVersion`, `kind`, `status`, `lessonId`, `documentLanguage`, `supportedLanguages`, `sources`, `flashcards`, `relationships`, and `unresolvedDependencies`. See [schema](./lesson-flashcards.schema.json).

**Minimal illustrative fragment (not production-ready IDs/approval):**

```yaml
schemaVersion: 1
kind: lesson-flashcard-bank
status: draft
lessonId: "00000000-0000-0000-0000-000000000000"
documentLanguage: en
supportedLanguages: [en, uk]
sources:
  methodology: {path: ../methodology.md}
  content: {path: ../content.yaml}
  questions: {path: ../questions/questions.yaml, revision: verified-commit-or-blob}
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
    flags: []
relationships: []
unresolvedDependencies: []
```

The UUID and source revision are **placeholders**, not approved identifiers. The `questionSlug` and paths must be verified against the real approved bank and Question TS exports before generation.

## Semantic validation and handoff

Validate schema and additionally verify:

1. Approved nonempty upstream Question bank, accurate provenance and stable IDs/slugs. **No Question source = no Flashcard authoring**.
2. Every Question reference resolves to a genuine, correct field in the **actual bank**; for typed code generation, a real export exists, has compatible locales and matches generated TypeScript property access.
3. Atomized content, concise independent prompts/answers, explicit punctuation/conjunction audit, zero meaningless duplicate cards.
4. For list answers, `listAnswerCount` matches actual items and numeric `hint` contains the count.
5. Variables use meaningful names and correct TextBlock/CodeBlock marker conventions. No claim that styling generates randomized values.
6. Acronym source letters and connectors match uppercase/lowercase rules and the original items, with localized-flag limitations clearly surfaced.
7. Relationship slugs exist; no invalid self-links or duplicate edges, and no claims about nonexistent runtime graph support.
8. ContentBlock descriptions can actually be implemented or have precise recorded dependencies; no invented assets.
9. One authored source language; no duplicated Question localizations, invented locales or hidden publication blockers.
10. A changed Question bank invalidates dependent cards until rechecked; editorial reviewer pass is not approval.

Use a Draft PR and the existing fixed-scope Lesson Production Issue when doing authorized content production. A future Coding Agent consumes **approved** YAML, resolves Question imports and produces typed Flashcards. Do not claim a full YAML-to-code compiler has already been implemented.
