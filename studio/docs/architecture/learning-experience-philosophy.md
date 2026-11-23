# Learning Experience Philosophy

**Status:** product vision and design invariants; individual mechanisms vary in implementation maturity.

## We build a learning ecosystem, not a content viewer

Svitlo is **not** a pipeline of “read an article → watch a video → click the correct answer”. These may be valid _ingredients_, but **not** a sufficient definition of learning. The system should provide the explanations, worked examples, manipulable representations, targeted practice, retrieval opportunities, feedback, review materials and accessible alternatives needed to reach the intended learning objective.

The experience should help learners move through multiple distinguishable levels of capability:

1. **Encounter and recognize:** identify the concepts, vocabulary, examples and models.
2. **Remember and retrieve:** recall key information without only rereading it; short [Lesson Notes](./lesson-notes.md), deliberate recall, flashcards and later review can support this.
3. **Explain and understand:** describe relationships, predict what happens and identify why an answer or behavior is correct.
4. **Apply and practice:** use knowledge in exercises, simulations, interactive manipulations, problems and coding activities when relevant.
5. **Analyze and transfer:** compare cases, diagnose misconceptions, use knowledge in novel settings and distinguish conditions under which a model applies.
6. **Create, adapt and improvise:** combine or flexibly apply learned concepts to construct an explanation, solution, model or project.

These are **design goals**, not a claim that every Lesson must implement six hardcoded stages, a universal mastery score, or a particular educational taxonomy. Adapt activities to audience, subject and intent. Do not claim that exposure, a single answer, participation, or completed sections proves long-term mastery.

## Instructional rhythm: make knowledge visible and usable

Prefer meaningful cycles such as **question/prediction → concise explanation → demonstration/model → learner manipulation → feedback → reflection → retrieval/transfer** where appropriate. An “illustration” may be a visualization, virtual lab, animated analogy, 3D model, simulation, interactive graph, sound comparison or physical demonstration, **not merely an image**.

- Use modern browser capabilities when they **materially improve understanding**. A manipulable model of a solar system, dynamic graph or virtual experiment may be a better explanation than paragraphs; a short accessible text may sometimes be better than 3D.
- Give learners control over pacing, repetition, parameters, pause/reset and meaningful feedback.
- Avoid decorative animation overload, gamification without learning value, compulsory passive watching, artificial clicking quotas and unbroken Markdown walls.
- Build in retrieval practice, worked examples, progressive fading of scaffolding, spaced-review **opportunities**, interleaving where warranted, and metacognition. The **actual review scheduler, evidence model and analytics must be verified**, not asserted to exist.
- Treat “biohacking” as an ambition to apply **evidence-informed cognitive and learning science**, **not** an excuse for unproven neuro-performance or guaranteed-learning claims.
- Offer multiple modes of engagement, representation and expression where learners need them; preserve the core learning opportunity for people with disabilities and on slower devices.

## Entities and roles must stay distinct

- **Methodologist:** defines what is true, what is in scope, prerequisites, outcomes and Skills.
- **Educational Screenwriter:** designs how the learner encounters, visualizes, manipulates, practices and understands that approved material; produces an instructional Lesson Script and standalone Scene Specifications.
- **Assessment Architect:** defines how to validly assess capability, questions, scoring and evidence; an interaction is not automatically valid assessment.
- **Coding Agent:** implements approved specs, tests and platform integration faithfully.

**Lesson:** a self-contained, Program-neutral educational resource with its own instructional sequence. It is allowed pedagogical storytelling, suspense, experiments and reveal; it must **not** depend on an external mascot/adventure.

**Section:** an ordered component of a Lesson. **Resource/content block:** a typed item contained in a Section, with its own renderer-specific behavior. **Program:** a separate personalized or narrative learning journey that may use and enrich multiple Lessons without forking their factual content. **Skill:** an atomic, separately assessable classification; it is not the Question, the Lesson, or evidence of mastery.

A Lesson can teach many Skills; a Question can reference multiple Skill IDs. A multi-Skill question alone does not imply a combined third Skill or independently valid mastery for all referenced Skills.

## Sources, review and quality

Educational claims must be accurate and sourceable; analogies, scales and simulations must clearly state material simplifications. Audience-native language should be concrete, friendly and respectful, never academically opaque or patronizing. **Accessible, localized, low-bandwidth and offline use are fundamental**, not optional afterthoughts.

**Related:** [Typed content](./git-first-typed-content.md), [Access & localization](./internationalization-and-accessibility.md), [Offline](./offline-first-and-device-compatibility.md), [System boundaries](./system-boundaries.md), [Nextgen Lesson Skill](../../skills/lesson-workflow/create-lesson-flow.skill.md).
