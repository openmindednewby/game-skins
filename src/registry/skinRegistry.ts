/** The two fields the registry and the store read from any skin. */
export interface SkinEntry {
  readonly id: string;
  readonly contractVersion: number;
}

export interface SkinRegistry<S extends SkinEntry> {
  readonly register: (skin: S) => void;
  readonly list: () => readonly S[];
  readonly get: (id: string) => S | undefined;
}

/** A registry of skins by id; adding a skin is one `register` call, and a repeated id throws. */
export const createSkinRegistry = <S extends SkinEntry>(skins: readonly S[] = []): SkinRegistry<S> => {
  const byId = new Map<string, S>();
  const register = (skin: S): void => {
    if (byId.has(skin.id)) {
      throw new Error(`A skin with id "${skin.id}" is already registered`);
    }
    byId.set(skin.id, skin);
  };
  skins.forEach(register);
  return {
    register,
    list: (): readonly S[] => [...byId.values()],
    get: (id: string): S | undefined => byId.get(id),
  };
};
