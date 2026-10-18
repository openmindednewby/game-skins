import { activeSkin, setActiveSkin } from './active';
import { toySkin } from '../testing/toySkin';

describe('activeSkin', () => {
  it('with no skin set, throws naming setActiveSkin', () => {
    jest.isolateModules(() => {
      const fresh = require('./active') as typeof import('./active');

      const read = (): unknown => fresh.activeSkin();

      expect(read).toThrow('setActiveSkin');
    });
  });

  it('after setActiveSkin, returns that skin', () => {
    const skin = toySkin();
    setActiveSkin(skin);

    const current = activeSkin();

    expect(current).toBe(skin);
  });
});
