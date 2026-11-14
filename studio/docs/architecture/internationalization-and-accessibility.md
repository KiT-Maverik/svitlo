# Internationalization & Inclusive Access

**Status:** internationally accessible LTR/RTL learning is a product invariant. Locale definitions and a Disability union **exist in Engine**, but automatic accommodation, compatibility flags and equivalent alternative-mode dispatch are **not implemented merely by those types**.

## International from the first design

- **Mandatory standard locale coverage, without exceptions for convenience.** The canonical set is `DEFAULT_SUPPORTED_LANGUAGES` in [Engine language definitions](../../../shared/engine/src/types/languages.ts), plus any expressly configured textbook locales. **All required educational text, accessible descriptions, UI strings, Scene dictionaries and labels must be translated truthfully and completely for every standard locale**. Do not silently remove a standard language or reduce the set because translation is difficult. The set may grow; always read the current types, not a historical count.
- All **user-visible and accessibility text** must be localized: explanations, prompts, control labels, diagrams, SVG `<title>`/`<desc>`, screen-reader labels, feedback, unit labels, media captions and notes. Keep cultural assumptions, numbering, grammar, pluralization and direction under review.
- **No fake translations or silent fallbacks for required textual content:** do not copy English strings into another locale's entries, leave placeholder text, omit locales, suppress type errors, mark incomplete dictionaries `allLocales: true`, or add `?? en` / `|| en` as an author's shortcut. Deliver **real, meaning-preserving translations** (with appropriate terminology, numerals and context) and validate completeness for the required language/locale keys. If an agent cannot translate with adequate confidence, **raise an explicit issue in chat listing exact files/keys/locales and the necessary editorial action; do not silently submit a fallback**. Existing runtime `FALLBACK_LANGUAGE` / `FALLBACK_LOCALE` do not excuse missing authored translations.
- **Narrow planned exception for expensive audio generation:** an explicitly signaled **audio-only language fallback** may be approved separately; the user must see the actual spoken language and have properly localized textual descriptions/transcripts/controls. It must never masquerade as a translation of standard UI, educational prose or accessible labels. See [Audio Resource TODO](../../To%20Do/media/audio-localized-playback.md).
- Where the current app uses SSR selection of the requested locale and context for client components, **send only the selected translations** to the interactive client. A component must not bundle every language needlessly.
- **RTL is a real alternate layout**, not a CSS mirror of the entire page. Adapt layout, logical start/end, arrows, controls, chart axes, diagram geometry and visual reading order as semantically appropriate while retaining readable text, numerals, mathematics, actual physics and directional meaning. Test Arabic, Hebrew and Urdu alongside LTR languages. Bidi text, SVG labels and localized positional instructions demand explicit checks.
- Use CSS logical properties where applicable, respect `lang`/`dir`, test responsive text expansion and preserve keyboard/tab order and screen-reader reading order. Locale/flag icons are **not** proof of a complete translated experience.

## Disability-aware by default — not opt-in

Every educational resource, Scene, Question, layout and interaction must be designed **for learners with relevant access needs by default**, including keyboard-only operation, nonvisual alternatives, captions/transcripts, clear focus/roles/names, readable contrast, alternatives to color-only or audio-only information, reduced motion, avoidance of photosensitive hazards, meaningful time controls, manageable cognitive load and scalable content.

### What the code actually provides

[`Disability` union](../../../shared/engine/src/types/disabilities.types.ts) presently lists the following **question-related limitation categories**:

| Area                 | Declared values                                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Color & vision       | `color-vision-deficiency`, `visual-impairment`, `blindness`                                                                                   |
| Hearing              | `hearing-impairment`, `deafness`                                                                                                              |
| Speech & language    | `speech-impairment`, `speech-language-disorder`                                                                                               |
| Movement & motor     | `motor-impairment`, `movement-disorder`, `fine-motor-impairment`                                                                              |
| Cognitive & learning | `cognitive-impairment`, `intellectual-disability`, `learning-disability`, `dyslexia`, `dyscalculia`, `attention-deficit`, `memory-impairment` |
| Sensitivity          | `photosensitivity`, `seizure-susceptibility`                                                                                                  |

The [Question types](../../../shared/engine/src/types/content/question.types.ts) include a `restrictions: Disability[]` field. **This is a declaration, not proof that the platform detects learner disabilities, adapts the UI, blocks inaccessible content, or offers an alternative renderer.** Do not infer a medical diagnosis, disability or access limitation from activity or performance.

A restriction label describes a **potential incompatibility in a particular interaction**. It must not justify knowingly shipping avoidable barriers; developers should first provide an equivalent accessible mode where possible. Review accommodations with the learner's dignity and privacy in mind.

**Planned meaning of `Question.restrictions`:** a learner may voluntarily indicate relevant disability/accessibility preferences in their user profile; when constructing a Quiz, the selection algorithm should **exclude questions whose restrictions conflict with those declared preferences** and prefer appropriately accessible alternatives that assess the same approved learning outcomes. **This selection mechanism is not currently implemented**. Never infer a medical condition from behavior, leak preferences, quietly remove all assessment opportunities or claim an empty eligible pool means successful completion. Determine conflict policy, equivalent substitutions, confidentiality and empty-pool behavior before implementation. See [Accessible Quiz Selection TODO](../../To%20Do/assessment/accessibility-aware-question-selection.md).

### If full access is technically blocked

1. Identify exactly which user task is inaccessible and for whom (without diagnosing a person).
2. Attempt to preserve the **same educational objective and core functionality** through another interaction/representation: keyboard operation, structured text/table, sonification, tactile-friendly external representation, captions, accessible alternative controls, etc., as appropriate.
3. If no acceptable alternative exists without compromising the specified function, **do not silently remove the material or claim full accessibility**. Record a concrete limitation, intended remediation and needed editorial/architectural decision; make the exception conspicuous in the final chat/review report.
4. For a **Scene implemented by [Design Scene Skill](../../skills/design-scene.skill.md)**, follow its stricter contract: append a precise **end-of-file `TODO(a11y)` in the main Scene `*.tsx`**, and explicitly report the barrier in the chat. A TODO does not resolve the issue.
5. A future **content compatibility marker** could identify devices or accessibility needs the current implementation does not satisfy, but **no such generic filtering/flag system is assumed implemented or authorized by this document**. A flag is disclosure/support metadata, not permission to discard content.

## Verification expectations

Test LTR and RTL examples, keyboard and screen-reader semantics, localized accessible names, logical navigation, reduced motion, captions/transcripts when applicable, nonvisual interpretation of essential information and mobile readability. Favor accessible-role/name-based selectors over brittle incidental DOM selectors. Inaccessible alternatives must not be disguised by passing only TypeScript or unit checks.

**Related:** [Learning Philosophy](./learning-experience-philosophy.md), [Offline & Device Support](./offline-first-and-device-compatibility.md), [Lesson Notes](./lesson-notes.md).


## Quest multimodal parity (planned)

[Quest Section](../entities/quest.md) requires parallel media pathways at authoring time: two language-invariant silent video renditions, language-scoped dialogue and narrated visual descriptions, an image, localized timed captions, and meaningful Task Scene alternatives. `audio.dialogue`, `audio.narration` and `audio.background` keys are mandatory, but an audio slot may be `null` where no actual sound exists; absence of a track must not remove necessary information. Mere structural completeness does **not** prove captions explain significant sounds, narration describes important visuals, or Task can be completed without sight/hearing. Accessible defaults must honor voluntary preferences and permit override. Quest playback, mode dispatch and automatic disability-aware preference application are still **unimplemented**.
