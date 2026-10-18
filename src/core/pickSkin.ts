/** The skin `load` brings (a preview), or `built` when there is no loader or the load fails. */
export const pickSkin = async <S>(built: S, load: (() => Promise<{ readonly skin: S }>) | undefined): Promise<S> => {
  if (load === undefined) {
    return built;
  }
  try {
    return (await load()).skin;
  } catch {
    return built;
  }
};
