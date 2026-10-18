import { createAssetCache } from './assetCache';

describe('createAssetCache', () => {
  it('with the same path twice, loads it once', async () => {
    const load = jest.fn(async (path: string) => `v:${path}`);
    const cache = createAssetCache(load);

    const both = await Promise.all([cache.get('a'), cache.get('a')]);

    expect(both).toEqual(['v:a', 'v:a']);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('after a failed load, retries on the next get', async () => {
    const load = jest.fn().mockRejectedValueOnce(new Error('net')).mockResolvedValueOnce('ok');
    const cache = createAssetCache<string>(load);
    await expect(cache.get('a')).rejects.toThrow('net');
    await Promise.resolve();

    const second = await cache.get('a');

    expect(second).toBe('ok');
  });

  it('on dispose, frees every loaded value and forgets it', async () => {
    const load = jest.fn(async (path: string) => path);
    const cache = createAssetCache(load);
    await cache.get('a');
    const freed: string[] = [];

    await cache.dispose((v) => freed.push(v));

    expect(freed).toEqual(['a']);
    await cache.get('a');
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('on dispose with a failed load, frees only the loaded values', async () => {
    const load = jest.fn((path: string) => (path === 'bad' ? Promise.reject(new Error('x')) : Promise.resolve(path)));
    const cache = createAssetCache(load);
    const failed = cache.get('bad').catch(() => undefined);
    await cache.get('good');
    const freed: string[] = [];

    await cache.dispose((v) => freed.push(v));

    await failed;
    expect(freed).toEqual(['good']);
  });
});
