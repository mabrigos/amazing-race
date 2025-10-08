// Adds 2 numbers and ensures inputs are parsed as numbers
function add(a, b) {
  return Number(a) + Number(b); // Convert inputs to numbers
}

// This multiplies two numbers
function multiply(x, y) {
  return x * y;
}

module.exports = { add, multiply };