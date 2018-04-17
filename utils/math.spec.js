const math = require('./math');

test('adds 1 + 2 to equal 3', () => {
  expect(math.sum(1, 2)).toBe(3);
});

test('reduce 2 - 1 to equeal 1', () => {
  expect(math.reduce(2, 1)).toBe(1)
})