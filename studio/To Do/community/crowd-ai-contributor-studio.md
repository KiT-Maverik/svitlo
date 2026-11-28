# Crowd AI Contributor Studio — Community-Powered Educational Production

**Status:** Product/architecture concept for exploration; **not implemented, approved for development, vendor-authorized, commercially validated, or security-reviewed**.
**Area:** community, growth, platform, content production.
**Primary idea:** volunteers use AI available to them to contribute reviewable educational work to Svitlo. Svitlo provides task selection, editorial context, typed contracts, validation, quality gates, Git provenance, and controlled publication.

## 1. Vision and why this matters

Svitlo could invite a global community to help make trustworthy interactive learning available to children in more languages: **“Donate your AI, not your money.”** A contributor selects a narrowly scoped task, works with AI through a supported personal integration, previews the result, and submits a structured artifact. Svitlo validates and reviews the contribution before it becomes canonical educational content.

Translation is the most constrained first use case, not the destination. The same contribution infrastructure could eventually support methodology review, Lesson content creation, educational experience review, Question/Flashcard Banks, accessibility audits, localized media descriptions, and tightly controlled resource production.

The possible economic benefit is **avoided AI-production expenditure per _accepted, equivalent-quality_ contribution**, not a transfer of subscription credits to Svitlo and not a promise of “free production.” Contributors' time, technical review, scientific/editorial review, model-judge calls, infrastructure, fraud mitigation, provider limits, and rework remain real costs.

**Non-goals:** hosting a general-purpose AI proxy; extracting/shared-pooling subscribers' tokens; giving contributors unrestricted repository access; replacing qualified review with Zod/LLM verdicts; silently weakening required locales; paying for arbitrary token consumption; exposing children to contributor tooling; or declaring AI-authored content fit for publication automatically.

## 2. Contributor experience

### Translation as the first vertical

1. From a Svitlo public page (“Help translate a lesson”), a contributor chooses textbook, immutable Lesson identity, source language and target locale from **currently supported and genuinely missing or explicitly revision-open** tasks.
2. The interface presents a **side-by-side Lesson preview**: canonical source on the left, proposed target-language rendering on the right. The same trusted Lesson UI components may be reused where technically supported, with read-only source and translation preview; do not assume today's renderer already accepts arbitrary draft data.
3. Svitlo extracts only approved localized scalar fields and essential context (audience, glossary, scientific intent, accessibility captions/labels, Sections, questions, flashcards as independently owned artifacts). Preserve source formatting tokens, links, units, equations, source IDs, placeholder names and actual task boundaries.
4. The contributor explicitly initiates AI translation via an **eligible, authorized integration**. Their AI plan is not automatically available to Svitlo. Client and server validate the response against the same versioned, recursive strict schema.
5. For the initial product proposal, the contributor **cannot directly edit AI-produced translations inside the contribution interface**. They may inspect the preview, report issues, discard/retry within provider limits, or submit. This is UX design, **not a security boundary**: users can alter prompts, clients and requests; all input is untrusted.
6. Svitlo stages the JSON as a proposed contribution. The reviewer sees field-level source/target diff, missing keys, validation report, provenance, warnings and an accessible rendered Lesson where supported. Source-of-truth edits and authorized corrections happen in the established entity workflow.
7. A successful technical precheck only makes the submission eligible for **editorial evaluation**, not acceptance, publishing or automatic merge.

Requirements for the interface: screen-reader and keyboard parity, readable comparison with accessible difference descriptions, sensible mobile single-column mode, RTL-aware rendering for ar/he/ur, low-bandwidth previews, explicit data-sharing disclosure, localization of the contributor UI, and a non-AI route for human community participation.

### Later: a task-based Contributor Studio

The site can show contextual actions rather than expecting volunteers to write prompts: “Review methodology”, “Create lesson content”, “Review content”, “Audit learning experience”, “Check methodology compliance”, “Produce resources”, “Create questions”, “Create flashcards”, “Translate”, “Review translation”. Only **currently authorized** actions whose required upstream artifacts exist should be available. Buttons are interface affordances, not authorization to skip workflow stages.

Svitlo should compile task-specific prompts from the actual Studio Persona/Skill, owning entity source and immutable baseline. An independent review must use a **different agent/context** and the proper role; it cannot be falsely claimed by running the originating generation context again. Methodology, Experience, Assessment and human QA remain distinct responsibilities.

## 3. Provider integration options and commercial constraints

Two technically different product experiences must not be conflated:

- **ChatGPT-hosted integration:** a Svitlo plugin/MCP app operating _inside_ ChatGPT calls narrowly scoped Svitlo tools. The ChatGPT user works in their own ChatGPT environment; the server receives only explicitly authorized task data and submitted output.
- **Svitlo-hosted website:** the contributor views a custom side-by-side interface on Svitlo and, if permitted, uses **Sign in with ChatGPT / ChatGPT plan usage** to run eligible AI operations. This is not equivalent to basic login and does not automatically grant the website access to a subscriber's compute/billing. Remote-hosted usage and eligibility must be approved and tested.
- **Fallback:** Svitlo-funded OpenAI API or another provider, when budgeted and permitted. The provider-agnostic JSON contract should allow multiple backends without bypassing quality/safety checks.

**Provider approval is a hard feasibility gate, not a formality.** Under the [Sign in with ChatGPT Terms (effective 2026-11-04)](https://openai.com/policies/sign-in-with-chatgpt-terms/), eligible ChatGPT-plan usage must serve the authenticated user, originate in their controlled runtime, respect usage limits, and must not pool, transfer, resell, gift, or share plan usage or use one user's subscription to fulfill another user's requests. The terms also require the user to be able to use their plan through SIWC without paying Svitlo or upgrading the app. Interpretation of crowd tasks commissioned by Svitlo, **especially offering paid-service credits for completed AI work**, requires explicit provider/legal clearance before launch. Do not design a token marketplace, background job queue using another user's plan, shared keys, automated account cycling, or “donate unused tokens to the platform” mechanism on assumption of permission.

OpenAI's [open-source integration example](https://developers.openai.com/cookbook/articles/sign-in-with-chatgpt) distinguishes eligible local open-source apps from remotely hosted apps that require access arrangements. Plan availability, partner policy, actual token/accounting semantics and quotas must be checked again at implementation time. “Sign in with ChatGPT” and “ChatGPT plan usage” are separate permissions; neither enables arbitrary server-side calling of a user's plan. The web MVP must have a credible fallback if remote plan usage is denied.

Do not assume a $10 OpenAI subscription can be transferred to Svitlo; proposed $10 below is the **retail face value of a hypothetical Svitlo benefit**, not the ChatGPT subscription price.

## 4. Proposed system boundaries

```
Contributor (personal AI, explicitly initiated)
    -> Svitlo web / ChatGPT MCP interface
    -> Extractor (approved entity/locale/stage fields only)
    -> JSON response (strict transport contract)
    -> Backend authentication + deterministic validation
    -> Optional isolated AI quality/risk judge
    -> Staged contribution with immutable provenance
    -> Human / independent editorial review
    -> Trusted contribution coordinator + materializer
    -> Existing canonical entity-owned Git PR
    -> Existing Ready/CI/publication gates
```

Components to explore:

| Component                  | Responsibility                                                                                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task Registry/Orchestrator | Discover eligible entity x stage x locale tasks, dependencies, authorized actions and duplicate work. The registry is an **index**, not a second editable editorial truth.         |
| Context Extractor          | Read reviewed canonical Git data; derive a bounded, task-specific structured payload, stable keys and source snapshot.                                                             |
| Contributor Gateway        | Authenticate contributor, obtain explicit provider consent, authorize submission and enforce rate/size limits and retention policy.                                                |
| Shared Contract/Validator  | Strict Zod schemas, exact allowed keys, source hashes, placeholders, safe text constraints; on both client and server.                                                             |
| AI Risk/Quality Judge      | Advisory structured verdict on fidelity, language, child appropriateness, terminology, suspicious instructions, science; no write tools or publishing privileges.                  |
| Review Workspace           | Independent source-vs-target assessment; human dispute resolution and authorized corrections with pinned evidence.                                                                 |
| Integration Coordinator    | Idempotency, conflict detection, branch routing, atomic trusted commits, originating/target PR linkage and feedback.                                                               |
| Materializer               | Convert safe **transport JSON** into localized entries in the **existing canonical typed objects** (or exact stage-specific handoff) without changing unrelated fields/identities. |

A separate `svitlo-contributions` repository is an **option**, not an architectural prerequisite. It can isolate high-volume, data-only external submissions and their review/status checks. A staging service plus trusted contributions in the current monorepo is an alternative. Do not use Git submodules, subtree sync or blind cherry-picking to transfer contributions: the intended unit is a **validated typed patch**, not arbitrary commits.

The main repository stays canonical for authored educational entities. Transport JSON, generated previews and review reports are **not** alternate long-lived authoring sources. Do not create a parallel YAML/JSON Lesson production pipeline or bypass the current inert `draft.ts` / trusted Reader handoffs.

## 5. Proposed versioned contribution envelope (illustrative only)

This is **NOT** an implemented Svitlo Engine schema or permission declaration:

```json
{
  "contributionId": "immutable-id",
  "kind": "translation",
  "textbook": "astronomy",
  "entityKind": "lesson",
  "entityId": "canonical-uuid",
  "language": "pl",
  "sourceCommit": "full-git-sha",
  "sourceContentHash": "sha256-of-approved-translatable-source",
  "contractVersion": "proposal-v1",
  "payload": {
    "title": "Układ Słoneczny",
    "intro": "..."
  }
}
```

The real payload fields must be derived from current Engine contracts; the example is schematic. The backend must resolve the immutable entity to an approved canonical path, generate the allowlist and validate exact keys against that source. The caller must **never** supply an arbitrary filesystem path, TypeScript import, action name, Branch, git diff or executable code. The envelope can later be adapted to Course/Episode/Question/Flashcard/Assessment types, but each type/step must have an explicit, separately approved schema.

Proposed invariants:

- The requested resource and locale are authorized and current; `sourceCommit` and `sourceContentHash` match the pinned baseline. No stale or ambiguous merge.
- Source identities, Section ordering, answer logic, assessment semantics, media/resource IDs, paths, variable placeholders, formulas and non-target languages are immutable.
- Only the target language's allowed fields may be introduced/revised; full required target scope must be covered for a **completed** localization. Partial submissions may stay **Draft/staging only** with explicit missing-key inventory.
- The materializer uses safe AST/string literal serialization and allowlisted Git patch operations, **not** AI-generated TypeScript, patches, imports or commands.
- No mutation of existing approved locales or other contributors' newer work; rebase/re-extract/review after drift.
- A repeated contribution ID and identical content hash are idempotent; no duplicate commits, PRs or credit payouts.
- Svitlo's active language definitions are authoritative. For example, external Crimean Tatar uses `crh-Latn-UA` while the internal key is `qm`; Kazakh is `kk-Latn-KZ`; RTL requires semantic QA. Do not silently substitute source language or claim complete translations from compiler success.

## 6. Crowd PR, validation, warnings and blocking

Desired intake policy: for external contribution PRs, **do not run the ordinary expensive content CI**. Use one narrow `Crowd Contribution Gate` on an exact immutable PR head/source snapshot, whether the staging surface is a dedicated repository or a strictly separated intake path in the main repository.

Gate stages:

1. Authorize PR provenance via trusted contributor system, not a forgeable label. Check actual changed-file inventory, base/head commit, canonical entity reference and allowed paths.
2. Deterministic checks: bounded JSON parse, recursive `z.strictObject`, schema version, allowed exact path/key set, string lengths and Unicode rules, placeholders, math tokens, links/markup, permitted target locale, complete intended scope, immutable provenance and source-hash consistency.
3. Optional **LLM-as-Judge**: source-versus-target fidelity, omissions, additions, wrong numbers/negation, scientific/age appropriateness, cultural/register issues, suspicious instructions, possible harmful text. Return a validated structured verdict and **field-level findings**, including uncertainty; no autonomous code execution or write tools.
4. Write bot-owned status/report bound to the exact PR HEAD, source hash, judge policy and model/version; provide per-field findings and actionable resolution paths.
5. Pass only when deterministic checks pass and the defined review policy is met. A warning can require human disposition even if the model's confidence is high. Missing model response, rate-limit, outage or stale result **fails closed**.

Proposed labels **subject to future label-catalog approval**, not existing Svitlo labels: `source: crowd`, `validation: pending/passed/warning/rejected`. Labels make triage visible; **they do not independently block merge**. Blocking requires an actual required status check/ruleset appropriate to the target and up-to-date SHA. A dismissed/accepted false positive requires authorized, auditable human resolution; deleting a label alone must not unlock integration.

**Existing workflow compatibility is unresolved:** the current Svitlo `develop`/`main` rules require other checks on applicable PRs. A Crowd-only check cannot silently replace them in the main monorepo. A separate intake repository may use its own ruleset, but actual ingestion into Svitlo must still satisfy existing entity PR and protected-branch checks. Do not claim regular CI is currently skipped merely by adding a label; workflow/ruleset behavior needs an implementation audit.

## 7. Threat model and trust separation

The central risk is **not only malformed JSON**. Strict Zod protects types/keys, not meaning or downstream interpretation of strings.

| Threat                                                       | Required defense                                                                                                                                                                                   |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arbitrary fields, altered IDs, schema drift                  | Recursive strict schema, exact key allowlists and immutable source hashes on server.                                                                                                               |
| XSS, Markdown/HTML/SVG or malicious links                    | Render safe text; sanitize/limit rich content and URL schemes; content-security policy; review link targets.                                                                                       |
| Code injection into canonical TypeScript                     | Only trusted AST/string serializer; never evaluate contributor code; allowlisted AST edits and output diff inspection.                                                                             |
| Prompt injection against authoring/decision/review agents    | Treat text as untrusted data, tool-less judge, independent context, narrow privileges; do not rely on model saying “safe.”                                                                         |
| GitHub token exposure or malicious workflow                  | Least-privilege GitHub App; separate untrusted-read and trusted-publish contexts; no secrets in untrusted job; no checkout-and-execute of PR source; never run contributor `package.json`/scripts. |
| Semantic/scientific misinformation, child-inappropriate text | Source comparison, glossary, scientific reviewer, qualified human escalation, no automatic publication.                                                                                            |
| AI judge false positives/false negatives or bias             | Labeled adversarial evaluation set, calibrated review policy, manual resolution and regression tests; do not treat confidence as measured probability.                                             |
| Flooding, incentive gaming and costs                         | Per-user/task rate limits, anti-Sybil controls, bounded requests, retries/cost ceilings, duplicates/low-value submission detection.                                                                |
| Stale source, simultaneous volunteers, overwrites            | Source SHA pinning, idempotency keys, branch lease/concurrency locks and per-entity/per-locale conflict policy.                                                                                    |
| IP/licensing and personal/child data leakage                 | Contributor rights declaration, OpenAI/provider data-sharing disclosure, approved licensing, no child accounts/records in authoring prompts, retention/deletion/access controls.                   |

The AI can be allowed to **recommend** reject/review/accept, but deterministic policy and owner-authorized editorial review control execution. A successful judge verdict is **not** proof that a contribution is harmless or educationally correct. A GitHub PR does not execute source by itself; triggered CI, generators and imported TS **can** execute code, so do not extrapolate “PRs do not execute” to every workflow.

## 8. Automation across repository boundaries

If external intake uses a child/staging repository:

1. A human or policy-approved gate accepts a specific Crowd contribution at a pinned commit and payload hash; no implicit trust from an arbitrary “approved” label.
2. A trusted coordinator reads that exact immutable JSON, rechecks provenance/schema/status and current source content in the **parent Svitlo repository**.
3. It resolves the **existing entity-owned Lesson/Course/etc. PR and branch**, following its current production workflow, and confirms that the active stage permits this locale/task correction.
4. It computes a safe field-level patch, verifies no conflicting changes, and invokes the trusted locale applicator in a restricted writer environment.
5. It publishes only authorized paths/fields in an atomic, lease-protected commit to that **existing entity PR**; normal review and target-specific CI remain in force.
6. It records a bidirectional linkage (external contribution ID, originating PR/SHA, canonical entity/language, destination PR/commit, validation decision and outcome) to prevent duplicate ingestion and enable audit, rollback and contributor recognition.
7. If there is **no active entity PR** (e.g., already published Lesson), pause and require an explicit decision on a maintenance/revision PR and the appropriate workflow. Do not invent a fresh translation-only PR that violates current entity ownership.
8. If source drift or conflict occurs, mark `needs re-extraction/review` rather than force-overwriting. Report a concrete resolution to the contributor/reviewer.

The separate “intake repository” approach also implies operational ownership: managed GitHub App installations, fine-grained repository permissions, branch/ruleset provisioning, webhook replay/duplicate handling, audit log, monitoring and dead-letter/retry strategy. **No direct PR-to-PR Git merge** is required; the bridge transfers reviewed **data into canonical source**.

For large-scale volume, multiple independently reviewed locales of the same entity may be **batched into one trusted commit** on its existing PR, preserving per-contribution provenance. Do not batch unrelated stages into an unreviewable diff or skip required checks.

## 9. Expanding from translation to actual educational production

The live [Lesson Workflow](../../skills/lesson-workflow/README.md) has **ten stages** and is the authority; a user-facing “seven buttons” layout is only a grouped view:

| Current Lesson stage      | Potential crowd task                                      | Review/authorization boundary                                                                                                                |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Methodology            | Produce/critique a methodology proposal                   | Authorized Methodologist; preserve learning outcomes, evidence and sources.                                                                  |
| 2. Content Creation       | Screenplay/Section design + learner-facing copy           | Educational Screenwriter role and exact Stage 2 typed contract.                                                                              |
| 3. Content Review         | Independently audit the complete Stage 2 source           | Different agent/context, pinned SHA, corrections on the same PR.                                                                             |
| 4. Experience Review      | Accessibility, pacing, cognitive UX and resource plan     | Learning Experience Expert.                                                                                                                  |
| 5. Methodology Compliance | Validate full Lesson against approved learning objectives | Methodologist; no backward loop or manufactured approval.                                                                                    |
| 6. Resource Production    | Trusted source handoff, media, interactive Scenes/code    | Coding Agent in a _separate trusted implementation/security environment_. Arbitrary contributed TSX is **out of scope for translation MVP**. |
| 7. Questions              | Create/review independently owned Question Bank           | Actual bank's own typed seven-stage workflow, references and review.                                                                         |
| 8. Flashcards             | Create/review independently owned Flashcard Bank          | Independent seven-stage process, after Questions or authorized N/A.                                                                          |
| 9. Translation            | Localize completed typed source and descriptions          | Existing entity-owned PR; no English placeholders for missing required text.                                                                 |
| 10. Translation Review    | Independently review all requested locales                | Pinned source-derived references; distinct reviewer; human-quality threshold.                                                                |

Course, Episode, Question, Flashcard and Assessment each have **their own current workflow**; future task cards must load the actual matching Persona/Skill. A methodological plan is not a finished Lesson; source materialization is not completion of resources or QA; passing TypeScript is not pedagogical approval; Question Bank and Quiz Section are distinct entities. Publish only after the usual ownership, source/materialization, locale, accessibility, media, human QA and branch protections.

An early expansion may safely prioritize **read-only reviews, questions, flashcards, and structured educational prose** before any crowd-sourced executable scenes/React components. Independent specialist and child-appropriate editorial review remain mandatory where current workflow requires them.

## 10. Economics: measurable assumptions, not revenue guarantees

### Unit economics

Let:

- `C_alt` = actual _avoidable_ cost to produce the same **accepted-quality** result internally (AI model calls, attempts, necessary human production time and infrastructure).
- `p` = proportion of staged contributions that reach equivalent-quality acceptance after review.
- `C_gate` = average validation/judge/moderation cost **per attempt**, paid even on rejected submissions.
- `C_review` = incremental qualified editorial review/integration cost **per accepted** contribution (exclude costs shared equally with the alternative).
- `C_ops` = incremental infrastructure/anti-abuse/support costs **per accepted** contribution.
- `C_reward` = expected marginal cost + expected displaced paid revenue for an awarded Svitlo benefit **per accepted** contribution.

Illustrative expected net value per accepted item, for stable volume and appropriately allocated fixed costs:

```text
Net accepted contribution value
  = C_alt - (C_gate / p) - C_review - C_ops - C_reward

Break-even accepted contributions for a target benefit value B
  = ceil(B / net accepted contribution value), if net value > 0
```

Do **not** count the same reviewer effort as “saved” internal cost and as a crowd-only benefit. Explicitly track rejected attempts, cost of rework, humans resolving model false positives, subscription displacement, onboarding, duplicate tasks, storage/bandwidth, per-provider terms and opportunities for external grants.

### Worked illustration: translation of one Lesson x one locale

These numbers are **scenario inputs**, not measured tokens, current vendor rates, or proven savings:

- A single translation requires ~12,000 input and ~8,000 output tokens.
- Assume hypothetical alternative API tariffs of $2 / million input tokens and $10 / million output tokens: `C_alt = 12k×2/1m + 8k×10/1m = $0.104`.
- Assume `p = 0.8`, `C_gate = $0.03` per attempt and `C_review = C_ops = C_reward = $0` **only for illustrating the formula**.
- Then net value per accepted translation is `$0.104 − $0.03/0.8 = $0.0665`.
- To generate **$10 of avoided internal production expenditure** at these assumptions requires **151 accepted translations**, corresponding to roughly 189 attempts at an 80% acceptance rate. Real paid human review could make this unattractive.

Alternative **illustrative Lesson-creation** scenario: $1.50 avoidable in-house AI work per accepted-equivalent task minus $0.50 all-in crowd quality/integration/reward costs yields $1.00 net; **10 accepted tasks** offset $10. This is _not_ a prediction of what completed, educationally sound interactive Lessons actually cost. Expensive code, media, scientific review and QA could dominate, and the same $1.50 may not purchase equivalent finished content.

A hypothetical “Svitlo Premium for $10” exchange must distinguish:

1. **$10 retail price** (not automatically a $10 platform cost).
2. **Marginal service cost** for an additional user, especially under offline-first delivery.
3. **Lost expected paid revenue** if the rewarded volunteer would otherwise subscribe.
4. **Incremental production value**, which may be zero if the task is duplicate/unneeded/invalid.
5. **Provider/legal approval** for any incentive tied to personal ChatGPT-plan use.

For example, if the only actual business cost of providing a benefit were $0.50, translation break-even in the optimistic scenario above would be **8 accepted translations**; however, this excludes revenue displacement and all omitted reviewer/support cost and **must not** be used as an offer or promise.

**Do not launch a points-to-premium exchange until economics _and_ provider terms are approved.** If permitted, reward **verified educational contributions** (field-level/lesson-level acceptance, successful independent review), not token volume, retries or automatic job counts. Candidate incentives: optional community recognition, privacy-respecting contributor profile, nonmonetary acknowledgements, donor-backed scholarships, or explicit paid-feature credits after legal/provider review. Never disadvantage a child who cannot contribute AI resources, nor lock essential educational access behind labor.

### Metrics for an evidence-based pilot

Track: accepted unique outputs per entity x locale x stage; useful coverage delta; tokens/attempts where permitted; median retries; acceptance and editor override rates; semantic error categories; LLM judge precision/recall against a labeled set; source-drift/conflict rates; validator+human time and cost; time-to-publish; rate of duplicate/spam; actual API benchmark cost for equivalent output; marginal Svitlo entitlement cost; and provider authorization/drop-off. Evaluate **quality-adjusted net savings**, not raw generation counts or retail-priced “donated AI tokens.”

## 11. MVP and possible milestones

**Phase 0 — viability and policy:** verify provider availability for a remote site, legality of incentivized contributions, licensing, age/child privacy, GitHub permissions and existing PR/CI/ruleset workflows; decide whether to use a standalone intake repo or controlled service. If provider approval is uncertain, pilot with ChatGPT-hosted tools or approved Svitlo-funded API without claiming user-plan sharing.

**Phase 1 — read-only translation pilot:** one approved completed Lesson and a target locale; canonical field extractor, deterministic contract, source/target preview, contributor consent, staged submission, backend validation, zero repository write from contributor and no premium rewards.

**Phase 2 — Crowd Gate and editorial review:** signed/verified provenance, exact HEAD checks, structured advisory AI judge, warning/blocked triage, distinct reviewer and audit evidence. Red-team with malicious Markdown, fake identities, prompt injection, wrong units/negation, long strings, RTL and expired source SHAs.

**Phase 3 — trusted localization patch:** automatically apply an owner-authorized accepted JSON patch to **the existing entity-owned PR** with conflict/idempotency guards and a complete contribution trail; verify generated TS and real required target CI there. Reuse current Engine source-of-truth rather than inventing generic JSON production.

**Phase 4 — broader task catalog:** Questions, Flashcards, independent review, source-language copy/scenario, and later resource/Scene production only in separately vetted execution environments; measure real economics and editorial latency.

**Phase 5 — sustainable recognition/rewards:** evaluate subscription credits or a nonmonetary alternative _only after_ provider approval, anti-fraud analysis, pricing and qualified reviewer capacity are established.

### Exit criteria for a meaningful MVP

- One independently authored contribution reaches the existing entity PR with **no unauthorized structural or locale changes** and full source/target/provenance traceability.
- Untrusted JSON cannot modify code, trigger privileged untrusted workflows, supply paths/actions, or change any entity other than the allowed target scope.
- Stale SHA, malformed schema, malicious URLs/markup, placeholder damage, judge failure and conflict all fail safely.
- The same contribution submitted twice cannot produce duplicate commits or reward entitlement.
- Required human/independent review, current Svitlo publication checks and content locale rules remain intact.
- A measured benchmark reports **cost per accepted equivalent-quality artifact**, including rejected submissions, and a clear go/no-go on provider constraints.

## 12. Open decisions

1. Can an external volunteer's ChatGPT-plan usage legally/technically generate contributions benefiting Svitlo, especially when associated with a paid Svitlo subscription credit? Obtain written provider clarification; do not assume this is permitted.
2. Is ChatGPT-hosted MCP sufficient for phase 1, or is remote website SIWC approval necessary? Who funds an API fallback?
3. Will external submissions live in a dedicated `svitlo-contributions` repository or in a separate authenticated staging service? What exact GitHub rulesets, credential boundaries and ingestion authorization apply?
4. Who can independently accept/reject a content task, override an AI warning and authorize a source mutation? How is reviewer expertise verified?
5. How does the coordinator handle completed/published Lessons with **no existing entity-owned PR**, or a locale being translated concurrently?
6. What is the minimal real extracted-localization shape per current Configurator/entity contract, including Scene, Code, media and assessment references?
7. Is an AI judge justified after deterministic checks? Which adversarial benchmark and false-negative budget are acceptable?
8. Which incentives serve the education mission without encouraging account sharing, contributor farming, exclusion or paid-access coercion?
9. What level of attribution, contributor privacy, reuse license and deletion/appeal process is required?
10. How will we measure meaningful coverage and scientific correctness, rather than raw quantity of “completed” AI tasks?

## Related existing repository guidance and backlog ideas

- [Product To Do index](../README.md)
- [Architecture and product principles](../../docs/architecture/README.md)
- [Git-First Typed Content](../../docs/architecture/git-first-typed-content.md)
- [Internationalization & Inclusive Access](../../docs/architecture/internationalization-and-accessibility.md)
- [Typed production materialization](../../docs/architecture/typed-production-materialization.md)
- [Lesson Workflow](../../skills/lesson-workflow/README.md)
- [Translation Workflow](../../skills/translation-workflow/README.md)
- [GitHub/CI policy](../../rules/ci-workflow.md)
- [Referral Rewards & Subscription Credits](../growth/referrals-and-subscriptions.md)
- [Regional Pricing & Grants](../growth/regional-pricing-and-grants.md)
- [Non-Toxic Reputation](./fair-reputation.md)
- [Scientific Editorial Verification](../growth/scientific-editorial-verification.md)
- [PR Content Change Manifest](../platform/pr-change-manifest.md)
- [OpenAI Sign in with ChatGPT Terms](https://openai.com/policies/sign-in-with-chatgpt-terms/)
- [OpenAI Sign in with ChatGPT open-source integration article](https://developers.openai.com/cookbook/articles/sign-in-with-chatgpt)

**Implementation note:** This backlog item records a possible future product and decision points, **not an approved Engine API, GitHub workflow, launch commitment, legal conclusion or authorization to create other repositories**.
