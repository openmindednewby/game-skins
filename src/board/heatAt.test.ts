import { heatAt } from './heatAt';
import { toyBoardSkin } from '../testing/toyBoardSkin';

describe('heatAt', () => {
  it('with a load between two stops, returns the lower stop', () => {
    const stops = toyBoardSkin('plain').heat;

    const band = heatAt(stops, 0.85);

    expect(band.blendTo).toBe('hot');
  });

  it('with a load past the last stop, returns the last stop', () => {
    const stops = toyBoardSkin('plain').heat;

    const band = heatAt(stops, 1.4);

    expect(band.treatment).toBe('shake');
  });

  it('with a load below the first stop, returns the first stop', () => {
    const stops = toyBoardSkin('plain').heat;

    const band = heatAt(stops, -1);

    expect(band.from).toBe(0);
  });

  it('with no stops, throws', () => {
    const act = (): unknown => heatAt([], 0.5);

    expect(act).toThrow('at least one heat stop');
  });
});
