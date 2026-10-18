import { pickSkin } from './pickSkin';

describe('pickSkin', () => {
  it('with no loader, returns the built skin', async () => {
    const picked = await pickSkin('built', undefined);

    expect(picked).toBe('built');
  });

  it('with a loader, returns the loaded skin', async () => {
    const picked = await pickSkin('built', async () => ({ skin: 'preview' }));

    expect(picked).toBe('preview');
  });

  it('with a failing loader, falls back to the built skin', async () => {
    const picked = await pickSkin('built', () => Promise.reject(new Error('404')));

    expect(picked).toBe('built');
  });
});
