import type { StateStore } from '../databaseConfig/databaseConfig.utils';
import { openDatabase } from '../openDatabase/openDatabase.utils';

/** Wait for the transaction to commit, not just for its individual request to succeed. */
export async function runStateRequest<T>(
  storeName: StateStore,
  mode: IDBTransactionMode,
  makeRequest: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    let transaction: IDBTransaction;
    let request: IDBRequest<T>;
    try {
      transaction = database.transaction(storeName, mode);
      request = makeRequest(transaction.objectStore(storeName));
    } catch (error) {
      database.close();
      reject(error);
      return;
    }

    let result: T;
    request.onsuccess = () => {
      result = request.result;
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? request.error ?? new Error('IndexedDB transaction was aborted'));
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? request.error ?? new Error('IndexedDB transaction failed'));
    };
  });
}
