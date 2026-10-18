import { hexCss, paletteUi } from './paletteUi';
import { gameSkin } from './palettes';
import { GameSkinId } from './gameSkinId';

describe('hexCss', () => {
  it('with a small number, pads to six digits', () => {
    const css = hexCss(0x0000ff);

    expect(css).toBe('#0000ff');
  });
});

describe('paletteUi', () => {
  it('for Night circuit, emits eight tokens with the sky top and accent as CSS hex', () => {
    const night = gameSkin(GameSkinId.NightCircuit);
    if (night === undefined) throw new Error('missing');

    const ui = paletteUi(night);

    expect([ui['--skin-sky-top'], ui['--skin-accent'], Object.keys(ui).length]).toEqual(['#030306', '#6ff3ff', 8]);
  });
});
