import { memorySkinStorage, webSkinStorage } from './skinStorage';

describe('memorySkinStorage', () => {
  it('with a value set, reads it back', () => {
    const storage = memorySkinStorage();
    storage.setItem('skin', 'bold');

    const value = storage.getItem('skin');

    expect(value).toBe('bold');
  });

  it('with nothing set, reads null', () => {
    const storage = memorySkinStorage();

    const value = storage.getItem('skin');

    expect(value).toBeNull();
  });
});

describe('webSkinStorage', () => {
  const holder = globalThis as { localStorage?: unknown };

  afterEach(() => {
    delete holder.localStorage;
  });

  it('with a localStorage present, returns it', () => {
    const local = memorySkinStorage();
    holder.localStorage = local;

    const storage = webSkinStorage();

    expect(storage).toBe(local);
  });

  it('with no localStorage, returns a working in-memory storage', () => {
    const storage = webSkinStorage();
    storage.setItem('skin', 'plain');

    const value = storage.getItem('skin');

    expect(value).toBe('plain');
  });
});
