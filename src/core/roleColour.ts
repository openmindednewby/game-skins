import type { MaterialRecipe, SkinBinding } from '../contract/types';

const colourOf = (role: string, recipe: MaterialRecipe): number => {
  if (recipe.color === undefined) {
    throw new Error(`Skin role ${role} has no colour`);
  }
  return recipe.color;
};

/** The colour `skin` gives `role` (a shader uniform, a tint, a burst). */
export const roleColour = <Role extends string, Cue extends string>(skin: SkinBinding<Role, Cue>, role: Role): number =>
  colourOf(role, skin.roles[role].material);

/** The colour of variant `index` of `role`, in the skin's order. */
export const roleVariantColour = <Role extends string, Cue extends string>(skin: SkinBinding<Role, Cue>, role: Role, index: number): number => {
  const recipe = skin.roles[role].variants?.[index];
  if (recipe === undefined) {
    throw new Error(`Skin role ${role} has no variant ${index}`);
  }
  return colourOf(role, recipe);
};
