const font = require('../../../properties/font/weight.json');


test('All font weights are numbers', () => {
  for (const key in font.font.weight) {
      const weigth = font.font.weight[key];
      expect(typeof weigth.value).toBe('number');
  }
});


test('All font weights are positives', () => {
  for (const key in font.font.weight) {
    const weigth = font.font.weight[key];
    expect(weigth.value).toBeGreaterThan(0);
  }
});


test('All font weights are multiples of 100', () => {
  for (const key in font.font.weight) {
    const weigth = font.font.weight[key];
    expect(weigth.value).toBeDivisibleBy(100);
  }
});



expect.extend({
  toBeDivisibleBy(received, argument) {
    const pass = received % argument == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${argument}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be divisible by ${argument}`,
        pass: false,
      };
    }
  },
});
