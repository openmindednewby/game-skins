import { useSyncExternalStore } from 'react';
import { useActiveSkin } from './useActiveSkin';
import { createSkinRegistry } from '../registry/skinRegistry';
import { memorySkinStorage } from '../registry/skinStorage';
import { createSkinStore } from '../registry/skinStore';
import { toyBoardSkin } from '../testing/toyBoardSkin';

jest.mock('react', () => ({ useSyncExternalStore: jest.fn((_subscribe: unknown, getSnapshot: () => unknown) => getSnapshot()) }));

describe('useActiveSkin', () => {
  it('with a store, subscribes through it and returns its active skin for client and server', async () => {
    const store = createSkinStore({ registry: createSkinRegistry([toyBoardSkin('plain'), toyBoardSkin('bold')]), storage: memorySkinStorage(), storageKey: 'k', defaultId: 'plain' });
    await store.select('bold');

    const skin = useActiveSkin(store);

    expect(skin.id).toBe('bold');
    expect(useSyncExternalStore).toHaveBeenCalledWith(store.subscribe, store.active, store.active);
  });
});
