# Design Scene Skill

**Mandatory first action:** Read [Coding Agent Persona](../personas/coding-agent.persona.md) in full, then read applicable `AGENTS.md` instructions. This Skill runs as the **Coding Agent**. Its responsibility is the technical design, implementation, integration and testing of a lesson Scene, not independent revision of a lesson's subject matter, pedagogical learning objectives, or assessment policy.

**Purpose:** Technically design and implement a self-contained **Scene** **from an approved Scene specification authored by the Educational Screenwriter**: a content block through which a learner can observe, manipulate, explore, or interact with the subject of a lesson. Scenes commonly contain **animation, interactive controls, simulations, visual demonstrations, SVG diagrams, or guided exploration**; not every Scene must animate or be interactive if a clear learning purpose is served. A Scene is **not** a full Lesson, a Skill, a Question definition, a generic UI page, or an assessment policy.

The Scene's **public React component takes absolutely no props**, receives lesson-localized messages through the **existing context**, and adapts semantically to **both LTR and RTL** reading directions. As a **self-contained lesson interaction**, each Scene must also own **its own tests**, written and run in accordance with all applicable repository-wide and package-local testing rules. Design for learners with disabilities and other accessibility needs from the outset; unresolved accessibility limitations must be documented in code **and explicitly disclosed in the chat completion report**.

Read the relevant [Lesson](../docs/entities/lesson.md), [Section](../docs/entities/section.md), and [Lesson Content](../docs/entities/lesson-content.md) definitions before interpreting an approved Scene specification. A Scene is one typed content block in a vertical Section, not the entire Section or a Program.

## NON-NEGOTIABLE START CONDITIONS

1. **Hard prerequisite: locate and read the approved, written Scene specification prepared by the Educational Screenwriter** for the exact Scene being implemented. A general Lesson brief, taxonomy entry, verbal description or existing Scene example does **not** replace this document. **If it is missing, unavailable, unapproved, or does not cover the requested Scene, STOP: do not design, scaffold or implement the Scene.** Report the missing specification and request the correct document. Do not invent or author it yourself.
2. Identify the **actual standalone textbook package root** (`<PackageRoot>`), target Lesson and Section, Scene name and learning purpose from the approved specification. Do not presume the playground is the destination or the monorepo root is the package root.
3. Read the [Svitlo Architecture & Product Principles](../docs/architecture/README.md), especially [Internationalization & Accessibility](../docs/architecture/internationalization-and-accessibility.md), [Offline/Device Compatibility](../docs/architecture/offline-first-and-device-compatibility.md) and [Git-First Typed Content](../docs/architecture/git-first-typed-content.md). Read the current target Lesson/Section/resource configurations, content types, Scene locale infrastructure, tests, asset conventions, CSS/theme, accessibility and app instructions. Respect the repository's real paths and available APIs rather than copying an example blindly.
4. Read the **existing reference Scenes** in `content/playground/src/data/howLightMoves/sections/` (see concrete files below) and identify which patterns remain compatible with the target textbook's current contracts.
5. If the specification leaves scientific/pedagogical behavior, narrative sequence, learner actions or interaction constraints ambiguous, **stop the affected implementation and request a clarification from the Educational Screenwriter/editor**. Do not fill narrative gaps with invented activities or domain facts. A bounded Scene implementation must not trigger unrelated Lesson/Program refactors.

## SCREENWRITER SPECIFICATION — SOURCE OF SCENE BEHAVIOR

**The Educational Screenwriter's approved Scene specification is mandatory input and the authority for the Scene's instructional narrative.** It is produced by [Create Lesson Content Skill](./lesson-workflow/create-lesson-content.skill.md), as an independently reviewable `<PackageRoot>/data/lessons/<bucketNumber>/<lessonSlug>/scenes/<sceneNameCamelCase>.scene-spec.md` file. Locate and read the **actual approved file**, not just its planned path or an unapproved Draft. Do not start this Skill's Scene design or coding stages without it; a template, inferred storyboard, generic Lesson goal, previous Scene implementations, or the Coding Agent's own assumptions is never a substitute.

- **Must follow the specification:** the intended learning interaction, content and factual claims, scene structure, sequence of events, learner actions, explanatory messages, important visual states, expected responses and pedagogical constraints. The Coding Agent must not invent new teaching steps, activities, scenarios, characters, assessment logic, or meaning not authorized by the specification.
- **Engineering creativity is allowed:** choose technically appropriate layouts, rendering techniques, accessible presentation, transitions, decorative animation, micro-interactions, and visual polish **within the approved scenario**. These improvements may make the approved experience clearer or more engaging but must not add new learning requirements, change the intended sequence, obscure facts, or alter the instructional meaning.
- **Clarification over improvisation:** if the source specification is missing or ambiguous on a material narrative or learning decision, stop and identify the specific blocker. Ask for an updated or clarified Screenwriter specification; do not fabricate a temporary scenario or generate placeholder Scene code to keep moving.
- **Traceability:** make implementation decisions and tests traceable to the approved specification. Report necessary deviations separately; do not silently broaden scope. Required accessibility accommodations are engineering responsibilities, but any accommodation that materially changes the specified experience needs editorial review.

## SCENE CONTRACT — WHAT THE COMPONENT IS

- A Scene is a **Lesson content resource** represented by the current engine's `SceneResource_Config`: `{ id, blockType: 'scene', component }`. The `component` payload is renderer-specific (a React element in the current playground); the engine content contract does not itself import React.
- The exported **Scene root component is prop-free**, e.g. `export function ExampleScene() { ... }`. It must not accept `props`, `children`, `locale`, `messages`, `direction`, `config`, `onChange`, or any other incoming component props. Do not add optional props, hidden default props, generic prop bags or new wrapper APIs to circumvent this boundary.
- The Scene **may use its own hooks, local state, internal constants, content data, and composed child widgets**. Child widgets can use props internally; the **public Scene root** remains prop-free. Interactive state belongs inside the Scene or an existing shared context explicitly designed for it.
- A Scene obtains needed external **locale, scene text, and applicable lesson context** through existing provider hooks, not by passing props through the scene resource. If required context is unavailable, use the repository's established explicit error behavior; do not silently substitute an invented default.
- Keep behavior reproducible, scientifically consistent and logically bounded. Controls should change only the intended aspect of a model; a change in animation speed must not change the physical rule being demonstrated unless the learning specification explicitly calls for it.
- **Self-contained, independently testable content:** the Scene owns its interaction, state, and presentation behavior. **Every Scene must have co-located automated tests**, even when it composes existing tested widgets; the parent Lesson's tests alone do not replace the Scene's tests. Follow the repository's standard test naming, fixture, mocking, accessibility and quality rules instead of inventing a special test architecture.

## SPECIALIST MOTION / VIDEO INTEGRATION

If an approved Scene specification calls for programmable motion design, video-style timeline composition or Remotion playback, **also read [Create Remotion Video Skill](./create-remotion-video.skill.md)**. Decide whether an internal `@remotion/player` composition helps the learner, or whether the interaction genuinely needs ordinary React/SVG/Canvas/Three.js controls. **A composition may use typed internal props; the exported Scene root still takes zero props.** Remotion does not automatically provide arbitrary keyboard-accessible learning interactions, a fully offline video package or a YouTube integration. Preserve this Scene Skill's localization, LTR/RTL, independent tests and `TODO(a11y)` exception contract.

## REQUIRED REFERENCE IMPLEMENTATIONS

Use these **current architectural examples**, not mandatory source files to duplicate:

| Example                       | Actual location under `content/playground/src/data/howLightMoves/sections/`                                                     | Lessons to extract                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `LightRayDiagram`             | `theory/resources/scenes/LightRayDiagram/LightRayDiagram.tsx` and `LightRayDiagram.module.css`                                  | SVG illustration, localized `<title>`/`<desc>`, directional graphic geometry, **separate readable labels**                       |
| `LightPropagationSimulation`  | `theory/resources/scenes/LightPropagationSimulation/LightPropagationSimulation.tsx` and `LightPropagationSimulation.module.css` | Local state, playback/speed controls, reduced-motion preference, CSS logical properties, accessible labels                       |
| `Practice`                    | `practice/resources/scenes/Practice/Practice.tsx`, `Practice.constants.ts` and `Practice.module.css`                            | Interactive selection, domain constants separated from JSX, localized numbers and text, RTL-aware layout                         |
| `Checkpoint`                  | `theory/resources/scenes/Checkpoint/Checkpoint.tsx`                                                                             | Prop-free Scene composing an existing widget using localized messages; **child widget props do not violate the Scene-root rule** |
| `Scene resource registration` | `theory/resources/scenes/scenes.data.ts`, `index.ts`, `index.ids.ts`; practice equivalents                                      | Stable resource IDs, `blockType: 'scene'`, `createElement(SceneName)` **without props**, level-specific exports                  |

Also inspect the exact runtime wiring:

- `content/math/src/components/pages/Lesson/SceneLocaleContext.tsx` — `SceneLocaleProvider` and `useSceneLocales<T>()`. The **provider** takes props; the **Scene** does not.
- `content/playground/src/data/howLightMoves/howLightMoves.data.ts` — registers the per-Scene translated dictionaries under distinct keys in `sceneLocales`.
- `shared/engine/src/utils/builders/buildLesson/buildLesson.utils.ts` — selects one language's messages on the **server** before rendering the Lesson.
- `content/math/src/components/pages/Lesson/Lesson.tsx` — provides selected Scene messages and locale via `SceneLocaleProvider`.
- `content/math/src/components/pages/Lesson/LessonSectionContent/LessonSectionContent.tsx` — renders a `blockType: 'scene'` resource's prepared React element without passing Scene props.
- `shared/engine/src/types/content/resource.types.ts` and `lesson.types.ts` — authoritative `SceneResource_Config` and `Lesson_Config.sceneLocales` contracts; inspect the actual engine version in the target package.
- Existing `*.unit.spec.ts` and `*.unit.fx.ts` beside the reference Scenes — patterns for provider-based scene tests, accessibility, localization, interaction and RTL.

**Package rule:** the reference demo Scenes now live in `content/playground`; production Scenes belong to the **selected textbook application**. Reuse shared engine types and existing lesson infrastructure; avoid a runtime dependency on playground or another textbook. If a target app lacks a required provider/renderer, report the actual integration gap instead of inventing undocumented props for the Scene.

## 1. PROP-FREE COMPONENT AND LESSON INTEGRATION

The current Math textbook model is:

```tsx
// The public Scene component accepts NO props.
'use client';

import { useSceneLocales } from '@/components/pages/Lesson/SceneLocaleContext';
import { getLocaleDirection } from '@types';
import type { ExampleScene_Locale } from './ExampleScene.locale';

export function ExampleScene() {
  const { locale, scenes } = useSceneLocales<{ example: ExampleScene_Locale }>();
  const messages = scenes.example;
  return (
    <section lang={locale} dir={getLocaleDirection(locale)}>
      {messages.title}
    </section>
  );
}

// In the owning Section's scene resource map (a DIFFERENT file):
// example: {
//   id: section_SceneResources_Ids.example,
//   blockType: 'scene',
//   component: createElement(ExampleScene),
// }
```

This is an illustrative **split across files**: do not place resource-registration snippets into the component file. Adapt import aliases, scene key, naming and types to the real target package. For any scene using hooks, event handlers, browser APIs or local interactive state, use `'use client'` as required by the current Next.js boundary. Do not mark an entire Lesson or unrelated tree client-side when only the Scene needs client behavior.

**Required integration:**

1. Write `<SceneName>.tsx` as a named, zero-prop Scene root. Keep independent data/constants, styles and localizations in co-located files where appropriate.
2. Define or reuse an **authoring-time stable Scene Resource ID** in the owning Section's `index.ids.ts`. Do not generate random IDs at render time.
3. Register the actual React element (`createElement(SceneName)`, no props) in the owning Section's `scenes.data.ts` with `id`, `blockType: 'scene'` and `component`, satisfying the actual `SceneResource_Config` type.
4. Export only the appropriate resource collection from the owning `index.ts`; do not flatten unrelated resources into a global barrel.
5. Add the resource to the **intended ordered Section content** through the current Lesson/Section data contract. Do not assume a Scene auto-renders merely because its file exists.
6. When Scene text exists, register the complete Scene locale dictionaries under a **unique matching key** in the owning Lesson's `sceneLocales`. The Scene reads that same key from context. Do not inject an independent translation provider inside the Scene.
7. Verify the Lesson assembles and renders the resource with the correct selected locale and maintains existing Lesson navigation/state behavior.

## 2. LOCALIZATION THROUGH CONTEXT — NO TEXT PROPS

**Every user-visible string must be localized when present.** This includes titles, descriptions, labels, controls, tooltips, instructions, feedback, SVG labels, alternative text, accessible names/descriptions, visible physical-unit labels, and explanatory limits of simplified models.

- Define a typed `<SceneName>.locale.ts` dictionary or use the existing package convention. Cover **every currently supported language**, using short language-code keys required by the actual `LanguageCode` contract (e.g. `en`, `uk`, `ar`, `he`), not a hardcoded historical number. Use the package's approved locale registration pattern (the reference uses `satisfies Record<DefaultSupportedLanguage['language'], SceneLocale>`).
- The current flow is **authoring dictionary → Lesson `sceneLocales` → `buildLesson` selects the requested locale on the server → `SceneLocaleProvider` → prop-free Scene calls `useSceneLocales`**. Avoid shipping the entire multilingual dictionary to every interactive Scene client.
- The current `buildLesson` has an **English fallback** when a requested translation is absent. That is a runtime behavior, **not an acceptable authoring shortcut**: fill translations for the full supported set and validate completeness. Do not rely on fallback to mask missing production translations.
- Derive direction from the active locale and the existing authoritative helper (`getLocaleDirection(locale)` in the reference). Use the selected locale for `lang`, number/date formatting when necessary, and semantic accessibility text.
- Do not store selected-locale UI strings as constants in the Scene implementation, interpolate fixed English labels into `aria-label`, hardcode left/right wording independent of orientation, or pass locale/messages through component props.
- Scenes without visible text still require correctly localized **accessible descriptions** wherever meaningful, and correct LTR/RTL spatial behavior.

## 3. TRUE LTR / RTL SUPPORT — NOT WHOLE-SCENE MIRRORING

Support LTR **and** RTL as **directional design modes**, not a single `scaleX(-1)` applied to the entire component.

1. **Direction and semantics:** derive `rtl = getLocaleDirection(locale) === 'rtl'` and apply an appropriate `dir`/`direction` to the Scene's semantic root. Inherit or explicitly set `lang`. Use `dir="auto"` / isolated bidirectional spans where appropriate for mixed-content content; do not blindly reverse symbols or numeric values.
2. **Logical layout:** prefer CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start/end`, `border-inline-start`, etc.) and direction-aware Flex/Grid placement to physical `left`/`right` assumptions. Align toolbars, labels, callouts, controls, focus progression and relationship cues for each reading direction.
3. **Graphics and SVG:** selectively adapt **geometry** (coordinates, arrows, connector endpoints, axis placement, path direction, callouts, draggable destinations and animation travel) when its meaning depends on reading direction. In the current `LightRayDiagram`, the graphic group is transformed for RTL **separately from the text-label group**. This is a pattern for selective transformation, not permission to mirror everything.
4. **Text is never a mirrored graphic:** keep letters, words, digits and formula glyphs readable in their original orientation. SVG `<text>` labels need independent coordinates, appropriate `text-anchor`/`direction` and localized content. HTML/SVG bidi behavior must be tested explicitly, particularly for Arabic, Hebrew and Urdu.
5. **Semantic invariants:** physical phenomena, axes, coordinate signs, numeric values, time flow, mathematical operators, culturally meaningful icons and diagrams **must not be reversed if reversal would change the concept**. Decide which objects are logical-start/end elements and which are physical world directions. Localize written instructions to match the **actual rendered positions**.
6. **Behavior, not only appearance:** keyboard ArrowLeft/ArrowRight meaning, drag behavior, Slider/stepping direction, animation trajectories, pointer hit regions and focus/reading order should stay consistent with the chosen directional model and common platform conventions. Do not apply arbitrary inversion to a physical simulation just because the surrounding text is RTL.
7. **Layout resilience:** allow longer translated text, different font metrics and narrow mobile viewports. Prevent overlap, clipping and disconnected captions after directional rearrangement.

**Required test:** render each relevant Scene with an LTR and an RTL locale; assert readable, correct localized text and accessible names, correct directional placements/relationships and preserved semantics. Checking only the existence of `dir="rtl"` is insufficient.

## 4. INTERACTION, ANIMATION AND ACCESSIBILITY

- **Clear instructional purpose:** every moving object/control should demonstrate an explicit concept; learners must be able to distinguish model behavior from decorative motion. Document simplifications, scales or idealizations in localized learner-facing language when materially relevant.
- **Inclusive design from the planning stage:** whenever feasible, make the full learning interaction accessible to learners with differing vision, hearing, motor, cognitive, and other disability-related needs. Consider nonvisual or text alternatives for essential graphics, keyboard-only and assistive-technology use, reduced-motion/nonanimated modes, readable contrast, scalable text, and sufficient time/control flexibility as applicable. Choose an equivalent accessible pathway whenever possible **without dropping the Scene's learning functionality or scientific meaning**. Do not equate an ARIA label or a static screenshot with equivalent access to an essential interactive task.
- **Mandatory documented exception if equivalent access cannot currently be achieved without a material loss of functionality:** first explore reasonable alternatives; do not silently discard accessibility or remove core functionality just to satisfy a checklist. In the **main Scene component source file (`<SceneName>.tsx`) place a clear `TODO(a11y)` comment at the very end of the file** (after the component implementation) recording: **which learner need or modality is not supported, what concrete barrier exists, why an equivalent solution is not currently feasible without losing the specified function, and what remediation/alternative needs to be investigated**. Add related comments to other affected files only if helpful; the end-of-file TODO in the main Scene source is mandatory. Keep the known limitation visible in tests/review where feasible. **Explicitly call out the same blocker in the chat completion message**, including the affected learners, practical impact and pending remedy. A TODO does **not** mean accessibility is complete or waive other available accessibility requirements.
- **State and determinism:** keep interaction state local or in a documented shared context. Do not mutate global lesson state without an existing contract. If random behavior is needed, use a stable seed or explicit model input; test state changes and reset behavior where appropriate.
- **Motion preference:** respect `prefers-reduced-motion` for nonessential animation. Allow pause/play or a readable static state for continuous movement; do not hide required information behind animation alone. The reference Simulation uses `useSyncExternalStore` with a reduced-motion media query.
- **Accessible controls:** all controls must be operable by keyboard, have discernible localized accessible names, correct roles/states (`aria-pressed`, slider values, etc.), visible focus and sensible tab sequence. Use semantic buttons/labels and announce meaningful dynamic feedback (`aria-live` sparingly). Do not use color or motion as the only information channel.
- **Illustrations and diagrams:** give meaningful `role="img"` / `aria-label` or SVG `<title>` and `<desc>` when the graphic conveys information. Decorative shapes should not add noisy accessibility nodes. Keep the graphic understandable without relying solely on fine visual details.
- **Responsive design:** adapt size, hit targets and layout to mobile/tablet/desktop; avoid horizontal overflow and tiny controls. Use existing theme tokens, shared components and CSS modules as appropriate rather than hardcoded platform-specific styling.
- **Performance, full learning functionality and cleanup:** limit unbounded animations and excessive re-renders, remove event listeners/observers on unmount, avoid hydration mismatch and unnecessary client bundle dependencies. Do not import massive media or translation collections solely to render one Scene. Design the Scene and **its required assets for fully offline use after download** when the textbook is delivered as a PWA. Support weak devices through equivalent lower-cost visual representations when feasible, **not by silently removing necessary learning content, core controls or modeled behavior**. Any material trade-off requiring reduced learning functionality **must be raised to the editor/architect**; future capability flags may disclose limitations but do not replace an equivalent experience.

**Example required end-of-file annotation when accessibility is genuinely blocked (illustrative only; use a real, scene-specific explanation):**

```tsx
// TODO(a11y): Learners who cannot use pointer-based spatial dragging cannot yet
// complete [specific interactive task]. An equivalent keyboard/screen-reader
// interaction needs [specific unresolved design or technical work]; a naive
// conversion to buttons would lose [specific essential learning behavior].
// Investigate [concrete accessible alternative] with the accessibility reviewer.
```

The TODO must appear **after the main Scene implementation at the end of its own `<SceneName>.tsx` file**, not only in a test, PR description or issue. Do not copy the example as a generic excuse: identify the actual accessibility barrier and concrete next action. If the Scene can be made accessible with existing techniques, **implement them** instead of leaving a TODO.

## 5. IMPLEMENTATION PROTOCOL

1. **Validate Screenwriter specification before any implementation:** locate, read and confirm an **approved written specification for this Scene**. If absent or incomplete in a way that blocks the instructional design, **stop without designing or coding** and report the requirement. Only then confirm target Lesson, Section, current Scene contracts, context, localization and app boundaries.
2. **Translate the approved scenario into an engineering plan:** identify the specified learner actions, ordered events, feedback, model states and instructional constraints, then decide implementation details, LTR/RTL mappings, **accessible interaction modes for learners with relevant disabilities**, and acceptance cases. Decorative animation and polish may be invented only **within** the source scenario. Identify limitations early and try equivalent accessible designs before accepting a functional trade-off; request editorial clarification instead of adding new narrative or learning content.
3. **Implement Scene:** build the zero-prop React component plus reusable internal helpers/styles; use typed local state and existing hooks. No public component props.
4. **Localize:** author all required visible and accessible strings for the complete current language set. Wire them into the Lesson's scene-locale configuration and read only from context inside the Scene.
5. **Handle direction semantically:** test RTL geometry, text, controls and interactions as distinct concerns; do not apply a global reflection transform.
6. **Register and compose:** create/reuse stable Scene ID, typed resource config, level-specific Data/ID exports, and the intended Lesson Section inclusion. Make sure the selected locale and direction reach the Scene through providers.
7. **Test:** **create and maintain the Scene's own co-located `*.unit.spec.ts` tests as a required deliverable**, with `*.unit.fx.ts`/other fixtures as warranted. Follow **all** applicable repository and target-package testing rules, conventions, tooling and quality gates; do not treat tests of the Lesson or a reused widget as sufficient. Cover the Scene's observable behavior, states, meaningful interactions, an LTR locale, RTL locale(s), accessibility/keyboard paths, reduced motion when relevant, responsive behavior and scene registration/rendering. Test available accessible alternatives; explicitly identify any untested or unresolved accommodation instead of claiming full coverage.
8. **Review and stop:** report the exact implementation, **Scene-specific test files and their results**, and validation outcome. When any accessibility limitation remains, ensure the source file **ends with the required `TODO(a11y)`**, and **explicitly describe the limitation and its impact in the final chat response**, even if the rest of the Scene works. Do not automatically alter question banks, assessment policies, curricula, or unrelated shared engine code.

## 6. ACCEPTANCE CHECKLIST

- [ ] **An approved, written Scene specification authored by the Educational Screenwriter was located and read before any Scene design or implementation.** If missing, the task was blocked without scaffolding or invented scenario content.
- [ ] Target package, Lesson/Section, learning purpose, and current repository instructions verified; the implementation follows the approved scenario without extra instructional steps or unapproved narrative content.
- [ ] A Scene is implemented and wired as `blockType: 'scene'` in the actual typed content contract.
- [ ] Exported Scene root has **zero props**; no external values enter it via component arguments.
- [ ] Required locale/text comes **from the existing lesson/scene context**, not props or a private ad hoc locale provider.
- [ ] All current supported languages have complete, meaningful translations for **visible and accessibility text**; selected-locale SSR assembly is verified when applicable.
- [ ] Correct `lang` and LTR/RTL direction; semantic layout and directional interactions are tested.
- [ ] No blanket mirroring of text, labels, numbers or semantics; selective geometry changes preserve the lesson concept.
- [ ] Scene is planned for learners with relevant accessibility needs and uses equivalent accessible interactions wherever feasible; available keyboard, screen-reader, visual, audio, reduced-motion and responsive paths are verified as applicable.
- [ ] Scene code, localized assets and needed models/media have an **offline delivery plan**. Low-performance adaptation preserves instructional content and interaction; any unavoidable capability gap is explicitly discussed, not silently implemented as a lesser Lesson.
- [ ] If full accessibility would currently require losing essential functionality, a precise **end-of-file `TODO(a11y)` exists in `<SceneName>.tsx`**, and the same limitation, affected users, impact and pending remedy are **explicitly stated in the chat**. No limitation is concealed behind a passing checklist.
- [ ] Stable Scene Resource ID, Data registration, local indexes and Section inclusion are all wired and verified.
- [ ] The Scene has **its own automated tests** following repo/package-wide test rules (not solely parent Lesson or child-widget coverage); required tests run and results are reported. Typecheck, lint and applicable integration/visual tests run where available; unavailable checks clearly reported as **not run**.
- [ ] No unrelated Lesson/Program/Assessment/Skill semantics were modified.

## RESULT

Deliver a reviewable code change inside the **actual textbook application** (not `studio/` or `content/playground/` unless that application was expressly requested), including:

- `<SceneName>/<SceneName>.tsx`: named, prop-free Scene root with any local interactive state.
- `<SceneName>/<SceneName>.locale.ts`: complete typed translations where visible or accessible text exists.
- `<SceneName>/<SceneName>.module.css` (or existing styling convention), plus optional `*.constants.ts` / helper files if truly needed.
- **Required** `<SceneName>/<SceneName>.unit.spec.ts` with Scene-specific automated tests compliant with repository-wide and package-local rules, plus optional co-located fixtures/mocks. Parent Lesson or reused-widget tests are not a substitute. UI test fixtures may supply **provider props**, but must not change the Scene root's public zero-prop API.
- Parent `scenes.data.ts` / `index.ts` / `index.ids.ts` updates for the typed `SceneResource_Config`, plus the parent Lesson's `sceneLocales` and intended Section's ordered content.
- A concise **chat completion report**: the **approved Screenwriter specification used** (or a clear blocking notice if absent), implementation scope and any deviations, paths changed, **own Scene test file(s)** and test commands/results, LTR/RTL checks, locale coverage, accessible alternatives, **offline asset/dependency readiness and weak-device compromises**, accessibility/performance checks. **Any unresolved disability-access barrier must be called out explicitly, with the location of the final-line `TODO(a11y)`, affected users, functionality impacted and proposed follow-up**; do not bury it under generic 'remaining concerns'.

**Scope guard:** This Skill is an **engineering implementation workflow** under the Coding Agent Persona, **not a instructional design-authoring workflow**. The Educational Screenwriter owns the approved Scene specification and instructional scenario; the Coding Agent owns its faithful technical implementation, artistic animation details and accessibility within that scenario. **Without the Screenwriter's written specification, do not begin work on the Scene.** Do not invent lesson facts, new narrative/learning activities, assessment scoring, unapproved interfaces, or cross-textbook dependencies.

## Structured Lesson Content linkage

For newly authored Lessons, the Screenwriter's canonical structured Lesson plan is `content.yaml`. Its `sceneSpecifications[]` entries reference distinct `scenes/<key>.scene-spec.md` files. The **approved full Scene Markdown specification** remains mandatory for this implementation skill; a YAML `sceneSpecKey` alone cannot replace it. Read both where present, keep keys and paths consistent, and do not silently create Scene implementations from incomplete draft references. Legacy `content.md` references may remain until explicitly migrated.
