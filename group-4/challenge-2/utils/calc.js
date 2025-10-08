/**
 * Adds two numbers. If inputs are strings, they are converted to numbers.
 * @param {number|string} a - The first number.
 * @param {number|string} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
	return Number(a) + Number(b) // Ensure numeric addition
}

/**
 * Multiplies two numbers.
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @returns {number} The product of the two numbers.
 */
function multiply(x, y) {
	return x * y
}

module.exports = { add, multiply }
