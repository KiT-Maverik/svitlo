/** Stable Engine-owned sample textbook for generator integration tests. */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const testingRoot = path.dirname(fileURLToPath(import.meta.url));
export const packagePath = 'content/engine-fixture';
export const textbook = path.join(testingRoot, packagePath);
export const lessonId = '00000000-0000-4000-8000-00000000000c';
export const questionId = '00000000-0000-4000-8000-000000000001';
export const flashcardId = '00000000-0000-4000-8000-000000000002';
export const lessonRelativePath = 'c/' + lessonId;
export const lessonEntry = path.join(textbook, 'data/lessons', lessonRelativePath, 'index.ts');
