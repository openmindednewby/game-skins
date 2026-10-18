import type { UiTokens } from '../contract/types';

/** Anything with an inline style, such as `document.documentElement`. */
export interface StyleTarget { readonly style: { setProperty(name: string, value: string): void } }

/** Sets each of `ui`'s CSS custom properties on `root`, so the DOM chrome reads its colours from the skin. */
export const applySkinUi = (root: StyleTarget, ui: UiTokens): void => {
  for (const [name, value] of Object.entries(ui)) {
    root.style.setProperty(name, value);
  }
};
