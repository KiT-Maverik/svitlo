import 'fake-indexeddb/auto';

import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import type { LessonState, QuizState } from '@svitlo/contracts/content';
import {
  completeQuiz,
  createLessonState,
  createQuizState,
  deleteLessonState,
  deleteQuizState,
  getLessonState,
  getQuizState,
  listLessonStates,
  listQuizStates,
  saveLessonState,
  saveQuizState,
  updateLessonState,
  updateQuizState,
} from '..';
import { DATABASE_NAME, DATABASE_VERSION, type StateStore } from '../../utils/databaseConfig/databaseConfig.utils';
import { openDatabase } from '../../utils';

type LessonProgress = Extract<LessonState, { status: 'in-progress' }>;
type QuizProgress = Extract<QuizState, { status: 'in-progress' }>;

const startedAt = '2026-01-01T00:00:00.000Z';

function newLesson(id = 'lesson-run-1', lessonId = 'lesson-a'): LessonState {
  return { id, lessonId, status: 'new' };
}

function lessonProgress(overrides: Partial<LessonProgress> = {}): LessonProgress {
  return {
    id: 'lesson-run-1',
    lessonId: 'lesson-a',
    status: 'in-progress',
    startedAt,
    currentSectionId: 'section-a',
    sectionCompletion: { 'section-a': true, 'section-b': false },
    skippedSectionIds: ['section-b'],
    quizStateIds: { 'quiz-section': 'quiz-run-1' },
    ...overrides,
  };
}

function newQuiz(id = 'quiz-run-1', quizId = 'quiz-a'): QuizState {
  return { id, quizId, status: 'new' };
}

function quizProgress(overrides: Partial<QuizProgress> = {}): QuizProgress {
  return {
    id: 'quiz-run-1',
    quizId: 'quiz-a',
    status: 'in-progress',
    startedAt,
    answers: {
      'question-1': {
        status: 'submitted',
        answer: { type: 'select-multiple-answers', value: ['answer-a', 'answer-b'] },
        result: { status: 'correct', earnedWeight: 2 },
      },
      'question-2': { status: 'deferred' },
    },
    ...overrides,
  };
}

/**
 * Controllers close their connections after transaction completion.
 * A single file runs its cases sequentially; Node's test runner isolates
 * separate test files in processes. Each case starts and ends with deletion.
 */
function deleteTestDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error('Database deletion failed'));
    request.onblocked = () => reject(new Error('An IndexedDB connection blocked test cleanup'));
  });
}

/** Read the object store directly, independently of controller deserialization. */
async function readStored(store: StateStore, id: string): Promise<unknown> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, 'readonly');
    const request = transaction.objectStore(store).get(id);
    let result: unknown;
    request.onsuccess = () => {
      result = request.result;
    };
    transaction.oncomplete = () => {
      db.close();
      resolve(result);
    };
    transaction.onabort = () => {
      db.close();
      reject(transaction.error ?? new Error('Read aborted'));
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error('Read failed'));
    };
  });
}

/** Insert directly through the real IndexedDB API to test controller reads. */
async function addStored(store: StateStore, value: unknown): Promise<void> {
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite');
      transaction.objectStore(store).add(value);
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error ?? new Error('Insert aborted'));
      transaction.onerror = () => reject(transaction.error ?? new Error('Insert failed'));
    });
  } finally {
    db.close();
  }
}

beforeEach(deleteTestDatabase);
afterEach(deleteTestDatabase);

describe('DB', { concurrency: false }, () => {
  describe('Controllers', () => {
    describe('createLessonState', () => {
      describe('Integration', () => {
        it('should initialize the versioned database with both expected object stores and indexes', async () => {
          const db = await openDatabase();
          try {
            assert.equal(db.name, DATABASE_NAME);
            assert.equal(db.version, DATABASE_VERSION);
            assert.deepEqual(Array.from(db.objectStoreNames), ['lessonStates', 'quizStates']);
            const transaction = db.transaction(['lessonStates', 'quizStates'], 'readonly');
            const lessons = transaction.objectStore('lessonStates');
            const quizzes = transaction.objectStore('quizStates');
            assert.equal(lessons.keyPath, 'id');
            assert.equal(quizzes.keyPath, 'id');
            assert.deepEqual(Array.from(lessons.indexNames), ['lessonId']);
            assert.deepEqual(Array.from(quizzes.indexNames), ['quizId']);
            assert.equal(lessons.index('lessonId').keyPath, 'lessonId');
            assert.equal(quizzes.index('quizId').keyPath, 'quizId');
            assert.equal(lessons.index('lessonId').unique, false);
            assert.equal(quizzes.index('quizId').unique, false);
          } finally {
            db.close();
          }
        });

        it('should persist a new lesson run before resolving', async () => {
          const created = await createLessonState('lesson-a');
          assert.equal(created.status, 'new');
          assert.ok(created.id.length > 0);
          assert.deepEqual(await readStored('lessonStates', created.id), created);
        });

        it('should create independent runs for the same lesson and reopen their data', async () => {
          const first = await createLessonState('lesson-a');
          const second = await createLessonState('lesson-a');
          assert.notEqual(first.id, second.id);
          const reopened = await openDatabase();
          reopened.close();
          assert.deepEqual(
            (await listLessonStates('lesson-a')).map(state => state.id).sort(),
            [first.id, second.id].sort(),
          );
        });

        it('should reject an empty lesson ID without creating a record', async () => {
          await assert.rejects(createLessonState(''));
          assert.deepEqual(await listLessonStates(''), []);
        });

        it('should reject a duplicate primary key in the underlying lesson store', async () => {
          await addStored('lessonStates', newLesson());
          await assert.rejects(addStored('lessonStates', newLesson()));
          assert.deepEqual(await readStored('lessonStates', 'lesson-run-1'), newLesson());
        });
      });
    });

    describe('deleteLessonState', () => {
      describe('Integration', () => {
        it('should delete a persisted lesson run without affecting another run', async () => {
          await saveLessonState(newLesson('one'));
          await saveLessonState(newLesson('two'));
          await deleteLessonState('one');
          assert.equal(await readStored('lessonStates', 'one'), undefined);
          assert.deepEqual(await readStored('lessonStates', 'two'), newLesson('two'));
        });

        it('should resolve when deleting a missing run', async () => {
          await deleteLessonState('absent');
          assert.equal(await readStored('lessonStates', 'absent'), undefined);
        });
      });
    });

    describe('getLessonState', () => {
      describe('Integration', () => {
        it('should retrieve and parse every persisted lesson status', async () => {
          const progress = lessonProgress();
          const contentComplete: LessonState = {
            ...progress,
            status: 'content-complete',
            contentCompletedAt: startedAt,
          };
          const finished: LessonState = {
            ...progress,
            status: 'finished',
            contentCompletedAt: startedAt,
            completedAt: startedAt,
          };
          const states = [
            newLesson('new'),
            { ...progress, id: 'progress' },
            { ...contentComplete, id: 'complete' },
            { ...finished, id: 'finished' },
          ];
          for (const state of states) {
            await addStored('lessonStates', state);
            assert.deepEqual(await getLessonState(state.id), state);
          }
        });

        it('should return undefined for an unknown lesson run', async () => {
          assert.equal(await getLessonState('not-found'), undefined);
        });

        it('should reject malformed persisted lesson data without rewriting it', async () => {
          const invalid = { id: 'invalid', lessonId: 'lesson-a', status: 'in-progress', startedAt };
          await addStored('lessonStates', invalid);
          await assert.rejects(getLessonState('invalid'));
          assert.deepEqual(await readStored('lessonStates', 'invalid'), invalid);
        });
      });
    });

    describe('listLessonStates', () => {
      describe('Integration', () => {
        it('should use the lessonId index to return all matching runs only', async () => {
          await saveLessonState(newLesson('one', 'lesson-a'));
          await saveLessonState(newLesson('two', 'lesson-a'));
          await saveLessonState(newLesson('three', 'lesson-b'));
          assert.deepEqual((await listLessonStates('lesson-a')).map(state => state.id).sort(), ['one', 'two']);
        });

        it('should return an empty array when the index has no matches', async () => {
          assert.deepEqual(await listLessonStates('missing'), []);
        });

        it('should reject an invalid record encountered through the lessonId index', async () => {
          await addStored('lessonStates', { id: 'bad', lessonId: 'lesson-a', status: 'unknown' });
          await assert.rejects(listLessonStates('lesson-a'));
        });
      });
    });

    describe('saveLessonState', () => {
      describe('Integration', () => {
        it('should persist nested progress, including section flags and quiz references', async () => {
          const state = lessonProgress();
          await saveLessonState(state);
          assert.deepEqual(await readStored('lessonStates', state.id), state);
          assert.deepEqual(await getLessonState(state.id), state);
        });

        it('should replace an existing state by primary key using put', async () => {
          await saveLessonState(newLesson());
          const progressed = lessonProgress();
          await saveLessonState(progressed);
          assert.deepEqual(await readStored('lessonStates', progressed.id), progressed);
          assert.equal((await listLessonStates('lesson-a')).length, 1);
        });

        it('should snapshot objects through IndexedDB structured cloning', async () => {
          const state = lessonProgress();
          await saveLessonState(state);
          state.sectionCompletion['section-a'] = false;
          state.skippedSectionIds.push('section-c');
          state.quizStateIds['quiz-section'] = 'changed';
          const stored = await getLessonState(state.id);
          assert.deepEqual(stored, lessonProgress());
        });

        it('should reject invalid application schema without writing', async () => {
          const invalid = { ...newLesson(), lessonId: '' } as LessonState;
          await assert.rejects(saveLessonState(invalid));
          assert.equal(await readStored('lessonStates', invalid.id), undefined);
        });

        it('should roll back a transaction after an already successful add is followed by a duplicate key', async () => {
          const db = await openDatabase();
          let firstRequestSucceeded = false;
          try {
            await new Promise<void>((resolve, reject) => {
              const transaction = db.transaction('lessonStates', 'readwrite');
              const store = transaction.objectStore('lessonStates');
              const first = store.add(newLesson('rollback'));
              first.addEventListener('success', () => {
                firstRequestSucceeded = true;
              });
              store.add(newLesson('rollback'));
              transaction.oncomplete = () => reject(new Error('A duplicate-key transaction unexpectedly committed'));
              transaction.onabort = () => resolve();
            });
          } finally {
            db.close();
          }
          assert.equal(firstRequestSucceeded, true);
          assert.equal(await readStored('lessonStates', 'rollback'), undefined);
        });
      });
    });

    describe('updateLessonState', () => {
      describe('Integration', () => {
        it('should atomically update one section flag and preserve all unrelated fields', async () => {
          await saveLessonState(lessonProgress());
          const updated = await updateLessonState('lesson-run-1', current => {
            if (current.status !== 'in-progress') throw new Error('Unexpected status');
            return { ...current, sectionCompletion: { ...current.sectionCompletion, 'section-b': true } };
          });
          const expected = lessonProgress({ sectionCompletion: { 'section-a': true, 'section-b': true } });
          assert.deepEqual(updated, expected);
          assert.deepEqual(await readStored('lessonStates', expected.id), expected);
        });

        it('should transition a run to content-complete and persist the timestamp', async () => {
          await saveLessonState(lessonProgress());
          const updated = await updateLessonState('lesson-run-1', current => {
            if (current.status !== 'in-progress') throw new Error('Unexpected status');
            return { ...current, status: 'content-complete', contentCompletedAt: startedAt };
          });
          assert.equal(updated?.status, 'content-complete');
          assert.deepEqual(await getLessonState('lesson-run-1'), updated);
        });

        it('should return undefined without invoking the callback for missing state', async () => {
          let invoked = false;
          assert.equal(
            await updateLessonState('missing', state => {
              invoked = true;
              return state;
            }),
            undefined,
          );
          assert.equal(invoked, false);
        });

        it('should abort and preserve the original record when the update throws', async () => {
          const initial = lessonProgress();
          await saveLessonState(initial);
          await assert.rejects(
            updateLessonState(initial.id, () => {
              throw new Error('change failed');
            }),
            /change failed/,
          );
          assert.deepEqual(await readStored('lessonStates', initial.id), initial);
        });

        it('should reject changed IDs and roll back', async () => {
          const initial = lessonProgress();
          await saveLessonState(initial);
          await assert.rejects(
            updateLessonState(initial.id, current => ({ ...current, id: 'wrong-id' })),
            /cannot change its ID/,
          );
          assert.deepEqual(await readStored('lessonStates', initial.id), initial);
          assert.equal(await readStored('lessonStates', 'wrong-id'), undefined);
        });

        it('should reject invalid updated content and preserve the stored version', async () => {
          const initial = lessonProgress();
          await saveLessonState(initial);
          await assert.rejects(updateLessonState(initial.id, current => ({ ...current, lessonId: '' })));
          assert.deepEqual(await getLessonState(initial.id), initial);
        });
      });
    });

    describe('createQuizState', () => {
      describe('Integration', () => {
        it('should create a new quiz run with an IndexedDB-generated persistence transaction', async () => {
          const created = await createQuizState('quiz-a');
          assert.equal(created.status, 'new');
          assert.ok(created.id.length > 0);
          assert.deepEqual(await readStored('quizStates', created.id), created);
        });

        it('should generate distinct IDs for separate runs of the same quiz', async () => {
          const first = await createQuizState('quiz-a');
          const second = await createQuizState('quiz-a');
          assert.notEqual(first.id, second.id);
          assert.equal((await listQuizStates('quiz-a')).length, 2);
        });

        it('should reject an empty quiz ID without a persisted record', async () => {
          await assert.rejects(createQuizState(''));
          assert.deepEqual(await listQuizStates(''), []);
        });

        it('should preserve quiz data when an existing database connection is closed and reopened', async () => {
          const created = await createQuizState('quiz-a');
          const reopened = await openDatabase();
          reopened.close();
          assert.deepEqual(await getQuizState(created.id), created);
        });

        it('should reject duplicate primary keys while allowing duplicate quizId index entries', async () => {
          await addStored('quizStates', newQuiz('first'));
          await addStored('quizStates', newQuiz('second'));
          await assert.rejects(addStored('quizStates', newQuiz('first')));
          assert.deepEqual((await listQuizStates('quiz-a')).map(state => state.id).sort(), ['first', 'second']);
        });
      });
    });

    describe('deleteQuizState', () => {
      describe('Integration', () => {
        it('should remove a quiz run but leave another run intact', async () => {
          await saveQuizState(newQuiz('one'));
          await saveQuizState(newQuiz('two'));
          await deleteQuizState('one');
          assert.equal(await readStored('quizStates', 'one'), undefined);
          assert.deepEqual(await readStored('quizStates', 'two'), newQuiz('two'));
        });

        it('should resolve when deleting a nonexisting quiz run', async () => {
          await deleteQuizState('missing');
          assert.equal(await readStored('quizStates', 'missing'), undefined);
        });
      });
    });

    describe('getQuizState', () => {
      describe('Integration', () => {
        it('should deserialize new, in-progress, and finished quiz runs', async () => {
          const progress = quizProgress();
          const finished: QuizState = {
            ...progress,
            status: 'finished',
            completedAt: startedAt,
            result: { status: 'graded', success: true, value: 100 },
          };
          const states = [newQuiz('new'), { ...progress, id: 'progress' }, { ...finished, id: 'finished' }];
          for (const state of states) {
            await addStored('quizStates', state);
            assert.deepEqual(await getQuizState(state.id), state);
          }
        });

        it('should return undefined for an absent quiz run', async () => {
          assert.equal(await getQuizState('missing'), undefined);
        });

        it('should reject malformed stored answers without changing them', async () => {
          const invalid = {
            ...quizProgress(),
            answers: { broken: { status: 'submitted', answer: { type: 'unknown', value: 0 } } },
          };
          await addStored('quizStates', invalid);
          await assert.rejects(getQuizState(invalid.id));
          assert.deepEqual(await readStored('quizStates', invalid.id), invalid);
        });
      });
    });

    describe('listQuizStates', () => {
      describe('Integration', () => {
        it('should retrieve all and only runs matching the quizId index', async () => {
          await saveQuizState(newQuiz('one', 'quiz-a'));
          await saveQuizState(newQuiz('two', 'quiz-a'));
          await saveQuizState(newQuiz('three', 'quiz-b'));
          assert.deepEqual((await listQuizStates('quiz-a')).map(state => state.id).sort(), ['one', 'two']);
        });

        it('should return an empty array for an unmatched quiz ID', async () => {
          assert.deepEqual(await listQuizStates('unavailable'), []);
        });

        it('should reject malformed data returned by the index', async () => {
          await addStored('quizStates', { id: 'invalid', quizId: 'quiz-a', status: 'bad' });
          await assert.rejects(listQuizStates('quiz-a'));
        });
      });
    });

    describe('saveQuizState', () => {
      describe('Integration', () => {
        it('should persist and restore every nested answer and result field', async () => {
          const state = quizProgress();
          await saveQuizState(state);
          assert.deepEqual(await readStored('quizStates', state.id), state);
          assert.deepEqual(await getQuizState(state.id), state);
        });

        it('should upsert an existing quiz run without duplicating its primary key', async () => {
          await saveQuizState(newQuiz());
          const next = quizProgress();
          await saveQuizState(next);
          assert.deepEqual(await readStored('quizStates', next.id), next);
          assert.equal((await listQuizStates(next.quizId)).length, 1);
        });

        it('should clone answers instead of persisting subsequent caller mutations', async () => {
          const original = quizProgress();
          await saveQuizState(original);
          original.answers['question-2'] = { status: 'draft', answer: { type: 'answer-with-number', value: '12' } };
          const first = original.answers['question-1'];
          if (first.status === 'submitted' && first.answer.type === 'select-multiple-answers') {
            first.answer.value.push('unexpected');
          }
          assert.deepEqual(await getQuizState(original.id), quizProgress());
        });

        it('should reject invalid earned weights before transaction persistence', async () => {
          const invalid = quizProgress({
            answers: {
              q: {
                status: 'submitted',
                answer: { type: 'answer-with-text', value: 'x' },
                result: { status: 'correct', earnedWeight: -1 },
              },
            },
          });
          await assert.rejects(saveQuizState(invalid));
          assert.equal(await readStored('quizStates', invalid.id), undefined);
        });

        it('should preserve existing saved values if a replacement fails validation', async () => {
          const original = newQuiz();
          await saveQuizState(original);
          await assert.rejects(saveQuizState({ ...quizProgress(), quizId: '' }));
          assert.deepEqual(await readStored('quizStates', original.id), original);
        });
      });
    });

    describe('updateQuizState', () => {
      describe('Integration', () => {
        it('should update a nested question and preserve the other answers', async () => {
          const original = quizProgress();
          await saveQuizState(original);
          const updated = await updateQuizState(original.id, current => {
            if (current.status !== 'in-progress') throw new Error('Unexpected status');
            return {
              ...current,
              answers: {
                ...current.answers,
                'question-2': { status: 'draft', answer: { type: 'answer-with-number', value: '3.5' } },
              },
            } satisfies QuizProgress;
          });
          assert.deepEqual(await readStored('quizStates', original.id), updated);
          assert.deepEqual((updated as QuizProgress).answers['question-1'], original.answers['question-1']);
        });

        it('should return undefined and skip the callback for a missing quiz run', async () => {
          let invoked = false;
          assert.equal(
            await updateQuizState('missing', current => {
              invoked = true;
              return current;
            }),
            undefined,
          );
          assert.equal(invoked, false);
        });

        it('should roll back a thrown updater and preserve the original answers', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          await assert.rejects(
            updateQuizState(initial.id, () => {
              throw new Error('rollback quiz');
            }),
            /rollback quiz/,
          );
          assert.deepEqual(await getQuizState(initial.id), initial);
        });

        it('should reject ID changes and avoid creating the new key', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          await assert.rejects(
            updateQuizState(initial.id, current => ({ ...current, id: 'other' })),
            /cannot change its ID/,
          );
          assert.deepEqual(await readStored('quizStates', initial.id), initial);
          assert.equal(await readStored('quizStates', 'other'), undefined);
        });

        it('should reject invalid updated answers and retain the committed record', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          await assert.rejects(updateQuizState(initial.id, current => ({ ...current, quizId: '' })));
          assert.deepEqual(await readStored('quizStates', initial.id), initial);
        });
      });
    });

    describe('completeQuiz', () => {
      describe('Integration', () => {
        it('should commit an in-progress quiz result and preserve all question data', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          const result = { status: 'graded' as const, success: true, value: 80 };
          const completed = await completeQuiz(initial.id, result);
          assert.equal(completed?.status, 'finished');
          if (completed?.status !== 'finished') throw new Error('Quiz was not finished');
          assert.deepEqual(completed.result, result);
          assert.equal(completed.startedAt, initial.startedAt);
          assert.deepEqual(completed.answers, initial.answers);
          assert.ok(Number.isFinite(Date.parse(completed.completedAt)));
          assert.deepEqual(await readStored('quizStates', initial.id), completed);
        });

        it('should support ungraded results in the real persisted schema', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          const finished = await completeQuiz(initial.id, { status: 'ungraded' });
          assert.equal(finished?.status, 'finished');
          assert.deepEqual(await getQuizState(initial.id), finished);
        });

        it('should reject completion of a new quiz without mutating its status', async () => {
          const initial = newQuiz();
          await saveQuizState(initial);
          await assert.rejects(completeQuiz(initial.id, { status: 'ungraded' }), /Only an in-progress/);
          assert.deepEqual(await readStored('quizStates', initial.id), initial);
        });

        it('should reject completion of an already finished quiz and preserve its result', async () => {
          const initial: QuizState = {
            ...quizProgress(),
            status: 'finished',
            completedAt: startedAt,
            result: { status: 'ungraded' },
          };
          await saveQuizState(initial);
          await assert.rejects(
            completeQuiz(initial.id, { status: 'graded', success: true, value: 50 }),
            /Only an in-progress/,
          );
          assert.deepEqual(await readStored('quizStates', initial.id), initial);
        });

        it('should abort invalid completed results rather than partially finishing the run', async () => {
          const initial = quizProgress();
          await saveQuizState(initial);
          await assert.rejects(completeQuiz(initial.id, { status: 'graded', success: true, value: Number.NaN }));
          assert.deepEqual(await readStored('quizStates', initial.id), initial);
        });

        it('should return undefined for a missing quiz run', async () => {
          assert.equal(await completeQuiz('missing', { status: 'ungraded' }), undefined);
        });
      });
    });
  });
});
