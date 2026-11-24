import type { QuestionBankWorkflowStage1 } from '@svitlo/engine/build';

// Synthetic E2E fixture: editorial Lesson inputs are simulated, not reviewed production evidence.
export const questionBankDraft = {
  config: { ownerLessonId: 'a7485d31-89f0-4d15-9cb2-b730bc94a8e7' },
  production: {
    languages: { document: 'en', planned: ['en', 'uk', 'he'] },
    lesson: {
      sourcePath: 'content/playground/data/lessons/7/a7485d31-89f0-4d15-9cb2-b730bc94a8e7/index.ts',
      sourceSha: 'not-created-synthetic-fixture',
      referencePath: 'not-generated-synthetic-fixture',
      referenceSha: 'not-generated-synthetic-fixture',
      methodologyPath: 'not-created-synthetic-fixture',
      title: 'Question Bank E2E Fixture',
    },
    assessment: {
      questionBankRequired: true,
      flashcardBankRequired: false,
      quizSectionRequired: true,
      flashcardsSectionRequired: false,
      quizRequiredForCompletion: true,
    },
    ownershipRationale: 'Exercise the independent Question Bank production pipeline in Playground.',
    audience: 'Synthetic technical test; not curricular material.',
    scope: 'Cover all supported Question discriminants, legal nested ContentBlocks, answer models, materialization, publication and localization.',
    prerequisites: 'Existing Playground test Skill; Lesson editorial input is simulated. Real owner source will be needed if the deployed technical gate requires it.',
    evidenceIntent: [
      {
        skillId: '00000000-0000-4000-8000-000000000001',
        outcome: 'Exercise fixture response and scoring paths.',
        assessmentMethod: 'classification',
        cognitiveOperation: 'Classify synthetic examples.',
        knowledgeAspect: 'Fixture color labels and representations.',
        cognitiveDemand: 'Technical coverage rather than pedagogical validity.',
        misconception: 'Synthetic distractor case.',
        context: 'Playground E2E fixture.',
        expectedEvidence: 'Supported answer models produce deterministic results.',
      },
    ],
    misconceptions: 'Synthetic distractors and incorrect-answer paths.',
    mediaNeeds: 'Exercise legal media and composite blocks with actual fixture assets before strict publication.',
    sourcesAndDependencies: 'Synthetic Lesson analysis authorized for E2E only. No real Lesson source, derived Markdown, independent review or publication is claimed.',
  },
} satisfies QuestionBankWorkflowStage1;
