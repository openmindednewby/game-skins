/** One shared load per asset path; `dispose` hands every loaded value to `free` and forgets them all. */
export interface AssetCache<T> {
  get(path: string): Promise<T>;
  dispose(free: (value: T) => void): Promise<void>;
}

/** Creates an asset cache over `load`; a failed load is forgotten so the next `get` retries. */
export const createAssetCache = <T>(load: (path: string) => Promise<T>): AssetCache<T> => {
  const byPath = new Map<string, Promise<T>>();
  return {
    get(path: string): Promise<T> {
      const known = byPath.get(path);
      if (known !== undefined) {
        return known;
      }
      const next = load(path);
      byPath.set(path, next);
      next.catch(() => byPath.delete(path));
      return next;
    },
    async dispose(free: (value: T) => void): Promise<void> {
      const all = [...byPath.values()];
      byPath.clear();
      for (const value of await Promise.allSettled(all)) {
        if (value.status === 'fulfilled') {
          free(value.value);
        }
      }
    },
  };
};
