import { useSyncExternalStore } from 'react';
import type { SkinEntry } from '../registry/skinRegistry';
import type { SkinStore } from '../registry/skinStore';

/** The store's active skin; the component re-renders when the player switches skin. */
export const useActiveSkin = <S extends SkinEntry>(store: SkinStore<S>): S => useSyncExternalStore(store.subscribe, store.active, store.active);
