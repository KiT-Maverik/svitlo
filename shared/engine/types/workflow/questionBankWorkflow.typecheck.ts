import type { Question_SelectOneAnswer_Configurator } from '../../configurators/questions/defineSelectOneAnswer';
import type { QuizSection_Config } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import type {
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowStage1Config,
  QuestionBankWorkflowStage1Production,
  QuestionBankWorkflowStage2,
  QuestionBankWorkflowStage3,
  QuestionBankWorkflowMaterializerInput,
  QuestionBankWorkflowQuestionNode,
  QuestionBankWorkflowSelectOneAnswerConfig,
  QuestionBankWorkflowAnswerWithNumberConfig,
  QuestionBankWorkflowFillBlanksWithTextConfig,
  QuestionBankWorkflowBlockNode,
  QuestionBankWorkflowBlockConfig,
  QuestionBankWorkflowQuizIntent,
} from './questionBankWorkflow.types';

const ownerLessonId = '663572e7-bd85-4516-86e2-3de07d209e03';
const skillId = '663572e7-bd85-4516-86e2-3de07d209e04';
const evidence = {
  skillId,
  outcome: 'Explain a verified outcome',
  assessmentMethod: 'application',
  cognitiveOperation: 'Apply the concept to a new context',
  misconception: 'Confuses two distinct operations',
  context: 'Source-language task',
  expectedEvidence: 'Chooses the correct model and rules out a misconception',
} as const;

const config = { ownerLessonId } satisfies QuestionBankWorkflowStage1Config;
const production = {
  languages: { document: 'uk', planned: ['uk', 'en'] },
  lesson: {
    sourcePath: 'content/math/data/lessons/3/663572e7-bd85-4516-86e2-3de07d209e03/index.ts',
    sourceSha: 'verified-lesson-sha',
    referencePath: 'verified-lesson-reference.md',
    methodologyPath: 'verified-methodology.md',
    title: 'Verified Lesson',
  },
  assessment: {
    questionBankRequired: true,
    flashcardBankRequired: false,
    quizSectionRequired: true,
    flashcardsSectionRequired: false,
    quizRequiredForCompletion: false,
  },
  ownershipRationale: 'Own questions provide reusable diagnostic coverage',
  audience: 'Approved learner group',
  scope: 'Only the approved Skill',
  prerequisites: 'Verified prerequisite knowledge',
  evidenceIntent: [evidence],
  misconceptions: 'Common but distinguishable confusions',
  mediaNeeds: 'No external media required for this fixture',
  sourcesAndDependencies: 'Source and Skill verified at a fixed commit',
} satisfies QuestionBankWorkflowStage1Production;

const handoff = { config, production } satisfies QuestionBankWorkflowStage1;

// @ts-expect-error A Stage 1 handoff is not yet a complete materializer input.
const premature: QuestionBankWorkflowMaterializerInput = handoff;

// @ts-expect-error Stage 1 must identify its real owning Lesson.
const missingOwner: QuestionBankWorkflowStage1Config = {};

// @ts-expect-error Stage 1 requires an assessment and evidence analysis.
const missingAssessment: QuestionBankWorkflowStage1Production = { languages: production.languages };

// @ts-expect-error Cannot leave planned languages empty.
const missingPlanned: QuestionBankWorkflowStage1Production['languages'] = { document: 'uk', planned: [] };

const prompt = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e05',
    slug: 'prompt',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Скільки буде один плюс один?' } },
  },
} satisfies QuestionBankWorkflowBlockNode;

const oneAnswer = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e06',
    slug: 'additionResult',
    type: 'answerWithNumber',
    params: { assessmentMethod: 'application', restrictions: [], correctAnswers: [2] },
    locale: { placeholder: { uk: 'Введіть число' } },
    content: { question: { items: { prompt }, order: ['prompt'] } },
  },
  production: {
    evidence,
    distinction: 'Tests the application of the concept',
    intendedUse: 'core',
    rationale: 'Required source-language answer evidence',
  },
} satisfies QuestionBankWorkflowQuestionNode<QuestionBankWorkflowAnswerWithNumberConfig>;

const correct = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e07',
    slug: 'correct',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Два' } },
  },
} satisfies QuestionBankWorkflowBlockNode;

const choice = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e08',
    slug: 'chooseResult',
    type: 'selectOneAnswer',
    params: { assessmentMethod: 'application', restrictions: [] },
    locale: {},
    content: {
      question: { items: { prompt }, order: ['prompt'] },
      answers: {
        correct: { items: { correct }, order: ['correct'] },
        incorrect: { items: { incorrect: { ...correct, config: { ...correct.config, slug: 'incorrect' } } }, order: ['incorrect'] },
        distractors: { items: {}, order: [] },
      },
    },
  },
  production: {
    evidence,
    distinction: 'Distinct representation rather than a widget swap',
    intendedUse: 'extension',
    rationale: 'Additional diagnostic coverage requires specialist review',
  },
} satisfies QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectOneAnswerConfig>;

const stage2 = {
  ...handoff,
  config: {
    ...config,
    questions: {
      answerWithNumber: { additionResult: oneAnswer },
      selectOneAnswer: { chooseResult: choice },
    },
  },
} satisfies QuestionBankWorkflowStage2;

// @ts-expect-error No empty bank passes a completed Stage 2 shape.
const emptyGroups: QuestionBankWorkflowStage2['config']['questions'] = {};

// @ts-expect-error A Question must have type-specific correct numeric answers.
const missingNumericAnswers: QuestionBankWorkflowAnswerWithNumberConfig = {
  ...oneAnswer.config,
  params: { assessmentMethod: 'application', restrictions: [] },
};

const wrongDiscriminant: QuestionBankWorkflowAnswerWithNumberConfig = {
  ...oneAnswer.config,
  // @ts-expect-error A number answer cannot claim to be a text-answer kind.
  type: 'answerWithText',
};

const wrongBlock: QuestionBankWorkflowBlockConfig = {
  ...prompt.config,
  // @ts-expect-error Unsupported block type has no Config discriminant.
  type: 'unknownQuestionBlock',
};

// @ts-expect-error Slot text answers are part of the actual fillBlanksWithText Config shape.
const missingTextSlots: QuestionBankWorkflowFillBlanksWithTextConfig = {
  ...oneAnswer.config,
  type: 'fillBlanksWithText',
  params: { assessmentMethod: 'application', restrictions: [] },
  content: { question: { items: { prompt }, order: ['prompt'] } },
};

const localQuiz = {
  kind: 'local',
  rationale: 'Reviewed Lesson requires a local evidence checkpoint',
  sections: {
    items: {
      lastQuiz: {
        sectionId: '663572e7-bd85-4516-86e2-3de07d209e09',
        sectionPath: 'sections/lastQuiz/index.ts',
        selectionRationale: 'Prefer a small sufficient subset',
        coverage: 'Approved assessment methods',
        upstreamDependencies: 'None',
      },
    },
    order: ['lastQuiz'],
  },
} satisfies QuestionBankWorkflowQuizIntent;
const noQuiz = { kind: 'none', rationale: 'No local Quiz approved; full bank remains' } satisfies QuestionBankWorkflowQuizIntent;

const stage3 = {
  ...stage2,
  production: { ...production, quiz: localQuiz },
} satisfies QuestionBankWorkflowStage3;

const finalInput: QuestionBankWorkflowMaterializerInput = stage3;
const withoutQuiz = {
  ...stage2,
  production: { ...production, quiz: noQuiz },
} satisfies QuestionBankWorkflowMaterializerInput;

// @ts-expect-error Stage 2 does not yet include the Stage 3 Quiz design decision.
const prematureStage2: QuestionBankWorkflowMaterializerInput = stage2;

const duplicatedSelection: QuestionBankWorkflowQuizIntent = {
  kind: 'local',
  rationale: 'No separate selection UUID ledger',
  sections: localQuiz.sections,
  // @ts-expect-error Selection IDs belong to the real Quiz Section, not bank production.
  questionIds: ['663572e7-bd85-4516-86e2-3de07d209e06'],
};

declare const approvedQuestion: Question_SelectOneAnswer_Configurator;
const actualSectionSelection: QuizSection_Config['params']['selection'] = {
  mode: 'all',
  questionIds: [approvedQuestion.id],
};

void handoff;
void premature;
void missingOwner;
void missingAssessment;
void missingPlanned;
void prompt;
void oneAnswer;
void choice;
void stage2;
void emptyGroups;
void missingNumericAnswers;
void wrongDiscriminant;
void wrongBlock;
void missingTextSlots;
void localQuiz;
void withoutQuiz;
void finalInput;
void prematureStage2;
void duplicatedSelection;
void actualSectionSelection;
