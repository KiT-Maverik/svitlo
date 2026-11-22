import type {
  CourseWorkflowStage1,
  CourseWorkflowStage1Config,
  CourseWorkflowStage1Languages,
  CourseWorkflowStage1Methodology,
  CourseWorkflowStage1Production,
} from './courseWorkflow.types';

const config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  slug: 'astronomyIntro',
  type: 'course',
  params: {
    age: { min: 6, max: 8 },
    grade: { min: 1, max: 3 },
    outcomes: { skills: [] },
    prerequisites: { skills: [] },
  },
  locale: { title: 'Astronomy', description: 'First observations' },
} satisfies CourseWorkflowStage1Config;

const methodology = {
  purpose: 'Teach observation skills',
  audience: 'Beginning learners',
  approach: 'Observe and compare',
  depth: 'Introductory',
  accessibility: 'Multiple accessible representations',
  scope: 'Observing the sky safely',
  entryConditions: 'No assumed astronomy knowledge',
  sourceNotes: 'Review verified age-appropriate educational sources',
} satisfies CourseWorkflowStage1Methodology;

const complete = {
  config,
  production: {
    languages: { document: 'uk', planned: ['uk', 'en'] },
    methodology,
    outcomes: { explanation: 'Recognize observable changes in the sky' },
    prerequisites: { explanation: 'No subject-specific prerequisites' },
    standardsAlignment: [],
    openDecisions: {},
  },
} satisfies CourseWorkflowStage1;

// @ts-expect-error Production methodology and language planning are mandatory.
const missingProduction: CourseWorkflowStage1 = { config };

// @ts-expect-error Stage 1 cannot silently omit the languages object.
const missingLanguages: CourseWorkflowStage1Production = {
  methodology,
  outcomes: { explanation: 'Observe' },
  prerequisites: { explanation: 'None' },
  standardsAlignment: [],
  openDecisions: {},
};

// @ts-expect-error Methodology must include scope, depth, entry conditions and accessibility.
const incompleteMethodology: CourseWorkflowStage1Methodology = {
  purpose: 'Teach',
  audience: 'Learners',
  approach: 'Observe',
};

const emptyPlannedLanguages: CourseWorkflowStage1Languages = {
  document: 'uk',
  // @ts-expect-error A completed Stage 1 always declares at least one planned language.
  planned: [],
};

const forbiddenConfigLanguages: CourseWorkflowStage1Config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'course',
  slug: 'bad',
  params: {
    // @ts-expect-error Planned languages belong only in production.languages.
    languages: ['uk'],
  },
};

const forbiddenScenarioMode: CourseWorkflowStage1Config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'course',
  slug: 'bad',
  params: {
    // @ts-expect-error Scenario decisions are explicitly excluded from Stage 1.
    scenarioMode: 'story',
  },
};

void complete;
void missingProduction;
void missingLanguages;
void incompleteMethodology;
void emptyPlannedLanguages;
void forbiddenConfigLanguages;
void forbiddenScenarioMode;
