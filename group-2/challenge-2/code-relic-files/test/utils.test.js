const { add, multiply } = require("../utils/calc");
const { formatCurrency } = require("../utils/format");

test("add should sum numbers", () => {
  expect(add(2, 2)).toBe(4);
});

test("add should throw error for non-numbers", () => {
  expect(() => add("2", "2")).toThrow("Both arguments must be numbers");
});

test("multiply should multiply numbers", () => {
  expect(multiply(10, 2)).toBe(20);
});

test("formatCurrency should format numbers as USD", () => {
  expect(formatCurrency(1234.56)).toBe("$1234.56");
});

test("formatCurrency should throw error for non-numbers", () => {
  expect(() => formatCurrency("1234.56")).toThrow(
    "Input must be a valid number"
  );
});
