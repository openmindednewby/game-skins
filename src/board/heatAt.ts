import type { BoardSkinKeys, HeatStop } from './types';

/** The heat band a load ratio falls in: the last stop whose `from` is at or below `load`, else the first stop. */
export const heatAt = <K extends BoardSkinKeys>(stops: readonly HeatStop<K>[], load: number): HeatStop<K> => {
  const first = stops[0];
  if (first === undefined) {
    throw new Error('A board skin needs at least one heat stop');
  }
  return stops.reduce((band, stop) => (stop.from <= load ? stop : band), first);
};
