import type { MaterialBlending } from './materialBlending';
import type { MaterialKind } from './materialKind';
import type { MaterialSide } from './materialSide';
import type { ToneMapping } from './toneMapping';

/** A file shipped by a skin, relative to the skin's asset folder; every one needs a licence row. */
export interface AssetRef { readonly path: string }

/** How one role is painted, with no engine types: the engine adapter turns it into a material. */
export interface MaterialRecipe {
  readonly kind: MaterialKind;
  readonly color?: number;
  readonly map?: AssetRef;
  readonly mapScale?: number;
  readonly normalMap?: AssetRef;
  readonly roughness?: number;
  readonly metalness?: number;
  readonly emissive?: number;
  readonly emissiveIntensity?: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly depthWrite?: boolean;
  readonly depthTest?: boolean;
  readonly side?: MaterialSide;
  readonly blending?: MaterialBlending;
  readonly fog?: boolean;
}

/** The look of one game role; `variants` paints a family the game indexes by number. */
export interface RoleLook {
  readonly material: MaterialRecipe;
  readonly variants?: readonly MaterialRecipe[];
  readonly model?: AssetRef;
  readonly castShadow?: boolean;
}

export interface SkyGradient { readonly top: number; readonly horizon: number; readonly glow: number }
export interface FogSpec { readonly color: number; readonly near: number; readonly far: number }
export interface HemiLightSpec { readonly sky: number; readonly ground: number; readonly intensity: number }
export interface KeyLightSpec { readonly color: number; readonly intensity: number; readonly position: readonly [number, number, number] }

/** Scenery models repeated along both sides of the play space, recycled ahead of the camera. */
export interface PropSpec {
  readonly models: readonly AssetRef[];
  readonly tint: number;
  readonly windowGlow: number;
  readonly glow: number;
  readonly rows: number;
  readonly spacing: number;
  readonly lateral: readonly [number, number];
  readonly footprint: readonly [number, number];
  readonly baseY: number;
}

export interface EnvironmentSpec {
  readonly background: number;
  readonly sky: SkyGradient;
  readonly hdri?: AssetRef;
  readonly hdriGain?: number;
  readonly props?: PropSpec;
  readonly fog: FogSpec;
  readonly hemi: HemiLightSpec;
  readonly key: KeyLightSpec;
  readonly exposure: number;
}

export interface ParallaxLayer { readonly image: AssetRef; readonly depth: number; readonly scrollFactor: number; readonly tint?: number }

export interface PostFxSpec { readonly bloom: number; readonly vignette: number; readonly grain: number; readonly toneMapping: ToneMapping }

/** CSS custom properties the skin sets on the document root. */
export type UiTokens = Readonly<Record<string, string>>;

/** Colours that carry gameplay meaning; a skin may restyle them but must keep them apart without colour. */
export interface SemanticColours { readonly padTiers: readonly number[]; readonly shield: number; readonly hazard: number; readonly jackpot: number; readonly boost: number; readonly spark: number }

export interface AudioSpec<Cue extends string = string> {
  readonly music: Readonly<Record<string, AssetRef>>;
  readonly sfx: Readonly<Record<Cue, AssetRef>>;
}

export interface TierSpec { readonly maxTexture: 512 | 1024 | 2048; readonly shadows: boolean; readonly bloomScale: number; readonly hdri: boolean }

/** Everything one skin owns for a game's `Role` and `Cue` lists; a forgotten role or cue is a type error. */
export interface SkinBinding<Role extends string, Cue extends string = string> {
  readonly id: string;
  readonly contractVersion: 1;
  readonly roles: Readonly<Record<Role, RoleLook>>;
  readonly environment: EnvironmentSpec;
  readonly layers: readonly ParallaxLayer[];
  readonly post: PostFxSpec;
  readonly ui: UiTokens;
  readonly semantics: SemanticColours;
  readonly audio: AudioSpec<Cue>;
  readonly tiers: { readonly mobile: TierSpec; readonly desktop: TierSpec };
}
