# Create Remotion Video Skill

**Role:** [Coding Agent Persona](../personas/coding-agent.persona.md) — specialist subskill in **programmatic video, motion design, compositing and interactive video production**. This is **not** an additional persona or a license to rewrite the Educational Screenwriter's scenario.

**Purpose:** Produce sophisticated, reproducible educational motion graphics and video with **Remotion + React + TypeScript**, from an approved instructional specification. The deliverable may include a video rendered as a file, an **in-browser Remotion Player** experience, or both, when their respective behavior is actually appropriate. A Remotion composition is source code, not just a one-off MP4.

## REQUIRED PRE-FLIGHT — DO NOT SKIP

1. **Read** the [Coding Agent Persona](../personas/coding-agent.persona.md), repository `AGENTS.md` and the [Architecture Principles](../docs/architecture/README.md), particularly [Git-First Typed Content](../docs/architecture/git-first-typed-content.md), [Learning Philosophy](../docs/architecture/learning-experience-philosophy.md), [Internationalization & Accessibility](../docs/architecture/internationalization-and-accessibility.md), and [Offline & Weak Devices](../docs/architecture/offline-first-and-device-compatibility.md).
2. **Read and verify the approved Educational Screenwriter's lesson/Scene/video specification**: target learners, learning purpose, exact explanatory sequence and factual model, narration or onscreen copy, timing constraints, required media, accessible alternatives and localization. **Do not begin video design or code without an approved instructional script.** Ask for the missing specification or editorial decision instead of inventing learning claims, instructional beats, story or assessment logic.
3. Identify the **real owning textbook/production package** and any existing Remotion project, app/scene integration, package scripts, dependency versions, render infrastructure and tests. Work inside its intended package; do not bind a standalone textbook to `content/playground` or another app's code.
4. Inspect **current official Remotion documentation for the installed version**, not only your prior knowledge, and review the official [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) as a supplementary technical reference. In an environment where importing official skills is allowed, choose relevant ones explicitly; **do not silently install new packages, skills, third-party plugins or global tooling**. Verify that all `remotion` and `@remotion/*` versions are compatible/pinned together.
5. Confirm the **render and publishing requirements**, media rights, Remotion's [current license](https://www.remotion.dev/docs/license) and any required paid plugins/features **before adding a dependency, automation service or publishing media**. The existence of a render API does not prove Svitlo has a render worker, Lambda service, or commercial license.
6. If the brief does not specify a special output, **plan both landscape Full HD and vertical Story** in distinct, correctly composed layouts. If the requested delivery is browser-only, retain reusable composition definitions and explicitly document why exporting one/both video files is unnecessary for that particular task.

## MOTION DESIGN AND MEDIA ENGINEERING EXPERTISE

Approach the task as an experienced **motion designer, editor, compositor, animation engineer and audio/video producer**, not merely a React developer who animates text.

- **Storyboarding and visual hierarchy:** translate _approved_ narrative beats into a shot list, purposefully timed visual changes, camera motion, clear focal points, readable titles, purposeful transitions and controlled information density.
- **Animation fundamentals:** master staging, anticipation, easing, velocity/acceleration curves, overshoot/settle, follow-through, squash/stretch when stylistically appropriate, arcs, timing, rhythm and visual continuity. Respect realism and scientific models when the subject demands precision.
- **Timing and compositing:** plan at frame granularity (holds, cuts, overlaps, stagger, masking, clipping, parallax, layer compositing and motion blur), with coherent pacing and visually stable typography. Reusable animation primitives are preferable to scattered magic frame constants.
- **Advanced motion work:** choreograph complex multi-object movement, morphing paths, data-driven graphs, charts, transformations, camera moves, perspective, pseudo-3D/3D, particles, procedural patterns, kinetic typography and layered effects. Use SVG, Canvas, WebGL/Three.js or auxiliary libraries only if the selected Remotion pipeline supports deterministic preview **and** final rendering.
- **Audio production:** handle voiceover and music responsibly; mixing, fades, silence, ducking, loudness consistency, synchronization, localization, sound effects and captions. Background audio must not obscure narration or make learning dependent on hearing alone.
- **Supplementary resources:** use source-approved footage, sound, illustrations, photographs, fonts, iconography, Lottie/Rive, subtitles, existing scientific models and external media where technically/legally appropriate. Preserve asset provenance, licensing, attribution and local reproducibility. Never source unlicensed copyrighted music/footage or invent asset rights.
- **Educational correctness:** visuals must not add fictitious causal relationships, misrepresent units or scale, reverse physical motion incorrectly, or turn a pedagogically neutral Lesson into an unapproved Program plot. Clear motion should make essential knowledge easier to understand rather than distract.

## REMOTION TECHNICAL CONTRACT

**Official documentation:** [Fundamentals](https://www.remotion.dev/docs/the-fundamentals), [Compositions](https://www.remotion.dev/docs/composition), [Player](https://www.remotion.dev/docs/player/player), [Rendering](https://www.remotion.dev/docs/render), [Transitions](https://www.remotion.dev/docs/transitioning), [Audio](https://www.remotion.dev/docs/using-audio), [Remotion Three](https://www.remotion.dev/docs/three), [Parameterized video](https://www.remotion.dev/docs/parameterized-rendering).

1. **Frame-driven declarative animation.** Treat a composition as a renderable function of **frame, fps, dimensions and validated inputs**. Use `useCurrentFrame()` and `useVideoConfig()`, `interpolate()`, `spring()` and project-compatible animation primitives; define duration in **frames**. An arbitrary requested frame must produce the same state, including when frames render non-sequentially or concurrently. Do not rely on `setTimeout`, `requestAnimationFrame`, stale DOM measurements, unseeded `Math.random()`, unsynchronized CSS keyframes or effects that only work after sequential playback.
2. **Compositions and reusable scene building blocks.** Register renderable `<Composition>` definitions with explicit IDs, dimensions, fps, `durationInFrames` and typed/default props. Model sequences, nested `<Sequence>` / `<Series>`, `<TransitionSeries>`, stills, reusable timelines and deterministic parameterization intentionally. Recompute overlaps and final duration; transition overlaps **reduce** total frames, not simply append.
3. **Media assets and readiness.** Load assets through supported APIs and `staticFile()` when applicable; inspect documented handling for `<Audio>`, `<Video>`, `<Img>`, fonts, captions, animated images, 3D and media metadata. Handle loading/`delayRender`/`continueRender` and timeouts only as documented for the installed version, not with accidental network-dependent frame capture.
4. **Data and localization.** Take content from approved, Git-reviewed source; keep authoring-time data in typed, **named-export `*.data.ts` modules**. Validate composition `inputProps` and avoid importing all locale dictionaries into a browser Player. Use only selected localized copy/audio/captions, correct number/unit formatting, and layout that adapts to longer translations.
5. **RTL design:** use semantically correct directional motion and layout; **never globally mirror captions, numerals, formulas, or scientific phenomena**. Adjust directional text placement, animations and callouts with intent.
6. **Performance and correctness:** reason about memory, asset sizes, dynamic dependencies, codec support, browser features, deterministic rendering, frame buffering, fonts, mobile GPU demands, color/alpha, audio codecs and output file size. Use previewing/representative frame renders and verify the actual rendered files; a video that runs in Remotion Studio is not proof that it runs inside Svitlo's browser or offline.
7. **No invented infrastructure:** Remotion being available upstream **does not mean it is installed in Svitlo**. Do not claim a `YouTube` Resource config, upload integration, render farm, Lambda deployment, server route, FFmpeg installation or PWA video cache exists without inspection.

## DELIVERY CHOICE — THREE DIFFERENT PRODUCTS

**A. Browser-interactive animation / learning Scene**

Choose **`@remotion/player`**, embedded in an existing Svitlo `scene` resource, when the approved learner interaction depends on in-app playback, scrubbing, pausing, time-linked controls, selected parameters, language switching or a composition that changes in response to learner input. The Player directly receives a component and metadata; it is **not** itself a `<Composition>` wrapper.

- **Important contract:** the public Scene root follows current **typed `locales` response props** under [Implement Scene](./lesson-workflow/implement-scene.skill.md). Its internal Remotion composition may accept typed props via `Player inputProps`; the public Scene does not accept an entire multilingual dictionary or unrelated custom props. Coding Agent authors only approved source-language text.
- A Player is **video-like presentation**, not an automatic replacement for arbitrary interactive React UI. When the learner must drag objects, freely manipulate a 3D simulation, type code or interact with independent focusable controls, choose normal React/SVG/Canvas/Three.js Scene architecture, possibly with Remotion for a supporting timeline. Verify in-player pointer/keyboard behavior, focus and scrubbing explicitly; interactivity is not guaranteed by visual animation alone.
- Inspect current [Player examples](https://www.remotion.dev/docs/player) and [drag-and-drop guidance](https://www.remotion.dev/docs/player/drag-and-drop). Size the rendered composition independently from its CSS display width; use responsive containers, buffered media, lazy loading when appropriate, keyboard controls, reduced motion and fallback when WebGL is unavailable.
- For **offline/PWA** use, bundle or explicitly cache all required code, media, fonts, selected-language audio and model assets. Streaming a missing remote source is not a complete offline lesson.

**B. Pre-rendered, self-hosted educational video**

Choose **pre-rendered media** when the educational content is fixed after authoring, interaction is primarily play/pause/seek/captions, browser performance matters, and a downloaded self-hosted file better suits offline use. Keep Remotion source in Git and render using the documented CLI, `@remotion/renderer` or authorized infrastructure.

- Package the video **as a locally available resource** with subtitles/transcript and a verified player; prefer appropriate browser codecs and a practical download strategy. Do not assume generic `video` content-block rendering exists just because Engine has `VideoResource_Config`.
- Multiple bitrate/resolution delivery variants may improve low-end performance **if they preserve all educational content**. A low-bandwidth mode must not silently delete a needed segment, question, label or explanation.

**C. Pre-rendered and published to YouTube**

Choose **YouTube hosting** when the intent is **public reach, sharing/discovery, an external program, or stream-oriented distribution**, and the authorized publishing workflow, content rights and account access exist. Render the approved composition to a suitable video file first, then publish using the approved process.

- **YouTube alone is not an acceptable offline-delivery strategy** for a Svitlo textbook. Preserve a downloadable/self-hosted educational equivalent where the Lesson requires fully offline availability. Never replace canonical source assets with a YouTube URL.
- Do not assert a completed `youtube` content-block integration: the current Engine declares the `'youtube'` label but lacks a member of `Resource_Config` and the inspected generic Lesson Section renderer does not support it.
- No automatic uploads, account access, monetization or external publication without explicit authorization. Report actual link, video privacy level, subtitles and availability only after confirmed.

**Decision rule:** choose the **lowest-complexity delivery that preserves the approved instructional objective**, full localization, accessibility, offline capabilities and device compatibility. If the brief asks for a responsive timeline _and_ independent learner-controlled manipulation, discuss a hybrid composition + Scene rather than misclassifying a rendered video as an interactive experiment. If a high-cost Player is non-equivalent on low-end hardware, escalate instead of silently dropping the educational behavior.

## OUTPUT FORMATS — FULL HD + STORY

Unless the approved brief says otherwise, design **two first-class, semantically equivalent compositions** (not a blind cropped duplicate):

| Variant                               | Composition dimensions | Ratio    | Intended use                                                                     |
| ------------------------------------- | ---------------------- | -------- | -------------------------------------------------------------------------------- |
| **Landscape Full HD**                 | **1920 × 1080**        | **16:9** | In-lesson videos, full-screen presentations, YouTube landscape                   |
| **Portrait Story / vertical Full HD** | **1080 × 1920**        | **9:16** | Vertical Story/Shorts-style delivery, mobile sharing and vertical learning views |

- Both should convey **the same approved educational message**: reflow text, relocate labels, resize diagrams, shift camera focus or reorganize scenes **intentionally**. Do not stretch, letterbox unintentionally, crop meaningful formulas/diagrams or make captions unreadable.
- Choose a shared **fps** suited to animation and production (typically **30 fps** unless the brief or material needs otherwise). Define `durationInFrames` from the intended timeline for each composition; validate timing with actual media and voiceover length.
- Keep sensible title/caption safe areas and destination-specific cropping/UI overlays in mind. For YouTube Shorts/other Story destinations, verify **current platform specifications** before export; 9:16 geometry alone does not guarantee platform compliance.
- Prefer reproducible export settings, naming and explicit metadata (composition ID, dimensions, fps, length, locale, audio/caption tracks, source version and checksums where useful). Render MP4/other agreed compatible outputs; choose codec/pixel format based on delivery requirements.
- **Each supported locale** needs an intentional localization plan, including voiceover/subtitles and text-layout checks. Creating two aspect ratios **does not** imply all requested language variants have been rendered.

## ACCESSIBILITY, INCLUSION AND OFFLINE REQUIREMENTS

- Provide **localized captions and transcripts** for speech or critical audio, and meaningful **audio description / accessible text or equivalent interactions** for essential graphics. Do not rely on sound, motion, color, gestures or visual-only timing as the sole path to learning.
- Prevent photosensitive sequences, excessive strobing and uncontrolled auto-play; provide pause/replay and `prefers-reduced-motion`-appropriate alternatives. If an animation is scientifically essential, provide a comprehensible accessible presentation or explicitly report the design conflict.
- Verify readable font sizes and contrast **at actual displayed CSS size**, not only at 1920px export. Preserve accessibility in RTL and narrow viewports, and keep subtitles clear of platform overlays.
- **If used as a Svitlo Scene**, inherit [Implement Scene](./lesson-workflow/implement-scene.skill.md) requirements for typed locale shape, deferred translation, Scene-specific tests, actionable code TODO lifecycle and the **end-of-file `TODO(a11y)` with explicit chat disclosure** when a genuine access barrier remains. A rendered external video still needs editorially agreed accessible alternatives.
- For offline use, check the PWA delivery plan, external fonts/media/3D libraries, preloading and cache strategy. If hosting, rights, an external API or a costly media asset prevents equivalent offline behavior, **raise an explicit blocker/trade-off**; do not remove the educational sequence.

## REQUIRED IMPLEMENTATION AND VERIFICATION

1. **Input inspection:** approved Screenwriter source, audience, owner app/package, dependencies, licenses, render/publishing tools, localization, aspect-ratio target, browser/offline support.
2. **Choose delivery:** Player-based Scene, pre-rendered owned media, YouTube/public distribution, or an approved hybrid; explain the pedagogical and device/offline reasons.
3. **Storyboard and shot plan:** map each approved learning beat to a timed, editable scene/sequence, the source facts, audio/narration, learner controls if any, media assets and required caption text.
4. **Implement reusable code:** parameterized, typed compositions; named exports; local assets and validated input; frame-based deterministic animation, careful transitions, reusable visual components. Avoid inventing application-level props or changing schema contracts without authorization.
5. **Produce both aspect ratios:** inspect full-HD and portrait at representative frames including all long text, critical diagrams and captions, not only first/last frames. Supply the specified output(s) or document why one format was explicitly excluded.
6. **Test:** use repository-wide unit/component test rules where applicable; cover **frame/time invariants**, prop validation, boundary frames, deterministic behavior, correct output dimensions/fps/duration, rendering smoke tests, missing media handling and LTR/RTL localization. Test Player controls, keyboard interaction, reduced motion, focus, mobile performance and offline asset availability for browser deployments. Test actual media playback, audio sync, captions and caption timing.
7. **Validate production output:** inspect exported files (container/codec, dimensions, FPS, length, audio, captions and playback) with the available media toolchain; report actual render command and result, do not claim an MP4 exists merely because `<Composition>` compiles. Track hosting/publication status separately from render status.
8. **Stop and report:** paths, formats, composition IDs, target locales, source/license/attribution, test commands/results, interactive vs pre-rendered decision, offline and low-device implications, any unresolved access/technical blockers, and the exact approvals still required. **Do not automatically publish**.

## ACCEPTANCE GATES

- [ ] Approved Screenwriter specification was read and faithfully implemented; no new instructional scenario, scoring or factual claims were invented.
- [ ] Selected delivery mode was reasoned about: Remotion Player **vs** rendered owned media **vs** YouTube, including offline and true-interactivity requirements.
- [ ] Remotion API and tool dependencies reflect the **installed version**; licenses/third-party resources were checked before use.
- [ ] Deterministic, frame-addressable source exists with properly typed inputs and named `*.data.ts` authoring data where relevant; media is reproducible.
- [ ] **1920×1080 (16:9)** and **1080×1920 (9:16)** layouts were addressed explicitly; omissions require an approved scope decision.
- [ ] Full requested locale/RTL coverage, captions/transcript, accessibility and reduced-motion alternatives were addressed without silent functionality loss.
- [ ] Browser Player, offline assets, low-end-device performance and current typed Scene locale-response prop contract were checked **if that mode is used**.
- [ ] Automated tests and actual video render/playback validation were performed **where applicable and available**; unsupported/unexecuted checks are reported honestly.
- [ ] Final report distinguishes **source complete / composition previewed / rendered / deployed / published** statuses and lists any blocker.

**Handoff:** Code and produced media remain **Git-reviewable / reproducibly generated**, and the finished video or Scene is integrated only through the selected textbook's **real supported content contracts**. Remotion is an implementation specialty of the Coding Agent; instructional authority remains with the Educational Screenwriter.
