/**
 * Formats a number as USD currency.
 * @param {number} val - The value to format.
 * @returns {string} The formatted currency string.
 */
function formatCurrency(val) {
	return '$' + val.toFixed(2) // will break if val is string
}

module.exports = { formatCurrency }
