# Regional Lesson Variants in Programs

**Status:** Proposed — backlog only; NOT implemented or approved as a runtime contract.
**Area:** curriculum / programs / internationalization
**Priority:** Product design review before any Program selection or persistence implementation.

## Goal

Enable an international Svitlo Program to **recommend or let the learner/teacher select optional Lessons with regionally relevant examples**, without duplicating universal competencies or inferring a learner's residence solely from the interface language. E.g., the same Biology Skill «Розпізнавати поширених місцевих тварин» may be taught using wildlife from Ukraine, Israel, or an explicitly selected region in North/South America.

## Desired behavior (proposal)

- Separate **UI locale (language/translation)** from **study region, country or local ecosystem**. `uk-UA` does not prove that a learner lives in Ukraine; `en-US` does not prove US residence. No geolocation is required.
- Provide a **user-/teacher-/guardian-editable study region or educational context**. The interface locale may offer an **optional, transparent, reversible starting suggestion**, not silently lock the choice. Programs can ask at the start or present a default with alternative Lessons.
- Allow several **Lesson variants/alternatives to serve the same underlying Skill IDs and core learning outcomes**. Mark them as optional alternatives in Program/Curriculum composition; distinguish essential competency from region-specific examples or elective national knowledge.
- Ensure sensible **neutral/global fallback** if no regional variant exists, so learners can still reach the intended competency. Do not duplicate whole textbooks or generate distinct Skill IDs per country.
- Maintain **all required platform locales, accessible text and equivalent pedagogical coverage** for every published Lesson variant. Region targeting is NOT permission to skip translations.
- Define learner-facing discoverability and how changing study region affects recommendations, already-completed Lessons, elective variants and completion/progress. Do not silently discard recorded learning.
- Prefer specific, pedagogically meaningful regions (a country alone may be too coarse for local biodiversity); teacher overrides and explicit selection may supersede locale-derived suggestions.
- Avoid claiming an existing Engine/Program capability: selection rules, persistence, indexes, curricula references, substituted Lesson IDs and analytics have not yet been verified or specified in code.

## Design questions to resolve before implementation

1. Which entity owns variant alternatives and applicability: Program, Curriculum module, Lesson metadata or a separate mapping? Inspect the **actual current contracts**; do not invent fields without an approved schema.
2. How does an author declare a neutral default, an optional regional variant, country vs subnational coverage and overlapping regions?
3. Should recommendations use only an explicit preference, locale as a nonbinding hint, or a short learner/teacher prompt? How are choices persisted and changed?
4. How do Programs treat prerequisite ordering, shared Skill outcomes, completing one variant vs several, assessment equivalence and progress when a region changes?
5. What is the fallback for unsupported regions, missing variants or offline use? How are required translations kept complete independently of region applicability?
6. What privacy/age considerations apply to region preferences (no implicit location tracking), and what UX is appropriate for younger students?

## Suggested acceptance criteria for a future implementation PR

- An approved, documented Program data model supports optional alternatives and a clear fallback without inventing regional Skills.
- Learner/teacher can view and change the proposed study region; interface locale never acts as a hard geographic filter.
- Unit/integration tests cover default, user override, missing variant, multiple regional matches, cross-locale display, offline behavior and progress preservation.
- A shared canonical Skill remains the reference for all pedagogically equivalent regional Lesson variants.
- All standard text/accessibility locale translations remain required.
- Engineering, analytics, privacy and accessibility assumptions are validated against source code before claiming the feature complete.

**Implementation note:** This file is a **future design and implementation To Do**, not authorization to modify Program, Lesson, Engine or database code in the Biology documentation PR.

**Related proposals:** [Subject Proposition](../../Subject%20Proposition.md) (§12в), Create Curriculum Skill (proposed workflow), [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md).
