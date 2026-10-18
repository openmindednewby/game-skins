import { applySkinUi } from './applySkinUi';

describe('applySkinUi', () => {
  it('with two tokens, sets both custom properties on the root', () => {
    const setProperty = jest.fn();

    applySkinUi({ style: { setProperty } }, { '--a': 'red', '--b': '1px' });

    expect(setProperty.mock.calls).toEqual([['--a', 'red'], ['--b', '1px']]);
  });
});
