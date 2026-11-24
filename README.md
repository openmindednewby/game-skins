# @dloizides/game-skins

The look of a game as data, shared across EisaiPollis games. Zero dependencies, no engine types.

- **Contract** (`SkinBinding<Role, Cue>`): each game declares its own role and cue lists; a skin binds every one (a missing role is a type error). Materials, environment, parallax, post-FX, UI tokens, gameplay colours, audio and quality tiers.
- **Helpers**: `setActiveSkin` / `activeSkin`, `roleColour` / `roleVariantColour`, `applySkinUi(root, ui)`, `pickSkin(built, loader)` for `?skin=` previews, `createAssetCache(load)`.
- **Shared palettes** (`GAME_SKINS`, `gameSkin(id)`, `paletteUi(palette)`): Night circuit, Dusk highway, Ember line, Deep current. A palette has no game roles (sky, ground, accent, figure, danger, reward); each game maps its roles onto the swatches.

```ts
import { GameSkinId, gameSkin, paletteUi, applySkinUi, type SkinBinding } from '@dloizides/game-skins';

type Role = 'tile' | 'cursor';
const deep = gameSkin(GameSkinId.DeepCurrent)!;
applySkinUi(document.documentElement, paletteUi(deep));
```

## 2D board skins and the skin switch

`BoardSkin<Keys>` is the 2D sibling of `SkinBinding`: each game declares its key lists (skin ids, palette keys, cues, motion keys, failure ids, node treatments) and every skin binds each one. The registry and store work for any skin with `id` and `contractVersion`.

```ts
import { createSkinRegistry, createSkinStore, webSkinStorage } from '@dloizides/game-skins';
import { useActiveSkin } from '@dloizides/game-skins/react';

const registry = createSkinRegistry([skinA, skinB]);
const store = createSkinStore({ registry, storage: webSkinStorage(), storageKey: 'game.skin', defaultId: skinA.id });
await store.hydrate();
const skin = useActiveSkin(store);
await store.select(skinB.id);
```

On native pass `AsyncStorage` from `@react-native-async-storage/async-storage` as `storage`; it fits `SkinStorage` as it is. A saved choice that is unknown or has another `contractVersion` falls back to the default skin.

Engine adapters (Three.js materials, Skia or canvas renderers, loaders) stay in each game.
