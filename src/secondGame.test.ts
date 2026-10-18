import { EnvironmentRole, GameSkinId, MaterialBlending, MaterialKind, MaterialSide, ToneMapping, activeSkin, gameSkin, roleColour, setActiveSkin } from './index';
import type { SkinBinding } from './index';
import { toySkin } from './testing/toySkin';

type PuzzleRole = 'tile' | 'cursor';

describe('a second game', () => {
  it('with its own roles bound to a shared palette and no Surge import, reads the palette colour', () => {
    const deep = gameSkin(GameSkinId.DeepCurrent);
    if (deep === undefined) throw new Error('missing');
    const skin: SkinBinding<PuzzleRole> = {
      ...toySkin(),
      id: deep.id,
      roles: { tile: { material: { kind: MaterialKind.Lambert, color: deep.ground } }, cursor: { material: { kind: MaterialKind.Unlit, color: deep.accent } } },
    };
    setActiveSkin(skin);

    const cursor = roleColour(activeSkin<PuzzleRole, string>(), 'cursor');

    expect(cursor).toBe(deep.accent);
  });

  it('with the exported enums, keeps the string values saved skins depend on', () => {
    const values = [MaterialKind.Shader, ToneMapping.Agx, MaterialBlending.Additive, MaterialSide.Double, EnvironmentRole.Sky];

    expect(values).toEqual(['shader', 'agx', 'additive', 'double', 'sky']);
  });
});
