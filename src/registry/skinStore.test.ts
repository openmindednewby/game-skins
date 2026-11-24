import { createSkinRegistry } from './skinRegistry';
import { memorySkinStorage } from './skinStorage';
import type { SkinStorage } from './skinStorage';
import { createSkinStore } from './skinStore';
import { toyBoardSkin } from '../testing/toyBoardSkin';

const KEY = 'game.skin';
const registry = createSkinRegistry([toyBoardSkin('plain'), toyBoardSkin('bold')]);
const storeOn = (storage: SkinStorage): ReturnType<typeof createSkinStore<ReturnType<typeof toyBoardSkin>>> =>
  createSkinStore({ registry, storage, storageKey: KEY, defaultId: 'plain' });

describe('createSkinStore', () => {
  it('with nothing selected, is on the default skin', () => {
    const store = storeOn(memorySkinStorage());

    const skin = store.active();

    expect(skin.id).toBe('plain');
  });

  it('with an unknown default id, throws', () => {
    const act = (): unknown => createSkinStore({ registry, storage: memorySkinStorage(), storageKey: KEY, defaultId: 'neon' });

    expect(act).toThrow('No skin with id "neon"');
  });

  it('with a skin selected, persists its id and contract version', async () => {
    const storage = memorySkinStorage();
    const store = storeOn(storage);

    await store.select('bold');

    expect(storage.getItem(KEY)).toBe('{"id":"bold","contractVersion":1}');
  });

  it('with an unknown id selected, rejects and keeps the current skin', async () => {
    const store = storeOn(memorySkinStorage());

    const act = store.select('neon');

    await expect(act).rejects.toThrow('No skin with id "neon"');
    expect(store.active().id).toBe('plain');
  });

  it('with a saved choice, hydrates to that skin on the next launch', async () => {
    const storage = memorySkinStorage();
    await storeOn(storage).select('bold');

    const skin = await storeOn(storage).hydrate();

    expect(skin.id).toBe('bold');
  });

  it('with nothing saved, hydrates to the default', async () => {
    const store = storeOn(memorySkinStorage());

    const skin = await store.hydrate();

    expect(skin.id).toBe('plain');
  });

  it('with a saved choice from another contract version, hydrates to the default', async () => {
    const storage = memorySkinStorage();
    storage.setItem(KEY, '{"id":"bold","contractVersion":0}');

    const skin = await storeOn(storage).hydrate();

    expect(skin.id).toBe('plain');
  });

  it.each([
    ['an unknown id', '{"id":"neon","contractVersion":1}'],
    ['broken JSON', '{not json'],
    ['a JSON null', 'null'],
    ['a missing version', '{"id":"bold"}'],
  ])('with %s saved, hydrates to the default', async (_case, raw) => {
    const storage = memorySkinStorage();
    storage.setItem(KEY, raw);

    const skin = await storeOn(storage).hydrate();

    expect(skin.id).toBe('plain');
  });

  it('with an async storage that rejects on read, hydrates to the default', async () => {
    const storage: SkinStorage = { getItem: () => Promise.reject(new Error('locked')), setItem: () => Promise.resolve() };

    const skin = await storeOn(storage).hydrate();

    expect(skin.id).toBe('plain');
  });

  it('with a listener, calls it once per real switch and not after unsubscribe', async () => {
    const store = storeOn(memorySkinStorage());
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    await store.select('bold');
    await store.select('bold');
    unsubscribe();

    await store.select('plain');

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
