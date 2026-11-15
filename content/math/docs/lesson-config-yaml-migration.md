# Mathematics Lessons → unified YAML source migration

**Tracking Issue:** [#535](https://github.com/KiT-Maverik/svitlo/issues/535) — immutable source scope and live per-Lesson status table.
**Integration branch:** `integration/math-lessons-unified-yaml`; **Integration PR:** linked from Issue #535, targeting `main`.
**Inventory baseline:** `main` commit `1ecb95fa89f1f9636977b1ec9213fbd9ea0e68c4`, lessons tree `34cd32c9afec58424d4d3467fe2a34aac06c87cf`.

## Owner decision — generation handoff (2026-11-14)

**All 109 migrated Mathematics Lesson `config.yaml` files are approved by the project owner as inputs to the YAML → TypeScript draft-generation stage.** This is authorization to use the migrated Config sources for draft generation; no generator, TypeScript build, Scene implementation, translation or publication has been executed as part of this migration.

Every Mathematics Lesson must declare **exactly four supported languages**, in this order: `en` (English), `pl` (Polish), `uk` (Ukrainian), `qm` (Crimean Tatar). This replaces the original provisional 29-language plan in agent handoffs. Currently only `en` source-locale copy is authored; do **not** fabricate `pl`/`uk`/`qm` translations or treat the four-language declaration as translation completion.

The legacy draft/provisional statements preserved under `production` remain source provenance. Generation readiness is **not** independent pedagogical approval, implemented Scene behavior, translated content, successful compilation, or publication approval. The owner separately resolves the former per-Lesson language ambiguity and authorizes generation from the YAML projection. Agents' historical decisions and test limitations remain traceable in their merged PRs.

**Integration state:** 11/11 assigned agent PRs merged into `integration/math-lessons-unified-yaml`; 109/109 canonical `config.yaml` sources created; 349/349 retired Markdown source files removed after their recorded migration checks. Parent PR #537 remains Draft and has **not** been merged to `main`.

## Exact scope

There are **109** existing Lesson UUID folders at `content/math/data/lessons/<bucket>/<uuid>/`; exactly **109** `content.md`, **109** `methodologist-brief.md`, and **131** `scenes/*.scene-spec.md` files (349 total). Every Lesson has a methodology and content draft and at least one Scene spec. No existing canonical `config.yaml`. The assigned UUID folders are frozen; do not add more Lessons or change identities.

This is **only** a source representation migration. A Lesson is complete for this task when it has **one** `config.yaml` containing the faithful meaning of the brief, content plan and Scene specs, and its source legacy docs have been safely deleted. Editorial status is not changed: sampled source documents are **provisional pending Methodologist approval**. Keep this provenance and do not imply independent approvals.

## Each agent's exact action

1. Read repository root `AGENTS.md`, `content/math/AGENTS.md`, `studio/rules/github-labels-and-naming.md`, the Coding Agent Persona, Lesson Workflow, entity specifications, and `studio/docs/architecture/yaml-config-scaffolding.md`. Read the current `shared/engine/yaml-schemas/lesson.scaffold.schema.json` and `production.schema.json`, plus the actual Engine Config contracts.
2. Work **only in the UUID folders assigned below**. For each, read all legacy `content.md`, `methodologist-brief.md`, `scenes/*.scene-spec.md` before authoring; inspect genuine target Skill `*.data.ts` UUID references when mapping `config.skills`.
3. Write a single strict, structurally complete `config.yaml` at that Lesson's existing UUID folder. Root: `config.id` equals the folder's original UUID, `slug` from the actual brief, `type: lesson`, full Engine-required fields, `production.documentLanguage` reflecting source language, `production.methodology` retaining the entire Brief with provisional state. Nested Section/Block/Scene objects have `{config, production?}` and fresh persistent IDs where newly needed. Collections use `items` and `order`, not ad-hoc arrays. Source-locale text only; do not fabricate translations, Quiz/Questions/Flashcards/Notes, approvals or content.
4. Preserve the full meaningful substance of the Screenwriter plan in actual Section/Block Config and supported `production` notes: learner text, exact mathematical facts, progression, feedback, interactive constraints, accessibility, RTL, offline requirements. Embed **every** old Scene spec in one or more corresponding Scene `production.specification` values with correctly preserved reuse/variants. Scene components do not yet exist. Do not create any generated `specification.md`.
5. The existing strict YAML schema requires actual required Config fields. Only documented not-yet-produced local media fields use literal `null` in YAML projections; never invent paths, set `null` on other fields or omit mandatory Config structure. `config.params.languages` must contain exactly `en`, `pl`, `uk`, `qm` (owner decision above). This is planned support, not a claim that translations exist; author only the actual `en` source locale until translation specialists supply the other locales.
6. **After** verifying lossless source coverage, remove the now-duplicate old `content.md`, `methodologist-brief.md` and `scenes/*.scene-spec.md` within your assigned Lesson only. Make rewritten links self-contained; keep editorial status/provenance and mathematical/source meaning. If safety or unclear requirements prevent lossless migration, retain source for that Lesson, explain the blocked item and do not claim completion.
7. Validate YAML parse with duplicate-key detection, required schema fields, UUID/slug consistency, slug-map/order integrity, unique nested IDs, Skill UUIDs, no dangling local links and no lost source requirements. Report actual verifications/blocked gaps on the agent PR.

**Explicitly forbidden in this campaign:** running Lesson Builder `generate` or `--check` (that expects TS), creating `*.data.ts` or any TypeScript, building Props, generating media/specification artifacts, implementing Scenes, adding translations, editing shared Engine/Skills/Courses, creating extraneous editorial YAML/Markdown files or editing other agents' folders. The user will generate TS manually later.

## Branch and PR hierarchy

- One issue (#535), one Draft integration PR to `main`, branch `integration/math-lessons-unified-yaml`.
- Eleven exclusive child branches are prepared from this integration seed commit (see below).
- Agent **N**: use **only** `agent/math-unified-yaml-NN`, create a **Draft PR** with `base=integration/math-lessons-unified-yaml`; **not** `main`. Apply `content: math`, `work: content`, `pr: agent-subtask`, `pr: migration`; say `Refs #535`.
- Agent PR includes a per-Lesson evidence table: legacy files consumed; generated `config.yaml`; deletion of all old docs; Scene specs embedded; Skill mapping; exact validation performed; unresolved editorial questions.
- Agents **do not edit this plan**, and must not concurrently rewrite Issue #535's 109-row tracker. Post completion/blocked updates as Issue comments. The integration coordinator verifies/merges each child PR into integration and updates the Issue tracker.
- No merging integration to `main` or closing Issue #535 without explicit owner authorization.

## Workload-balanced immutable assignments

Balanced roughly by source bytes, not arbitrary UUID order; 10 Lessons each for Agents 1–10, 9 for Agent 11. No overlaps. All paths below are relative to `content/math/`.

| Agent | Lessons | Scene specs | Approx source size | Child branch                 |
| ----- | ------: | ----------: | -----------------: | ---------------------------- |
| 1     |      10 |          12 |           ~271 KiB | `agent/math-unified-yaml-01` |
| 2     |      10 |          12 |           ~271 KiB | `agent/math-unified-yaml-02` |
| 3     |      10 |          11 |           ~268 KiB | `agent/math-unified-yaml-03` |
| 4     |      10 |          11 |           ~271 KiB | `agent/math-unified-yaml-04` |
| 5     |      10 |          14 |           ~268 KiB | `agent/math-unified-yaml-05` |
| 6     |      10 |          13 |           ~270 KiB | `agent/math-unified-yaml-06` |
| 7     |      10 |          11 |           ~270 KiB | `agent/math-unified-yaml-07` |
| 8     |      10 |          12 |           ~270 KiB | `agent/math-unified-yaml-08` |
| 9     |      10 |          11 |           ~268 KiB | `agent/math-unified-yaml-09` |
| 10    |      10 |          12 |           ~268 KiB | `agent/math-unified-yaml-10` |
| 11    |       9 |          12 |           ~255 KiB | `agent/math-unified-yaml-11` |

### Agent 1: 10 Lessons / 12 legacy Scene specs

Owned branch: `agent/math-unified-yaml-01`. The only editable source folders are:

- `data/lessons/7/002b07a2-8636-5305-96f5-8e2944cb00f7/` (1 Scene spec)
- `data/lessons/5/2fa0db7e-edca-5ddf-b1df-371f48895b55/` (1 Scene spec)
- `data/lessons/5/36361d75-1baa-5f3b-be84-2a5f6fb765f5/` (1 Scene spec)
- `data/lessons/9/3805c6f0-1ff4-58bf-9a69-ae2458e92159/` (1 Scene spec)
- `data/lessons/b/44a2d0f8-9f33-5612-8bd9-60cb919c442b/` (1 Scene spec)
- `data/lessons/b/60134b5f-6010-50ad-b0a6-adedff3f761b/` (2 Scene specs)
- `data/lessons/1/79197bd1-e0b8-5163-a944-76d0993a8d21/` (1 Scene spec)
- `data/lessons/7/94d6fb15-af14-5c8f-98e3-09a42dcf54d7/` (1 Scene spec)
- `data/lessons/c/9f72abac-c220-526c-82c5-d934e209aadc/` (1 Scene spec)
- `data/lessons/4/a6814b2e-1722-5162-b3e9-9486d1a2a914/` (2 Scene specs)

### Agent 2: 10 Lessons / 12 legacy Scene specs

Owned branch: `agent/math-unified-yaml-02`. The only editable source folders are:

- `data/lessons/3/315672f1-60f8-5b64-b80f-2c9eef978a83/` (1 Scene spec)
- `data/lessons/f/35d6d64d-ec29-541b-a620-6c529d53810f/` (1 Scene spec)
- `data/lessons/b/3b2eb4bd-894c-5494-93d6-b13cfa663d2b/` (1 Scene spec)
- `data/lessons/2/3b836ba8-cafa-517e-a34c-d7f341614012/` (1 Scene spec)
- `data/lessons/4/46f2da91-ffab-5f9a-a883-1ebf821daeb4/` (2 Scene specs)
- `data/lessons/2/5970a4da-d9db-575d-aacd-a5b8c4d61952/` (1 Scene spec)
- `data/lessons/0/9df3a906-42c2-5642-b673-f931ee7715a0/` (1 Scene spec)
- `data/lessons/0/d2dea276-52f2-5dff-b03f-2c25f420b530/` (1 Scene spec)
- `data/lessons/3/e54813fd-68c8-5452-ad2d-7f9361460703/` (1 Scene spec)
- `data/lessons/4/fe7b0c7d-4a98-55ef-adfd-326194aada64/` (2 Scene specs)

### Agent 3: 10 Lessons / 11 legacy Scene specs

Owned branch: `agent/math-unified-yaml-03`. The only editable source folders are:

- `data/lessons/c/1ff67a82-6c5d-53a6-bf25-89141153cd2c/` (1 Scene spec)
- `data/lessons/5/3c333ac4-b204-5b7c-9de0-14e490a87355/` (2 Scene specs)
- `data/lessons/b/5befd03a-2f0f-5c35-925f-8ff870c2d2db/` (1 Scene spec)
- `data/lessons/2/73e82909-fd8c-5cb0-9a5b-71ce0d30e8a2/` (1 Scene spec)
- `data/lessons/0/7ae51258-a161-568e-bf62-7bd626314ee0/` (1 Scene spec)
- `data/lessons/8/8387691e-0d66-587d-8a76-e8f138267f28/` (1 Scene spec)
- `data/lessons/e/a64cf435-b797-5cc4-a3bd-c6ed4cbcb98e/` (1 Scene spec)
- `data/lessons/f/b4f1ac99-15bc-5210-9011-88b7c60e55af/` (1 Scene spec)
- `data/lessons/1/c532544f-c02c-5d66-94fb-415359be4881/` (1 Scene spec)
- `data/lessons/c/e88f3f7e-a9fa-5b82-ac31-3227d2a3e5cc/` (1 Scene spec)

### Agent 4: 10 Lessons / 11 legacy Scene specs

Owned branch: `agent/math-unified-yaml-04`. The only editable source folders are:

- `data/lessons/8/14314883-9c16-5b1e-b79d-cf4f634bb048/` (1 Scene spec)
- `data/lessons/a/2673b210-7f91-53a8-a96f-ced6b387873a/` (1 Scene spec)
- `data/lessons/6/7efa8537-5066-5828-8139-2b48d1fea686/` (1 Scene spec)
- `data/lessons/b/8555d475-ca16-56fd-9736-9cdb9afdd9eb/` (1 Scene spec)
- `data/lessons/b/af4a07f9-2347-50cb-8514-1e14afc07b7b/` (1 Scene spec)
- `data/lessons/7/c5586734-72da-5f1a-a3d7-a9af45cb3217/` (1 Scene spec)
- `data/lessons/e/cc96d760-7f16-5b57-91fe-7e97e065084e/` (1 Scene spec)
- `data/lessons/f/e081471b-3246-57dd-b78f-cc2beafac52f/` (1 Scene spec)
- `data/lessons/2/e55acf3f-df47-5de8-a2a4-56f016b33bb2/` (2 Scene specs)
- `data/lessons/d/eb4355c6-353a-5f40-9001-3b8aabec949d/` (1 Scene spec)

### Agent 5: 10 Lessons / 14 legacy Scene specs

Owned branch: `agent/math-unified-yaml-05`. The only editable source folders are:

- `data/lessons/1/1a18f25b-5867-5e52-8433-e09d6cd7dc01/` (2 Scene specs)
- `data/lessons/a/531a26a7-98ce-5fa6-8a24-20624657d14a/` (2 Scene specs)
- `data/lessons/7/6d1b64f1-cae4-58d6-ada8-a637bc1ef937/` (2 Scene specs)
- `data/lessons/f/720df8f1-b2cb-55bb-ba1c-32b0b59543cf/` (1 Scene spec)
- `data/lessons/e/770bbeff-9398-5d1e-989a-15c51fe0bc0e/` (1 Scene spec)
- `data/lessons/0/79127c31-c218-5eaf-b366-c47b4a23ef60/` (1 Scene spec)
- `data/lessons/d/7eeabec8-2db7-5ffc-a4d2-3e477cb6e98d/` (1 Scene spec)
- `data/lessons/5/9a2f33ba-843f-5fdc-86cc-68a461110bd5/` (1 Scene spec)
- `data/lessons/d/ec19fc6b-050e-542d-94c8-d98120e914bd/` (1 Scene spec)
- `data/lessons/9/f1dbfd20-be32-5f09-8083-deacd8287a19/` (2 Scene specs)

### Agent 6: 10 Lessons / 13 legacy Scene specs

Owned branch: `agent/math-unified-yaml-06`. The only editable source folders are:

- `data/lessons/2/0de9cfa9-ea0a-5fe8-9f47-e3a32c076992/` (1 Scene spec)
- `data/lessons/1/48a9db53-36bd-5bb6-9c91-3b2203352531/` (1 Scene spec)
- `data/lessons/9/4cefc8c8-9469-5871-9964-4e15b90d5ab9/` (1 Scene spec)
- `data/lessons/0/5623d91b-ad3a-5d38-8423-561785a1c6b0/` (1 Scene spec)
- `data/lessons/2/70a13da2-1cb4-5cc4-b474-ade4a45fa1d2/` (2 Scene specs)
- `data/lessons/a/9a923984-2853-5b83-b2d3-50a3d6de90ba/` (2 Scene specs)
- `data/lessons/1/b3901353-a049-5613-a541-9c5eb090f6c1/` (1 Scene spec)
- `data/lessons/c/c32467b0-46c1-588a-883f-ab24dc347e0c/` (1 Scene spec)
- `data/lessons/b/d1b31a86-8a61-5389-ba34-435ed8f1f0db/` (2 Scene specs)
- `data/lessons/3/d77ea286-32cb-56d5-b8cc-8e8ceb894bd3/` (1 Scene spec)

### Agent 7: 10 Lessons / 11 legacy Scene specs

Owned branch: `agent/math-unified-yaml-07`. The only editable source folders are:

- `data/lessons/c/02414f2c-260f-5b4c-b9c5-72464f253abc/` (1 Scene spec)
- `data/lessons/0/25668e08-3fcf-5748-bac6-928a4ecc9c80/` (1 Scene spec)
- `data/lessons/5/2e8a5be8-7aaa-5653-b629-22d2985608f5/` (1 Scene spec)
- `data/lessons/6/68f46710-5547-549c-921d-3bb6efa0f576/` (1 Scene spec)
- `data/lessons/9/6c497c47-6b4e-5d41-8db4-176c3d031c69/` (1 Scene spec)
- `data/lessons/0/8e731d45-0f3a-5f47-9563-2414813fca30/` (1 Scene spec)
- `data/lessons/1/bfe95acc-8884-5586-ada1-593aa6c93261/` (2 Scene specs)
- `data/lessons/e/c7ec00c0-7a5c-5cb2-8413-ddb0766387ae/` (1 Scene spec)
- `data/lessons/1/f1cf65bb-6c00-55ff-b8ec-b38f8a00ead1/` (1 Scene spec)
- `data/lessons/9/f51c30a9-ec23-5989-89e0-90c1f4855ab9/` (1 Scene spec)

### Agent 8: 10 Lessons / 12 legacy Scene specs

Owned branch: `agent/math-unified-yaml-08`. The only editable source folders are:

- `data/lessons/f/1285fbda-ea25-5767-b5b5-a4cab3539c1f/` (1 Scene spec)
- `data/lessons/4/1f7651cf-155e-5215-964f-f9b2d9ef97b4/` (1 Scene spec)
- `data/lessons/4/31f5cdab-6f95-5d2f-9548-1bea2b8ed5c4/` (1 Scene spec)
- `data/lessons/a/40379e41-451f-52f0-b341-58408bceb31a/` (1 Scene spec)
- `data/lessons/4/a2e4e6fe-9b2e-5dbd-abf5-e91b70f8ba64/` (2 Scene specs)
- `data/lessons/b/a8b35b12-d41d-528d-87bd-1bf0a106711b/` (1 Scene spec)
- `data/lessons/4/c376c37a-9059-52c0-b462-e8d2ea4fa574/` (1 Scene spec)
- `data/lessons/a/e0df3d69-8dc2-550c-8fee-c3e29093625a/` (2 Scene specs)
- `data/lessons/1/edc54432-1221-53cf-bb28-c826fe64f011/` (1 Scene spec)
- `data/lessons/e/f143685d-5311-5edb-8213-642828ae322e/` (1 Scene spec)

### Agent 9: 10 Lessons / 11 legacy Scene specs

Owned branch: `agent/math-unified-yaml-09`. The only editable source folders are:

- `data/lessons/9/0d8b4918-d07e-5945-9bc7-bdb618929ef9/` (1 Scene spec)
- `data/lessons/c/152bb33c-4cf2-5001-8949-a199afc1f60c/` (1 Scene spec)
- `data/lessons/3/2527575b-8807-557e-8532-83377eddc2f3/` (1 Scene spec)
- `data/lessons/c/29426f70-208e-5835-999c-4462023fb4ac/` (1 Scene spec)
- `data/lessons/5/31e8d30b-6298-5ddf-b711-4b5e731a1395/` (1 Scene spec)
- `data/lessons/d/5795b10a-f136-5626-92f8-01c316d9eb7d/` (2 Scene specs)
- `data/lessons/6/703937b7-70f8-5d9a-b502-0c7d136341e6/` (1 Scene spec)
- `data/lessons/e/846ed388-3e5e-5c8f-8320-fcbd2c38903e/` (1 Scene spec)
- `data/lessons/0/92177be3-97a1-5ca4-b21a-07f0dac27f50/` (1 Scene spec)
- `data/lessons/5/a00b113a-1e9a-587d-b691-67971ab95255/` (1 Scene spec)

### Agent 10: 10 Lessons / 12 legacy Scene specs

Owned branch: `agent/math-unified-yaml-10`. The only editable source folders are:

- `data/lessons/1/15f71e37-b8df-5625-98bd-686de40c7d91/` (1 Scene spec)
- `data/lessons/c/2c8adf96-4ea8-5767-8f93-ee80e228489c/` (1 Scene spec)
- `data/lessons/6/2f5d2fd1-d8d0-5180-b2a6-8de270e85c86/` (1 Scene spec)
- `data/lessons/e/4790f970-8200-5e0d-ae93-3de0e3087b9e/` (1 Scene spec)
- `data/lessons/c/6efa755e-ebf9-5c46-a00f-21e34111eb5c/` (2 Scene specs)
- `data/lessons/9/772102e5-c606-56ed-9c0e-9c2fbe7a7559/` (1 Scene spec)
- `data/lessons/4/a448f370-6b8b-5ba5-a309-99ba8926d804/` (1 Scene spec)
- `data/lessons/4/c6684a37-53ea-5bf9-b584-4e7a4355b284/` (2 Scene specs)
- `data/lessons/d/c8dc6a93-e1ea-59a6-a40d-96c8a94bd67d/` (1 Scene spec)
- `data/lessons/7/f6c9f8ca-7ddc-5b31-a3e7-50d571d437f7/` (1 Scene spec)

### Agent 11: 9 Lessons / 12 legacy Scene specs

Owned branch: `agent/math-unified-yaml-11`. The only editable source folders are:

- `data/lessons/f/1e52674d-daac-50e5-b914-b9bd36e01fef/` (1 Scene spec)
- `data/lessons/f/5a8c78e4-19b6-5450-badd-e4e209b354bf/` (2 Scene specs)
- `data/lessons/5/63dcce5b-9058-59f9-8d70-839b87f7cfd5/` (1 Scene spec)
- `data/lessons/3/9540b08c-f4ee-5c52-984e-db1961196743/` (2 Scene specs)
- `data/lessons/0/ab3daddd-692f-52f6-a040-57ea2f497bf0/` (2 Scene specs)
- `data/lessons/e/b2bf4c72-16fc-52af-8986-678af560f35e/` (1 Scene spec)
- `data/lessons/f/c0992609-0bc1-5b0f-b84f-6cb09acd1ebf/` (1 Scene spec)
- `data/lessons/7/ce649c04-655d-558c-afd1-b287421cb697/` (1 Scene spec)
- `data/lessons/6/d12b7bda-d840-50e2-91a6-ac57b4cc9b96/` (1 Scene spec)

## Integration acceptance checklist

- [ ] Exactly 109 canonical `config.yaml`, one per frozen UUID path.
- [ ] Every authored mathematical/educational/technical meaning from 109 content plans, 109 briefs, 131 Scene specs is represented; original provisional status remains accurate.
- [ ] No duplicate old `content.md`, `methodologist-brief.md`, `*.scene-spec.md` left for fully migrated Lessons; blocked items explicitly recorded and **not** destructively removed.
- [ ] Each Lesson structurally compatible with current strict `lesson.scaffold.schema.json`: stable ID; correct nested typed nodes, locale, skills and required collections.
- [ ] Agent PRs target integration and touch only exclusive lesson folders; reviewed changes and source deletions are traceable.
- [ ] No generated TS, Scenes, Media, Props, new translations or Skill changes.

This plan freezes ownership only. **Issue #535 is the live coordinator tracker**; this document is not an independent approval record.
