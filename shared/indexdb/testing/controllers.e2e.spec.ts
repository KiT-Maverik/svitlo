import { expect, test, type Page } from '@playwright/test';

import { DATABASE_NAME, DATABASE_VERSION } from '@svitlo/indexdb';

import type { LessonState, QuizState } from '../schemas';
import type { ControllerCommand, DatabaseInspection } from './db-browser-commands';

const date = '2026-01-01T00:00:00.000Z';

async function invoke<T = unknown>(page: Page, command: ControllerCommand): Promise<T> {
  return page.evaluate(async input => {
    const handler = (
      window as Window & {
        __svitloDbE2E?: (value: ControllerCommand) => Promise<unknown>;
      }
    ).__svitloDbE2E;
    if (!handler) throw new Error('Database browser harness did not initialize');
    return handler(input);
  }, command) as Promise<T>;
}

function progressingQuiz(id: string, quizId: string): Extract<QuizState, { status: 'in-progress' }> {
  return {
    id,
    quizId,
    status: 'in-progress',
    startedAt: date,
    answers: {
      question: {
        status: 'draft',
        answer: { type: 'select-multiple-answers', value: ['one', 'two'] },
      },
    },
  };
}

async function waitForHarness(page: Page) {
  await expect(page.getByTestId('db-harness-ready')).toBeVisible();
  await page.waitForFunction(
    () =>
      typeof (
        window as Window & {
          __svitloDbE2E?: unknown;
        }
      ).__svitloDbE2E === 'function',
  );
}

async function prepare(page: Page) {
  await page.goto('/db-browser-harness');
  await waitForHarness(page);
}

/** The controllers close their own connections. Fail cleanup if a connection was leaked. */
async function removeDatabase(page: Page) {
  await page.evaluate(
    name =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.deleteDatabase(name);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error ?? new Error('Failed to delete IndexedDB'));
        request.onblocked = () => reject(new Error('IndexedDB deletion blocked by a leaked connection'));
      }),
    DATABASE_NAME,
  );
}

test.describe('Native IndexedDB controller contracts', () => {
  test.beforeEach(async ({ page }) => {
    await prepare(page);
  });

  test.afterEach(async ({ page }) => {
    if (page.isClosed() || !page.url().includes('/db-browser-harness')) return;
    await invoke(page, { op: 'releaseConnection' });
    await removeDatabase(page);
  });

    test('should initialize version-one stores and nonunique indexes on an empty origin', async ({ page }) => {
      const before = await page.evaluate(
        async name => (await indexedDB.databases()).some(db => db.name === name),
        DATABASE_NAME,
      );
      expect(before).toBe(false);
      const actual = await invoke<DatabaseInspection>(page, { op: 'inspectDatabase' });
      expect(actual.name).toBe(DATABASE_NAME);
      expect(actual.version).toBe(DATABASE_VERSION);
      expect(actual.stores).toEqual([
        { name: 'lessonStates', keyPath: 'id', indexes: [{ name: 'lessonId', keyPath: 'lessonId', unique: false }] },
        { name: 'quizStates', keyPath: 'id', indexes: [{ name: 'quizId', keyPath: 'quizId', unique: false }] },
      ]);
    });

    test('should preserve lesson and quiz records across a full navigation reload', async ({ page }) => {
      const lesson = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
      const quiz = progressingQuiz('quiz-run', 'quiz');
      await invoke(page, { op: 'saveQuizState', state: quiz });
      await page.reload();
      await waitForHarness(page);
      expect(await invoke(page, { op: 'getLessonState', id: lesson.id })).toEqual(lesson);
      expect(await invoke(page, { op: 'getQuizState', id: quiz.id })).toEqual(quiz);
    });

    test('should persist across a second page at the same origin in one context', async ({ page }) => {
      const lesson = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
      const another = await page.context().newPage();
      try {
        await prepare(another);
        expect(await invoke(another, { op: 'getLessonState', id: lesson.id })).toEqual(lesson);
      } finally {
        await another.close();
      }
    });

    test('should roll back invalid native controller updates without rewriting persisted state', async ({ page }) => {
      const saved = progressingQuiz('quiz-rollback', 'quiz');
      await invoke(page, { op: 'saveQuizState', state: saved });
      await expect(
        invoke(page, { op: 'updateQuizState', id: saved.id, patch: { id: 'changed-id' } }),
      ).rejects.toThrow(/cannot change its ID/);
      await expect(
        invoke(page, {
          op: 'updateQuizState',
          id: saved.id,
          patch: {
            status: 'finished',
            completedAt: date,
            result: { status: 'graded', success: true, value: Number.POSITIVE_INFINITY },
          },
        }),
      ).rejects.toThrow();
      expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(saved);
      expect(await invoke(page, { op: 'getQuizState', id: 'changed-id' })).toBeUndefined();
    });

    test('should close application connections on a native versionchange event', async ({ page }) => {
      await invoke(page, { op: 'inspectDatabase' });
      expect(await invoke(page, { op: 'holdConnection' })).toBe(DATABASE_VERSION);
      // Production openDatabase registers onversionchange = close. A version bump must not block.
      const version = await page.evaluate(
        ({ name, nextVersion }) =>
          new Promise<number>((resolve, reject) => {
            const request = indexedDB.open(name, nextVersion);
            request.onblocked = () => reject(new Error('Application connection blocked schema upgrade'));
            request.onerror = () => reject(request.error);
            request.onupgradeneeded = () => request.result.createObjectStore('upgradeProbe');
            request.onsuccess = () => {
              const db = request.result;
              const actual = db.version;
              db.close();
              resolve(actual);
            };
          }),
        { name: DATABASE_NAME, nextVersion: DATABASE_VERSION + 1 },
      );
      expect(version).toBe(DATABASE_VERSION + 1);
      // This is a versionchange coordination test, not a migration: v1 has no earlier schemas.
    });
});
