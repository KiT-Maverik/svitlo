/** Public authoring and publishing entrypoint (Node/build only). */
export * from './index';

// Source-relative media discovery is Build-only; never export via runtime.ts.
export { resolveLessonMedia } from './utils/generators/resolveLessonMedia/resolveLessonMedia.utils';
