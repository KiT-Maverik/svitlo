import { expect, test, type Page } from '@playwright/test';
import type { LessonState, QuizResult, QuizState } from '../schemas';
import { DATABASE_NAME, DATABASE_VERSION } from '@svitlo/indexdb';
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

function progressingLesson(id: string, lessonId: string): LessonState {
  return {
    id,
    lessonId,
    status: 'in-progress',
    startedAt: date,
    currentSectionId: 'theory',
    sectionCompletion: { theory: true, practice: false },
    skippedSectionIds: ['practice'],
    quizStateIds: { quiz: 'quiz-run' },
  };
}

function progressingQuiz(id: string, quizId: string): QuizState {
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

test.describe('DB', () => {
  test.beforeEach(async ({ page }) => {
    await prepare(page);
  });

  test.afterEach(async ({ page }) => {
    if (page.isClosed() || !page.url().includes('/db-browser-harness')) return;
    await invoke(page, { op: 'releaseConnection' });
    await removeDatabase(page);
  });

  test.describe('Controllers', () => {
    test.describe('createLessonState', () => {
      test.describe('E2E', () => {
        test('should generate a unique record ID and commit a new lesson state', async ({ page }) => {
          const a = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          const b = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          expect(a.id).not.toBe(b.id);
          expect(a).toMatchObject({ lessonId: 'lesson', status: 'new' });
          expect(await invoke(page, { op: 'getLessonState', id: a.id })).toEqual(a);
          expect(await invoke(page, { op: 'getLessonState', id: b.id })).toEqual(b);
        });

        test('should reject an empty lesson ID without writing a record', async ({ page }) => {
          await expect(invoke(page, { op: 'createLessonState', lessonId: '' })).rejects.toThrow();
          expect(await invoke(page, { op: 'listLessonStates', lessonId: '' })).toEqual([]);
        });
      });
    });

    test.describe('getLessonState', () => {
      test.describe('E2E', () => {
        test('should read a previously saved structured lesson state', async ({ page }) => {
          const saved = progressingLesson('state-1', 'lesson-1');
          await invoke(page, { op: 'saveLessonState', state: saved });
          expect(await invoke(page, { op: 'getLessonState', id: saved.id })).toEqual(saved);
        });

        test('should return undefined for a missing lesson state', async ({ page }) => {
          expect(await invoke(page, { op: 'getLessonState', id: 'not-found' })).toBeUndefined();
        });
      });
    });

    test.describe('saveLessonState', () => {
      test.describe('E2E', () => {
        test('should replace an existing state using the same primary key', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          const updated = progressingLesson(created.id, 'lesson');
          await invoke(page, { op: 'saveLessonState', state: updated });
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toEqual(updated);
          expect(await invoke<LessonState[]>(page, { op: 'listLessonStates', lessonId: 'lesson' })).toHaveLength(1);
        });

        test('should reject invalid records and preserve the last committed value', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          const invalid = { ...created, status: 'finished' } as unknown as LessonState;
          await expect(invoke(page, { op: 'saveLessonState', state: invalid })).rejects.toThrow();
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toEqual(created);
        });

        test('should retain nested values without sharing mutable references with reads', async ({ page }) => {
          const saved = progressingLesson('nested', 'lesson');
          await invoke(page, { op: 'saveLessonState', state: saved });
          const first = await invoke<LessonState>(page, { op: 'getLessonState', id: saved.id });
          if (first.status !== 'in-progress') throw new Error('Expected a progress state');
          first.sectionCompletion.theory = false;
          first.skippedSectionIds.push('extra');
          expect(await invoke(page, { op: 'getLessonState', id: saved.id })).toEqual(saved);
        });
      });
    });

    test.describe('updateLessonState', () => {
      test.describe('E2E', () => {
        test('should commit a valid status transition and updated nested fields', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          const replacement = progressingLesson(created.id, created.lessonId);
          const { id: ignoredId, lessonId: ignoredLessonId, ...patch } = replacement;
          void ignoredId;
          void ignoredLessonId;
          expect(await invoke(page, { op: 'updateLessonState', id: created.id, patch })).toEqual(replacement);
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toEqual(replacement);
        });

        test('should return undefined without creating a missing state', async ({ page }) => {
          expect(
            await invoke(page, { op: 'updateLessonState', id: 'missing', patch: { status: 'new' } }),
          ).toBeUndefined();
          expect(await invoke(page, { op: 'getLessonState', id: 'missing' })).toBeUndefined();
        });

        test('should abort an attempted primary-key change and retain the original state', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          await expect(
            invoke(page, { op: 'updateLessonState', id: created.id, patch: { id: 'different-id' } }),
          ).rejects.toThrow(/cannot change its ID/);
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toEqual(created);
          expect(await invoke(page, { op: 'getLessonState', id: 'different-id' })).toBeUndefined();
        });

        test('should abort invalid changes without committing partial data', async ({ page }) => {
          const saved = progressingLesson('state', 'lesson');
          await invoke(page, { op: 'saveLessonState', state: saved });
          await expect(
            invoke(page, {
              op: 'updateLessonState',
              id: saved.id,
              patch: { sectionCompletion: { theory: 'invalid' } },
            }),
          ).rejects.toThrow();
          expect(await invoke(page, { op: 'getLessonState', id: saved.id })).toEqual(saved);
        });
      });
    });

    test.describe('listLessonStates', () => {
      test.describe('E2E', () => {
        test('should query the lessonId index without returning another lesson runs', async ({ page }) => {
          const a = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'a' });
          const b = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'a' });
          await invoke(page, { op: 'createLessonState', lessonId: 'b' });
          const actual = await invoke<LessonState[]>(page, { op: 'listLessonStates', lessonId: 'a' });
          expect(actual.map(state => state.id).sort()).toEqual([a.id, b.id].sort());
        });

        test('should return an empty collection when the indexed lesson is absent', async ({ page }) => {
          expect(await invoke(page, { op: 'listLessonStates', lessonId: 'absent' })).toEqual([]);
        });
      });
    });

    test.describe('deleteLessonState', () => {
      test.describe('E2E', () => {
        test('should remove the state from both primary-key and indexed queries', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          await invoke(page, { op: 'deleteLessonState', id: created.id });
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toBeUndefined();
          expect(await invoke(page, { op: 'listLessonStates', lessonId: 'lesson' })).toEqual([]);
        });

        test('should permit deletion of a missing record without affecting others', async ({ page }) => {
          const created = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'lesson' });
          await invoke(page, { op: 'deleteLessonState', id: 'missing' });
          expect(await invoke(page, { op: 'getLessonState', id: created.id })).toEqual(created);
        });
      });
    });

    test.describe('createQuizState', () => {
      test.describe('E2E', () => {
        test('should create independent persisted runs for one quiz', async ({ page }) => {
          const a = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          const b = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          expect(a.id).not.toBe(b.id);
          expect(a).toMatchObject({ quizId: 'quiz', status: 'new' });
          expect(await invoke(page, { op: 'getQuizState', id: a.id })).toEqual(a);
          expect(await invoke(page, { op: 'getQuizState', id: b.id })).toEqual(b);
        });

        test('should reject an empty quiz ID without writing a record', async ({ page }) => {
          await expect(invoke(page, { op: 'createQuizState', quizId: '' })).rejects.toThrow();
          expect(await invoke(page, { op: 'listQuizStates', quizId: '' })).toEqual([]);
        });
      });
    });

    test.describe('getQuizState', () => {
      test.describe('E2E', () => {
        test('should hydrate answers from persisted browser storage', async ({ page }) => {
          const saved = progressingQuiz('quiz-state', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: saved });
          expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(saved);
        });

        test('should return undefined when the quiz state is absent', async ({ page }) => {
          expect(await invoke(page, { op: 'getQuizState', id: 'missing' })).toBeUndefined();
        });
      });
    });

    test.describe('saveQuizState', () => {
      test.describe('E2E', () => {
        test('should upsert a quiz state preserving question answers and metadata', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          const saved = progressingQuiz(created.id, created.quizId);
          await invoke(page, { op: 'saveQuizState', state: saved });
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toEqual(saved);
          expect(await invoke<QuizState[]>(page, { op: 'listQuizStates', quizId: 'quiz' })).toHaveLength(1);
        });

        test('should reject invalid answer shapes and keep the preceding valid state', async ({ page }) => {
          const saved = progressingQuiz('quiz-state', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: saved });
          const invalid = {
            ...saved,
            answers: { question: { status: 'draft', answer: { type: 'select-multiple-answers', value: ['okay', 1] } } },
          } as unknown as QuizState;
          await expect(invoke(page, { op: 'saveQuizState', state: invalid })).rejects.toThrow();
          expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(saved);
        });

        test('should keep the nested answer independently cloned from previous reads', async ({ page }) => {
          const saved = progressingQuiz('quiz-state', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: saved });
          const first = await invoke<QuizState>(page, { op: 'getQuizState', id: saved.id });
          if (first.status !== 'in-progress') throw new Error('Expected in-progress');
          const answer = first.answers.question.answer;
          if (answer?.type !== 'select-multiple-answers') throw new Error('Expected multiple selection');
          answer.value.push('mutation');
          expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(saved);
        });
      });
    });

    test.describe('updateQuizState', () => {
      test.describe('E2E', () => {
        test('should transition from new to in-progress and persist answers', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          const saved = progressingQuiz(created.id, created.quizId);
          const { id: ignoredId, quizId: ignoredQuizId, ...patch } = saved;
          void ignoredId;
          void ignoredQuizId;
          expect(await invoke(page, { op: 'updateQuizState', id: created.id, patch })).toEqual(saved);
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toEqual(saved);
        });

        test('should return undefined and not insert when the run does not exist', async ({ page }) => {
          expect(
            await invoke(page, { op: 'updateQuizState', id: 'missing', patch: { status: 'new' } }),
          ).toBeUndefined();
          expect(await invoke(page, { op: 'getQuizState', id: 'missing' })).toBeUndefined();
        });

        test('should reject changes to the primary key and roll back', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          await expect(
            invoke(page, { op: 'updateQuizState', id: created.id, patch: { id: 'another-id' } }),
          ).rejects.toThrow(/cannot change its ID/);
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toEqual(created);
          expect(await invoke(page, { op: 'getQuizState', id: 'another-id' })).toBeUndefined();
        });

        test('should reject invalid result values and retain existing answers', async ({ page }) => {
          const saved = progressingQuiz('quiz-state', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: saved });
          await expect(
            invoke(page, {
              op: 'updateQuizState',
              id: saved.id,
              patch: { status: 'finished', result: { status: 'graded', success: true, value: -2 }, completedAt: date },
            }),
          ).resolves.toMatchObject({ status: 'finished' });
          // The quiz result schema requires a finite value but permits negative scores;
          // check a truly invalid (non-finite) result, not an invented domain constraint.
          const finished = await invoke<QuizState>(page, { op: 'getQuizState', id: saved.id });
          await expect(
            invoke(page, {
              op: 'updateQuizState',
              id: saved.id,
              patch: { result: { status: 'graded', success: true, value: Infinity } },
            }),
          ).rejects.toThrow();
          expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(finished);
        });
      });
    });

    test.describe('listQuizStates', () => {
      test.describe('E2E', () => {
        test('should find all runs by nonunique quizId index', async ({ page }) => {
          const a = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz-a' });
          const b = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz-a' });
          await invoke(page, { op: 'createQuizState', quizId: 'quiz-b' });
          const result = await invoke<QuizState[]>(page, { op: 'listQuizStates', quizId: 'quiz-a' });
          expect(result.map(state => state.id).sort()).toEqual([a.id, b.id].sort());
        });

        test('should yield an empty list for a quiz with no recorded runs', async ({ page }) => {
          expect(await invoke(page, { op: 'listQuizStates', quizId: 'none' })).toEqual([]);
        });
      });
    });

    test.describe('deleteQuizState', () => {
      test.describe('E2E', () => {
        test('should delete the quiz record from primary-key and index queries', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          await invoke(page, { op: 'deleteQuizState', id: created.id });
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toBeUndefined();
          expect(await invoke(page, { op: 'listQuizStates', quizId: 'quiz' })).toEqual([]);
        });

        test('should treat deletion of a nonexistent quiz run as a no-op', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          await invoke(page, { op: 'deleteQuizState', id: 'missing' });
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toEqual(created);
        });
      });
    });

    test.describe('completeQuiz', () => {
      test.describe('E2E', () => {
        test('should finish an in-progress run with its calculated result and completion timestamp', async ({
          page,
        }) => {
          const saved = progressingQuiz('quiz-state', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: saved });
          const result: QuizResult = { status: 'graded', value: 75, success: true };
          const updated = await invoke<QuizState>(page, { op: 'completeQuiz', id: saved.id, result });
          expect(updated).toMatchObject({
            id: saved.id,
            quizId: saved.quizId,
            status: 'finished',
            result,
            answers: saved.answers,
          });
          if (updated.status !== 'finished') throw new Error('Expected finished quiz');
          expect(Number.isNaN(Date.parse(updated.completedAt))).toBe(false);
          expect(await invoke(page, { op: 'getQuizState', id: saved.id })).toEqual(updated);
        });

        test('should reject completion of a new or already finished run without changing storage', async ({ page }) => {
          const created = await invoke<QuizState>(page, { op: 'createQuizState', quizId: 'quiz' });
          await expect(
            invoke(page, { op: 'completeQuiz', id: created.id, result: { status: 'ungraded' } }),
          ).rejects.toThrow(/Only an in-progress quiz/);
          expect(await invoke(page, { op: 'getQuizState', id: created.id })).toEqual(created);
          const active = progressingQuiz('active', 'quiz');
          await invoke(page, { op: 'saveQuizState', state: active });
          const finished = await invoke<QuizState>(page, {
            op: 'completeQuiz',
            id: active.id,
            result: { status: 'ungraded' },
          });
          await expect(
            invoke(page, { op: 'completeQuiz', id: active.id, result: { status: 'ungraded' } }),
          ).rejects.toThrow(/Only an in-progress quiz/);
          expect(await invoke(page, { op: 'getQuizState', id: active.id })).toEqual(finished);
        });

        test('should return undefined instead of creating a missing quiz run', async ({ page }) => {
          expect(
            await invoke(page, { op: 'completeQuiz', id: 'missing', result: { status: 'ungraded' } }),
          ).toBeUndefined();
          expect(await invoke(page, { op: 'getQuizState', id: 'missing' })).toBeUndefined();
        });
      });
    });
  });

  test.describe('Native IndexedDB', () => {
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

    test('should isolate databases in separate Playwright browser contexts', async ({ page, browser }) => {
      const lesson = await invoke<LessonState>(page, { op: 'createLessonState', lessonId: 'private' });
      const context = await browser.newContext();
      try {
        const isolated = await context.newPage();
        await prepare(isolated);
        expect(await invoke(isolated, { op: 'getLessonState', id: lesson.id })).toBeUndefined();
        const other = await invoke<LessonState>(isolated, { op: 'createLessonState', lessonId: 'other' });
        expect(await invoke(page, { op: 'getLessonState', id: other.id })).toBeUndefined();
        await removeDatabase(isolated);
      } finally {
        await context.close();
      }
    });

    test('should commit native multi-store transactions and expose writes through production controllers', async ({
      page,
    }) => {
      await invoke(page, { op: 'inspectDatabase' });
      const outcome = await page.evaluate(
        name =>
          new Promise<string>((resolve, reject) => {
            const request = indexedDB.open(name);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
              const db = request.result;
              const tx = db.transaction(['lessonStates', 'quizStates'], 'readwrite');
              tx.objectStore('lessonStates').add({ id: 'lesson-tx', lessonId: 'lesson', status: 'new' });
              tx.objectStore('quizStates').add({ id: 'quiz-tx', quizId: 'quiz', status: 'new' });
              tx.oncomplete = () => {
                db.close();
                resolve('committed');
              };
              tx.onabort = () => {
                db.close();
                reject(tx.error ?? new Error('Transaction aborted'));
              };
            };
          }),
        DATABASE_NAME,
      );
      expect(outcome).toBe('committed');
      expect(await invoke(page, { op: 'getLessonState', id: 'lesson-tx' })).toMatchObject({ status: 'new' });
      expect(await invoke(page, { op: 'getQuizState', id: 'quiz-tx' })).toMatchObject({ status: 'new' });
    });

    test('should roll back all writes after a native duplicate primary-key error', async ({ page }) => {
      await invoke(page, { op: 'inspectDatabase' });
      const result = await page.evaluate(
        name =>
          new Promise<string>((resolve, reject) => {
            const request = indexedDB.open(name);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
              const db = request.result;
              const tx = db.transaction('lessonStates', 'readwrite');
              tx.objectStore('lessonStates').add({ id: 'duplicate', lessonId: 'lesson', status: 'new' });
              tx.objectStore('lessonStates').add({ id: 'duplicate', lessonId: 'lesson', status: 'new' });
              tx.oncomplete = () => {
                db.close();
                resolve('unexpected commit');
              };
              tx.onabort = () => {
                db.close();
                resolve('aborted');
              };
            };
          }),
        DATABASE_NAME,
      );
      expect(result).toBe('aborted');
      expect(await invoke(page, { op: 'getLessonState', id: 'duplicate' })).toBeUndefined();
    });

    test('should roll back an explicitly aborted native transaction', async ({ page }) => {
      await invoke(page, { op: 'inspectDatabase' });
      const outcome = await page.evaluate(
        name =>
          new Promise<string>((resolve, reject) => {
            const request = indexedDB.open(name);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
              const db = request.result;
              const tx = db.transaction('quizStates', 'readwrite');
              tx.objectStore('quizStates').add({ id: 'rolled-back', quizId: 'quiz', status: 'new' });
              tx.onabort = () => {
                db.close();
                resolve('aborted');
              };
              tx.oncomplete = () => {
                db.close();
                resolve('unexpected commit');
              };
              tx.abort();
            };
          }),
        DATABASE_NAME,
      );
      expect(outcome).toBe('aborted');
      expect(await invoke(page, { op: 'getQuizState', id: 'rolled-back' })).toBeUndefined();
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
});
