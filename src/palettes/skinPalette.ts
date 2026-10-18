import type { GameSkinId } from './gameSkinId';

/** A shared skin as colours with no game roles; each game maps its own roles onto these swatches. */
export interface SkinPalette {
  readonly id: GameSkinId;
  readonly name: string;
  readonly skyTop: number;
  readonly skyBand: number;
  readonly ground: number;
  readonly accent: number;
  readonly figure: number;
  readonly danger: number;
  readonly reward: number;
  readonly rewardLight: number;
}
