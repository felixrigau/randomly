export const localStorageMock = (function (): Storage {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },

    removeItem(key: string): void {
      delete store[key];
    },

    key(index: number): string | null {
      if (index >= Object.keys(store).length) return null;

      return Object.keys(store)[index];
    },

    length: 0,
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
