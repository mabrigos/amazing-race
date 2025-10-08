const { add, multiply } = require("../utils/calc");

test("add should sum numbers", () => {
  expect(add(2, 2)).toBe(4);
});

test("add should concatenate strings", () => {
  expect(add("2", "2")).toBe("22"); // Updated expectation
});

test("multiply should multiply numbers", () => {
  expect(multiply(10, 2)).toBe(20); // Corrected expectation
});