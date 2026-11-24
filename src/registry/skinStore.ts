import type { SkinEntry, SkinRegistry } from './skinRegistry';
import type { SkinStorage } from './skinStorage';

export interface SkinStoreOptions<S extends SkinEntry> {
  readonly registry: SkinRegistry<S>;
  readonly storage: SkinStorage;
  readonly storageKey: string;
  readonly defaultId: string;
}

export interface SkinStore<S extends SkinEntry> {
  readonly active: () => S;
  readonly select: (id: string) => Promise<void>;
  readonly hydrate: () => Promise<S>;
  readonly subscribe: (listener: () => void) => () => void;
}

const parseSaved = (raw: string | null): SkinEntry | undefined => {
  if (raw === null) {
    return undefined;
  }
  try {
    const value = JSON.parse(raw) as Partial<SkinEntry> | null;
    return typeof value?.id === 'string' && typeof value.contractVersion === 'number' ? { id: value.id, contractVersion: value.contractVersion } : undefined;
  } catch {
    return undefined;
  }
};

const readSaved = async (storage: SkinStorage, key: string): Promise<SkinEntry | undefined> => {
  try {
    return parseSaved(await storage.getItem(key));
  } catch {
    return undefined;
  }
};

const requireSkin = <S extends SkinEntry>(registry: SkinRegistry<S>, id: string): S => {
  const skin = registry.get(id);
  if (skin === undefined) {
    throw new Error(`No skin with id "${id}" is registered`);
  }
  return skin;
};

/** The active skin with a persisted choice; a saved id that is unknown or from another contract version falls back to the default. */
export const createSkinStore = <S extends SkinEntry>(options: SkinStoreOptions<S>): SkinStore<S> => {
  const { registry, storage, storageKey } = options;
  const fallback = requireSkin(registry, options.defaultId);
  const listeners = new Set<() => void>();
  let current = fallback;

  const show = (skin: S): void => {
    if (skin !== current) {
      current = skin;
      listeners.forEach((listener) => listener());
    }
  };

  const restore = (saved: SkinEntry | undefined): S => {
    const skin = saved === undefined ? undefined : registry.get(saved.id);
    return skin !== undefined && skin.contractVersion === saved?.contractVersion ? skin : fallback;
  };

  return {
    active: (): S => current,
    select: async (id: string): Promise<void> => {
      const skin = requireSkin(registry, id);
      show(skin);
      await storage.setItem(storageKey, JSON.stringify({ id: skin.id, contractVersion: skin.contractVersion }));
    },
    hydrate: async (): Promise<S> => {
      show(restore(await readSaved(storage, storageKey)));
      return current;
    },
    subscribe: (listener: () => void): (() => void) => {
      listeners.add(listener);
      return (): void => {
        listeners.delete(listener);
      };
    },
  };
};
