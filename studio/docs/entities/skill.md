# Skill

**Entity category:** atomic, independently assessable competency used as a stable classification and analytics key.

A **Skill** identifies the smallest practically meaningful ability that can be evaluated independently. This is a rule for **designing the editorial taxonomy**, not a command to embed assessment records or mastery status in the runtime entity.

## EDITORIAL ATOMICITY AND GRANULARITY

1. Describe a recognizable observable ability, rather than an entire subject, lesson topic, exercise UI or answer format.
2. **A-without-B test:** if A can meaningfully be mastered without B, and independently referring to or assessing A and B is useful, create separate Skills.
3. Conjunctions and lists in names/descriptions are **signals for editorial review**, not an instruction to split automatically; some combinations describe a single classification or relationship.
4. A third integration Skill C is justified only when choosing between A and B or understanding their relationship is independently meaningful. A Question or Lesson using both A and B does not automatically require C.
5. Changing numbers, media, presentation, hints or assessment mechanics normally changes a Question variant, not the Skill identity.
6. Never silently split, merge, rename or move an approved competency. Surface unclear cases for editorial review first.
7. **Skill names and their canonical definitions must be independent of learning depth, grade, age, curriculum tier, teaching method, assessment format and permitted mathematical formalism.** Define the complete subject-specific competency. Each Curriculum decides how deeply and in which form that competency is taught and evaluated; none of these limits may be embedded in the Skill's identity or explanation.

**Examples:** multiplying and dividing may be independent; an exercise requiring both can reference both Skill IDs; explaining their inverse relationship may be a separate Skill only if explicitly warranted. Classifying even versus odd can be one coherent ability. `2 × 7` is an exercise variation, not a dedicated Skill.

## MANDATORY EDITOR REVIEW: SKILL OR ASSESSMENT FORMAT?

A candidate is **not** a Skill merely because a learner can perform an observable action. A **Question / Practice task** is an instance of eliciting evidence; a **Skill** is the independently meaningful knowledge or capability such tasks are intended to assess. One Skill can be assessed by many question types, and one Question can draw on several Skills. A change of UI, visual medium, content example, or response format does not by itself establish an additional competency.

**Non-negotiable escalation:** If a proposed or existing Skill could instead be (a) sorting/matching/ordering/drag-and-drop, use of a key or diagram, or another Question/Scene procedure, (b) a comparison of two already defined concepts, (c) a narrower example of a broader Skill, or (d) a generic transferable procedure with a subject-themed example, the author **must raise a specific question for explicit human editorial review**. The author may recommend an outcome but **must not independently finalize** its creation, removal, renaming, merging or placement, even when the author is confident in that recommendation.

**Evidence to present:** candidate title and location; concrete Question/Practice example; underlying disciplinary knowledge; existing Skill(s) the task might assess; whether the capability would remain independently assessable with a different interaction; and alternative outcomes (**retain a standalone Skill / assess using existing Skills via Question / cross-subject Skill / further research**). Ask the editor which option to approve. Until the editor answers, mark the candidate `PENDING EDITOR DECISION`, preserve existing approved IDs, and block dependent code generation or claims of final taxonomy approval. See the mandatory gate in [Create Skills Taxonomy](../../skills/skill-taxonomy-workflow/create-skills-taxonomy.skill.md).

**Biology editorial precedent (2026-10-29):** “Group mammals and reptiles into piles”, “choose a grouping criterion” and “apply a simple identification key” were removed as _separate Biology Skill IDs_, not as learning activities. Their Questions can assess existing animal-identification Skills. “Compare selection and genetic modification” reuses the two respective concept Skills; a predator-removal scenario can assess ecosystem interdependence. **Do not generalize this into an automatic ban on classification, identification keys, comparison or modeling:** a genuinely independent disciplinary competence may justify its own Skill if the editor approves the evidence.

## EDITORIAL SLUG

New-format Skills have one English `Slug: lowerCamelCase` immediately beneath their heading. A Skill slug must be unique among **all Domain, Group and Skill slugs in the textbook**, including unrelated parents and entity kinds. An approved slug remains stable across name/translation changes; it is a required `Skill_Config.slug` field distinct from the UUID. Preserve existing Code paths and UUIDs without silent renaming.

## CLASSIFICATION, REFERENCES AND OWNERSHIP

### Textbook-local Skill identity

- Each textbook owns an **independent Skills Taxonomy and Skill identities**. The same or semantically similar competency **may occur in multiple textbooks**, each with its own Skill entity and stable ID; cross-textbook similarity is not an error.
- **Do not require shared Skill UUIDs, a central registry, synchronization, canonical global deduplication or cross-textbook progress analytics.** These are not prerequisites for creating or implementing a textbook.
- **Within each textbook**, continue checking for redundant Skills, unclear splits/merges, atomicity and stable identities. Cross-textbook duplication permission does **not** authorize needless duplication within one taxonomy.
- Cross-subject lessons may draw on material from several textbooks without asserting globally unified Skill identity or a combined learner-mastery record.

- A Skill has exactly one primary catalog parent: ordinarily a SkillGroup, or directly a SkillDomain, including one that also contains Groups. It may be referenced across Lessons, Questions, Practice, Curricula, Programs and analytics without duplicate ownership.
- A multi-Skill Question does not automatically establish separate mastery evidence for each referenced Skill. Assessment attribution and scores belong to assessment/progress entities.
- Curriculum/Program owns sequencing and prerequisites; the taxonomy owns classification and conceptual descriptions.
- Age, school grade, teaching instructions, difficulty, exercise format, prerequisites, learner history, outcomes and scores are **not Skill fields**.
- UUID identity stays stable across changes to presentation, file path or translations. Semantic splits/merges may require explicit migration planning.

## CANONICAL PEDAGOGICAL SOURCE

Before promotion, `<PackageRoot>/docs/skills/taxonomy.md` is the **editorial staging definition** of the Skill: its human-readable heading, substantive non-duplicative explanation and place in the Domain → Group → Skill hierarchy (or the approved direct Domain → Skill exception). New-format records place `Slug:` immediately below the heading, then the implementation link and the separate single-line `Methodological description:` (English) and `User-friendly description:` (default `[Not authored]`) fields. Unlabeled prose is legacy and requires approved migration; there is no generic `Description:` label. New-format records also contain `Action: skip|create|update|delete` (future generator intent) and `Status: pending|implemented` (verified Code state), neither of which is an extra Engine `Skill_Config` field. There are no per-Skill `*.skill.md` Definition files and no independent `Status` field.

Do not copy a Skill heading into its description. Explain the subject-specific competency, scope, conceptual boundaries, and meaningful distinctions from neighbors. A concrete example may clarify what is included, but does not become a separate competency or assessment method.

Engine `Skill_Config` contains stable `id`, fully localized `name`, and required `description: { methodological: string; frontend: Readonly<Record<LanguageCode, string>> }`. A promoted Skill **must** have reviewed English `methodological` text and genuine `frontend` translations for every supported language; absent, partial or fallback frontend text blocks promotion. Code then becomes the canonical pedagogical meaning. `methodological` is not constrained to UI brevity; `frontend` is user-facing copy, never a second authoritative definition. The Engine configurator returns `config.base` and `config.locales()`; the sparse JSON publisher adds `collection`, and source-file location belongs to separate indexing work.

The staging taxonomy contains one standalone implementation link per outstanding entity to its verified canonical `*.data.ts` file (full filename displayed); otherwise it contains exactly `[Not implemented](#)` without a field label. UUID literals belong in each entity's `*.data.ts` and must remain stable across updates; there are no separate identity dictionary files.

**Canonical Code location:** `<PackageRoot>/data/skills/`, outside `src/`, as static textbook authoring configuration. Mathematics already follows this layout; migrate other textbook packages only when their approved workflow permits it. New [Lesson](./lesson.md) Briefs use relative Skill-file links targeting this layout, with full `.data.ts` basenames as link labels. Mark pre-migration links pending rather than reverting their paths to `src/`; verify file existence once the move is complete.

Related entities: [SkillGroup](./skill-group.md), [SkillDomain](./skill-domain.md).
