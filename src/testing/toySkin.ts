import type { SkinBinding } from '../contract/types';
import { MaterialKind } from '../contract/materialKind';
import { ToneMapping } from '../contract/toneMapping';

type ToyRole = 'hero' | 'ground';

const TIER = { maxTexture: 512, shadows: false, bloomScale: 0, hdri: false } as const;

/** A minimal two-role skin for tests. */
export const toySkin = (): SkinBinding<ToyRole> => ({
  id: 'toy',
  contractVersion: 1,
  roles: {
    hero: { material: { kind: MaterialKind.Unlit, color: 0x112233 }, variants: [{ kind: MaterialKind.Unlit, color: 0x112233 }, { kind: MaterialKind.Unlit, color: 0x445566 }] },
    ground: { material: { kind: MaterialKind.Lambert, map: { path: 'g.jpg' } } },
  },
  environment: {
    background: 0,
    sky: { top: 0, horizon: 0, glow: 0 },
    fog: { color: 0, near: 1, far: 2 },
    hemi: { sky: 0, ground: 0, intensity: 1 },
    key: { color: 0, intensity: 1, position: [0, 1, 0] },
    exposure: 1,
  },
  layers: [],
  post: { bloom: 0, vignette: 0, grain: 0, toneMapping: ToneMapping.None },
  ui: {},
  semantics: { padTiers: [], shield: 0, hazard: 0, jackpot: 0, boost: 0, spark: 0 },
  audio: { music: {}, sfx: {} },
  tiers: { mobile: TIER, desktop: TIER },
});
