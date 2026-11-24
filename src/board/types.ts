import type { BoardProjection } from './boardProjection';
import type { FilterKind } from './filterKind';
import type { PacketShape } from './packetShape';
import type { Waveform } from './waveform';

/** The key lists one game declares; every skin of that game binds each key. */
export interface BoardSkinKeys {
  readonly id: string;
  readonly palette: string;
  readonly cue: string;
  readonly motion: string;
  readonly failure: string;
  readonly treatment: string;
}

export interface FontSpec {
  readonly family: string;
  readonly weights: readonly number[];
  readonly tabular: boolean;
}

export interface TypeStep {
  readonly mobile: number;
  readonly desktop: number;
  readonly trackingEm: number;
  readonly caps: boolean;
}

export interface TypeScale {
  readonly display: TypeStep;
  readonly title: TypeStep;
  readonly body: TypeStep;
  readonly label: TypeStep;
  readonly metric: TypeStep;
}

export interface BoardTypeSpec {
  readonly display: FontSpec;
  readonly body: FontSpec;
  readonly metric: FontSpec;
  readonly sizes: TypeScale;
  readonly minSize: number;
}

export interface ChromeSpec {
  readonly radiusPanel: number;
  readonly radiusChip: number;
  readonly radiusButton: number;
  readonly border: number;
  readonly focusRing: number;
  readonly focusOffset: number;
}

export interface BoardGridSpec {
  readonly spacing: number;
  readonly markSize: number;
  readonly alpha: number;
}

export interface BoardLightSpec {
  readonly dirX: number;
  readonly dirY: number;
  readonly colour: string;
  readonly intensity: number;
}

export interface BoardNodeSpec {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly radius: number;
}

export interface BoardShadowSpec {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly blur: number;
  readonly colour: string;
  readonly alpha: number;
}

export interface BoardWireSpec {
  readonly width: number;
  readonly activeWidth: number;
  readonly cornerRadius: number;
  readonly raise: number;
  readonly edgeWidth: number;
}

export interface BoardPacketSpec {
  readonly shape: PacketShape;
  readonly width: number;
  readonly height: number;
  readonly trail: number;
  readonly glowBlur: number;
  readonly glowAlpha: number;
  readonly additive: boolean;
}

export interface BoardBloomSpec {
  readonly threshold: number;
  readonly strength: number;
}

export interface BoardDropMarkSpec {
  readonly shape: string;
  readonly size: number;
  readonly fadeMs: number;
}

export interface BoardSamplingSpec {
  readonly unitsPerPacket: number;
  readonly maxPerLink: number;
  readonly maxOnBoard: number;
  readonly lowTierMaxOnBoard: number;
}

export interface BoardRender {
  readonly projection: BoardProjection;
  readonly grid: BoardGridSpec;
  readonly keyLight: BoardLightSpec | undefined;
  readonly node: BoardNodeSpec;
  readonly nodeShadow: BoardShadowSpec | undefined;
  readonly wire: BoardWireSpec;
  readonly packet: BoardPacketSpec;
  readonly bloom: BoardBloomSpec;
  readonly dropMark: BoardDropMarkSpec;
  readonly zoomMin: number;
  readonly zoomMax: number;
  readonly sampling: BoardSamplingSpec;
}

/** One band of the load ramp: from `from` upward, its colour (optionally blending to `blendTo`) and node treatment. */
export interface HeatStop<K extends BoardSkinKeys> {
  readonly from: number;
  readonly colour: K['palette'];
  readonly blendTo: K['palette'] | undefined;
  readonly treatment: K['treatment'];
}

export interface FailureFx<K extends BoardSkinKeys> {
  readonly id: K['failure'];
  readonly durationMs: number;
  readonly recoveryMs: number;
  readonly particles: number;
  readonly particleLifeMs: number;
  readonly params: Readonly<Record<string, number>>;
}

export interface ToneFilter {
  readonly kind: FilterKind;
  readonly hz: number;
}

export interface ToneLayer {
  readonly wave: Waveform;
  readonly f0Hz: number;
  readonly f1Hz: number;
  readonly delayMs: number;
  readonly attackMs: number;
  readonly decayMs: number;
  readonly gainDb: number;
  readonly filter: ToneFilter | undefined;
}

export interface ToneSpec {
  readonly layers: readonly ToneLayer[];
  readonly pitchJitter: number;
}

export interface Ramp {
  readonly from: number;
  readonly to: number;
}

export interface HumSpec {
  readonly partialsHz: readonly number[];
  readonly partialGainsDb: readonly number[];
  readonly filterHz: Ramp;
  readonly gainDb: Ramp;
  readonly pitchSemitones: Ramp;
  readonly fadeInMs: number;
  readonly fadeOutMs: number;
}

/** A 2D board game's whole look as data: palette, type, chrome, board render, heat, failure, motion, tones and hum. */
export interface BoardSkin<K extends BoardSkinKeys> {
  readonly id: K['id'];
  readonly contractVersion: number;
  readonly nameKey: string;
  readonly palette: Readonly<Record<K['palette'], string>>;
  readonly type: BoardTypeSpec;
  readonly chrome: ChromeSpec;
  readonly board: BoardRender;
  readonly heat: readonly HeatStop<K>[];
  readonly failure: FailureFx<K>;
  readonly motion: Readonly<Record<K['motion'], number>>;
  readonly sfx: Readonly<Record<K['cue'], ToneSpec>>;
  readonly hum: HumSpec;
}
