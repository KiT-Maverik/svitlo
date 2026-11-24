# Create Episode Flow

**Scope:** one Course-owned Episode and one entity-owned Draft PR. Follow root AGENTS.md, [GitHub labels](../../rules/github-labels-and-naming.md), [CI policy](../../rules/ci-workflow.md), [Episode](../../docs/entities/episode.md), [Course](../../docs/entities/course.md), [Section](../../docs/entities/section.md), [typed production](../../docs/architecture/typed-production-materialization.md), and [inclusive access](../../docs/architecture/internationalization-and-accessibility.md). Inspect the actual Engine Episode, Section, Block and event contracts, publication and host support before authoring. Quest runtime is not implied by its Build-only contract.

## Identity and authorization

Start only when the owner authorizes the exact Episode placement and parent Course PR. Read the verified Course Stage 5 committed inventory and original reviewed plan; resolve the immutable Episode UUID, owning Course UUID, full ordered placement, source language, planned locales and actual path. Review preceding/following placements and relevant entry/exit dependencies. Do not duplicate the Course plan or invent an Episode UUID, alter independently owned Lessons, or start Episode PRs automatically.

Reuse an existing Episode PR for that identity and parent; otherwise open one Draft PR targeting the verified immediate owning Course branch, with the textbook scope, `work: episode` and `pr: agent-subtask`. The path-specific Episode source is `draft.ts` until materialization, then `index.ts` and its owned modules. Keep `config` and `production` separate. Do not edit an editorial draft as a runtime Configurator, use YAML, or put Lesson Skills/Question Banks/Flashcard Banks in Episode ownership. Changes needed to the parent composition must be limited to the exact reserved placement.

## Canonical stages

| Stage                         | Responsible role                                                                   | Completion evidence                                                                                                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Design Episode Scenario    | [Educational Screenwriter](../../personas/educational-screenwriter.persona.md)     | Complete scenario: approved focus/purpose, audience, continuity, entry/exit situation, scene and interaction intent, accessibility and narrative constraints.                                            |
| 2. Create Episode Content     | Educational Screenwriter                                                           | Complete source-language typed editorial object: ordered supported Sections/Blocks, dialogue, supported events, Scene specifications and explicit media requirements.                                    |
| 3. Review Episode Content     | Independent qualified Content Reviewer                                             | Different agent/context from authoring, full source review and in-scope corrections in the same PR; final SHA and verdict.                                                                               |
| 4. Review Episode Experience  | [Learning Experience Expert](../../personas/learning-experience-expert.persona.md) | Continuity, pacing, age fit, accessibility, interactions and actual runtime feasibility reviewed; bounded inline corrections and final SHA.                                                              |
| 5. Materialize Episode        | [Coding Agent](../../personas/coding-agent.persona.md), authorized trusted CI      | Exact reviewed typed source transformed to deterministic, valid modular Configurators and derived specification. Atomic draft deletion, original placement integration and explicit unresolved blockers. |
| 6. Complete Episode Resources | Coding Agent                                                                       | Resource wiring, implemented/registered/tested Scenes, accessibility equivalents, precise media requirements and references.                                                                             |
| 7. Translation                | [Technical Translator](../../personas/technical-translator.persona.md)             | Genuine complete Episode-owned locales and localized resource plans in the same PR.                                                                                                                      |
| 8. Translation Review         | Independent Technical Translator                                                   | Different agent/context, verified source-derived locale scope, corrections in same PR and pinned final verdict.                                                                                          |
| 9. Media Generation           | Human                                                                              | Actual required media produced/provided and verified; human-confirmed completion or explicit justified N/A.                                                                                              |
| 10. QA                        | Human                                                                              | Human inspection of running Episode in Course context and explicit verdict at tested revision. Mandatory.                                                                                                |

### Stages 1–2: authoring

Use the approved Course slot rather than re-deciding the Course curriculum. Stage 1 replaces the handoff type with `EpisodeWorkflowStage1`, preserving immutable identity and production context. Stage 2 advances the same object to `EpisodeWorkflowStage2` and the final reviewed source must explicitly satisfy `EpisodeWorkflowMaterializerInput` from Engine Build. Specify dialogue and interaction in a coherent narrative arc with concrete learner-facing language, prior and next narrative state, intended choices and supported event effects. Validate keys, order, identity, actual supported Section/Block discriminants and source locale. Document unsupported runtime dependencies; do not emulate unsupported Quest or branching state by hiding it in a ContentBlock. Explicitly specify media purpose, required asset kind, locale dependence, transcripts/captions, alternative text and offline/low-device equivalents.

### Stages 3–4: review

Stage 3 starts in a distinct context. Record baseline commit and source blob SHA, exact node paths, findings, severity and required action in the Episode PR. Correct authorized in-scope defects, reread the complete corrected source and record final commit/blob SHA and verdict. Stage 4 is a specialist experience audit, not a second independent content review; it may make bounded corrections inline, preserve Stage 3 historical evidence, and pin its actual final source. Escalate Course-intent changes or unresolved runtime dependencies. Neither stage authorizes materialization or merge.

### Stages 5–6: implementation

Obtain distinct owner authorization for trusted Stage 5 after accepted reviews at the actual source revision. Follow the [trusted Episode Stage 5 runbook](../../../scripts/ci/episodeMaterialization/README.md). Verify the Episode-specific trusted workflow is deployed before invoking it; if not, report the deployment dependency. Never execute candidate source or bypass the trusted gate. Verify the exact generated commit, stable UUID, original order, approved owned files, deterministic output, consumed draft deletion and semantic Engine validation. Git history and PR evidence preserve the reviewed draft. Materialization is not publication.

At Stage 6 implement typed resources and Scenes using [Implement Scene](../lesson-workflow/implement-scene.skill.md). Register and test Scenes in the actual owning package, verify interactions and alternatives, and prepare precise media handoff. Keep unresolved resource `TODO (BLOCKER):` markers until genuine completion. Never invent assets, reserve fabricated passing review values, or treat a path alone as a real file.

### Stages 7–8: localization

Apply [Technical Translation](../translation-workflow/technical-translation.skill.md) and [Review Translation](../translation-workflow/review-translation.skill.md) to Episode-owned fields only. Course Stages 6–7 own Course/Module/Chapter text. Use the existing Episode PR, exact locale inventory and verified source-derived reference artifacts from `/agent-artifacts generate episodes content/<book> <course-uuid> <episode-uuid> <locale>`; missing Episode scope or reference generation is a hard stop. Review localized text and media scripts/planned paths; do not require not-yet-produced media bytes at Stage 8 or claim that they exist. Preserve actual locale evidence and final SHA; no translation or reviewer PR.

### Stages 9–10: human handoff

Stage 9 follows accepted translation review. For each requirement give a concrete purpose, media type, UUID filename/path, locale variants, final reviewed scripts, accessibility equivalents, provenance/licensing and verification evidence. Use the actual typed media Config locale fields and the existing textbook asset layout `content/<textbook>/assets/<kind>/<uuid>.<extension>`; inspect nonempty ordinary files (no symlinks), correct UUID/extension and each applicable locale reference. Check physical files, not just their references. The strict Course media projector checks file existence and format naming, but not human provenance/QA or media quality. The human explicitly records completion or justified N/A when no media applies. Keep all unresolved requirements open and do not infer approval from an automated result.

Stage 10 requires actual human inspection of the running Episode inside the owning Course: original placement and navigation, entry/exit continuity, dialogue, interactions and events, actual assets and Scenes, locales and accessibility. Record tested commit/build, environment, scope, explicit human verdict and defects. Agents may assist with reproduction and repairs, but cannot certify either human stage. If repairs affect already verified resources or locale evidence, reopen only affected gates. QA may never be N/A.

## PR tracker and resume

Initialize once in the existing Episode PR description and reconcile before each action:

```md
<!-- svitlo-episode-flow:v1 -->

- Episode UUID: <verified>
- Course UUID / parent PR: <verified>
- Textbook / ordered placement / source path: <verified>
- Source / planned locales: <verified>
- Last reconciled HEAD: <sha>
- Next authorized action: <action or required owner authorization>

- [ ] 1. Design Episode Scenario
- [ ] 2. Create Episode Content
- [ ] 3. Review Episode Content
- [ ] 4. Review Episode Experience
- [ ] 5. Materialize Episode
- [ ] 6. Complete Episode Resources
- [ ] 7. Translation
- [ ] 8. Translation Review
- [ ] 9. Media Generation
- [ ] 10. QA

## Evidence and handoffs

- <stage, owner, commit/blob, findings, actual checks, verdict, unresolved requirements>
```

Read current PR and branch, committed source, last accepted stage and evidence before resuming. Mark only verified authorized stages, with actual reviewer/human identity where required. Report completed work, exact evidence, unresolved blockers and the next action; do not auto-start another stage. Do not create competing Issues or status ledgers. Draft is active editing; Ready is the review/CI handoff after the assigned authorized work is complete, never permission to merge or fabricate human approval. Verify real current-head checks and publication readiness separately.
