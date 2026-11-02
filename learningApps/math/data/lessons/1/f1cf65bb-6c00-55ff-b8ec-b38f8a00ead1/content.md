# Questions That Need Data — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not formally approved.**
**Audience:** Grade 2 (approximately 7–8).
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skill:** [formulateInvestigationQuestion.data.ts](../../../../data/skills/data/collection/skills/formulateInvestigationQuestion.data.ts).
**Standalone:** No Program story, imported Quiz, scored Question, progress gate, runtime Lesson code or assembled locale bundle is created.

## Learner experience and teaching logic

Formulate and identify statistical questions whose answers depend on varied observations or responses, rather than a single fixed arithmetic calculation or known fact.

The earlier collection lessons supplied counting and recording mechanics. This Lesson makes the question driving collection explicit before learners interpret more complex charts. The activity builds toward an explanation by the learner, not automatic mastery from making a choice. A four-step inquiry builder with fixed invented questions, a choice of fictional respondent group and attribute, and transparent response lists; no network, account data, personal survey or dynamic user-content persistence.

**Scope boundary:** No representative sampling claims, margins of error, generalizations to a population, inferential statistics, percentages, charts, real learner profiles or collection/storage of actual personal data.

The Sections below use the existing block types `text`, `markdown` and `scene`, arranged in one **vertical top-to-bottom column**. `QuestionInvestigationLab` is **proposed** and is not a registered/implemented Scene. There are no invented custom Resource discriminators or server APIs.

## Learning journey

1. **Different kinds of questions.** Contrast answers obtained by computation with answers obtained by observing a group.
2. **Ask whom and what.** Make the target group and measured attribute specific.
3. **Different answers give us data.** Show possible variability and connect the question to actual collection.
4. **What if all the answers match?.** Prevent confusing realized uniform data with a non-statistical question.

## Section scripts (ordered Resources)

### Section 1: Different kinds of questions

**Purpose:** Contrast answers obtained by computation with answers obtained by observing a group.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “What is 4 + 3? We can calculate that. Which fruit do six storybook children choose? We must ask or observe their choices.”

2. **`scene` (existing Resource type; Scene proposed).** [QuestionInvestigationLab](./scenes/QuestionInvestigationLab.scene-spec.md). Two question cards: fixed arithmetic answer 7, and a fictional group's changing fruit choices. Choose ‘calculate a known answer’ or ‘collect responses’ for each; inspect the reason.

3. **`markdown` (existing Resource type).** “A data-investigation question needs observations or answers that might be different. An arithmetic fact already has one answer.”

**Learner's actual move:** Sort the two questions by needed method and justify the choice.

**Misconception-specific explanation:** For ‘4 + 3 needs a survey’: “We already know the operation; everyone computing it correctly gets 7. We do not need different people’s choices.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 2: Ask whom and what

**Purpose:** Make the target group and measured attribute specific.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “‘Which fruit is best?’ is too unclear for our investigation. Try: ‘Which fruit would each of these six storybook children choose today?’”

2. **`scene` (existing Resource type; Scene proposed).** [QuestionInvestigationLab](./scenes/QuestionInvestigationLab.scene-spec.md). Build a question from one group card (‘six storybook children’) and one observation card (‘fruit each chooses today’). Preview the complete question and show whether those details are specified.

3. **`markdown` (existing Resource type).** “A clear question tells us whose answers we will collect and what each answer is about.”

**Learner's actual move:** Choose a group and a response attribute; build a single complete question.

**Misconception-specific explanation:** For a question missing the group: “We still need to know whose choices we are counting.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 3: Different answers give us data

**Purpose:** Show possible variability and connect the question to actual collection.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Let’s see the fictional answers: apple, banana, apple, pear, banana, apple. Which kinds appeared? Did everyone choose the same fruit?”

2. **`scene` (existing Resource type; Scene proposed).** [QuestionInvestigationLab](./scenes/QuestionInvestigationLab.scene-spec.md). Reveal six labelled fictional responses one by one. Show count categories apple 3, banana 2, pear 1; make the count accessible and sortable only for explanation, not as a scoring gate.

3. **`markdown` (existing Resource type).** “The children gave different answers. Asking a question about their choices helped us collect information.”

**Learner's actual move:** Observe that the question is answered by collecting several responses and identifying variation.

**Misconception-specific explanation:** For ‘we only need one response’: “One person's choice does not tell us which fruit the whole group selected.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 4: What if all the answers match?

**Purpose:** Prevent confusing realized uniform data with a non-statistical question.

**Block sequence — a single column:**

1. **`markdown` (existing Resource type).** “Here is another fictional group. Everyone happened to pick an apple. Was ‘Which fruit did each child choose?’ still a data question?”

2. **`scene` (existing Resource type; Scene proposed).** [QuestionInvestigationLab](./scenes/QuestionInvestigationLab.scene-spec.md). Switch to six all-apple responses while retaining the same possible choices and group-specific question. Choose whether the question still requires collecting observations.

3. **`text` (existing Resource type).** “Yes. Different children could have chosen differently, even when this group’s answers happened to match.”

**Learner's actual move:** Decide whether the unchanged question anticipates possible variability, not just whether the observed sample varied.

**Misconception-specific explanation:** For ‘not a data question’: “We could not know everyone chose apple without finding out their choices. The answers could have varied.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

## Bespoke interactive Scene — provisional

- [QuestionInvestigationLab](./scenes/QuestionInvestigationLab.scene-spec.md) is a proposed **self-contained, prop-free** Scene. It owns only its local learning model and explanation state. It has no runtime implementation yet; if reused by multiple sections, each instance should maintain independent state.

## Independent transfer prompt

Which would you ask to investigate different children’s opinions: ‘What is 5 + 2?’ or ‘Which playground game does each child prefer?’ Explain whose responses would be needed.

Learners should first predict or justify their thinking without copying the original example. Reveal a correct worked explanation only on request or after an attempt. This remains instruction, **not scored mastery assessment**.

## Proposed Lesson Note — product concept only

“A data question asks about answers or observations that might differ; name whose data and what you will collect.”

**Editorial unlock proposal:** Make this cue available after the learner inspects the explicit misconception contrast in Section 3 and explains it. The Note entity, unlock API, offline notes persistence and automatic spaced review are not implemented by this content plan; the explanation stays available regardless.

## Source verification and content constraints

The canonical [formulateInvestigationQuestion.data.ts](../../../../data/skills/data/collection/skills/formulateInvestigationQuestion.data.ts) governs Skill meaning; its UUID, definition and multilingual translations are unchanged. Use the fictional group A–F with six responses to ‘Which fruit would you pick today?’: apple, banana, apple, pear, banana, apple. The categories are three apples, two bananas, one pear. A separate fictional group where all six choose apples is still a valid example of a potentially variable survey question.

All runtime copy requires complete, authentic translation into every configured locale; this English editorial script is _not_ runtime locale coverage. The proposed Scene's essential functions need nonvisual equivalence, mobile usability, semantic RTL, and offline availability. These are requirements for implementation review, not a declaration that they pass.

## Approvals and implementation boundary

**Methodologist approval pending. Screenwriter and Scene editorial approval pending.** Assessment Architect owns any Questions/Quiz, scoring and competency evidence. Coding Agent owns runtime Lesson/Scene, provider-free public Scene interface, localizations, tests and offline support. No scoring, Program content or runtime configuration is added.
