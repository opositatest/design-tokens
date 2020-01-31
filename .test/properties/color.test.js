const color = require('../../properties/color.json');

test('Exists most important colors', () => {
  expect(color.color.primary.main).toBeDefined();
  expect(color.color.neutral["dark-100"]).toBeDefined();
  expect(color.color.neutral.white).toBeDefined();
  expect(color.color.feedback.success).toBeDefined();
  expect(color.color.feedback.alerts).toBeDefined();
});
