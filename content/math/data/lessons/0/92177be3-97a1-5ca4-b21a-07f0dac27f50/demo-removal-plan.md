# Remove the temporary demonstration Section from the Math Lesson design fixture

**Status:** planning-only integration PR for the **hand-edited #557 branch**. Target: `lesson-creation-workflow-test`, **not `main`**, because the demonstration Section exists only in PR #557's unpublished Lesson tree.

## Current fixture

`content/math/data/lessons/0/92177be3-97a1-5ca4-b21a-07f0dac27f50/` contains an intentionally illustrative `sections/demonstrationalSection/` tree with temporary Checkpoint, Carousel, Audio, Image, Video, Youtube, Code and Subtitles examples. `sections/index.ts` currently imports and lists `demonstrationalSection`. A corresponding `content/math/static/demonstrationalSection/` folder contains demo media. This is **not** approved learner content.

The rest of the fixture remains deliberately incomplete for specialist content/translation/Scene/media/Review work. This cleanup must not reframe incomplete TypeScript as an implementation defect; the draft scaffolder is designed to leave pending resources unresolved.

## Dependencies

- [#574](https://github.com/KiT-Maverik/svitlo/pull/574) and [#575](https://github.com/KiT-Maverik/svitlo/pull/575) establish final nested Checkpoint/Carousel structure, but the demo itself should eventually be removed regardless.
- Stage 7 Lesson Builder integration acceptance must verify the final builder before cleanup/fixture acceptance.
- Coordinate with parent [#557](https://github.com/KiT-Maverik/svitlo/pull/557); never direct a PR deleting those files at `main`, where they are not merged.

## Later implementation tasks

- [ ] Re-fetch current parent branch and its latest changed-file inventory; protect independently authored changes to legitimate Sections.
- [ ] Remove `sections/demonstrationalSection/**` and the imported `demonstrationalSection` from `sections/index.ts` collection items and order. Preserve the four genuine learning Sections, their IDs, slugs and ordering.
- [ ] Inventory `content/math/static/demonstrationalSection/**` and any duplicate media staged elsewhere; delete only demonstrably unreferenced temporary media (and associated references/imports), without touching referenced approved assets.
- [ ] Search for references to removed slugs/assets in Lesson source, YAML, Scene registry, static package staging, tests and Studio. Do not edit `config.yaml` merely because the fixture had a manually added demonstration Section; compare the actual source contract first.
- [ ] Fix only demonstrably incorrect **relative imports** in retained manually edited modules. Preserve intentional TODOs / unresolved expressions, missing source-locale resources and missing approvals by design; no fake exports or TypeScript suppressions.
- [ ] Verify no demonstration references remain, original Lesson IDs/slugs and pedagogical Sections remain unchanged, and the fixture is still explicitly Draft until remaining content dependencies/approvals are complete.
- [ ] Delete this temporary planning file before completing this PR; it is a working handoff, not a permanent Lesson resource.

## Acceptance

This branch's final diff against parent #557 deletes only disposable demonstration source/assets and necessary imports/order references, plus any explicitly in-scope correction of outdated imports. Do not treat a fully green typecheck of the intentionally unfinished Lesson as a cleanup acceptance criterion. Check parent branch ownership and independent review before any merge.

## Coordinator handoff

Implementation belongs in another chat. Agents may open Draft subtask PRs targeting `integration/lesson-fixture-finalization`. This integration PR must first merge into `lesson-creation-workflow-test`, not directly into `main`. The parent #557 remains Draft unless the owner later authorizes promotion.
