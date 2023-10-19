export const getLocalStorageData = <U>(storageKey: string): U => {
  const db = localStorage.getItem(storageKey);

  if (db) {
    return JSON.parse(db);
  } else {
    const initialDB = { items: [] } as U;
    localStorage.setItem(storageKey, JSON.stringify(initialDB));

    return initialDB;
  }
};
