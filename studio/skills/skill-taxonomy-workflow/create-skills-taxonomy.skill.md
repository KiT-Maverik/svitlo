# Create Skills Taxonomy Skill

Read [Skill Taxonomy Workflow](./README.md) for the staged-to-code authority transition.

**Mandatory first action:** Read [Methodologist Persona](../../personas/methodist.persona.md) in full. Adopt its professional judgment and role boundaries before researching, designing, or editing a taxonomy. Do not assume the persona has been loaded.

**Purpose:** Create or review the **editorial staging catalog of not-yet-migrated or pending Skill taxonomy entities** for one subject: an audience-independent Skills Taxonomy organized as **SkillDomain → SkillGroup → Skill**, with a controlled **SkillDomain → Skill** alternative when there are no meaningful Groups. Author stable English editorial slugs, names, authoritative substantive descriptions, hierarchy, counts, and verified implementation links directly in `<PackageRoot>/docs/skills/taxonomy.md`. There is **no Create Skill Definitions stage, no per-entity Markdown Definition file, and no separate definition template**. Code implementation is a separate stage.

## NON-NEGOTIABLE START CONDITIONS

1. **Package root:** identify the real standalone textbook/application root, not the monorepo root. Inspect the actual repository rather than assuming an example path.
2. **Scope:** establish the subject, intended breadth, exclusions, working language and whether the taxonomy is new or an approved revision.
3. **Evidence:** examine credible subject references and any standards the editor explicitly requests; do not silently impose a country, age, grade, course sequence or national curriculum.
4. **Existing state:** inspect `<PackageRoot>/docs/skills/taxonomy.md`, existing `*.data.ts` source files, repository instructions including applicable `AGENTS.md`, and any existing **`<PackageRoot>/docs/history/skill-taxonomy-review.md`**. The history explains past decisions but cannot override the canonical taxonomy. Preserve approved identities, names, descriptions and placements unless explicitly authorized to revise them.

If a prerequisite is missing, report it accurately rather than inventing files or claiming unverified implementation.

## ENTITY DEFINITIONS — REQUIRED READING

Read [SkillDomain](../../docs/entities/skill-domain.md), [SkillGroup](../../docs/entities/skill-group.md) and [Skill](../../docs/entities/skill.md) in full. A Skill is an independently assessable competency; the taxonomy never stores grades, assessment evidence, learner progress or mastery data.

## SUBJECT OWNERSHIP GATE — KNOWLEDGE, NOT TASK CONTEXT

**A subject-specific Skill is defined by the disciplinary knowledge or reasoning indispensable to demonstrating the competency, not by the theme of a Lesson, the object named in a dataset, or the subject of a Question.** A generic procedure performed on subject-themed material does not automatically become a subject Skill.

For every candidate Skill, **before** choosing its Domain or splitting/merging it:

1. **Identify essential knowledge:** State which disciplinary concepts or mechanisms a learner must understand to execute the action correctly. If the same operation needs only generic literacy, numeracy, scientific inquiry, source evaluation, or data interpretation, flag it as cross-cutting instead of inflating the subject taxonomy.
2. **Run a context-substitution test:** Replace the thematic objects or dataset (e.g. plant growth) with a non-biological example (e.g. room temperature). If the action and success criterion remain substantially unchanged, the subject context is incidental, and the Skill must not be claimed as Biology-specific merely by adding a biological noun.
3. **Separate method from subject inference:** Reading a growth table or interpreting a graph trend is general data literacy; **explaining why reduced light changes plant growth by using photosynthesis** requires biological knowledge. The latter may justify a Biology Skill, but only if the competence explicitly assesses that biological mechanism rather than generic graph reading.
4. **Assign an owner deliberately:** Record general/cross-disciplinary candidates and possible owners for editorial review. Do not automatically create them under Math, Informatics, another textbook or a new shared taxonomy without an approved cross-subject design. A subject-themed practice Question is not proof that a separate Biology-specific competency is necessary. Similar competencies in different textbooks may have independent local Skill IDs; do not force global deduplication or UUID reuse.
5. **Re-evaluate Group/Domain coherence:** If all Skills in a Group fail the ownership test, remove that empty Group from the subject taxonomy and reconcile counts. If a broad methods Domain contains generic and disciplinary abilities, flag each boundary separately rather than silently deleting the whole Domain.

### MANDATORY EDITORIAL STOP: Skill versus Question / Practice / Lesson (non-negotiable)

**Lessons learned (Biology, 2026-10-29):** The prior generic rule “a Question format does not make a Skill” was **not strong enough**: an agent still authored five artificial “Biological Classification” Skills representing choosing a criterion, sorting cards, applying a key, identifying traits and explaining a grouping criterion. The editor decided those general operations belong to **Questions/Practice demonstrating existing organism-recognition Skills**, not to additional Biology Skill IDs. Two other candidates (“compare selection with genetic modification” and “predict removal of a food-chain link”) duplicated conceptual Skills already in the taxonomy. This is a **process failure**, not an instruction to ban every classification, key-use, comparison, prediction or modeling Skill.

**Mandatory candidate-by-candidate check BEFORE considering an entry as a new Skill or changing an existing one:**

1. **Underlying competency:** In one subject-specific sentence, state what knowledge or transferable capability the learner should acquire **regardless of how it is presented or tested**.
2. **Replace the interaction:** Replace a sorting/matching/ordering/drag-and-drop/quiz/model/diagram/key-use task with a materially different activity. Does the _same_ learning outcome remain? If yes, the original interaction is likely a **Question/Practice format**, not the Skill.
3. **Map to existing Skills:** Identify the precise canonical Skill(s) whose knowledge this task would already verify. A Question may reference one or several; a task needing two Skills does **not** create a third “compare/use both” Skill by default.
4. **Independence and transfer:** Explain what would remain independently useful to assess or track if that Question type and its particular examples disappeared. Apply both the **A-without-B test** and the **subject-ownership/context-substitution test**. Do not automatically exclude genuinely disciplinary identification, classifications, practical procedures or scientific reasoning.
5. **Editor decision:** Classify each candidate as **(A) clearly a distinct subject Skill**, **(B) an activity/Question/Practice reusing named existing Skill(s)**, **(C) a possible cross-subject capability**, or **(D) ambiguous / overlap**. State the evidence. **Any candidate triggered below must be surfaced in a separate, explicit editor-review question, regardless of the agent's personal confidence.**

**Mandatory escalation triggers:** A proposed or existing Skill names an exercise verb or format (sort, match, choose a criterion, arrange, drag, identify by a presented diagram, use a visual key, explain your answer, simulate); can be completed using previously listed Skills; is only a comparison/integration of two already separately taught concepts; duplicates a broader/narrower Skill; or might actually be a general cross-subject method disguised by subject nouns. The trigger means **review, not automatic deletion**. Some of these could still be legitimate Skills when the editor approves a demonstrated independent, knowledge-based outcome.

**Required editor handoff, separate from the taxonomy:** For every triggered candidate, show (1) proposed Skill and Domain, (2) sample learner task, (3) actual underlying learning outcome and any pre-existing Skill names, (4) the **Question/Practice-only alternative** and any alternative Skill formulation, (5) independent assessment/subject-specificity evidence, and (6) an **explicit editorial question** such as “Keep a standalone Skill, or assess this through existing Skills via Questions?” Include your recommended option **as a proposal, not a decision**. Present this list to the editor **before** creating, splitting, merging, moving, renaming or removing affected Skills/Groups/IDs. Do not bury it in the end of a long taxonomy or represent a provisional assumption as approval.

**STOP RULE:** If the editor has not explicitly resolved an escalated case, mark it `PENDING EDITOR DECISION`, leave existing approved taxonomy entries/IDs unchanged, and do not generate their Code, UUIDs, Questions or dependent Curriculum as if the change were approved. For a new draft taxonomy, keep candidates clearly provisional **outside the canonical approved inventory** until the editor decides. Continue reviewing unrelated, unambiguous entries if safe, but do not silently infer approval from the absence of a reply. This applies even when the agent feels certain that a candidate is “just a Question” or “obviously a Skill”.

**Concrete Biology precedents (already decided, not new rules for every subject):**

- “Group mammals and reptiles into piles” → **Question** grounded in the existing mammal/reptile recognition Skills; “choose a sorting criterion” is not independently a Biology Skill merely because the cards depict organisms.
- “Distinguish selection from genetic modification” → **Question** relying on the two foundational concept Skills, not necessarily an extra comparison Skill.
- “What happens when a predator disappears?” → **Question/lesson example** for “Пояснювати взаємозалежність компонентів екосистеми”, not an extra narrow Skill.
- “Living / dead / never alive” → a **genuine unified biological classification Skill**; its three answer categories and justifications are not three more Skill IDs.

### Competency vs instructional medium gate

A **Skill** names what a learner can independently know, explain, determine, or do; a **Lesson**, **Question**, **diagram**, **simulation**, **graph**, **model**, or **interactive block** is a way of teaching or assessing it. The availability or use of a particular format **does not itself create a Skill**. Examine whether the intended outcome survives a change of medium: if the same biological prediction can be demonstrated from prose, a diagram, or a simulation, identify the biological reasoning instead of creating redundant "using a simulation" Skills.

**Modeling is not automatically disallowed:** creating a _biologically valid causal representation_ or predicting how a biological system changes can be an independently assessable subject competence when it requires disciplinary mechanisms. Generic model literacy (e.g. distinguishing a map/model from reality) may be cross-disciplinary. Apply the subject ownership and atomicity gates to individual candidates; do **not** automatically delete a whole Modeling Group because interactive models are used in Lessons. Review unresolved cases with the editor.

**Group necessity and reuse:** do not create a SkillGroup purely to collect similar interaction formats. If pruning leaves a Group empty or with a single independent Skill, evaluate whether that Skill fits an existing coherent Group; remove empty Groups and revisit parent Domain names. Before inventing a Skill ID, look for an existing subject Skill that already tests the same outcome and update/move it if editorially approved. Physical instrument proficiency may be genuinely assessable in practice, but a virtual textbook Question alone cannot prove real-world proficiency; do not invent digital-only proof of mastery.

**Domain/group flattening gate (editor-approved, 2026-10-28):** Prefer the three-level Domain → Group → Skill tree where the Domain contains **two or more genuinely distinct Groups**. When the Domain has no meaningful internal subdivisions, put Skills **directly** under that Domain (Domain → Skill). **A Domain with exactly one Group is undesirable and must be flagged for explicit editor approval with a substantive justification; it must not be the generator's default.** Never add fake groups named after the Domain or a generic catch-all just to fill the level. Do not mix direct and grouped Skills in a single Domain. Each Skill retains exactly one primary taxonomy parent. In direct mode, Domain metadata reports `Groups: 0 · Skills: N` and Skill headings use `#### <Skill name>` (not `#####`); their metadata remains a standalone implementation link followed by meaningful prose. Reconcile counts by entity kind, **not heading depth alone**, because `####` now represents either a Group (identified by `Skills:` metadata) or a direct Skill (identified by its standalone implementation link and no Group `Skills:` count).

**Current Engine taxonomy API:** `defineSkillDomain` (from `@svitlo/engine/build`) owns the typed `SkillDomain_Config` and validation under `shared/engine/configurators/skills/`. The authored Domain organizes direct `skills` or `groups` as keyed collections with explicit order, rather than the former `skillIds` / `groupIds` interface. Inspect actual configurator invariants and all runtime consumers before asserting production support for direct Domain → Skill composition. Do not duplicate a direct Skill inside a Group as a workaround.

**Biology precedent (2026-10-28):** «Моделювання біологічних систем» (four mixed generic modeling and biological reasoning Skills) was removed as a Group. Instead of duplicating the same outcome, the existing Ecology Skill «Моделювати взаємодію живих і неживих компонентів» became «Пояснювати взаємозалежність компонентів екосистеми», assessed through explanations of predator removal, invasive species, and cascading consequences, regardless of whether the Lesson uses a simulation. The Observation Group was also removed after its one Biology-specific candidate was moved to Biological Classification; generic observation methods and instrument-use candidates were excluded.

**Concrete Biology editorial precedent (2026-10-28):** Four candidates were removed from Biology: `Інтерпретувати таблицю росту організмів`, `Розпізнавати біологічну закономірність на графіку`, `Порівнювати надійність джерел біологічної інформації`, `Виявляти біологічне твердження, не підтверджене даними`. Their primary operations (table reading, graph reading, source reliability evaluation, evidence checking) remain general when “biological” is replaced by another context. The now-empty `Біологічні дані та наукові твердження` Group was also removed. These competencies were **removed from the Biology catalog, not deleted from the educational scope or assigned new IDs elsewhere**. The Biology draft's working decision log retains the history; this rule stands independently.

## TEXTBOOK-LOCAL IDENTITY

Follow [Skill entity ownership](../../docs/entities/skill.md): a textbook's taxonomy and Skill IDs are **local to that textbook**. Overlapping competencies in other textbooks **are allowed** and must not trigger forced deduplication, cross-textbook ID reuse, a centralized registry, or shared analytics. Audit redundant or compound competencies **within the selected textbook** as usual; looking at other subjects for useful context is optional, not an identity requirement.

## EDITORIAL SLUGS — MANDATORY

Every new or deliberately migrated SkillDomain, SkillGroup and Skill must have one `Slug: lowerCamelCase` immediately beneath its Markdown heading, before counts, the implementation link and descriptions. Keep Markdown headings, not XML or HTML wrappers. Use an English semantic identifier matching `^[a-z][A-Za-z0-9]*$`, without whitespace, hyphens or underscores.

Domain, Group and Skill slugs must be **globally unique across one textbook**, even when entities have different parents or types.

Approved slugs remain stable across display-name or translation changes. They do not replace UUIDs or introduce new runtime config fields. Preserve existing Code file paths and UUIDs; seek explicit editorial review of any mismatch or proposed change. Legacy taxonomies without slugs need deliberate migration.

## ENTITY ACTION AND IMPLEMENTATION STATUS — MANDATORY

Every newly authored or explicitly migrated Domain, Group and Skill must also have two independent, case-sensitive, single-line Markdown fields immediately after `Slug:`:

- `Action: skip` | `Action: create` | `Action: update` | `Action: delete`. This is **editorial operation intent**, not a lifecycle status: only `create`, `update` and `skip` are handled by the Code generator; `delete` remains exclusively manual. `skip` means exclude this entity from a generator operation without excluding it from taxonomy counts or the subject catalog. `create` requests new Code and `update` requests changes to existing Code. `delete` is **only a manual-removal marker**; the Code generator must never execute it. Separate explicit editor approval and a dependency audit are required for manual removal. No operation is performed just by editing this field. **Default: `Action: skip`**; do not infer a destructive action from a heading change or absence.
- `Status: pending` | `Status: implemented`. This records **current, verified Code implementation state**, not editorial approval: `pending` means no fully verified Code implementation for this entity; `implemented` requires a real validated `*.data.ts` implementation and appropriate link. **Default: `Status: pending`** when authoring a new unimplemented entry.

The fields are independent: an implemented entity can have `Action: skip`, and a pending entity can remain in the catalog without generation. A `delete` action does not mean an entity has already been deleted. For `Status: pending`, use `[Not implemented](#)` unless a partially implemented/legacy entry requires explicit review; never call a missing or unverified Code file implemented. For `Status: implemented`, require the verified standalone Code link. Flag inconsistent action/status/link combinations for editor review; do not apply automatic operations, resolve destructive dependencies or modify generator scripts in this authoring workflow. These are **Markdown authoring fields**, not new properties of existing runtime entity contracts.

## TAXONOMY VS. CURRICULUM — NO LEARNING-DEPTH CEILING

The taxonomy identifies **which distinct competencies exist** in the approved subject scope. It **does not prescribe a maximum or minimum depth of mastery**, nor mandate an age, grade, proficiency target, teaching method or implementation level. **Curriculum determines learning depth, expected outcomes, selection, prerequisites and sequence** for its audience; Lessons and Assessments implement those decisions.

Do not reduce a rich competency to mere recognition or conceptual awareness because learners are young; likewise, do not demand full production-grade implementations automatically. Preserve independently meaningful abilities across understanding, explanation, application, construction or analysis where editorially appropriate. For potentially advanced but relevant topics, seek explicit editorial scope review rather than silently deleting or weakening them. The inclusion of a Skill does not obligate every curriculum or learner to master it.

## OPERATING PROTOCOL

1. **Research:** establish the complete subject landscape, practical scope boundaries and uncertainty. Use references to check breadth rather than copying a syllabus.
2. **Decompose:** identify coherent Domains and **only necessary Groups**, then atomic observable Skills. Apply the **mandatory Skill-versus-Question check above to every candidate** before admitting it to the taxonomy; run the A-without-B, subject-ownership and Group-flattening gates. Commas, classification verbs and task formats are review triggers, not permission to split or delete automatically.
3. **Review / hard stop:** prepare and present the **explicit editor handoff for every mandatory escalation trigger** before changing the affected taxonomy entries. Discuss overlaps, missing competencies, accidental bundling, redundant assessment-format Skills and over-fragmentation. Do not independently decide that an ambiguous item is a Skill, Question or a duplicate; do not edit affected approved entries until the editor resolves the named question. An integration Skill C exists only if independently meaningful and explicitly approved; a Question covering A and B does not create C.
4. **Write structured descriptions in the taxonomy itself:** every Domain, Group and Skill receives exactly two labeled, single-line fields immediately after its standalone implementation link: `Methodological description: <English text>` and `User-friendly description: <working-language UI draft or [Not authored]>`. The methodological field is canonical English editorial meaning: competency, scope, boundaries, misconceptions and useful examples; it must not merely paraphrase the heading, become a Question/lesson plan, or impose a Curriculum depth limit. The user-friendly field is concise learner-facing draft copy in the taxonomy's working language; it is **not** automatically `description.fe`. When frontend copy is not needed, write exactly `User-friendly description: [Not authored]`. A complete `description.fe` can be generated only after separate localization into **all supported locales**. The field labels, colon and one space are mandatory so a parser can safely identify entries. No free-floating unlabeled description paragraph; no fake English translation of existing source.
5. **Inspect actual implementation files:** when an entity is implemented and validated, link directly to its canonical `*.data.ts` file. The link text **must be the file's exact basename, including every suffix and the extension** (for example, `[kineticEnergy.data.ts](%VERIFIED_RELATIVE_PATH%)`, not `[kineticEnergy]` or `[kineticEnergy.data]`). If implementation is unverified, use exactly `[Not implemented](#)`. The link stands **alone, without `Code:` or any other label**. A reserved UUID, a parent map or a proposed path does not prove implementation.
6. **Author the canonical taxonomy** using the template below, including unique `Slug:`, explicit `Action:` and `Status:` fields for every entity. Default to `Action: skip` and `Status: pending` for new, unimplemented entries. Use accurate counts, link targets and current editorial scope. Do not create `*.skill.md`, `*.skill-group.md`, `*.skill-domain.md`, intermediate Definitions, or runtime code. A **single optional historical Review** may be created or appended **only** under the narrowly defined gate below, not as a second taxonomy.
7. **Verify and stop:** validate slug syntax and textbook-wide uniqueness, allowed Action/Status values and Code-link/status consistency, and check every Domain/Group/Skill count, standalone package boundaries, all non-placeholder Code links, unique primary membership, title-description differentiation and unresolved issues. Return the taxonomy for an explicit editorial approval decision. Never silently assume approval. If a historical Review was changed, verify its dates, factual decisions, links and lack of duplication.

## CANONICAL OWNERSHIP

- **Taxonomy Markdown:** staging editorial source of truth for unpromoted entries for approved slugs, pedagogical names, scope, distinctions, descriptions and Domain → Group → Skill membership, or exceptional Domain → Skill membership.
- **TypeScript Data:** entity-owned UUID literals, fully localized runtime names, typed configs, direct-child `.id` reference maps and scoped exports are authoritative after promotion. Every Skill requires a reviewed English `description.methodological` and genuine `description.fe` in all supported languages; Group/Domain frontend text remains optional but must be complete when provided. Independent verification and approval are required before promotion.
- **Implementation link in taxonomy:** one unlabeled Markdown link per entity, with exact full filename (including suffixes and extension) as the link text when implemented, or exactly `[Not implemented](#)` otherwise. Never prefix that link with `Code:`. There is **no Definition link, separate Definition count or editorial Status on individual entities**.
- **Approval:** a human editorial review gate on the taxonomy or a substantive revision. The per-entity `Status: pending|implemented` denotes **implementation**, not editorial approval; never use `Status: Draft/Approved` for these entries. Once approved, downstream work must not rename, split, merge or rearrange without explicit review.
- **Curricula and Lessons:** reference the canonical taxonomy; they own sequencing, teaching context, prerequisites and assessment choices, not the Skill catalog.

### Metadata before descriptions

Keep each entity's metadata together directly after its heading. Order: **Domain:** `Slug` → `Action` → `Status` → `Groups · Skills` → link → two description fields; **Group:** `Slug` → `Action` → `Status` → `Skills` → link → two description fields; **Skill:** `Slug` → `Action` → `Status` → link → two description fields. Each field and value occupy **one physical Markdown line**; the exact labels are `Slug: `, `Action: `, `Status: `, `Methodological description: ` and `User-friendly description: ` (including the space after the colon). Neither field is an implementation link or new entity. Preserve English methodological authority separately from the working-language frontend draft. Never reintroduce Definition links.

## SKILL TAXONOMY REVIEW — OPTIONAL DATED HISTORY, NOT ANOTHER TAXONOMY

Follow the **mandatory dated-history policy** in [Methodologist Persona](../../personas/methodist.persona.md) before touching any Review. There is exactly **one default history document for this subject**:

```text
<PackageRoot>/docs/history/skill-taxonomy-review.md
```

Title: **Skill Taxonomy Review**. Keep the **original review date** and append subsequent agreed decisions under their actual dates. This historical file is **not** a per-Skill Definition, does not replace `docs/skills/taxonomy.md` and does not determine runtime IDs.

**First decide whether to write history:**

- **Existing history:** read and **append to the same file only if** this review produced a genuinely new editor-approved agreement, rationale or reversal. Prefer a short dated addendum that references the earlier decision; do not rewrite the past or duplicate the taxonomy's current descriptions.
- **No history:** do **not** create one for a first taxonomy, a routine item-level or incremental editorial review, a title/description correction, or a PR update. Creation is warranted only if (a) the existing taxonomy has a substantially earlier **original date**, the corresponding textbook has **actually been implemented**, and the editor is now conducting a substantive redesign of that earlier generation; (b) the editor **explicitly identifies a new textbook generation**; or (c) the editor **expressly requests a dated historical decision record**. Verify the underlying conditions in source files and the brief, not from assumed elapsed time or confidence.
- **New generation with a history already present:** **append a dated generation section** to the existing Review by default. A separate version-scoped Review is an **explicit editor exception**, not automatic version-per-review output; follow the Persona's generation naming rule.
- **Any unresolved question:** present it to the editor separately. Never record an agent proposal as an agreed outcome, create an extra history document to avoid the approval gate, or change approved taxonomy entries merely to match a historic decision.

**Record format:** factual `YYYY-MM-DD` decision, affected Domain/Group/Skill names, alternatives actually considered, editor's decision, the concrete rationale, any later supersession and links to the canonical taxonomy/PR or sources. Preserve earlier dates and rationale. Do **not** include a chronological agent work log, fake progress, guessed approvals, repetitive inventories, TODO lists or complete lesson-story material; those belong in their respective canonical artifacts.

**Handoff:** State whether the existing history was **updated**, a **qualified new Review** was created, or **no history file** was warranted, and why. The ordinary result is still exactly **one canonical `taxonomy.md`**. History is a rare archival exception, not a required second output.

## QUALITY AND ACCEPTANCE GATES

- Textbook-local Skill identities remain independent; cross-textbook overlap is permitted, while within-textbook duplication is audited.
- No taxonomy-imposed grade-linked learning-depth ceiling, blanket conceptual-only rule or compulsory implementation level; these outcomes belong to Curriculum.
- **Neither a Skill name nor its canonical description may prescribe learning depth or mode** (such as “only on a model”, “without formulas”, “for grades 1–3” or “recognition only” as an imposed ceiling). Descriptions explain substantive physical or other subject competency; Curricula select depth, formalism, teaching method and assessment expectations.
- Names and descriptions are **semantically different**: the description materially explains the name's subject content and boundaries and is not a tautology.
- Each Skill is distinct and independently assessable; compound candidates use the A-without-B review rule.
- **Mandatory review gate:** every candidate has been checked against existing Skills and alternative Question/Practice formats; every suspicious format-driven, generic, overlapping or integration Skill was raised as a **separate explicit editor question** with options and received a recorded decision before being added, renamed, moved, merged or removed. Unresolved cases remain `PENDING EDITOR DECISION`, not silently incorporated.
- Editorial uncertainties and source coverage limitations are reported separately; never fabricate a numeric standards-coverage percentage from catalog counts.
- Domain/Group/Skill counts reconcile at every hierarchy level; membership is unique and matches any approved existing catalog. Ungrouped Domains report zero Groups and directly attached Skills; a singleton Group requires a recorded editorial exception.
- Each entry has one verified, unlabeled implementation link showing the full filename (suffixes and extension included), or exactly `[Not implemented](#)`; Code counts report actual implementations, not file names guessed from the taxonomy.
- No old per-entity Definition references, UUIDs, grade assignments, runtime IDs or editorial-approval statuses occur in the taxonomy. The explicitly permitted `Status: pending|implemented` is implementation metadata only.
- Every newly authored or migrated Domain, Group and Skill has one valid `Slug: ` unique across the textbook, exactly one `Action: ` from `skip|create|update|delete`, and exactly one `Status: ` from `pending|implemented`. Check consistency with verified Code links and avoid unauthorised destructive actions.
- Every Domain, Group and Skill has exactly one nonblank `Methodological description: ` (English) and one `User-friendly description: ` (working-language draft or exact `[Not authored]`) after its metadata and link. No legacy unlabeled prose and no generic `Description:` prefix in newly created or migrated template documents.
- The **authoring/staging artifact** is `docs/skills/taxonomy.md`. No TypeScript, curricula, lessons, individual Skill Markdown or invented templates; the optional `docs/history/skill-taxonomy-review.md` may be created/updated **only** under the explicit history gate above.

## TAXONOMY TEMPLATE

Repeat the blocks for each Domain, Group and Skill. **Grouped and direct Domain examples are alternatives, never mixed in one Domain.** The templates show safe defaults (`Action: skip`, `Status: pending`); use `Status: implemented` only when Code is verified, and change `Action` only by an explicitly scoped authoring decision. Each field is a single Markdown line; use English for methodological text, and the explicitly selected working language for user-friendly draft copy. Use `User-friendly description: [Not authored]` when no frontend text is required. Complete all supported locales in a separate localization stage before publishing `description.fe`. The template is embedded; do not create another template file.

```md
# %SUBJECT_NAME% — Skills Taxonomy

Date: %CURRENT_DATE%

%SUBJECT_SCOPE_AND_EXCLUSIONS%

## SUMMARY

Domains: %DOMAIN_COUNT%
Groups: %GROUP_COUNT%
Skills: %SKILL_COUNT%

Code files: %DOMAIN_CODE_FILES%/%DOMAIN_COUNT% Domains · %GROUP_CODE_FILES%/%GROUP_COUNT% Groups · %SKILL_CODE_FILES%/%SKILL_COUNT% Skills

## DOMAINS

### %DOMAIN_NAME%

Slug: %DOMAIN_SLUG%
Action: skip
Status: pending

Groups: %DOMAIN_GROUP_COUNT% · Skills: %DOMAIN_SKILL_COUNT%

[Not implemented](#)

Methodological description: %ENGLISH_DOMAIN_MEANING_AND_BOUNDARIES%
User-friendly description: [Not authored]

#### %GROUP_NAME%

Slug: %GROUP_SLUG%
Action: skip
Status: pending

Skills: %GROUP_SKILL_COUNT%

[Not implemented](#)

Methodological description: %ENGLISH_GROUP_MEANING_AND_BOUNDARIES%
User-friendly description: [Not authored]

##### %SKILL_NAME%

Slug: %SKILL_SLUG%
Action: skip
Status: pending

[Not implemented](#)

Methodological description: %ENGLISH_SKILL_COMPETENCY_AND_BOUNDARIES%
User-friendly description: [Not authored]

### %DIRECT_SKILLS_DOMAIN_NAME%

Slug: %DIRECT_DOMAIN_SLUG%
Action: skip
Status: pending

Groups: 0 · Skills: %DIRECT_DOMAIN_SKILL_COUNT%

[Not implemented](#)

Methodological description: %ENGLISH_DIRECT_DOMAIN_MEANING%
User-friendly description: [Not authored]

#### %DIRECT_SKILL_NAME%

Slug: %DIRECT_SKILL_SLUG%
Action: skip
Status: pending

[Not implemented](#)

Methodological description: %ENGLISH_DIRECT_SKILL_COMPETENCY%
User-friendly description: [Not authored]
```

## RESULT

Create or update **exactly one canonical taxonomy file** in the selected textbook package (a history file is separately optional and strictly gated):

```text
<PackageRoot>/
└── docs/
    └── skills/
        └── taxonomy.md
```

Keep validated code references and editorial decisions stable. Deliver source references, Domain/Group/Skill and verified Code counts, **a separate editor-facing list of all Skill-versus-Question escalation cases with the actual editor decisions**, and unresolved questions that block final approval, plus a concise declaration of whether a qualifying dated Review was appended/created or no historical file was warranted. The **next authorized stage after approval** is [Implement Skill Code](./implement-skill-code.skill.md), not a Definition-generation step.
