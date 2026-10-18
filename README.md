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

Engine adapters (Three.js materials, loaders) stay in each game.
