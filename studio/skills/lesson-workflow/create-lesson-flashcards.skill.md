# Create Lesson Flashcards — Question-first memory authoring

**Persona:** [Flashcard Learning Architect](../../personas/flashcard-learning-architect.persona.md), using the [Methodologist](../../personas/methodist.persona.md)'s approved methodology. Read root `AGENTS.md`, [Create Flashcards Flow](./create-flashcards-flow.skill.md), [Lesson Flow](./create-lesson-flow.skill.md), [Questions Flow](./create-questions-flow.skill.md), real Engine Flashcard/Side/ContentBlock Config/Build schemas, and current UI Kit renderer support. This is the **pedagogical design standard**, not an independent stage tracker or a substitute for Coding Agent/materializer validation.

## Ownership and the typed source

Author one Lesson-owned, **source-language**, progressively enriched TypeScript bank at:

`content/<textbook>/data/lessons/<last-hex-digit>/<lesson-uuid>/flashcards/index.ts`

Start with a minimal `FlashcardBankWorkflowStage1`; extend the **same** `{config?, production}` authoring object to `FlashcardBankWorkflowStage2` and `FlashcardBankWorkflowStage3`. Do not create another bank UUID, a Card/Side at Stage 1, `flashcards.yaml` as a second source, a separate plan, a second source ledger or approver fields in Engine Config. The bank is **not** serialized into Lesson Props. Stage 5 materializes the independently reviewed final Stage 3 into real `defineFlashcard`/`defineFlashcardSide` modules and the complete bank export; translation and independent review follow in the **same Flashcards Draft PR**. Existing typed bank source must be preserved and non-destructively reconciled, never overwritten with a new Stage 1 object.

**Question-first hard blocker:** before Stage 1, verify approved Lesson methodology and complete independently reviewed/integrated Question Bank at the exact source SHA, *or* the parent Lesson PR's explicit Methodologist-backed `Questions: Not Applicable` with rationale and revision. No local Quiz or absent Questions are **not** an exemption. If a Question changes, revalidate every dependent Card/field/locale before approval. Read the complete bank, not just a Quiz selection.

The original Lesson `documentLanguage` and `supportedLanguages` are recorded as shared `production.lesson.languages: {document,planned}`; only real source-language copy is initially authored. The Methodologist's `LessonProductionAssessmentRequirements` records four **independent** requirements: Question Bank, Flashcard Bank, Quiz Section and Flashcards Section. A full Flashcard Bank may be used for later practice without any in-Lesson Flashcards Section. Assessment-only Lessons can use approved upstream banks with explicit source ownership.

## Stage 1 — Identify the right recall targets

Inspect approved objectives, facts, definitions, distinctions, misconceptions, formulas, important names/dates and conceptual links. Collect source-grounded `production.analysis.recallObjectives`, `sourceFactsAndConcepts`, `misconceptionsAndContrasts`, `exclusions`, `cardCountRationale` and `sourceGrounding`. These are editorial production fields, not Flashcard Config or another Markdown/YAML file. Exclude material needing rich explanation, open-ended proof, complex teaching or Question-style evidence. There is no automatic card count per Skill, paragraph or Question. Stage 1 has **no Card inventory, fake UUID, empty Side or embedded Section**.

## Stage 2 — Design atomic and independently useful Cards

Add `config.flashcards: {items,order}`. Each entry has `config.id/slug`, real `parameters.tags`, optional `disabilities`, `flags` array and `content.front/back/hint` typed Side collections, plus `production` rationale and factual grounding. Create **one** concise, unambiguous recall target per Card. Validate actual immutable UUIDs and slug keys; do not import new identities from fabricated placeholders. Each front/back must be understandable without having completed the matching Quiz.

**Atomicity and punctuation audit.** Examine every `and`, `or`, comma, semicolon, slash, colon, parenthetical aside and list on both sides: do they conceal independent facts that deserve separate retrieval? Split where independently retrievable; retain a group only if remembering the group, count, meaningful order or relationship is the objective. This is a semantic test, not automatic splitting on every punctuation mark. Remove filler, introductions, narrative, incidental qualifications and long explanations while retaining conditions, units and important exceptions. Never simplify a fact into an incorrect one or accept an ambiguous answer key.

**Retrieval directions.** Two Cards may target the same concept in opposite directions only when each direction teaches useful independent retrieval. Connect meaningful reverse Cards using a canonical `reverse` edge. Avoid repeated same-direction prompts with cosmetic rewording or answer interference. Relationship edges do not merge review, scheduling or progress. For code Cards, ask about structure, context, behavior or useful writing, not arbitrary identifiers/syntax trivia. Back of a write-code Card contains the minimum working template/snippet; predicting output requires exact output and minimal causal explanation. Use a Code ContentBlock for actual syntax, not a prose text block.

### Real ContentBlock Side structure and language

Every `front`/`back` and optional `hint` is **exactly** `{items,order}` containing real Engine Config ContentBlock nodes; a **Side has no independent UUID, slug or type**, whereas each new ContentBlock owns a real UUID. For composite Carousel/Checkpoint nodes use the plain nested `CarouselSource` / `CheckpointSource` types derived from the integrated source materializers: final Carousel/Checkpoint Config schemas expect built child Configurators and cannot themselves represent a Stage 2 plain source tree. Materialized side Configurators compose these ordered blocks. Use typed Text/Markdown/Code/Image/other available Configs **only when actually supported by the chosen renderer/materializer**. Source-language content is legitimate; duplicate placeholder translations are not.

- **Text:** concise prompts/answers, with the current `%_%id: personName; value: Марія%_%` inline-fragment syntax and matching camelCase variable styling IDs (`personName`, `year`). The displayed value is inside the marker; this is **not** implemented random substitution.
- **Code:** actual programming code with the correct syntax `%_%VARIABLE_NAME%_%` and uppercase snake-case replacement IDs in `locale.variables`; `params.codeAsText` contains the code. Unlike Text, the marker contains only the identifier. Do not use retired `{{...}}` placeholders.
- **Markdown:** concise structured, mathematical or LaTeX notation when needed; inline `$...$` and display `$$...$$` formulas follow [Markdown ContentBlock guidance](../../docs/entities/markdown-content-block.md).
- **Images/media:** only when recognition of the stimulus or an accessibility-equivalent cue is the target. Check curated purpose-`flashcards` media from the pinned Lesson reference, file identity/extension, meaningful accessible alternative, captions/transcripts and offline availability. Never invent assets, fileName, Nil UUID or file placeholders to pass publication. Decorative video/Scene/Carousel is usually poor memory design.

Hints must help retrieval without giving away the back or redundantly encoding a `list` count. Assess RTL and other supported reading/accessibility requirements; do not assume a complex widget is necessary for a simple fact. If a genuine concept requires an unsupported block shape, mark the Card blocked and request a justified concrete renderer/materializer extension rather than substituting fabricated copy.

### Real Flashcard flags — an unordered array

Use `parameters.flags: Flashcard_Flag_Config[]` **directly**. The actual Config and published Props both use an array; **no `items/order` flag map or stable flag slug** exists. A Build override replaces the entire array. The exact variants are:

- `{type:'list',count:N}` for **one** cohesive answer list with integer `N >= 2`. The UI shows count automatically; do not duplicate `(N)` in front, hint, or another property. Verify distinct list items after every revision.
- `{type:'warning'}` when a real learner caution merits a visible built-in localized warning.
- `{type:'acronym',value}` with genuine localized mnemonic value, when justified.
- `{type:'custom',value,color,icon?}` with supported palette color and optional serialized icon token, not JSX, SVG, CSS or an asset path.

Built-in variants may occur at most once each; multiple custom flags are allowed. Flag order has no pedagogical meaning. Taxonomy belongs in `tags`, not flags. No speculative flags, `localePolicy`, `parts` or `rationale` fields may be inserted into Engine Config.

**Acronym audit:** consider one/two initial letters from each remembered list item (in meaningful order); actual item letters are **UPPERCASE**, invented pronunciation connector letters **lowercase**. Verify the source word-to-segment mapping, connector meaning, uniqueness and cultural suitability in the Flashcards PR evidence. Do not distort facts/reorder items to force a mnemonic. `value` may require **new culturally accurate localized mnemonics** for different Lesson languages; never declare it invariant without validating the words in every locale.

### Content accessibility restrictions are per retrieval direction

Use the real `parameters.disabilities: Disability[]` union only to mark a task that **cannot** be made equivalently accessible in that mode. `[]` is the unrestrictive default. An image-first prompt and a text-first reverse prompt can have different restrictions. Never use disability metadata as diagnosis or blanket multimedia exclusion; explain every restriction in `production.accessibilityRationale`/PR review. Separate eligibility filtering occurs **before fetching** published Cards; excluded Cards cannot count as completed.

### Question-source reuse and canonical identity

Read current verified typed Question exports and the complete Question Bank, not historical `*_Question_Data` or positional paths. Prefer referencing existing Question-owned ContentBlock Configurators **directly** when a matching fact/answer has the same meaning; never copy localized Question text into a second independent Flashcard value. The observed Playground pattern is a real import such as `lightTravelsStraight.content.question.items.question` or `lightTravelsStraight.content.answers.correct.items.straightLine` **only when those exports/paths are verified in the current source**.

The Stage 2 `production.questionReuse` records expected Question source SHA, exact export path/name, field path and intended locales as editorial evidence; it is **not** a schema extension or pseudo-reference in a ContentBlock Config. The Card cannot be materialized until the actual materializer can emit that verified, type-safe import; never silently freeze an English value into a literal or invent a `kind: questionField` node. Intentional reuse keeps the Question child identity; a **new** Flashcard-owned ContentBlock requires its own UUID. Reuse only semantically appropriate answer content, not distractors or multi-target Questions; author independently when no Question owns that fact and Methodologist scope supports it.

## One canonical relationship graph

Store the **sole** authored edges in `config.relationships: {items,order}`, each named entry exactly `{relationshipId,type,source,target}` with real Card **slugs**. The map key identifies the ordered edge and `relationshipId` is stable authored identity; neither is automatically generated from endpoints. The nine exact Engine types are:

| Kind | Meaning |
| --- | --- |
| `reverse`, `equivalent`, `contrast`, `complementary` | Symmetric, both endpoint `position: 'peer'` |
| `prerequisite` | Foundation → dependent |
| `partOf` | Part → whole |
| `exampleOf` | Example → category |
| `causes` | Cause → effect |
| `precedes` | Earlier → later |

Directional edges materialize `position: 'source'` on the source and `'target'` on the target, each with the **other Card UUID** as `relatedFlashcardId`; symmetric edges materialize `peer` on both. The two emitted endpoint entries preserve the single authored `relationshipId`. The Stage 2 authored Card `parameters.relationships` is intentionally **absent**, never a manually maintained second graph. Reject self-links, missing Card slugs, duplicate same-type endpoint pairs (including symmetric reversals), duplicate IDs and invalid directions; a card may have many justified links including different kinds to one partner. The Stage 5 orchestrator must do this deterministic projection before calling the now-integrated concrete #780 Card materializer; `materializeFlashcard` itself does not generate mirrored edges or check the whole bank graph. Relation type/position never implies scheduling or mastery semantics.

## Stage 3 — Approve or omit a small in-Lesson Flashcards Section

The full bank exists independently of its Section. Use `production.section` as a discriminated `notApplicable` with rationale or `selected` with the existing/new Section identity, placement and **small ordered source Card slug selection** (not another list of Card UUIDs). Preserve existing Lesson Section UUID, copy and relative ordering; a blocked `feedc0de-` selection in Lesson Stage 6 is provisional, never a real Card. The Section owner, **after valid Card materialization**, imports the completed Cards and writes `defineFlashcardsSection.params.selection.flashcardIds` using imported `.id` values in that order. Do not embed bank content in Lesson/Section Props, change Lesson root or Questions, or publish an unresolved Section. The Section is optional even when the independent bank is required. Unselected Cards remain in full-bank publication.

## Independent Memory Design Review and source materialization

An **independent reviewer** in a distinct context verifies the **entire actual Stage 3 source** against pinned Lesson and Questions revisions. Check atomicity, accuracy, distinct answers, Card count, reverse direction, flags/acronyms/list counts, permitted restrictions, graph semantics, referenced real typed Question children, language plan, asset readiness and selected Section (including an explicit N/A). Record reviewer identity, findings, final reviewed source SHA and verdict **in the existing Flashcards PR**, not in a `Stage4` source type or Config. Reviewer may directly correct the **same** Stage 3 object, then re-pin SHA. A successful technical schema parse, TS typecheck or the author's own approval does not substitute for independent Memory Review.

At **Stage 5 only**, the Coding Agent consumes `FlashcardBankWorkflowMaterializerInput`, exactly an alias of the final Stage 3 type, and invokes the **already integrated** #780 Card/Side and #778/#779 ContentBlock materializers through the integrated #775 reviewed Bank Stage 5 orchestrator after default-branch deployment. Directly calling an individual Card materializer with a Stage 1/Stage 3 bank object is invalid; expand validated relations, adapt nested child callbacks and preserve the original reviewed Stage 3 source before changing its `index.ts`. Source-language draft modules must be generated deterministically, no-clobber, validated with the current Engine API and real UUID graph, and retain explicit blockers for missing media, unresolved Question imports or incomplete locales. The legacy `flashcardBuilder` and `/flashcards materialize` route are YAML-only and **not** compatible with the typed Stage 3 input; keep them for in-flight legacy sources until a verified replacement exists. The bank materializer does not edit Lesson root, Questions or Section modules.

**Publication guard:** Stage 5 is not complete until full authored bank source typechecks with the owning packages, physical/media and accessibility evidence passes, `generateAssessmentResources --kind flashcard` publishes **all** Card members, requested locale resources/manifest exist, and any embedded Section references only real eligible published Cards. No source-only draft, `TODO(asset)`, Nil UUID, placeholder, unverified translation or unfinished imported Question may pass production. Independent Stage 6 translation and Stage 7 translation review remain mandatory separately.

## Translation and review

Technical Translator translates the **entire bank** in the same Flashcards PR: all fronts, backs, hints, localized `acronym/custom` flags, actual media alternatives, terms, examples and precise answer meaning, for the verified Lesson language plan. Do not translate only Section-selected Cards, duplicate Question-owned translations or fabricate locale dictionaries.

An **independent linguistic reviewer** (different agent/context) uses actual source-SHA-pinned full-bank review references/manifests from the [Code-derived Flashcard review adapter](../../../shared/engine/scripts/generateFlashcardReviewArtifacts/README.md), not Lesson design Markdown. Validate every relevant Card/locale for accuracy, RTL, syntax, punctuation, acronym reconstruction, terms, media parity and accessibility; authorized fixes on the **same PR** require re-generation/re-review of affected scope. Track evidence, reviewers, source/final SHAs and verified per-locale verdicts in the PR only. Follow the current entity PR lifecycle: remain Draft during ongoing/blocked authoring, then transition a completed owner-assigned entity PR to Ready for actual target-specific validation; Ready is not merge authorization. This tooling migration PR #784 itself has an explicit requirement to remain Draft until owner authorization.

## Checkpoints

- Stage 1 is **bank analysis**, never a fake complete `defineFlashcard`.
- Stage 2 is reviewed source-language Card inventory, actual immutable Card/Block UUIDs, Source Config, flags **array** and one relationship edge graph.
- Stage 3 separately chooses Section `selected` or `notApplicable`, with bank intact.
- Stage 4 independent Memory Review pins source SHA; Stage 5 materialization must not precede it.
- Stages 6 and 7 cover **all** bank Cards/locales and independent linguistic review in the **same PR**.
- No second YAML/Markdown editor, new Stage 4 Config, fabricated asset/Question reference, extra PR or publication shortcut is valid.
