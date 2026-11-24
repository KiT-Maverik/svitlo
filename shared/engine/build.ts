/** Public authoring and publishing entrypoint (Node/build only). */
export * from './index';

// Typed editorial production contracts are build-only; keep runtime entrypoint unchanged.
export type * from './types/workflow/lessonWorkflow.types';
export type * from './types/workflow/episodeWorkflow.types';
export { episodeWorkflowStage1Handoff_Schema, episodeWorkflowStage2_Schema } from './types/workflow/episodeWorkflow.types';
export type * from './types/workflow/questionBankWorkflow.types';
export type * from './types/workflow/flashcardBankWorkflow.types';
export {
  hashLessonReviewProps,
  lessonReviewIdentifier,
} from './utils/generators/hashLessonReviewProps/hashLessonReviewProps.utils';

// Independent authored Question/Flashcard bank publisher (build only).
export { renderAssessmentResourceFiles } from './generators/assessments/renderAssessmentResourceFiles.utils';
export type {
  AssessmentPublicationEntry,
  AssessmentPublicationFiles,
} from './generators/assessments/renderAssessmentResourceFiles.utils';

// Merge metadata-only manifests from independent Question and Flashcard production stages.
export { mergeAssessmentResourceFiles } from './generators/assessments/renderAssessmentResourceFiles.utils';

export { projectTextbookMedia, assertMediaPublicationReady } from './generators/lessons/projectTextbookMedia.utils';
export type {
  MediaDiagnostic,
  MediaPublicationMode,
  MediaPublicationOptions,
} from './generators/lessons/projectTextbookMedia.utils';

export { questionBankWorkflowStage3_Schema, flashcardBankWorkflowStage3_Schema } from './types/workflow/bankWorkflowFinal.schemas';

// Explicit source-only assessment-bank Stage 1 and reviewed Stage 3 operations.
// This API never authors a Quiz/Flashcards Section or publishes Props/JSON.
export {
  materializeQuestionBankDraft,
  materializeQuestionBank,
} from './generators/materializers/questionBank/materializeQuestionBank';
export type {
  QuestionBankDraftAuthorization,
  QuestionBankFinalAuthorization,
} from './generators/materializers/questionBank/materializeQuestionBank';
export {
  materializeFlashcardBankDraft,
  materializeFlashcardBank,
} from './generators/materializers/flashcardBank/materializeFlashcardBank';
export type {
  FlashcardBankDraftAuthorization,
  FlashcardBankFinalAuthorization,
} from './generators/materializers/flashcardBank/materializeFlashcardBank';
export type {
  BankSourceResult,
  BankSourceFile,
  BankSourceSnapshot,
  BankReviewedSource,
} from './generators/materializers/bankSource/bankSourceSafety';

// Direct authored Lesson materialization (source planning only).
export { materializeLessonStage6 } from './generators/materializers/lesson/materializeStage6';

export { courseWorkflowStage3_Schema } from './types/workflow/courseWorkflowFinal.schemas';
export { materializeCourse } from './generators/materializers/course/materializeCourseDirect';

export { materializeEpisodeStage5 } from './generators/materializers/episode/materializeEpisodeStage5';
