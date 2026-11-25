import type { StateStore } from '../databaseConfig/databaseConfig.utils';
import { openDatabase } from '../openDatabase/openDatabase.utils';

export async function updateState<T extends { id: string }>(
  storeName: StateStore,
  id: string,
  parse: (value: unknown) => T,
  change: (current: T) => T,
): Promise<T | undefined> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    let updated: T | undefined;
    let failure: unknown;

    request.onsuccess = () => {
      if (request.result === undefined) return;
      try {
        const next = parse(change(parse(request.result)));
        if (next.id !== id) throw new Error('A state update cannot change its ID');
        store.put(next);
        updated = next;
      } catch (error) {
        failure = error;
        transaction.abort();
      }
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(updated);
    };
    transaction.onabort = () => {
      database.close();
      reject(failure ?? transaction.error ?? request.error ?? new Error('IndexedDB transaction was aborted'));
    };
    transaction.onerror = () => {
      database.close();
      reject(failure ?? transaction.error ?? request.error ?? new Error('IndexedDB transaction failed'));
    };
  });
}
