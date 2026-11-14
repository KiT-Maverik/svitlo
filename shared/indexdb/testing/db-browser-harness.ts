import {
  type LessonState,
  type QuizState,
  createLessonState,
  deleteLessonState,
  getLessonState,
  listLessonStates,
  saveLessonState,
  updateLessonState,
  completeQuiz,
  createQuizState,
  deleteQuizState,
  getQuizState,
  listQuizStates,
  saveQuizState,
  updateQuizState,
  openDatabase,
} from '@svitlo/indexdb';
import type { ControllerCommand, DatabaseInspection } from './db-browser-commands';

declare global {
  interface Window {
    __svitloDbE2E?: (command: ControllerCommand) => Promise<unknown>;
  }
}

let heldConnection: IDBDatabase | undefined;

async function inspectDatabase(): Promise<DatabaseInspection> {
  const db = await openDatabase();
  try {
    const storeNames = Array.from(db.objectStoreNames);
    const tx = db.transaction(storeNames, 'readonly');
    return {
      name: db.name,
      version: db.version,
      stores: storeNames.map(name => {
        const store = tx.objectStore(name);
        return {
          name,
          keyPath: store.keyPath === null ? null : String(store.keyPath),
          indexes: Array.from(store.indexNames, indexName => {
            const index = store.index(indexName);
            return {
              name: index.name,
              keyPath: index.keyPath === null ? null : String(index.keyPath),
              unique: index.unique,
            };
          }),
        };
      }),
    };
  } finally {
    db.close();
  }
}

/** Executes real exported production controllers; patching only supplies serializable update callbacks. */
async function dispatch(command: ControllerCommand): Promise<unknown> {
  switch (command.op) {
    case 'createLessonState':
      return createLessonState(command.lessonId);
    case 'getLessonState':
      return getLessonState(command.id);
    case 'listLessonStates':
      return listLessonStates(command.lessonId);
    case 'saveLessonState':
      return saveLessonState(command.state);
    case 'deleteLessonState':
      return deleteLessonState(command.id);
    case 'updateLessonState':
      return updateLessonState(command.id, current => ({ ...current, ...command.patch }) as LessonState);
    case 'createQuizState':
      return createQuizState(command.quizId);
    case 'getQuizState':
      return getQuizState(command.id);
    case 'listQuizStates':
      return listQuizStates(command.quizId);
    case 'saveQuizState':
      return saveQuizState(command.state);
    case 'deleteQuizState':
      return deleteQuizState(command.id);
    case 'updateQuizState':
      return updateQuizState(command.id, current => ({ ...current, ...command.patch }) as QuizState);
    case 'completeQuiz':
      return completeQuiz(command.id, command.result);
    case 'inspectDatabase':
      return inspectDatabase();
    case 'holdConnection':
      heldConnection?.close();
      heldConnection = await openDatabase();
      return heldConnection.version;
    case 'releaseConnection':
      heldConnection?.close();
      heldConnection = undefined;
      return undefined;
  }
}

// Native browser suite executes real package exports, without mounting a test-only React app.
window.__svitloDbE2E = dispatch;
