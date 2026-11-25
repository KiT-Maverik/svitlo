import { DATABASE_NAME, DATABASE_VERSION } from '../databaseConfig/databaseConfig.utils';

export function openDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB is unavailable in this environment'));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('lessonStates')) {
        database.createObjectStore('lessonStates', { keyPath: 'id' }).createIndex('lessonId', 'lessonId');
      }
      if (!database.objectStoreNames.contains('quizStates')) {
        database.createObjectStore('quizStates', { keyPath: 'id' }).createIndex('quizId', 'quizId');
      }
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () => reject(request.error);
  });
}
