import { GAME_SKINS, gameSkin } from './palettes';
import { GameSkinId } from './gameSkinId';

describe('GAME_SKINS', () => {
  it('lists exactly the four approved skins in order', () => {
    const ids = GAME_SKINS.map((s) => s.id);

    expect(ids).toEqual(['night-circuit', 'dusk-highway', 'ember-line', 'deep-current']);
  });

  it('gives every skin a distinct sky, ground and accent', () => {
    const keys = new Set(GAME_SKINS.map((s) => `${s.skyTop}-${s.ground}-${s.accent}`));

    expect(keys.size).toBe(GAME_SKINS.length);
  });
});

describe('gameSkin', () => {
  it('with a known id, returns that palette', () => {
    const skin = gameSkin(GameSkinId.EmberLine);

    expect(skin?.name).toBe('Ember line');
  });

  it('with an unknown id, returns undefined', () => {
    const skin = gameSkin('toybox');

    expect(skin).toBeUndefined();
  });
});
