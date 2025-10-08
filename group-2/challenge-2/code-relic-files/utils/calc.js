/**
 * Adds two numbers.
 * Ensures both inputs are numbers before performing the operation.
 */
function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
}

/**
 * Multiplies two numbers.
 */
function multiply(x, y) {
  return x * y;
}

module.exports = { add, multiply };
