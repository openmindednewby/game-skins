import { BoardProjection, PacketShape, createSkinRegistry, createSkinStore, heatAt, webSkinStorage } from './index';
import type { BoardSkin } from './index';
import { toyBoardSkin } from './testing/toyBoardSkin';
import type { ToyKeys } from './testing/toyBoardSkin';

describe('story: a board game with two switchable skins', () => {
  it('with the player switching skin, the next launch opens on the switched skin and reads its board params', async () => {
    const iso: BoardSkin<ToyKeys> = { ...toyBoardSkin('bold'), board: { ...toyBoardSkin('bold').board, projection: BoardProjection.Isometric, packet: { ...toyBoardSkin('bold').board.packet, shape: PacketShape.Capsule } } };
    const registry = createSkinRegistry<BoardSkin<ToyKeys>>([toyBoardSkin('plain'), iso]);
    const storage = webSkinStorage();
    await createSkinStore({ registry, storage, storageKey: 'board.skin', defaultId: 'plain' }).select('bold');

    const relaunched = await createSkinStore({ registry, storage, storageKey: 'board.skin', defaultId: 'plain' }).hydrate();

    expect([relaunched.board.projection, relaunched.board.packet.shape, heatAt(relaunched.heat, 1.1).treatment]).toEqual(['isometric', 'capsule', 'shake']);
  });

});
