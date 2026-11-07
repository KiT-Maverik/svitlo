# Design Scene — compatibility alias

**Superseded:** use [Implement Scene](./lesson-workflow/implement-scene.skill.md) under the [Coding Agent Persona](../personas/coding-agent.persona.md).

The **current** Scene contract uses typed `ContentBlock_Scene` source and localized `locales` response props, a textbook-owned generated lazy registry, a separate deterministic YAML-to-Lesson scaffolder, co-located Scene tests, and Coding Agent authoring **only of the approved source language**.

Do **not** use historical `SceneResource_Config`, `blockType: 'scene'`, prop-free Scene roots, `SceneLocaleContext`, `content/<book>/src/data`, manual `scenes.data.ts` registration or Coding Agent translations into every supported language. Those historical patterns were replaced and would generate incompatible Scenes.

The linked **Implement Scene** skill is the entire active specification for engineering, registration, tests, TODO lifecycle, accessibility, source-locale-only authoring and production handoff. References to this old filename in other skills should be updated over time. Do not interpret this alias as separate authorization to design pedagogical scenes: **approved Screenwriter Scene specifications remain mandatory**.
