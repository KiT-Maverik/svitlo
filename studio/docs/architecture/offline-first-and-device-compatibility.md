# Offline-First & Device Compatibility

**Status:** **offline-capable learning across selected distribution targets is a product objective**; a PWA install experience is **optional**, not an architectural requirement. This is not a claim that working Service Workers, native download packages, cache, install, license or sync flows already exist. Existing local storage controllers do not establish a complete offline application.

## Product invariant: complete educational content, online and offline

Svitlo targets a **Next.js Web host**, an optional installable **PWA experience** for that Web host, and planned **Capacitor mobile** and **Electron desktop** clients. A learner should be able to **download the selected offline-eligible educational package/lesson and study it offline**, including all **necessary instructional resources**, interactive behavior, locally available exercises/feedback and legitimately available review materials. The exact licensed-content eligibility and expiry policy remains to be decided; do not promise perpetual paid access. Downloaded free/entitled lessons must not depend on an unrelated live content request just to render.

- **Offline must be designed across the complete dependency graph**: application shell, selected locales, text/Markdown, images/fonts, audio/video needed for the selected package, Scene code and assets, exercise data, models and any computation required by the chosen lesson.
- If a learning experience truly requires an online service (live collaboration, remote AI inference, externally embedded video or cloud-backed grading), it **cannot be represented as fully offline without a defined local alternative**. Disclose the gap and seek an architectural decision; do not mislabel an online-only activity as fully available offline.
- Download/install UX should make package availability, sizes, updates, offline readiness and optional large media transparent. **Do not silently exclude a required video, model, locale or exercise** to save space. A user may explicitly choose packages/locales, but the content they select must be internally complete for the stated offline experience.
- Reproducible bundles/package manifests from reviewed Git sources and stable IDs should support future independent textbook extraction and offline delivery. Their precise formats, lifecycle and update policies remain open.

## Persistence responsibilities

- **Git:** canonical authored educational content and media source, as documented in [Git-First Content](./git-first-typed-content.md).
- **Local repository / IndexedDB (planned direction with existing partial code):** versioned educational entity metadata and learner-related activity/progress/notes that must survive reloads and offline use. Keep data models normalized and keyed by stable IDs where appropriate.
- **Web Service Worker / Cache API (optional, planned):** caching the browser app shell, static bundles, downloaded content and especially large media when PWA/offline Web is selected. Native packaged assets and platform storage/cache adapters can fulfill corresponding needs on mobile/desktop. Do not automatically store every video/blob in IndexedDB.
- **Sync layer / remote database (planned):** optional multi-device progress/account sync and conflict resolution when online. Do not put sync side effects inside every read method. **Offline availability must not be contingent on a cloud account or round-trip**.
- Local browser data can be evicted or cleared; offline guarantee needs documented storage quotas, readiness checks, update/retry behavior and a recovery strategy. Do not promise permanent preservation that browser storage cannot guarantee.

**Implementation maturity:** inspect the **chosen target** for complete shell/Scene chunk/media packaging, download/install flow, cache invalidation, local persistence, licensing behavior and real airplane-mode tests. Only require a PWA manifest and Service Worker where optional Web/PWA support is actually in scope; native packaging requires its own verification **before** claiming offline readiness. These capabilities are separate from having `LessonState` types or a local DB controller.

## Weak devices: preserve learning, not just animations

A textbook should **work as well as possible on low-powered or older devices** and constrained networks: minimize JS and asset payloads, avoid unnecessary client hydration, lazily load large scenes, reuse lightweight 2D representations where equally effective, honor reduced-motion preferences, constrain CPU/GPU/memory use and avoid unbounded timers or expensive background effects.

**Hard trade-off boundary:** We **must not sacrifice existing learning material, factual coverage, core interaction or learning functionality silently** to improve device compatibility. Degrading the learning goal to a non-equivalent “lite lesson” is not an acceptable automatic solution.

If a feature cannot feasibly run on a particular device while preserving the equivalent educational experience:

1. Measure/describe the bottleneck and supported/unsupported capabilities.
2. Investigate **semantically equivalent** lighter implementations: simpler rendering of the same model, accessible tables, lower visual fidelity, fewer simultaneously displayed objects, nonessential effects off, cached/precomputed data, variable frame rates.
3. If equality is genuinely impossible, **escalate the trade-off explicitly**. The editor/architect determines the scope, minimum supported devices, alternative presentation and whether the limitation may be disclosed.
4. Preserve the full canonical content and source definition. A future **compatibility flag or runtime capability indication** may expose that a given interactive format is unsupported on a low-performance device, but the **flagging capability is planned, not already in code**, and is not permission to drop content.
5. Report the unsupported user experience and the proposed remedy. **Never silently omit a Section, Scene, resource, answer, audio/video or educational fact** or pretend an alternative has the same learning value when it does not.

**Performance and offline support are independent dimensions:** an offline scene may still exhaust GPU memory; a low-memory scene may still depend on an online API. Review both, plus accessibility and full localization.

## Acceptance and future work

A complete offline-capable textbook will ultimately need **target-specific installation or Web access, package-download management, locale-aware caching, media strategies, offline-local progress, optional sync, storage-eviction resilience, licensing policy and real airplane-mode E2E testing**. All are requirements/gates for later implementation, not software that this document creates.

**Related:** [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md), [Localization & Accessibility](./internationalization-and-accessibility.md), [Learning Philosophy](./learning-experience-philosophy.md), [Notes](./lesson-notes.md), [System Boundaries](./system-boundaries.md).
