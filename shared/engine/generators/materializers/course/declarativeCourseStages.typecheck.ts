import type { CourseWorkflowStage1, CourseWorkflowStage2, CourseWorkflowStage3 } from '../../../types/workflow/courseWorkflow.types';

// Compile-time examples only. Real authored draft.ts files inline their values
// as one export default literal and contain no helper variables or spreads.
const skillId = '663572e7-bd85-4516-86e2-3de07d209e04';
const config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'course' as const,
  slug: 'skyObservation',
  params: { outcomes: { skills: [skillId] }, prerequisites: { skills: [] } },
  locale: { title: 'Sky observation', description: 'Learn to observe patterns' },
};
const production = {
  languages: { document: 'uk' as const, planned: ['uk', 'en'] as ['uk', 'en'] },
  methodology: {
    purpose: 'Practise basic observation',
    audience: 'Beginning learners with varied access needs',
    approach: 'Observe, compare and receive feedback',
    depth: 'Identify observable patterns',
    accessibility: 'Audio and nonvisual alternatives; offline support',
    scope: 'Safe daytime observation',
    entryConditions: 'No previous astronomy knowledge',
    sourceNotes: 'Check against independently reviewed science references',
  },
  outcomes: { explanation: 'Describe what changed' },
  prerequisites: { explanation: 'Familiarity with everyday observation' },
  standardsAlignment: [],
  openDecisions: {},
};

const stage1 = { config, production } satisfies CourseWorkflowStage1;

const stage2 = {
  config: { ...config, content: { items: {
    firstObservation: { config: { type: 'lesson' as const, skills: [skillId] as [string] } },
    transition: { config: { type: 'episode' as const }, production: { focus: 'New context', purpose: 'Connect observations' } },
    finalAssessment: { config: { type: 'assessment' as const, locale: { title: { uk: 'Перевірка' } } }, production: { purpose: 'Collect evidence', lessonDependencies: ['content/firstObservation'] as [string] } },
  }, order: ['firstObservation', 'transition', 'finalAssessment'] } },
  production,
} satisfies CourseWorkflowStage2;

const stage3 = {
  config: { ...config, content: { items: {
    firstObservation: {
      config: { type: 'lesson' as const, slug: 'firstObservation', skills: [skillId], locale: { title: { uk: 'Спостереження' } } },
      production: { kind: 'new' as const, objective: 'Identify changes', depth: 'First steps', sequenceReason: 'Before synthesis', assessmentEvidence: 'Explain observation', methodology: 'Reviewed teaching approach', assessment: { questionBankRequired: true, flashcardBankRequired: false, quizSectionRequired: true, flashcardsSectionRequired: false } },
    },
    transition: { config: { type: 'episode' as const }, production: { focus: 'New context', purpose: 'Connect observations' } },
    finalAssessment: { config: { type: 'assessment' as const, locale: { title: { uk: 'Перевірка' } } }, production: { purpose: 'Collect evidence', lessonDependencies: ['content/firstObservation'] } },
  }, order: ['firstObservation', 'transition', 'finalAssessment'] } },
  production,
} satisfies CourseWorkflowStage3;

// Regression: placing actual runtime languages into the authored Course Config is forbidden.
const invalidConfig = {
  ...config,
  params: {
    ...config.params,
    // @ts-expect-error Course authored draft cannot contain runtime languages.
    languages: ['uk'],
  },
} satisfies CourseWorkflowStage1['config'];

void stage1;
void stage2;
void stage3;
void invalidConfig;
