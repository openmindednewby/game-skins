import { GameSkinId } from './gameSkinId';
import type { SkinPalette } from './skinPalette';

const NIGHT_CIRCUIT: SkinPalette = {
  id: GameSkinId.NightCircuit,
  name: 'Night circuit',
  skyTop: 0x030306,
  skyBand: 0x8a1a2c,
  ground: 0x1f2638,
  accent: 0x6ff3ff,
  figure: 0xb9c3dc,
  danger: 0xa8562c,
  reward: 0xffd23f,
  rewardLight: 0xfff1a8,
};

const DUSK_HIGHWAY: SkinPalette = {
  id: GameSkinId.DuskHighway,
  name: 'Dusk highway',
  skyTop: 0x120c1c,
  skyBand: 0xb8643a,
  ground: 0x2e2a3a,
  accent: 0xffc46b,
  figure: 0xc8bfb4,
  danger: 0xb8603a,
  reward: 0xffc46b,
  rewardLight: 0xffe6c0,
};

const EMBER_LINE: SkinPalette = {
  id: GameSkinId.EmberLine,
  name: 'Ember line',
  skyTop: 0x0e0605,
  skyBand: 0xc0563c,
  ground: 0x2b1d1a,
  accent: 0xff8a4c,
  figure: 0xd8c8b8,
  danger: 0x7a2e1c,
  reward: 0xffcf8a,
  rewardLight: 0xfff0d6,
};

const DEEP_CURRENT: SkinPalette = {
  id: GameSkinId.DeepCurrent,
  name: 'Deep current',
  skyTop: 0x02090d,
  skyBand: 0x1f6f7a,
  ground: 0x12303a,
  accent: 0x7dffc0,
  figure: 0x9fd0d6,
  danger: 0xc45a48,
  reward: 0xc9f2ff,
  rewardLight: 0xf1fcff,
};

/** The shared skins, in unlock order. */
export const GAME_SKINS: readonly SkinPalette[] = [NIGHT_CIRCUIT, DUSK_HIGHWAY, EMBER_LINE, DEEP_CURRENT];

/** The shared skin with `id` (a `?skin=` value), or undefined when no shared skin has it. */
export const gameSkin = (id: string): SkinPalette | undefined => GAME_SKINS.find((skin) => skin.id === id);
