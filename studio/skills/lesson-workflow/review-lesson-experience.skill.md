# Review Lesson Experience

**Persona:** independent [Learning Experience Expert](../../personas/learning-experience-expert.persona.md). **Coordinator:** [Create Lesson Flow](./create-lesson-flow.skill.md), Stage 4. Read the exact latest source SHA of complete `lesson.yaml`, its nested `production` specs, methodology, independent Content Review and actual renderer capabilities. Historical `content.yaml` or mandatory Issue-only input rules do not apply to new Lessons.

Inspect every Section and proposed Scene/media/Quest for learning value, purposeful feedback, pacing, motivation appropriate to the audience, cognitive load, keyboard/touch/screen-reader/semantic RTL/reduced motion, captions/transcripts, offline and low-device alternatives and feasible implementation. Flag pointless compulsory interaction, vague/nonimplementable scripts, inaccessible paths and unreviewed curriculum/assessment assumptions. Quest may be draft-only; do not claim shipped runtime behavior.

Independently document specific affected nodes, reviewed source SHA, severity, evidence, actionable corrections, role, verdict and next actor **in Lesson PR**. The Screenwriter owns edits; changed source invalidates affected reviews. A passing opinion is not an invented approval token or `review.ts` Props evidence. Do not self-approve or change YAML statuses.

## Detailed experience audit criteria

Evaluate **every** Section and its ContentBlocks, not only the introduction:

1. Alignment with goals and learner readiness: coherent concept progression, minimal misconceptions, audience-native explanations and appropriate cognitive load.
2. Evidence-informed instructional effectiveness: purposeful explanation, worked examples/fading, prediction and exploration, opportunities for feedback/retrieval/application/transfer when warranted, useful learner control and appropriate pacing. Do not impose a universal recipe.
3. All actual ContentBlock types: `text`, `markdown`, `checkpoint`, `code`, `audio`, `video`, `youtube`, `image`, `carousel`, `scene`, `subtitles`. Subtitles is a new Build-only ContentBlock; review production readiness honestly until its renderer and YAML handoff exist. Verify their pedagogical role and actual support, identify better options if justified; a `checkpoint` does not count as a scored Quiz, and a Quiz is a Section, not a block.
4. Modern and interactive experiences: whether diagrams, simulations, manipulable models, narrative pacing, multimedia or custom Scenes materially improve understanding; distinguish feasible from speculative or missing implementation.
5. Motivation and gamification: intrinsic engagement and meaningful challenge; flag distracting decoration, reward pressure, overstimulation or artificial clicking quotas.
6. Accessibility and localization: alternative interaction modes, readable text, keyboard/touch/screen-reader, accessible feedback, semantic LTR/RTL, captions/transcripts, motion control, offline/weak-device equivalence. Check that `production.documentLanguage` is actual authored copy and other planned locales are not invented.
7. Production readiness: media `production` specifications, pending Scenes, interactions and Quiz/assessment dependencies are explicit and actionable. Missing assets are _legitimate planned production work_ when clearly identified; they must not masquerade as available assets or be treated as missing pedagogical design by default.

## Quest plan review (draft-only runtime boundary)

For proposed `type: quest` Sections, consult [Quest](../../docs/entities/quest.md) and inspect each Stage/Task branch, retry and completion path. Verify learning value of interventions, understandable failure feedback, no trap/loop without recovery, meaningful engagement without forced entertainment, and parity for captions, transcripts, narration, nonvisual Task controls, touch/keyboard, RTL, cognitive load, reduced motion and offline. Review Quest proposed media and Scenes as _planned_ resources, not working renderer behavior. Flag missing Quest runtime integration as a production dependency; do not conflate Task completion with a graded Quiz.

## Independent review matrix

For each actual Section and its nested blocks, assess: (1) fit to learner readiness and explicit outcomes; (2) effectiveness of worked examples, prediction/exploration, feedback, retrieval, application and transfer **when pedagogically justified**, without imposing a universal interaction formula; (3) appropriate navigation, autonomy, cognitive load and pacing; (4) coherence with the surrounding Section and neutral standalone Lesson; (5) feasibility of **all** authored Scene/Quest/media scripts, required assets and feedback states; (6) accessible keyboard, touch, screen-reader, semantic RTL/LTR, reduced-motion, captions/transcripts and offline/low-powered equivalents.

A well-specified pending Scene is permitted during editorial review if clearly labelled **not yet implemented**; an inaccessible or contradictory planned learning path is not. Review every entry point, failure/retry/recovery path, and any proposed Quiz/assessment dependency without claiming unverified runtime availability. Reports distinguish **blocked design**, **approved design awaiting production**, and **actual implementation**. Do not treat asset absence alone as proof that the learning experience is poorly designed.

For a batch of independently ready Lessons, evaluate each separately and preserve source-revision-specific evidence; a blocked Lesson must not silently prevent evaluating another ready Lesson. This is an independent review role, not authority to rewrite Screenwriter-owned YAML or approve one's own revisions.
