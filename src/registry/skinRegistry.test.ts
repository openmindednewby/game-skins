import { createSkinRegistry } from './skinRegistry';
import { toyBoardSkin } from '../testing/toyBoardSkin';

describe('createSkinRegistry', () => {
  it('with two skins given up front, lists both in order', () => {
    const registry = createSkinRegistry([toyBoardSkin('plain'), toyBoardSkin('bold')]);

    const ids = registry.list().map((skin) => skin.id);

    expect(ids).toEqual(['plain', 'bold']);
  });

  it('with a skin registered later, gets it by id', () => {
    const registry = createSkinRegistry<ReturnType<typeof toyBoardSkin>>();
    registry.register(toyBoardSkin('bold'));

    const skin = registry.get('bold');

    expect(skin?.nameKey).toBe('skins.bold');
  });

  it('with an unknown id, gets undefined', () => {
    const registry = createSkinRegistry([toyBoardSkin('plain')]);

    const skin = registry.get('neon');

    expect(skin).toBeUndefined();
  });

  it('with a repeated id, throws', () => {
    const registry = createSkinRegistry([toyBoardSkin('plain')]);

    const act = (): void => registry.register(toyBoardSkin('plain'));

    expect(act).toThrow('"plain" is already registered');
  });
});
