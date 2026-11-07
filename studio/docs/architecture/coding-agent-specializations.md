# Coding Agent Specializations

**Status:** recommendation for **task-specific Skills**, not separate permanent personas and not proof of implemented functionality. Coding Agent remains a single engineering persona; a specialist Skill is loaded **only for a task that needs it**.

## Why a specialist Skill, not a larger persona?

The base [Coding Agent Persona](../../personas/coding-agent.persona.md) owns universal engineering habits: follow reviewed specifications, respect Svitlo's type/ID/component boundaries, test, localize, support accessibility and offline use, and report actual verification. Specialized technology, workflows and acceptance criteria belong in separate **skills/subskills** to keep unrelated requirements from polluting every coding task.

A new subskill is justified when it has a **distinct artifact**, substantial domain-specific knowledge/tooling, a specific reviewer/handoff, and quality gates **beyond generic coding checks**. It must not silently change the content owner's instructional authority.

## Already established

| Specialist Skill                                                                           | Engineering artifact                                                         | Scope and relation                                                                                                                                       |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Implement Scene](../../skills/lesson-workflow/implement-scene.skill.md)                   | Tested textbook-owned Scene React component and lazy registry                | Approved Screenwriter spec, typed response locales, source language only, accessible LTR/RTL, code TODO lifecycle; separate YAML builder and translation |
| [Create Remotion Video](../../skills/create-remotion-video.skill.md)                       | Programmatic video/composition, optional Player Scene, Full HD/Story exports | Frame-based animation and video, composed with Implement Scene when embedded in a Lesson Scene                                                           |
| [Implement Skill Code](../../skills/skill-taxonomy-workflow/implement-skill-code.skill.md) | Strictly typed SkillDomain/Group/Skill source and ID registration            | Content data generation, stable UUIDs, complete locale dictionaries, taxonomy import boundaries                                                          |

## Recommended future specialist Skills (not created here)

| Priority        | Candidate                                       | When to use / unique acceptance contract                                                                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **High**        | **Build Interactive Simulation / Virtual Lab**  | Advanced 2D/3D scientific manipulation, geometry, coordinate systems, simulation model invariants, deterministic input/state, physics/data validation, keyboard/accessible alternatives, low-end/GPU strategies; composes with **Implement Scene** rather than replacing its typed locale props contract     |
| **High**        | **Build Question Generator**                    | Seed-based deterministic variant generation, typed parameters, constraints, no impossible states, exhaustive/representative validity checks, answer invariant and discrimination tests; requires an **approved Assessment specification**, not generative guesses about correctness                          |
| **High**        | **Build Offline PWA & Content Delivery**        | Install/update/download/offline-readiness flow, complete lesson dependency graphs, Service Worker/Cache API/media caching, IndexedDB, cache eviction/storage quotas, version migration, offline E2E and optional sync; preserve every required educational asset and learner state                           |
| **Medium–High** | **Implement Accessible & Internationalized UI** | Deep RTL/BiDi/SVG semantics, screen-reader/keyboard interactions, cognitive/motor alternatives, language completeness, localized audio/captions, practical assistive-tech and device testing; **cross-cutting duty still remains mandatory even without this specialist Skill**                              |
| **Medium**      | **Build Learning Content Pipeline / Validator** | Git source-to-delivery builds, typed §*.data.ts§ checks, UUID/reference integrity, content manifests, approved localization coverage, asset links, per-textbook extraction and build-time failures. Adds explicit registry validation **only when implemented**, not as a fake promise from current builders |
| **Medium**      | **Build Question/Assessment Widget**            | Dedicated UI for approved Question kinds, accessibility, response state, localized feedback, keyboard/drag alternatives and controlled retry flow; **does not** create Assessment-Architect-owned grading/evidence rules                                                                                     |

## Composition and routing

- **A video with no custom learning interaction:** Coding Agent + **Create Remotion Video**.
- **An interactive video in a Lesson:** Coding Agent + **Implement Scene** + **Create Remotion Video**, preserving the current typed Scene root's locale response API.
- **A manipulable simulation with animated portions:** Coding Agent + **Implement Scene** + later **Interactive Simulation** Skill; Remotion only where a frame-based video/timeline adds genuine value.
- **A randomised math exercise:** later **Build Question Generator**, with an approved Assessment specification and deterministic model; optionally another UI specialist if a new renderer is needed.
- **An offline-ready textbook:** later **Offline PWA & Content Delivery**, independent of the authored Scene/Video's pedagogical design.

**Do not create multiple subskills merely because a task mentions several technologies.** Load the minimum set needed for the current engineering artifact. Split by **distinct quality gates and ownership**, not by individual libraries, UI components or file extension.

## Further open decisions

- Confirm which future specialties warrant permanent Skill files **based on actual implementation demand**, especially 3D simulation and offline delivery.
- Decide target-package ownership of reusable video compositions and 2D/3D scene engines without an app-to-app dependency.
- Reuse [Remotion's official Agent Skills](https://www.remotion.dev/docs/ai/skills) as a versioned _technical reference_ when appropriate; Svitlo's **educational, offline, accessibility and approval constraints** remain higher-priority.
