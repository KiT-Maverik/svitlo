# Test suite optimization

Implementation proposal based on the semantic audit in [#898](https://github.com/KiT-Maverik/svitlo/issues/898). Audit source: `f1a2a918169f2a714aacb86fda520f029816dc26`; implementation starts after the subsequent naming migration. Revalidate every recommendation against current code.

## Target

Maximize meaningful regression protection at minimum necessary testing complexity and execution cost. Establish actual test selection and preserve distinct security, accessibility, browser, persistence and host integration guarantees.

## Sequencing

1. Establish legitimacy of parallel UI Kit QuestionRenderer and LessonNavigationProvider; retire only with verified consumer and contract evidence.
2. Consolidate IndexedDB utility, simulated and native tests around distinct guarantees.
3. Consolidate Engine configurator/schema tests and separately generator/materializer tests.
4. Simplify repository tooling tests while preserving trusted source and Git transaction safeguards.
5. After these changes, optimize remaining UI Kit, Web and other workspace tests, then reconcile test discovery/CI and formalize quality guidance.

No numeric deletion or speed target; obtain comparable execution evidence. This proposal is not an assertion of implemented functionality or a live PR status tracker. Remove it when superseded by the final canonical quality guidance.
