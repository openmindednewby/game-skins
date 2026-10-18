import { roleColour, roleVariantColour } from './roleColour';
import { toySkin } from '../testing/toySkin';

describe('roleColour', () => {
  it('with a coloured role, returns its colour', () => {
    const colour = roleColour(toySkin(), 'hero');

    expect(colour).toBe(0x112233);
  });

  it('with a role that has no colour, throws naming the role', () => {
    const read = (): number => roleColour(toySkin(), 'ground');

    expect(read).toThrow('ground');
  });
});

describe('roleVariantColour', () => {
  it('with an existing variant, returns its colour', () => {
    const colour = roleVariantColour(toySkin(), 'hero', 1);

    expect(colour).toBe(0x445566);
  });

  it('with a missing variant, throws naming the role and index', () => {
    const read = (): number => roleVariantColour(toySkin(), 'ground', 0);

    expect(read).toThrow('ground has no variant 0');
  });
});
