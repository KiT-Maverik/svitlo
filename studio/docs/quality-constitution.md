# Quality Constitution — proposed risk-based test standards

> **Status: PROPOSAL — owner approval required.** This document does **not** create an enforceable quality gate, CI requirement, reviewer sign-off rule or test threshold by being committed. The owner must explicitly decide which clauses to adopt during review of [PR #921](https://github.com/KiT-Maverik/svitlo/pull/921) and integration into [#901](https://github.com/KiT-Maverik/svitlo/pull/901). Until then, follow the [CI workflow](../rules/ci-workflow.md), [package scripts](../rules/package-scripts.md), [GitHub naming/labels](../rules/github-labels-and-naming.md), existing security/product invariants and actual code. This proposal governs _how to judge test value_, not when CI runs.

## Purpose and decision rule

Protect **current, approved Svitlo behavior** against realistic regressions with the smallest maintainable set of effective checks. More tests, higher coverage, a green badge or an idealized pyramid are not goals. Each proposed test, consolidation or deletion is evaluated by:

1. **Legitimacy:** Is the behavior a current implemented contract, or an approved new contract with an identified owner? Check the feature specification, actual code, public consumers and package boundary. Mark merely planned behavior as a _gap / future acceptance criterion_, not a failing current test.
2. **Risk:** What learner harm, data loss, security failure, broken publication, access barrier or operational regression could occur? How likely is this fault and how hard is it to detect elsewhere?
3. **Detection:** What realistic change would make the test fail, and which observable result distinguishes correct from incorrect behavior? Would the failure explain the defect?
4. **Sufficiency:** Which existing check already detects the same fault? What is the least costly layer that preserves this particular guarantee, including the necessary real environment?
5. **Cost:** How much setup, runtime, maintenance, fixture fragility and false confidence does the check add? Is the residual risk and any untested environment disclosed?

**Proposed acceptance rubric:** KEEP a test with a legitimate distinct guarantee; SIMPLIFY or MERGE a redundant implementation; MOVE a contract to its true owner or necessary environment; REWRITE a misleading test; ADD a missing high-signal regression; DELETE a demonstrably obsolete/redundant case; propose RETIRE IMPLEMENTATION only after consumer/contract review; use NEEDS DECISION for unresolved product or public-API obligations. These are review dispositions, **not automated deletion instructions**.

## 1. Contract legitimacy comes before coverage

- Confirm the authoritative approved spec or product invariant, owning workspace, concrete user/publisher API and real execution path. Inspect both implementation and current tests. Existing test count, a named export, an old mock or green CI alone never justifies preserving parallel code.
- A public export **may** imply external consumers even when no in-repo caller exists. Check published package contracts, compatibility and migration consequences before proposing removal; request owner approval for a breaking change.
- Distinguish **implemented**, **documented target**, and **undecided** features in every finding. Do not add comprehensive tests for unimplemented accommodation, offline download, authentication or native support merely to make coverage look complete.
- Respect ownership: Engine validates typed authoring/build/runtime contracts; UI Kit owns framework-independent interaction; IndexDB owns persistence; adapters and hosts own integration; textbook packages own educational assets and published content; trusted scripts own Git/source security. One test should not silently assert another package's unapproved policy.

## 2. Assertions that can expose a defect

Every meaningful case or homogeneous group should record its **contract → plausible regression → observable outcome → diagnostic** (in a test name, adjacent comment when valuable, or review evidence). Prefer independently derived expectations, relevant positive/negative/boundary states and precise errors. Add failure, malformed input, synchronous setup error, async rejection, rollback, retry, timeout, race or recovery cases **when the particular contract and impact warrant them**, not mechanically for every function.

| Weak evidence                               | Stronger Svitlo-specific check                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Nine Quiz buttons exist                     | Different answers yield expected approved grades, attempts and navigation gates in the **active** Quiz/Controller |
| A localized page contains `dir="rtl"`       | Arabic/Hebrew/Urdu user flow has correct logical control order, arrow meaning, bidi labels and keyboard focus     |
| A password demo accepts 65 typed characters | A demo's actual supported state transition with direct input change; do not claim this proves authentication      |
| `expect(a).toEqual(a)` or a broad snapshot  | Expected output derived from the contract, changed-state or corrupt-input rejection with a useful diff            |
| Regex counts `locale:` in source text       | Parsed/published locale keys, actual localized output and explicit missing-content failure                        |
| A mocked loader returns data                | The host resolves a **real compiled public package export** and handles missing/corrupt published resources       |

Do not test React, MUI, Next.js, Vitest, browser primitives or TypeScript guarantees again **unless Svitlo has a specific integration obligation**. Avoid incidental DOM counts, brittle class selectors, unrestricted snapshots, duplicating the production algorithm in expectations, per-character typing for final-state checks, and source-text matching where a semantic/compiled/published check is available. Snapshot tests are justified for a specific reviewed serialized contract with stable intentional change review—not as uninspected change detectors.

## 3. Minimum sufficient verification layers

Choose the **cheapest layer that can observe the defect**; retain another layer only for a genuinely different failure mode. Treat each check's environmental limit as part of its claim.

| Layer                                 | Owns a distinct guarantee                                                                                                               | Cannot establish by itself                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Static/type, lint and boundary checks | Invalid TypeScript contract usage, imports, prohibited runtime/build dependencies, source conventions                                   | Runtime validation of untrusted JSON/JS or actual learner interaction                |
| Unit / pure function                  | Deterministic transform, invariants, error and edge branches without heavy hosts                                                        | DB transaction commits, real package loading or browser focus                        |
| UI component (jsdom where configured) | UI Kit state transitions, accessible roles/names, feedback and Controller gate behavior with minimal providers                          | Native keyboard/assistive-tech behavior, actual SSR or platform rendering            |
| Node integration                      | Real Configurator/schema and publisher behavior, source generation, isolated file/Git transactions, fake-IndexedDB controller contracts | Actual browser IndexedDB semantics or deployed host behavior                         |
| Real browser / IndexedDB              | Route/resource rendering, keyboard/focus flow, native browser DB reload/rollback/versionchange and cross-page persistence               | Installed Android/iOS WebView, physical-device offline support or Electron packaging |
| Build / publish / portability         | Compiled exports, selected textbook publishing, tarball/extraction, assets/locales and independent host consumption                     | Complete accessibility, media licensing or installed-platform operation              |
| Packaged Electron                     | The packaged executable/protocol, local lesson loads, security and network behavior of that runtime                                     | Signed installers or Windows/macOS outcomes from Linux-only execution                |
| Capacitor / device verification       | Actual Android/iOS WebView, plugin bridges, app lifecycle/storage and disconnected-device behavior **when a harness exists**            | Native behavior from a desktop Chromium viewport test                                |
| Human specialist QA                   | Age-appropriate pedagogy, subject correctness, keyboard/screen-reader usability, captions, audio/video meaning, on-device UX            | Automated repeatability or proof of cases not actually examined                      |

Use mocks to isolate a unit's _owned_ behavior and control deterministic errors; **do not mock away the boundary the test claims to verify**. A UI mock of a lesson loader can test an error message; a host content-loading guarantee must exercise its actual selected/public package or publication fixture. `fake-indexeddb` is valuable for controller behavior, but native browser cases remain necessary for browser-specific persistence/coordination. Web Playwright mobile device descriptors simulate viewport and input characteristics; they are **not** Capacitor or Android WebView tests.

## 4. Never optimize away trusted boundaries

Security and publishing checks deserve disproportionate weight, even if slow or lengthy, when they are the only protection for an irreversible/privileged operation. Keep failure-path assertions for the _actual trusted implementation_ and a test that confirms rejected inputs cause **no write or side effect**, including:

- Static editorial draft parsing **without execution**; rejecting dynamic imports, calls, computed keys, prototype pollution, malformed syntax and unsafe structure when disallowed by the current Reader.
- Pinned source blob SHA, PR/ref/actor authorization, branch-head lease and stale-head rejection; reject content replacement when a reviewed source has changed.
- Root/path containment, symlinks, unexpected files or overwrites, arbitrary media paths, temporary directory isolation and immutable IDs.
- Atomic Git publication and exact create-only manifests; no partially committed files, collateral changes or clobbering existing source on validation failure.
- Build versus runtime/public-export boundaries; separately published and extractable packages must not depend on private monorepo source paths.
- Privacy of learner progress/access preferences, safe Markdown/SVG/HTML/media rendering, asset license/integrity and no unauthorized external network dependency.

**Do not replace runtime rejection checks with `tsc`**, and do not rely solely on tests asserting that a workflow file contains a string when executable behavior can be exercised. Where full privileged execution is unsafe, test the safe boundary in isolation and explicitly report the unverified end-to-end risk. Do not remove a security check merely because it increases runtime.

## 5. Learning, accessibility and localization are behavioral contracts

- Base educational expectations (correct answer, feedback, score, thresholds, retry, selected question IDs, Quiz/Checkpoint/Flashcard progression, prerequisite gate) on the **current approved methodology and current runtime policy**, not reviewer intuition. Distinguish grading success from navigation unlock: the active Quiz may unlock on a completed unsuccessful attempt under the presently implemented policy.
- Assert what a learner **does and perceives**: answer submission, feedback, blocked/unblocked navigation, return to progress, visible error/recovery, and accessible interactive names and states. Choose semantic roles/keyboard/focus checks over purely decorative markers.
- Evaluate meaningful LTR and RTL sequences, mixed-direction text, logical control placement, localized accessible names, captions/transcripts and equivalent nonvisual alternatives as relevant. A `dir` attribute, `aria-label` or standalone flag presence is not sufficient proof of use by a learner.
- Check required locale keys and published content completeness against the **current Engine language contract** and intended authored locale set; make missing translations visible instead of accepting silent English fallback or copied filler. A separately authorized fallback in the **spoken audio language only** must never substitute for complete authored text, localized controls, captions/transcripts or equivalent non-audio access in each required locale. If full access cannot be provided, disclose and escalate the specific barrier under the existing accessibility specification; do not mark incomplete content or accommodation as compliant.
- Preserve sanitization and asset/media lifecycle behavior (failed loads, teardown, keyboard controls, captions), not only successful rendering. Verify both educational source decisions and technical production output; **do not invent scoring, medical/accessibility inference or content facts in tests**.

[Accessibility and localization](./architecture/internationalization-and-accessibility.md), [Lesson assessment bank separation](./architecture/lesson-assessment-bank-separation.md) and the entity specifications govern intended behavior. Testing proposals cannot independently change these rules.

## 6. Offline and native claims must identify the environment

A real browser DB test proves the measured browser behavior; blocked requests in Chromium prove a **browser scenario**, not a complete installed offline lesson. A viewport-emulated phone is not a signed mobile build, physical touch/keyboard/accessibility stack or storage lifecycle. Packaged Electron on Linux is not a Windows/macOS installer test. The offline product goal is not proof that the current host implements downloads, cache guarantees or complete media packaging.

For every offline/native claim, record host, OS, browser/WebView or runtime, packaging mode, installed assets/locales, network conditions, app reload/restart and storage behavior **actually exercised**. If no trusted native/device harness exists, record a concrete **uncovered obligation**, owner and manual/device verification route; do not fabricate a passing automated gate or build elaborate infrastructure without approved need. Human QA remains required where machines cannot establish pedagogy, assistive-technology usability or device-specific quality.

## 7. Isolation, selection and execution cost

- Use stable, intentionally minimal fixtures with realistic published shapes. Control clock, seeded randomness, generated IDs and mocked external services only to the extent needed for a deterministic contract; avoid rebuilding entire lessons for isolated UI checks.
- Isolate databases, origins, port choices, generated public files and temporary Git trees **per worker or run**. Restore mocks and process state, clean temporary directories and reject leaked DB connections. Never mutate shared tracked or published output while parallel tests are running.
- Prefer a single source of test selection; check that meaningful tests are genuinely **discovered and executed**, not merely compiled or named in an npm script. Avoid duplicate selection through nested runners, overlapping globs, unnecessary repeated builds and hidden `|| true` failure suppression. Treat skipped/dormant suites as explicit decisions, not green protection.
- Retain package-specific specialist suites when they protect independent contracts; do not force every expensive native, browser, publish or all-host suite on every Draft. Follow the **existing** [CI tiers](../rules/ci-workflow.md) and [script semantics](../rules/package-scripts.md). New discovery/CI routing belongs to separately reviewed work such as [#920](https://github.com/KiT-Maverik/svitlo/pull/920).
- Compare time or resource cost only when measured on comparable commands, hosts and SHAs. No global coverage minimum, test-count quota, execution-time cap or blanket test-pyramid ratio follows from this proposal.

For an intentionally dormant suite, record the **current contract**, why it is not selected, responsible package/owner, and decision **activate / replace / retire / defer**, with a trigger for revisiting a deferred one. A skipped test is not protection until its execution is demonstrated.

## 8. Evidence, independent review and changes to the suite

A PR review should include the exact **base/head or audited SHA**, changed contract, source/tests actually read, the checked **selection route** (test file → command → CI job/event, where relevant), commands executed and exact results (pass/fail/skipped), applicable current-head checks, limitations and outstanding risks. Explicitly mark unrun suites, mocked boundaries, hardware not exercised and source-only inspection. Historic success or a green check on a different SHA is not fresh evidence; coverage % is a diagnostic, not a conclusion.

For a new regression, link the approved contract and realistic defect to its smallest reliable test and confirm it is selected. To consolidate/delete, first map every removed case to **specific remaining assertions**, or document the removed obsolete behavior and required owner decision; keep security, browser, host, accessibility and educational guarantees that are not equivalent. Review real consumers before retiring APIs or mock infrastructure. Record the outcome in the owning PR, not in transient plan/report files.

Use the [QA Reviewer](../personas/quality-assurance-reviewer.persona.md) for assertion effectiveness and the [Development Reviewer](../personas/development-reviewer.persona.md) for architecture/contract impacts, with **independent review contexts where required by the actual workflow or owner**. A reviewer must not approve their own unratified policy by treating this proposal as authority. Owners of curricula, assessment methodology, runtime architecture and releases retain their respective decisions.

### Proportional exception and escalation

When a principle conflicts with a documented requirement or an expensive test uniquely protects a critical boundary: **preserve the existing protection** pending a decision. A proposed exception must state (1) exact contract and risk, (2) why a cheaper check is insufficient or a normal check is infeasible, (3) compensating evidence/manual test and residual risk, (4) accountable owner and revisit trigger. Record it in the PR and apply [`attention: decision`](../rules/github-labels-and-naming.md) if an owner choice remains. Do not silently weaken CI or accessibility/localization/security guarantees to meet a cost target.

## Authority and adoption

**Already binding elsewhere (not created by this proposal):** current architecture/product invariants, repo CI Draft/Ready/Production Quality permissions, GitHub PR/label rules, package script semantics, required independent editorial reviews and source/publishing trust boundaries. Consult their linked canonical documents and actual deployed workflows rather than treating this constitution as a replacement.

**New standards proposed for explicit owner ratification:** the legitimacy/risk/detection/sufficiency rubric; a recorded retained-regression map for test removal; explicit test-environment claim boundaries and dormant-suite dispositions; the minimum evidence fields for testing reviews; and the proportional exception/decision path. These are **review guidance pending approval**, not newly installed CI gates or required staffing and hardware. Record any approved clauses and unresolved exceptions in PR #921 before #901 integration. The independent [Development Constitution](./development-constitution.md) is outside this proposal.
