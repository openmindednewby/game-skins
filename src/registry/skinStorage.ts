/** The storage the active-skin store persists to; web localStorage and native AsyncStorage both fit as they are. */
export interface SkinStorage {
  readonly getItem: (key: string) => string | null | Promise<string | null>;
  readonly setItem: (key: string, value: string) => void | Promise<void>;
}

/** An in-memory storage, for tests, SSR and platforms with no persistent store. */
export const memorySkinStorage = (): SkinStorage => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string): string | null => values.get(key) ?? null,
    setItem: (key: string, value: string): void => {
      values.set(key, value);
    },
  };
};

/** The browser's localStorage, or an in-memory storage where there is none. */
export const webSkinStorage = (): SkinStorage => {
  const local = (globalThis as { localStorage?: SkinStorage }).localStorage;
  return local ?? memorySkinStorage();
};
