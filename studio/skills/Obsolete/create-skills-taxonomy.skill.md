> **OBSOLETE:** Superseded by [active create-skills-taxonomy.skill.md](../skill-taxonomy-workflow/create-skills-taxonomy.skill.md). Retained for historical reference; do not execute.

# Create Skills Taxonomy Skill

**Mandatory first action:** Read [Methodologist Persona](../../personas/methodist.persona.md) in full. Adopt its professional judgment and role boundaries before researching, designing, or editing a taxonomy. Do not assume the persona has been loaded.

**Purpose:** Create or review the **permanent, canonical pedagogical source of truth** for one subject: an audience-independent Skills Taxonomy organized as **SkillDomain → SkillGroup → Skill**, with a controlled **SkillDomain → Skill** alternative when there are no meaningful Groups. Author the names, authoritative substantive descriptions, hierarchy, counts, and verified implementation links directly in `<PackageRoot>/docs/skills/taxonomy.md`. There is **no Create Skill Definitions stage, no per-entity Markdown Definition file, and no separate definition template**. Code implementation is a separate stage.

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

**Contracts/Engine status and ownership:** The `@svitlo/contracts/taxonomy` `SkillDomain_Config` type now optionally declares direct `skillIds` while keeping `groupIds` for compatibility. **The type and Domain builder validate nonempty exclusive membership and UUID syntax, but do not establish registry, renderer, loader or progress/ancestry support.** Implementation must audit those consumers and full-tree referential integrity. Do not implement a duplicate direct Skill in a Group as a workaround.

**Biology precedent (2026-10-28):** «Моделювання біологічних систем» (four mixed generic modeling and biological reasoning Skills) was removed as a Group. Instead of duplicating the same outcome, the existing Ecology Skill «Моделювати взаємодію живих і неживих компонентів» became «Пояснювати взаємозалежність компонентів екосистеми», assessed through explanations of predator removal, invasive species, and cascading consequences, regardless of whether the Lesson uses a simulation. The Observation Group was also removed after its one Biology-specific candidate was moved to Biological Classification; generic observation methods and instrument-use candidates were excluded.

**Concrete Biology editorial precedent (2026-10-28):** Four candidates were removed from Biology: `Інтерпретувати таблицю росту організмів`, `Розпізнавати біологічну закономірність на графіку`, `Порівнювати надійність джерел біологічної інформації`, `Виявляти біологічне твердження, не підтверджене даними`. Their primary operations (table reading, graph reading, source reliability evaluation, evidence checking) remain general when “biological” is replaced by another context. The now-empty `Біологічні дані та наукові твердження` Group was also removed. These competencies were **removed from the Biology catalog, not deleted from the educational scope or assigned new IDs elsewhere**. The Biology draft's working decision log retains the history; this rule stands independently.

## TEXTBOOK-LOCAL IDENTITY

Follow [Skill entity ownership](../../docs/entities/skill.md): a textbook's taxonomy and Skill IDs are **local to that textbook**. Overlapping competencies in other textbooks **are allowed** and must not trigger forced deduplication, cross-textbook ID reuse, a centralized registry, or shared analytics. Audit redundant or compound competencies **within the selected textbook** as usual; looking at other subjects for useful context is optional, not an identity requirement.

## TAXONOMY VS. CURRICULUM — NO LEARNING-DEPTH CEILING

The taxonomy identifies **which distinct competencies exist** in the approved subject scope. It **does not prescribe a maximum or minimum depth of mastery**, nor mandate an age, grade, proficiency target, teaching method or implementation level. **Curriculum determines learning depth, expected outcomes, selection, prerequisites and sequence** for its audience; Lessons and Assessments implement those decisions.

Do not reduce a rich competency to mere recognition or conceptual awareness because learners are young; likewise, do not demand full production-grade implementations automatically. Preserve independently meaningful abilities across understanding, explanation, application, construction or analysis where editorially appropriate. For potentially advanced but relevant topics, seek explicit editorial scope review rather than silently deleting or weakening them. The inclusion of a Skill does not obligate every curriculum or learner to master it.

## OPERATING PROTOCOL

1. **Research:** establish the complete subject landscape, practical scope boundaries and uncertainty. Use references to check breadth rather than copying a syllabus.
2. **Decompose:** identify coherent Domains and **only necessary Groups**, then atomic observable Skills. Apply the **mandatory Skill-versus-Question check above to every candidate** before admitting it to the taxonomy; run the A-without-B, subject-ownership and Group-flattening gates. Commas, classification verbs and task formats are review triggers, not permission to split or delete automatically.
3. **Review / hard stop:** prepare and present the **explicit editor handoff for every mandatory escalation trigger** before changing the affected taxonomy entries. Discuss overlaps, missing competencies, accidental bundling, redundant assessment-format Skills and over-fragmentation. Do not independently decide that an ambiguous item is a Skill, Question or a duplicate; do not edit affected approved entries until the editor resolves the named question. An integration Skill C exists only if independently meaningful and explicitly approved; a Question covering A and B does not create C.
4. **Write authoritative descriptions in the taxonomy itself:** immediately after each Domain, Group and Skill heading's metadata, provide a substantive paragraph explaining **what the concept/competency means, what is included and what distinguishes it from neighboring entries**. Names identify; descriptions explain. A Description **must not repeat, paraphrase or mechanically expand the heading**, nor merely say that a Domain contains related Groups or a Group contains related Skills. For Skills, clarify the observable subject-specific competency, meaningful scope or distinguishing case; give a concrete example where it improves understanding, without turning the description into a lesson, grading rubric, question format or implementation plan. Every entry receives its own relevant description. Use ordinary prose below the heading: **never emit a `Description:` prefix**.
5. **Inspect actual implementation files:** when an entity is implemented and validated, link directly to its canonical `*.data.ts` file. The link text **must be the file's exact basename, including every suffix and the extension** (for example, `[kineticEnergy.data.ts](%VERIFIED_RELATIVE_PATH%)`, not `[kineticEnergy]` or `[kineticEnergy.data]`). If implementation is unverified, use exactly `[Not implemented](#)`. The link stands **alone, without `Code:` or any other label**. A reserved UUID, a parent map or a proposed path does not prove implementation.
6. **Author the canonical taxonomy** using the template below. Use accurate counts, link targets and current editorial scope. Do not create `*.skill.md`, `*.skill-group.md`, `*.skill-domain.md`, intermediate Definitions, or runtime code. A **single optional historical Review** may be created or appended **only** under the narrowly defined gate below, not as a second taxonomy.
7. **Verify and stop:** check every Domain/Group/Skill count, standalone package boundaries, all non-placeholder Code links, unique primary membership, title-description differentiation and unresolved issues. Return the taxonomy for an explicit editorial approval decision. Never silently assume approval. If a historical Review was changed, verify its dates, factual decisions, links and lack of duplication.

## CANONICAL OWNERSHIP

- **Taxonomy Markdown:** permanent editorial single source of truth for pedagogical names, scope, distinctions, descriptions and Domain → Group → Skill membership, or exceptional Domain → Skill membership.
- **TypeScript Data/IDs:** implementation authority for UUIDs, localized runtime names, typed configs, direct-child ID dictionaries and exports. The existing Engine does not have a `description` field; **do not duplicate descriptions in TypeScript** or add undocumented runtime metadata.
- **Implementation link in taxonomy:** one unlabeled Markdown link per entity, with exact full filename (including suffixes and extension) as the link text when implemented, or exactly `[Not implemented](#)` otherwise. Never prefix that link with `Code:`. There is **no Definition link, separate Definition count or editorial Status on individual entities**.
- **Approval:** a human editorial review gate on the taxonomy or a substantive revision, not a duplicated `Status: Draft/Approved` field on hundreds of documents. Once approved, downstream work must not rename, split, merge or rearrange without explicit review.
- **Curricula and Lessons:** reference the canonical taxonomy; they own sequencing, teaching context, prerequisites and assessment choices, not the Skill catalog.

### Metadata before descriptions

Keep every entity's metadata together directly after its heading. Order is **Domain:** `Groups · Skills` → standalone implementation link → prose; **Group:** `Skills` → standalone implementation link → prose; **Skill:** standalone implementation link → prose. Present substantive descriptions as unlabeled Markdown paragraphs, never as `Description:` fields, and never interrupt metadata with a description. Do not reintroduce `Definition` links: the taxonomy itself is the permanent editorial definition, and the single standalone implementation link is its only per-entity artifact link.

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
- No old per-entity Definition references, UUIDs, grade assignments, runtime IDs or fake `Status` fields occur in the taxonomy.
- Markdown descriptions do **not** start with `Description:` and always follow all of the entity's metadata (any Group/Skill counts and the standalone implementation link).
- The **only canonical authoring artifact** is `docs/skills/taxonomy.md`. No TypeScript, curricula, lessons, individual Skill Markdown or invented templates; the optional `docs/history/skill-taxonomy-review.md` may be created/updated **only** under the explicit history gate above.

## TAXONOMY TEMPLATE

Repeat the following blocks for each Domain, Group and Skill. **Grouped and direct Domain examples are alternatives, never mixed in one Domain.** Replace placeholders with substantive, _non-duplicative_ prose and independently verified implementation paths. Implemented link labels must use the exact filename including suffixes and extension; never prepend a field label to a Markdown link. The template is embedded; do not create another template file.

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

Groups: %DOMAIN_GROUP_COUNT% · Skills: %DOMAIN_SKILL_COUNT%

[Not implemented](#)

%SUBSTANTIVE_DOMAIN_DESCRIPTION_NOT_A_RESTATEMENT_OF_NAME%

#### %GROUP_NAME%

Skills: %GROUP_SKILL_COUNT%

[Not implemented](#)

%SUBSTANTIVE_GROUP_DESCRIPTION_EXPLAINING_SCOPE_AND_BOUNDARIES%

##### %SKILL_NAME%

[Not implemented](#)

%SUBSTANTIVE_SKILL_DESCRIPTION_CLARIFYING_MEANING_AND_DISTINCTION%

### %DIRECT_SKILLS_DOMAIN_NAME%

Groups: 0 · Skills: %DIRECT_DOMAIN_SKILL_COUNT%

[Not implemented](#)

%SUBSTANTIVE_DIRECT_DOMAIN_DESCRIPTION%

#### %DIRECT_SKILL_NAME%

[Not implemented](#)

%SUBSTANTIVE_DIRECT_SKILL_DESCRIPTION%
```

## RESULT

Create or update **exactly one canonical taxonomy file** in the selected textbook package (a history file is separately optional and strictly gated):

```text
<PackageRoot>/
└── docs/
    └── skills/
        └── taxonomy.md
```

Keep validated code references and editorial decisions stable. Deliver source references, Domain/Group/Skill and verified Code counts, **a separate editor-facing list of all Skill-versus-Question escalation cases with the actual editor decisions**, and unresolved questions that block final approval, plus a concise declaration of whether a qualifying dated Review was appended/created or no historical file was warranted. The **next authorized stage after approval** is [Implement Skill Code](../skill-taxonomy-workflow/implement-skill-code.skill.md), not a Definition-generation step.
