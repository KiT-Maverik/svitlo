import { createRequire } from 'node:module';
import { mock } from 'node:test';
import type { LessonState, QuizState } from '@svitlo/contracts/content';
import type { StateStore } from '../../utils/databaseConfig/databaseConfig.utils';

// The project compiles node:test suites to CommonJS. Mock the concrete exports
// used by the utils barrel, leaving controller and validation code real.
const nodeRequire = createRequire(__filename);
const requestModule = nodeRequire(
  '../../utils/runStateRequest/runStateRequest.utils',
) as typeof import('../../utils/runStateRequest/runStateRequest.utils');
const updateModule = nodeRequire(
  '../../utils/updateState/updateState.utils',
) as typeof import('../../utils/updateState/updateState.utils');

function makeStore() {
  const request = {} as IDBRequest<unknown>;
  const add = mock.fn((_value: unknown) => request);
  const put = mock.fn((_value: unknown) => request);
  const get = mock.fn((_key: string) => request);
  const remove = mock.fn((_key: string) => request);
  const getAll = mock.fn((_key: string) => request);
  const index = mock.fn((_name: string) => ({ getAll }));
  const store = { add, put, get, delete: remove, index } as unknown as IDBObjectStore;
  return { store, add, put, get, remove, getAll, index };
}

export function stubRunStateRequest(result: unknown = undefined, rejection?: Error) {
  const fake = makeStore();
  const calls: Array<{ storeName: StateStore; mode: IDBTransactionMode }> = [];
  const spy = mock.method(
    requestModule,
    'runStateRequest',
    async <T>(
      storeName: StateStore,
      mode: IDBTransactionMode,
      makeRequest: (store: IDBObjectStore) => IDBRequest<T>,
    ): Promise<T> => {
      calls.push({ storeName, mode });
      makeRequest(fake.store);
      if (rejection) throw rejection;
      return result as T;
    },
  );
  return { ...fake, calls, spy };
}

export function stubUpdateState(result: unknown = undefined, rejection?: Error) {
  const calls: Array<{
    storeName: StateStore;
    id: string;
    parse: (value: unknown) => { id: string };
  }> = [];
  const spy = mock.method(
    updateModule,
    'updateState',
    async <T extends { id: string }>(
      storeName: StateStore,
      id: string,
      parse: (value: unknown) => T,
      change: (current: T) => T,
    ): Promise<T | undefined> => {
      calls.push({ storeName, id, parse });
      if (rejection) throw rejection;
      if (result === undefined) return undefined;
      // Exercise the callbacks supplied by the controller, not the real DB utility.
      return change(parse(result));
    },
  );
  return { calls, spy };
}

export const lessonNew: Extract<LessonState, { status: 'new' }> = {
  id: 'lesson-run-1',
  lessonId: 'lesson-1',
  status: 'new',
};

export const lessonInProgress: Extract<LessonState, { status: 'in-progress' }> = {
  id: 'lesson-run-1',
  lessonId: 'lesson-1',
  status: 'in-progress',
  startedAt: '2026-01-01T10:00:00.000Z',
  currentSectionId: 'theory',
  sectionCompletion: { theory: true, practice: false },
  skippedSectionIds: ['optional'],
  quizStateIds: { quiz: 'quiz-run-1' },
};

export const quizNew: Extract<QuizState, { status: 'new' }> = {
  id: 'quiz-run-1',
  quizId: 'quiz-1',
  status: 'new',
};

export const quizInProgress: Extract<QuizState, { status: 'in-progress' }> = {
  id: 'quiz-run-1',
  quizId: 'quiz-1',
  status: 'in-progress',
  startedAt: '2026-01-01T10:00:00.000Z',
  answers: {
    one: { status: 'draft', answer: { type: 'select-one-answer', value: 'choice-1' } },
    two: { status: 'deferred' },
  },
};
