import type { ContentBlock_Text_Configurator } from '../../configurators/contentBlocks/defineText/defineText';
import type {
  LessonWorkflowStage1,
  LessonWorkflowStage1Config,
  LessonWorkflowStage1Production,
  LessonWorkflowStage2,
  LessonWorkflowStage2Section,
  LessonWorkflowMaterializerInput,
  LessonWorkflowStage2QuizSection,
  LessonWorkflowStage2SimpleBlock,
  LessonWorkflowStage2Checkpoint,
} from './lessonWorkflow.types';

// Real Skill IDs and source Sha must still be verified against the repository.
const standalone = {
  config: {
    type: 'lesson',
    id: '663572e7-bd85-4516-86e2-3de07d209e03',
    slug: 'observeLight',
    skills: ['663572e7-bd85-4516-86e2-3de07d209e04'],
    params: { quizRequiredForCompletion: true, age: { min: 8, max: 11 } },
    locale: { title: { uk: 'Спостереження за світлом' } },
  },
  production: {
    languages: { document: 'uk', planned: ['uk', 'en'] },
    objective: 'Explain observable differences between light and darkness.',
    depth: 'Introductory observation with grounded examples.',
    sequenceReason: 'After the course introduces everyday observation.',
    assessmentEvidence: 'A learner explains a new light/shadow example.',
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: false,
      quizSectionRequired: true,
      flashcardsSectionRequired: false,
    },
    methodology:
      'Audience: novice observers. Entry conditions: familiar light sources. Explain reflection, ' +
      'contrast valid examples and misconceptions, specify source checks, outcomes, cognitive ' +
      'assessment methods, accessible representations, offline paths and excluded claims.',
  },
} satisfies LessonWorkflowStage1;

// @ts-expect-error Missing all Methodologist methodology and assessment intent.
const incompleteStage1: LessonWorkflowStage1 = { config: standalone.config };

const { id: _persistedId, ...withoutIdentity } = standalone.config;
// @ts-expect-error Lesson Stage 1 requires a persisted Lesson ID.
const missingLessonId: LessonWorkflowStage1Config = withoutIdentity;

const missingMethodology: LessonWorkflowStage1Production = {
  ...standalone.production,
  // @ts-expect-error Reviewed methodology is mandatory, never a skipped field.
  methodology: undefined,
};

const incompleteAssessments: LessonWorkflowStage1Production = {
  ...standalone.production,
  // @ts-expect-error Fourth independent decision is mandatory even without Flashcards.
  assessment: {
    questionBankRequired: true,
    flashcardBankRequired: false,
    quizSectionRequired: true,
  },
};

const earlySection: LessonWorkflowStage1Config = {
  ...standalone.config,
  // @ts-expect-error Sections belong only to Stage 2, not Course or Lesson Stage 1.
  section: { items: {}, order: [] },
};

const earlyLanguageConfig: LessonWorkflowStage1Config = {
  ...standalone.config,
  params: {
    // @ts-expect-error Source/target languages are editorial planning fields.
    languages: ['uk', 'en'],
  },
};

const emptySkills: LessonWorkflowStage1Config = {
  ...standalone.config,
  // @ts-expect-error Lesson Stage 1 must have a nonempty verified Skill list.
  skills: [],
};

const text = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e06',
    slug: 'observe',
    type: 'text',
    params: {},
    locale: { value: { uk: 'Світло поширюється від джерела.' } },
  },
  production: { purpose: 'Establish a factual observation before the Scene.' },
} satisfies LessonWorkflowStage2SimpleBlock;

const scene = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e07',
    slug: 'lightExperiment',
    type: 'scene',
    params: {},
    locale: { value: { uk: 'Light experiment' } },
  },
  production: {
    purpose: 'Explore light paths through learner-controlled inputs.',
    specification: 'Specify exact state transitions and visible feedback for every input.',
    accessibility: 'Keyboard control and screen-reader result descriptions.',
    offline: 'Bundled local Scene and equivalent text exercise.',
  },
} satisfies LessonWorkflowStage2SimpleBlock;

// Section authoring uses plain config/production nodes, not defineContentSection.
// Built configurators are not editorial Stage 2 child configs.
declare const materializedText: ContentBlock_Text_Configurator;
const prematureConfigurator: LessonWorkflowStage2SimpleBlock = {
  // @ts-expect-error A materialized Configurator is not a plain Text Config object.
  config: materializedText,
};

const missingSourceLanguage: LessonWorkflowStage1Production = {
  ...standalone.production,
  // @ts-expect-error Actual source document language is required.
  languages: { planned: ['uk'] },
};

const missingPlannedLanguages: LessonWorkflowStage1Production = {
  ...standalone.production,
  // @ts-expect-error The planned language tuple must be nonempty.
  languages: { document: 'uk', planned: [] },
};

const intro = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e08',
    slug: 'introduction',
    type: 'content',
    params: {},
    locale: {
      title: { uk: 'Світло' },
      navigationLabel: { uk: 'Вступ' },
    },
    content: {
      items: { observe: text, lightExperiment: scene },
      order: ['observe', 'lightExperiment'],
    },
  },
  production: { purpose: 'Introduce light observation and examples.' },
} satisfies LessonWorkflowStage2Section;

// The Quiz selection is intentionally incomplete before independent Questions.
const quizIntent = {
  config: {
    id: '663572e7-bd85-4516-86e2-3de07d209e09',
    slug: 'checkUnderstanding',
    type: 'quiz',
    params: {},
    locale: { title: { uk: 'Перевірка' }, navigationLabel: { uk: 'Квіз' } },
    content: { items: {}, order: [] },
  },
  production: { purpose: 'Assess the agreed cognitive method; no fabricated Question UUIDs.' },
} satisfies LessonWorkflowStage2QuizSection;

const stage2 = {
  ...standalone,
  config: {
    ...standalone.config,
    section: {
      items: { introduction: intro, checkUnderstanding: quizIntent },
      order: ['introduction', 'checkUnderstanding'],
    },
  },
} satisfies LessonWorkflowStage2;

const reviewedStage5: LessonWorkflowMaterializerInput = stage2;

// No Quiz Section does not imply that a separately authored Question Bank is unnecessary.
const bankWithoutQuiz = {
  ...standalone,
  production: {
    ...standalone.production,
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: false,
      quizSectionRequired: false,
      flashcardsSectionRequired: false,
    },
  },
  config: { ...standalone.config, params: { quizRequiredForCompletion: false } },
} satisfies LessonWorkflowStage1;

const missingSections: LessonWorkflowStage2 = {
  ...standalone,
  // @ts-expect-error Stage 2 needs an ordered Section collection.
  config: standalone.config,
};

// @ts-expect-error Checkpoint cannot omit nested ordered content.
const invalidCheckpoint: LessonWorkflowStage2Checkpoint = { config: text.config };

void scene;
void prematureConfigurator;
void missingSourceLanguage;
void missingPlannedLanguages;
void standalone;
void incompleteStage1;
void incompleteAssessments;
void _persistedId;
void missingLessonId;
void missingMethodology;
void earlySection;
void earlyLanguageConfig;
void emptySkills;
void stage2;
void reviewedStage5;
void bankWithoutQuiz;
void missingSections;
void invalidCheckpoint;
