/** Public authoring and publishing entrypoint (Node/build only). */
export * from './index';

// Typed editorial production contracts are build-only; keep runtime entrypoint unchanged.
export type * from './types/workflow/lessonWorkflow.types';
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
