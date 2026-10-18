import type { UiTokens } from '../contract/types';
import type { SkinPalette } from './skinPalette';

const HEX_RADIX = 16;
const HEX_DIGITS = 6;

/** `colour` as a six-digit CSS hex string. */
export const hexCss = (colour: number): string => `#${colour.toString(HEX_RADIX).padStart(HEX_DIGITS, '0')}`;

/** The palette as `--skin-*` CSS custom properties, ready for `applySkinUi`. */
export const paletteUi = (palette: SkinPalette): UiTokens => ({
  '--skin-sky-top': hexCss(palette.skyTop),
  '--skin-sky-band': hexCss(palette.skyBand),
  '--skin-ground': hexCss(palette.ground),
  '--skin-accent': hexCss(palette.accent),
  '--skin-figure': hexCss(palette.figure),
  '--skin-danger': hexCss(palette.danger),
  '--skin-reward': hexCss(palette.reward),
  '--skin-reward-light': hexCss(palette.rewardLight),
});
