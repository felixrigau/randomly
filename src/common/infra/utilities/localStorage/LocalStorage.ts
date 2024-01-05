export class LocalStorage<U> {
  constructor(private key: string, private initialDB: U) {}

  getLocalStorageData = (): U => {
    const db = localStorage.getItem(this.key);

    if (db) {
      return JSON.parse(db);
    } else {
      localStorage.setItem(this.key, JSON.stringify(this.initialDB));

      return this.initialDB;
    }
  };

  updateLocalStorageData = (newData: Partial<U>) => {
    const db = this.getLocalStorageData();

    localStorage.setItem(this.key, JSON.stringify({ ...db, ...newData }));
  };
}
