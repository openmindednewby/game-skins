import type { SkinBinding } from '../contract/types';

type AnySkin = SkinBinding<string, string>;

let current: AnySkin | undefined;

/** Makes `skin` the one every role lookup reads from; a build selects exactly one. */
export const setActiveSkin = <Role extends string, Cue extends string>(skin: SkinBinding<Role, Cue>): void => {
  current = skin as unknown as AnySkin;
};

/** The selected skin; throws when nothing selected one, so a missing composition root fails loudly. */
export const activeSkin = <Role extends string, Cue extends string>(): SkinBinding<Role, Cue> => {
  if (current === undefined) {
    throw new Error('No skin is active: call setActiveSkin before reading roles');
  }
  return current as unknown as SkinBinding<Role, Cue>;
};
