const { add, multiply } = require("../utils/calc");

// Test for add function
// Verifies that add correctly sums two numbers
// and handles string inputs by converting them to numbers
test("add should sum numbers", () => {
  expect(add(2, 2)).toBe(4);
});

test("add should work with strings too", () => {
  expect(add("2", "2")).toBe(4); // Now passes
});

// Test for multiply function
// Verifies that multiply correctly multiplies two numbers
test("multiply should multiply numbers", () => {
  expect(multiply(10, 2)).toBe(20); // Correct expectation
});