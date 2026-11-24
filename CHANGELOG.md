# Changelog

## 0.2.0

- 2D board skins (SDG-1 "System design game" Q8): `BoardSkin<Keys>` contract (palette, type, chrome, board render, heat ramp, failure effect, motion, synthesized tones, hum), `heatAt`, and the enums `BoardProjection`, `PacketShape`, `Waveform`, `FilterKind`.
- Skin registry and persisted switch: `createSkinRegistry` (register / list / get), `createSkinStore` (active / select / hydrate / subscribe) over an injected `SkinStorage` (`webSkinStorage`, `memorySkinStorage`; pass native AsyncStorage as is). A saved skin from another contract version falls back to the default.
- `@dloizides/game-skins/react`: `useActiveSkin(store)` (optional `react` >= 18 peer).

## 0.1.0

- First release: the engine-free skin contract extracted from Surge `src/skin/` (GAME-SKINS-1 "Shared game skins"), the active-skin, asset-cache, preview-pick, role-colour and CSS-token helpers, and the four shared palettes Night circuit, Dusk highway, Ember line and Deep current.
