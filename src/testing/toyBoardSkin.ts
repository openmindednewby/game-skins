import { BoardProjection } from '../board/boardProjection';
import { PacketShape } from '../board/packetShape';
import { Waveform } from '../board/waveform';
import type { BoardSkin, BoardSkinKeys, ToneSpec, TypeStep } from '../board/types';

export interface ToyKeys extends BoardSkinKeys {
  readonly id: 'plain' | 'bold';
  readonly palette: 'ground' | 'ok' | 'hot' | 'fail';
  readonly cue: 'place' | 'fail';
  readonly motion: 'snapMs';
  readonly failure: 'flash';
  readonly treatment: 'still' | 'shake';
}

const step: TypeStep = { mobile: 14, desktop: 16, trackingEm: 0, caps: false };
const font = { family: 'Toy Sans', weights: [400], tabular: false };
const tone: ToneSpec = { layers: [{ wave: Waveform.Sine, f0Hz: 440, f1Hz: 440, delayMs: 0, attackMs: 2, decayMs: 60, gainDb: -18, filter: undefined }], pitchJitter: 0.03 };

/** A minimal two-key board skin for tests; `id` and `contractVersion` vary per case. */
export const toyBoardSkin = (id: ToyKeys['id'], contractVersion = 1): BoardSkin<ToyKeys> => ({
  id,
  contractVersion,
  nameKey: `skins.${id}`,
  palette: { ground: '#000000', ok: '#00ff00', hot: '#ffaa00', fail: '#ff0000' },
  type: { display: font, body: font, metric: font, sizes: { display: step, title: step, body: step, label: step, metric: step }, minSize: 12 },
  chrome: { radiusPanel: 6, radiusChip: 4, radiusButton: 6, border: 1, focusRing: 2, focusOffset: 2 },
  board: {
    projection: BoardProjection.TopDown,
    grid: { spacing: 24, markSize: 1, alpha: 1 },
    keyLight: undefined,
    node: { width: 56, height: 56, depth: 0, radius: 10 },
    nodeShadow: undefined,
    wire: { width: 2, activeWidth: 2.5, cornerRadius: 8, raise: 0, edgeWidth: 0 },
    packet: { shape: PacketShape.Circle, width: 6, height: 6, trail: 10, glowBlur: 6, glowAlpha: 0.55, additive: true },
    bloom: { threshold: 0.8, strength: 0.6 },
    dropMark: { shape: 'x', size: 6, fadeMs: 400 },
    zoomMin: 0.5,
    zoomMax: 2,
    sampling: { unitsPerPacket: 20, maxPerLink: 24, maxOnBoard: 300, lowTierMaxOnBoard: 120 },
  },
  heat: [
    { from: 0, colour: 'ok', blendTo: undefined, treatment: 'still' },
    { from: 0.7, colour: 'ok', blendTo: 'hot', treatment: 'still' },
    { from: 1, colour: 'hot', blendTo: undefined, treatment: 'shake' },
  ],
  failure: { id: 'flash', durationMs: 220, recoveryMs: 300, particles: 12, particleLifeMs: 300, params: { ring: 1.6 } },
  motion: { snapMs: 80 },
  sfx: { place: tone, fail: tone },
  hum: { partialsHz: [55, 110], partialGainsDb: [0, -6], filterHz: { from: 300, to: 900 }, gainDb: { from: -40, to: -26 }, pitchSemitones: { from: 0, to: 3 }, fadeInMs: 300, fadeOutMs: 400 },
});
