# Manage Lesson Production Skill

**Purpose:** Create, validate and maintain **one GitHub Issue per explicit production scope**, containing **one or more Lessons**. This is a reusable coordinator procedure, **not** a separate learning-authoring role and not a requirement for a new Issue per Lesson. The Issue persists between chats/agents; repository files and PRs are authoritative for authored content.

Read root/applicable `AGENTS.md`, [GitHub labeling rules](../../rules/github-labels-and-naming.md), [Lesson Production lifecycle](../../docs/architecture/lesson-production-workflow.md), relevant Lesson and Course skills, current GitHub Issue/PR state, and the real repository sources before acting. Use [Lesson production Issue Form](../../../.github/ISSUE_TEMPLATE/lesson-production.yml). Never assume a previous agent's last chat, a checked box, or a report equals actual artifact approval.

## Create or find an Issue

1. Accept scope as one Lesson UUID, a list of UUIDs, or the Lessons belonging to an explicitly identified Course/Chapter/Module **at a specified TOC revision**. Resolve the latter into an exact ordered **snapshot list of Lesson UUIDs** before creating the Issue. Exclude Episode/Module/Chapter IDs. Do not create a new Issue for every Lesson by default. Report any unallocated Lesson identities and resolve them with the authorized methodology/identity workflow before treating them as confirmed IDs.
2. Search existing open Production Issues for overlapping Lesson UUIDs and scope. **Reuse** an existing Issue when the scope and work match; do not create duplicate competing trackers. If two coordinated Issues share a Lesson for distinct purposes, link and explicitly separate ownership.
3. Create the Issue using the standard form fields: textbook package, immutable Lesson UUID list, provenance/approved Course scope, explicit goals, exclusions/authorization, starting stage, per-Lesson tracker and handoff. Resolve every Lesson path with `resolveEntityPath` and verify actual `lesson.identity.json` / authored data where expected. A source-locale draft without TS data is valid; a missing ID is not "implemented".
4. Apply canonical `content: <package>`, `work: content` and proper `source: *` labels per [the catalog](../../../.github/labels.json); use `attention: blocked` or `attention: decision` only for actual outstanding conditions. Never invent status or persona labels not defined in the catalog.
5. Freeze the membership snapshot at creation. A change in Course TOC **does not automatically mutate** the Issue worklist. Adding/removing Lesson UUIDs requires explicit owner approval and documented revision in the Issue, or a separate scope Issue if the change is substantial.

## Stable GitHub contract

Issue Form headings are canonical input fields: **Textbook package**, **Lesson UUID scope**, **Scope provenance and authoritative sources**, **Requested starting point**, **Production scope and constraints**, **Production state tracker (coordinator-maintained)**, **Current handoff and activity log**.

Preserve marker `<!-- svitlo-lesson-production:v1; preserve this marker for cross-agent recovery -->`. Keep **exactly one row per scoped Lesson UUID** in the table with columns:

`Lesson UUID | Current stage | Status | Active owner / branch | PR(s) | Blocker or next action`

Status vocabulary: `not-started`, `in-progress`, `ready-for-review`, `changes-requested`, `approved`, `blocked`, `completed`. The stage is the **next actionable operation**; advancement is **per Lesson**, not a single global gate. A batch may have different Lesson stages; issue-level checklist items summarize verified completion across **all** Lessons, not one.

Record in handoff: next actionable role(s), verified files/source Git blob or commit SHAs, active owner, draft PR links/branch, decision or approval URLs, blockers, last completed batch and **what can proceed without another prompt**. Prefer durable GitHub Issue body/links and PR descriptions to chat-only state. Do not paste full methodology or YAML content into Issue: the canonical source remains the Lesson folder.

## Standard stage transitions

Stage names and required evidence (order can be staggered per Lesson; don't auto-approve):

| Stage                 | Persona / tool                                            | Evidence and gate                                                                                                                             |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `methodology`         | Methodologist / Create Lesson Brief                       | Valid `methodology.md` with verified Skills, approved by editor; proposed drafts may remain blocked pending approval                          |
| `content`             | Educational Screenwriter / Create Lesson Content          | `content.yaml` following schema, separately editorially approved; legacy docs require explicit migration                                      |
| `experience-review`   | Learning Experience Expert / Review Lesson Experience     | `experience-review.md`, source-specific independent pass, followed by authorized editorial sign-off                                           |
| `methodology-review`  | Methodologist / Review Lesson Methodology                 | `methodology-review.md`, independent pass on **same current `content.yaml` revision**, followed by authorized sign-off                        |
| `generate-sources`    | Coding Agent / Lesson source generator (when implemented) | Actual typed source files, pending resource requirements, generated identity paths checked; never claim generation tool exists until verified |
| `resource-production` | Assessment/Scene/media specialists                        | Approved Question assets, Scene specs/implementations, media requirements; review outstanding dependencies                                    |
| `localization`        | Translation agents                                        | Actual translations for all declared Lesson languages; missing-language TS errors cannot be bypassed                                          |
| `validation`          | Coding Agent / QA                                         | Typecheck, builds, tests, resource integrity and publication checks confirmed against current commit                                          |
| `completed`           | Coordinator/owner                                         | All scoped Lessons independently completed, sign-offs linked, no unresolved blockers                                                          |

`approval` is **not** the same as file creation, an AI's verdict or a green CI status. Review results may recommend pass, changes requested or blocked; only documented authorized approval may change a review stage to `approved`. If `content.yaml` or Methodology materially changes after a review, invalidate affected downstream approval **for that Lesson** until independently re-reviewed. Keep historical review references, do not erase them.

## Resumable batch execution across agents and chats

When invoked as `Continue issue #N`, without asking for old chat context:

1. Fetch the **latest Issue body/comments**, labels, linked PRs, commits and current relevant files. Parse scoped UUIDs and tracker/handoff. Reconcile discrepancies against the actual files, approved specs and source Git SHAs. Never trust a self-reported `done` without evidence.
2. Determine which Lessons are unblocked and authorized for the requested role/stage. Work in **batches** covering all ready Lessons for the current task. Do not require a new user message after each Lesson or checkpoint. Keep the others marked blocked/pending; one failure must not stall independent Lessons.
3. Before editing, check active owners/PRs/branches for each **artifact**, especially `content.yaml`. Avoid concurrent conflicting edits. Record the claimed Lesson IDs, role, branch and Draft PR in the Issue. The Issue table is **coordination metadata, not a mutex**: re-fetch it before writing; on conflicting concurrent updates reconcile rather than overwrite.
4. Invoke the specialized skill (Screenwriter, Experience Review, Methodological Review, Scene or production). Work only on the authorized bounded scope. For reviewers, preserve independence from authoring and respect source-revision-specific approval.
5. Write durable artifacts to Git in appropriately sized **Draft PR(s)**. One PR may cover many Lessons at one stage; multiple PRs may cover separately owned workstreams within the **same Issue**. Don't force one PR per Lesson, and don't force all stages into one PR. Use descriptive PR titles such as `Review learning experience for addition lessons` (no `[Draft]`, `feat:` prefixes); name branches by actual scope and stage following repository policy. Reference `Refs #N` in PR descriptions; reserve `Closes #N` for the final verified completion, not an intermediate PR.
6. Re-read latest Issue and update **only affected Lesson rows**, linked PRs, checked scope-level gates that apply to **every** Lesson, blockers and next handoff. Append a brief change/decision comment where useful; keep durable state in the Issue body, not exclusively in comments.
7. Automatically continue **other ready tasks within the authorized scope and role**, until an independent approval gate, missing prerequisite, ambiguous editorial decision, ownership conflict, or requested-scope boundary is reached. Never advance a blocked Lesson by assuming approval. Do not start a different role's review merely to finish the workflow without independent assignment.
8. Close the Issue **only after all scoped Lessons are completed**, required approvals are linked and publication/QA evidence is verified. The owner may explicitly cancel/replace a scope, in which case record reason instead of falsely marking completed.

## Safe automation and future extension

This skill documents a **manual/agent-driven GitHub state protocol**; no new GitHub Action, background worker, auto-approval bot, schema-to-TS generator or auto-merge behavior is implied. Do not start a recurring operation unless expressly authorized and supported.

Avoid creating sub-Issues just to represent every Lesson or every short step. For substantial independent Scene/media work, a separate Issue may be justified and cross-linked; the primary production state stays in the parent scope Issue.

The same coordinator pattern may later accept a Course Production template with a different stage set, **without changing Lesson identity or inventing a new tracker now**.

## Acceptance checklist

- One Issue covers one/many verified Lesson UUIDs with frozen scope, proper labels, real artifact links.
- Every Lesson has a current stage/status/owner/PR/blocker record, and issue-level gates accurately summarize batch progress.
- Every review is independent, tied to a source revision, and editorial approval has evidence.
- Multiple agents in multiple chats can resume using Issue+Git without prior chat history.
- Agents process authorized batches autonomously and stop only on real gates or scope limits.
- Existing repo guidelines, Draft PR policy and no-auto-merge/close requirements remain intact.
