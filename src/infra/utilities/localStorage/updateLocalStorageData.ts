import { getLocalStorageData } from "./getLocalStorageData";

export const updateLocalStorageData = <U>(
  storageKey: string,
  newData: Partial<U>
) => {
  const db: U = getLocalStorageData(storageKey);

  localStorage.setItem(storageKey, JSON.stringify({ ...db, ...newData }));
};
