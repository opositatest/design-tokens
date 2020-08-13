const spacing = require('../../properties/spacing.json');

test('All spaces are numbers', () => {
    spacing.spacing.value.forEach(number => {
        expect(typeof number).toBe('number');
    });
});


test('All spaces are positives', () => {
    spacing.spacing.value.forEach(number => {
        expect(number).toBeGreaterThan(0);
    });
});


test('All spaces are multiples of 2', () => {
    spacing.spacing.value.forEach(number => {
        expect(number).toBeDivisibleBy(2);
    });
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
