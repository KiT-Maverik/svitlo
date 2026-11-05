# Art Skills Review — AI Integration

This document coordinates the Art Skills translation review across four independent agent PRs. The canonical source remains `content/art/data/skills/` and the final umbrella PR targets `main`.

## Agent contributions

| Agent | Assigned languages                       | Pull request                                               |
| ----- | ---------------------------------------- | ---------------------------------------------------------- |
| 1     | `qm`, `uk`, `pl`, `de`, `es`, `hi`, `et` | [#170](https://github.com/KiT-Maverik/svitlo-web/pull/170) |
| 2     | `zh`, `ja`, `ko`, `vi`, `pt`, `ta`, `lt` | [#169](https://github.com/KiT-Maverik/svitlo-web/pull/169) |
| 3     | `ar`, `ur`, `fr`, `bn`, `id`, `mr`, `lv` | [#167](https://github.com/KiT-Maverik/svitlo-web/pull/167) |
| 4     | `he`, `te`, `be`, `ka`, `kk`, `tr`, `ms` | [#166](https://github.com/KiT-Maverik/svitlo-web/pull/166) |

All four PRs target `review/art-skills-review-ai-review` for integration. Keep the umbrella PR in draft until final verification.

## Integration gates

1. Verify that each agent completed all 374 Art entities in each of its seven assigned languages; review corrections and documented uncertainties.
2. Confirm **no** `.agent-ci-artifacts/` files enter the integration branch. Generate/cleanup is managed in the individual agent PRs, and cleanup must be verified before merging any agent changes.
3. Merge agents with field-level conflict resolution: preserve independently edited locale values in shared `*.data.ts` files; never replace an entire localization dictionary with a stale version.
4. Verify the final diff changes only authorized `name.<locale>` and `description.frontend.<locale>` entries, apart from this coordination record. Preserve English source and all identifiers/structure.
5. Build required shared workspaces and run `npm run typecheck --workspace @svitlo/art`; run relevant checks and record actual CI outcomes. An `action_required` check is not a passing check.
6. Human-review the umbrella PR and merge **only** that PR into `main`.

Do not interpret this coordination record as proof of completed linguistic review or green CI. The agent PR descriptions and verified checks contain the evidence of completion.
