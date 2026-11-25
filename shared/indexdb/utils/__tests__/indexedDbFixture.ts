/**
 * Minimal, explicitly controlled IndexedDB test double.
 * Events are dispatched by each test; no browser, database, or timers are used.
 */
export function createRequest<T>(initial: T) {
  const state: {
    result: T;
    error: DOMException | null;
    onsuccess: IDBRequest<T>['onsuccess'];
    onerror: IDBRequest<T>['onerror'];
  } = { result: initial, error: null, onsuccess: null, onerror: null };
  const request = state as unknown as IDBRequest<T>;

  return {
    request,
    succeed(value: T) {
      state.result = value;
      state.onsuccess?.call(request, new Event('success'));
    },
    fail(error: DOMException) {
      state.error = error;
      state.onerror?.call(request, new Event('error'));
    },
  };
}

export function installIndexedDbFixture(existingStores: readonly string[] = []) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'indexedDB');
  const stores = new Set(existingStores);
  const openCalls: Array<{ name: string; version: number | undefined }> = [];
  const createdStores: Array<{ name: string; keyPath: string | string[] | null | undefined }> = [];
  const createdIndexes: Array<{ store: string; name: string; keyPath: string | string[] }> = [];
  const transactions: Array<{ name: string | string[]; mode: IDBTransactionMode | undefined }> = [];
  const selectedStores: string[] = [];
  const reads: IDBValidKey[] = [];
  const writes: unknown[] = [];
  let closeCount = 0;
  let abortCount = 0;
  let transactionFailure: Error | undefined;
  let putFailure: Error | undefined;

  const readRequest = createRequest<unknown>(undefined);
  const writeRequest = createRequest<IDBValidKey>('saved');
  const store = {
    get(key: IDBValidKey) {
      reads.push(key);
      return readRequest.request;
    },
    put(value: unknown) {
      if (putFailure) throw putFailure;
      writes.push(value);
      return writeRequest.request;
    },
  } as unknown as IDBObjectStore;

  const transactionState: {
    error: DOMException | null;
    oncomplete: IDBTransaction['oncomplete'];
    onabort: IDBTransaction['onabort'];
    onerror: IDBTransaction['onerror'];
    abort: () => void;
    objectStore: (name: string) => IDBObjectStore;
  } = {
    error: null,
    oncomplete: null,
    onabort: null,
    onerror: null,
    abort: () => {
      abortCount += 1;
    },
    objectStore: name => {
      selectedStores.push(name);
      return store;
    },
  };
  const transaction = transactionState as unknown as IDBTransaction;

  const databaseState: {
    objectStoreNames: { contains: (name: string) => boolean };
    createObjectStore: (name: string, options?: IDBObjectStoreParameters) => IDBObjectStore;
    transaction: (name: string | string[], mode?: IDBTransactionMode) => IDBTransaction;
    close: () => void;
    onversionchange: IDBDatabase['onversionchange'];
  } = {
    objectStoreNames: { contains: name => stores.has(name) },
    createObjectStore(name, options) {
      createdStores.push({ name, keyPath: options?.keyPath });
      stores.add(name);
      return {
        createIndex(indexName: string, keyPath: string | string[]) {
          createdIndexes.push({ store: name, name: indexName, keyPath });
        },
      } as unknown as IDBObjectStore;
    },
    transaction(name, mode) {
      if (transactionFailure) throw transactionFailure;
      transactions.push({ name, mode });
      return transaction;
    },
    close: () => {
      closeCount += 1;
    },
    onversionchange: null,
  };
  const database = databaseState as unknown as IDBDatabase;
  const openRequest = createRequest<IDBDatabase>(database);
  const upgradeRequest = openRequest.request as IDBOpenDBRequest;
  const factory = {
    open(name: string, version?: number) {
      openCalls.push({ name, version });
      return upgradeRequest;
    },
  } as unknown as IDBFactory;

  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    writable: true,
    value: factory,
  });

  return {
    database,
    store,
    transaction,
    readRequest,
    writeRequest,
    openCalls,
    createdStores,
    createdIndexes,
    transactions,
    selectedStores,
    reads,
    writes,
    get closeCount() {
      return closeCount;
    },
    get abortCount() {
      return abortCount;
    },
    succeedOpen: () => openRequest.succeed(database),
    failOpen: (error: DOMException) => openRequest.fail(error),
    upgrade: () =>
      upgradeRequest.onupgradeneeded?.call(upgradeRequest, new Event('upgradeneeded') as IDBVersionChangeEvent),
    versionChange: () =>
      databaseState.onversionchange?.call(database, new Event('versionchange') as IDBVersionChangeEvent),
    complete: () => transactionState.oncomplete?.call(transaction, new Event('complete')),
    abort: (error: DOMException | null = null) => {
      transactionState.error = error;
      transactionState.onabort?.call(transaction, new Event('abort'));
    },
    error: (error: DOMException | null = null) => {
      transactionState.error = error;
      transactionState.onerror?.call(transaction, new Event('error'));
    },
    throwOnTransaction: (error: Error) => {
      transactionFailure = error;
    },
    throwOnPut: (error: Error) => {
      putFailure = error;
    },
    restore: () => {
      if (previous) Object.defineProperty(globalThis, 'indexedDB', previous);
      else Reflect.deleteProperty(globalThis, 'indexedDB');
    },
  };
}
