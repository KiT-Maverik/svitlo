# QuestionInvestigationLab — Screenwriter Scene Specification

**Status: Provisional Draft — Methodologist has not approved the Brief; Scene editorial review remains pending.**
**Lesson:** [Questions That Need Data Content](../content.md)
**Brief:** [Methodologist Draft](../methodologist-brief.md)
**Target Skill:** [formulateInvestigationQuestion.data.ts](../../../../../data/skills/data/collection/skills/formulateInvestigationQuestion.data.ts)
**Implementation:** Not built or registered

## Why this Scene needs to be interactive

Formulate and identify statistical questions whose answers depend on varied observations or responses, rather than a single fixed arithmetic calculation or known fact.

A four-step inquiry builder with fixed invented questions, a choice of fictional respondent group and attribute, and transparent response lists; no network, account data, personal survey or dynamic user-content persistence.

This is a pedagogical model whose learner-controlled state makes a mathematical or logical contrast visible. A static picture cannot equally expose prediction, changed conditions and the conceptual explanation. Do not turn it into reward/score mechanics or a mandatory graded Question.

## Mathematical content and source-of-truth conditions

Use the fictional group A–F with six responses to ‘Which fruit would you pick today?’: apple, banana, apple, pear, banana, apple. The categories are three apples, two bananas, one pear. A separate fictional group where all six choose apples is still a valid example of a potentially variable survey question.

**Hard limits:** No representative sampling claims, margins of error, generalizations to a population, inferential statistics, percentages, charts, real learner profiles or collection/storage of actual personal data.

## Required observable states

| State               | Data or model facts                                              | Correct interpretation                                     |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| Arithmetic question | What is 4 + 3? Known single answer: 7.                           | No response collection is required.                        |
| Survey question     | Which fruit would each of six storybook children choose today?   | Several observations; possible variation.                  |
| Variable outcomes   | Responses A=apple, B=banana, C=apple, D=pear, E=banana, F=apple. | Six responses; counts 3, 2, 1.                             |
| Uniform outcomes    | Fictional other group: six responses all apple.                  | The same statistical question can yield uniform responses. |

## Required learning interaction

1. Present a fully specified initial state and ask a prediction in short child-facing copy; make the initial assumptions and labels inspectable before a decision.
2. Offer named, keyboard-operable controls that select a preset, a label or an explanatory reveal, matching the Section contexts without inventing new narrative or formal assessment.
3. Apply the action to a **deterministic**, locally owned, verifiable model. Announce the changed state with both an accessible text model and meaningful visual indication.
4. Show why the response matches or differs from the mathematical condition, including a counterexample; allow independent revisits, learner-controlled explanations, reveal and retry without scoring.
5. Expose Reset to the initial state. Keep all state local. The Scene root accepts **no props**; if separate Lesson Sections use it, state is fresh by instance, with no parent-provided chapter/mode/solution.
6. Provide an accessible independent-transfer route that hides the explanation initially but never makes it inaccessible.

## Exact misconception and explanation cases

- **Different kinds of questions:** For ‘4 + 3 needs a survey’: “We already know the operation; everyone computing it correctly gets 7. We do not need different people’s choices.”
- **Ask whom and what:** For a question missing the group: “We still need to know whose choices we are counting.”
- **Different answers give us data:** For ‘we only need one response’: “One person's choice does not tell us which fruit the whole group selected.”
- **What if all the answers match?:** For ‘not a data question’: “We could not know everyone chose apple without finding out their choices. The answers could have varied.”

## Nonvisual, motor and cognitive equivalence

Offer explicit text cards and named choices for question type, group and attribute. Reveal each fictional response as a labelled row, with totals in text. All actions work without dragging, colors or voice; keyboard actions allow full inquiry-building and reset.

Do not rely on sound, color alone, animation, detailed drawing, drag precision, long reading, limited response time or knowledge of an English-only label. Give labels for all decision buttons; preserve focus and announce state without excessive live-region noise. Permit responsive larger text and clear logical navigation.

## Localization / RTL / offline / performance handoff

Every instruction, control, unit, category, event, counter and error explanation needs **genuine** translations for all required textbook locales; English here is source-only editorial text, not a real translation bundle. Preserve numerical mathematics and chronological relations when adapting layout and RTL reading order. Avoid mirroring data values, fraction wholes or abstract cycle meaning. After future PWA content installation, the full interaction including all variants, explanations and assistive alternatives must function offline; prefer static/local lightweight assets and static alternatives for motion-sensitive learners.

## Engineer-facing constraints and test coverage (not implementation)

The coding specialist will own a self-contained component with no props, localized context data, co-located Scene-specific unit tests, appropriate deterministic fixtures, keyboard/screen-reader tests, RTL review and offline-device verification. Those files are not generated in this batch, and current availability of a generic `scene` Resource type does not imply this named Scene is registered.

## Approval boundary

This text is **provisional**. The Methodologist's Brief must be explicitly reviewed, and any scenario-level changes must be authorized by the Screenwriter before Scene engineering. No Question correctness engine, reward, assessment score, Note unlock, Program plot or runtime Lesson is created.
