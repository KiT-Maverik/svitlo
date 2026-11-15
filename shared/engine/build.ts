/** Public authoring and publishing entrypoint (Node/build only). */
export * from './index';
export { hashLessonReviewProps, lessonReviewIdentifier } from './utils/generators/hashLessonReviewProps/hashLessonReviewProps.utils';

// Source-relative media discovery is Build-only; never export via runtime.ts.
export { resolveLessonMedia } from './utils/generators/resolveLessonMedia/resolveLessonMedia.utils';
