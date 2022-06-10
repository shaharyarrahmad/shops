import { getAvailableOptions, findVariant } from '../src';

const sampleVariants = [
  {
    name: 'TEST 1kg klein',
    options: [
      {
        id: '131',
        name: '1kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
      {
        id: '133',
        name: 'klein',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
    ],
  },
  {
    name: 'TEST 1kg groot',
    options: [
      {
        id: '129',
        name: 'groot',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
      {
        id: '131',
        name: '1kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
    ],
  },
  {
    name: 'TEST 1kg middel',
    options: [
      {
        id: '131',
        name: '1kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
      {
        id: '132',
        name: 'middel',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
    ],
  },
  {
    name: 'TEST 2kg klein',
    options: [
      {
        id: '130',
        name: '2kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
      {
        id: '133',
        name: 'klein',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
    ],
  },
  {
    name: 'TEST 2kg groot',
    options: [
      {
        id: '129',
        name: 'groot',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
      {
        id: '130',
        name: '2kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
    ],
  },
  {
    name: 'TEST 2kg middel',
    options: [
      {
        id: '130',
        name: '2kg',
        group: {
          id: '45',
          name: 'Gewicht',
        },
      },
      {
        id: '132',
        name: 'middel',
        group: {
          id: '44',
          name: 'Formaat',
        },
      },
    ],
  },
];

describe('getAvailableOptions()', () => {
  test('Has all available options', () => {
    const available = getAvailableOptions(sampleVariants);
    expect(available[44].name).toBe('Formaat');
    expect(Object.values(available[44].options)).toContain('groot');
    expect(Object.values(available[44].options)).toContain('klein');
    expect(Object.values(available[44].options)).toContain('middel');
    expect(available[45].name).toBe('Gewicht');
    expect(Object.values(available[45].options)).toContain('1kg');
    expect(Object.values(available[45].options)).toContain('2kg');
  });

  test('Still has all available options, even when 1 variant is missing', () => {
    const filteredVariants = sampleVariants.filter(
      (v) => v.name !== 'TEST 1kg klein'
    );
    const available = getAvailableOptions(filteredVariants);
    expect(available[44].name).toBe('Formaat');
    expect(Object.values(available[44].options)).toContain('groot');
    expect(Object.values(available[44].options)).toContain('klein');
    expect(Object.values(available[44].options)).toContain('middel');
    expect(available[45].name).toBe('Gewicht');
    expect(Object.values(available[45].options)).toContain('1kg');
    expect(Object.values(available[45].options)).toContain('2kg');
  });

  test("Doesn't have option 'klein' when all variants with option 'klein' have been removed", () => {
    const filteredVariants = sampleVariants.filter(
      (v) => v.name.indexOf('klein') === -1
    );
    const available = getAvailableOptions(filteredVariants);
    expect(Object.values(available[44].options)).not.toContain('klein');
  });
});

describe('selectVariant()', () => {
  test('Selects variant based on selectedOptions', () => {
    const selectedOptions = {
      '44': '129', // groot
      '45': '131', // 1kg
    };
    const variant = findVariant(selectedOptions, sampleVariants);
    expect(variant?.name).toBe('TEST 1kg groot');
  });

  test("Returns undefined if options don't exist", () => {
    const filteredVariants = sampleVariants.filter(
      (v) => v.name !== 'TEST 1kg klein'
    );
    const selectedOptions = {
      '44': '133', // klein
      '45': '131', // 1kg
    };
    const variant = findVariant(selectedOptions, filteredVariants);
    expect(variant).toBe(undefined);
  });
});
