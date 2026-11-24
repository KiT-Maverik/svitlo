import type { SelectOneAnswerNode } from '../../generators/materializers/selectOneAnswer/materializeSelectOneAnswer';
import type { SelectMultipleAnswersNode } from '../../generators/materializers/selectMultipleAnswers/materializeSelectMultipleAnswers';
import type { MatchBlocksNode } from '../../generators/materializers/matchBlocks/materializeMatchBlocks';
import type { AnswerWithTextNode } from '../../generators/materializers/answerWithText/materializeAnswerWithText';
import type { AnswerWithNumberNode } from '../../generators/materializers/answerWithNumber/materializeAnswerWithNumber';
import type { OrderSequenceNode } from '../../generators/materializers/orderSequence/materializeOrderSequence';
import type { BuildAnswerWithBlocksNode } from '../../generators/materializers/buildAnswerWithBlocks/materializeBuildAnswerWithBlocks';
import type { FillBlanksWithBlocksNode } from '../../generators/materializers/fillBlanksWithBlocks/materializeFillBlanksWithBlocks';
import type { FillBlanksWithTextNode } from '../../generators/materializers/fillBlanksWithText/materializeFillBlanksWithText';
import type { Question_SelectOneAnswer_Configurator } from '../../configurators/questions/defineSelectOneAnswer';
import type { QuizSection_Config } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import type {
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowStage1Config,
  QuestionBankWorkflowStage1Production,
  QuestionBankWorkflowStage2,
  QuestionBankWorkflowStage3,
  QuestionBankWorkflowQuestionNode,
  QuestionBankWorkflowSelectOneAnswerConfig,
  QuestionBankWorkflowSelectMultipleAnswersConfig,
  QuestionBankWorkflowMatchBlocksConfig,
  QuestionBankWorkflowAnswerWithTextConfig,
  QuestionBankWorkflowAnswerWithNumberConfig,
  QuestionBankWorkflowOrderSequenceConfig,
  QuestionBankWorkflowBuildAnswerWithBlocksConfig,
  QuestionBankWorkflowFillBlanksWithBlocksConfig,
  QuestionBankWorkflowFillBlanksWithTextConfig,
  QuestionBankWorkflowBlockNode,
  QuestionBankWorkflowBlockConfig,
  QuestionBankWorkflowQuizIntent,
} from './questionBankWorkflow.types';

const ownerLessonId = '663572e7-bd85-4516-86e2-3de07d209e03';
const config = { ownerLessonId } satisfies QuestionBankWorkflowStage1Config;
const production = {
  languages: { document: 'uk', planned: ['uk', 'en'] },
} satisfies QuestionBankWorkflowStage1Production;

const handoff = { config, production } satisfies QuestionBankWorkflowStage1;

// @ts-expect-error A Stage 1 handoff is not yet a complete materializer input.
const premature: QuestionBankWorkflowStage3 = handoff;

// @ts-expect-error Stage 1 must identify its real owning Lesson.
const missingOwner: QuestionBankWorkflowStage1Config = {};

// @ts-expect-error Cannot leave planned languages empty.
const missingPlanned: QuestionBankWorkflowStage1Production['languages'] = { document: 'uk', planned: [] };

// @ts-expect-error A source document language is required for a bank handoff.
const noSourceLanguage: QuestionBankWorkflowStage1Production['languages'] = { planned: ['uk'] };

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
  production: { specification: 'Number response specification' },
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

const choicePrompt = {
  config: {
    ...prompt.config,
    id: '663572e7-bd85-4516-86e2-3de07d209e0b',
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
      question: { items: { prompt: choicePrompt }, order: ['prompt'] },
      answers: {
        correct: { items: { correct }, order: ['correct'] },
        incorrect: {
          items: {
            incorrect: {
              config: {
                ...correct.config,
                id: '663572e7-bd85-4516-86e2-3de07d209e0a',
                slug: 'incorrect',
                locale: { value: { uk: 'Три' } },
              },
            },
          },
          order: ['incorrect'],
        },
        distractors: { items: {}, order: [] },
      },
    },
  },
  production: { specification: 'Choice response specification' },
} satisfies QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectOneAnswerConfig>;

// Type-specific grouping is checked by the Stage 2 map, not only by Config.type.
const wrongQuestionGroup: QuestionBankWorkflowStage2['config']['questions'] = {
  answerWithText: {
    // @ts-expect-error A number-answer Config cannot appear in the text-answer group.
    incorrectGroup: oneAnswer,
  },
};

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

const missingNumericAnswers: QuestionBankWorkflowAnswerWithNumberConfig = {
  ...oneAnswer.config,
  // @ts-expect-error A Question must have type-specific correct numeric answers.
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

const missingTextSlots: QuestionBankWorkflowFillBlanksWithTextConfig = {
  ...oneAnswer.config,
  type: 'fillBlanksWithText',
  params: { assessmentMethod: 'application', restrictions: [] },
  // @ts-expect-error Slot collection is required by fillBlanksWithText.
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
const noQuiz = {
  kind: 'none',
  rationale: 'No local Quiz approved; full bank remains',
} satisfies QuestionBankWorkflowQuizIntent;

const stage3 = {
  ...stage2,
  production: { ...production, quiz: localQuiz },
} satisfies QuestionBankWorkflowStage3;

const finalInput: QuestionBankWorkflowStage3 = stage3;
const withoutQuiz = {
  ...stage2,
  production: { ...production, quiz: noQuiz },
} satisfies QuestionBankWorkflowStage3;

// @ts-expect-error Stage 2 does not yet include the Stage 3 Quiz design decision.
const prematureStage2: QuestionBankWorkflowStage3 = stage2;

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
void missingPlanned;
void noSourceLanguage;
void prompt;
void oneAnswer;
void choicePrompt;
void choice;
void wrongQuestionGroup;
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

// These are compile-time assertions against the concrete #780 renderers
// now merged into #775, not a parallel Question materializer API.
// A new staged Config/Block shape must remain accepted by each owning kind.
type Assignable<Target, Source extends Target> = true;
export type QuestionBankMaterializerCompatibility = [
  Assignable<SelectOneAnswerNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectOneAnswerConfig>>,
  Assignable<
    SelectMultipleAnswersNode,
    QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectMultipleAnswersConfig>
  >,
  Assignable<MatchBlocksNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowMatchBlocksConfig>>,
  Assignable<AnswerWithTextNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowAnswerWithTextConfig>>,
  Assignable<AnswerWithNumberNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowAnswerWithNumberConfig>>,
  Assignable<OrderSequenceNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowOrderSequenceConfig>>,
  Assignable<
    BuildAnswerWithBlocksNode,
    QuestionBankWorkflowQuestionNode<QuestionBankWorkflowBuildAnswerWithBlocksConfig>
  >,
  Assignable<
    FillBlanksWithBlocksNode,
    QuestionBankWorkflowQuestionNode<QuestionBankWorkflowFillBlanksWithBlocksConfig>
  >,
  Assignable<FillBlanksWithTextNode, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowFillBlanksWithTextConfig>>,
];
