/**
 * Formats a value as USD currency.
 * Ensures the input is a valid number before formatting.
 */
function formatCurrency(val) {
  if (typeof val !== "number" || isNaN(val)) {
    throw new Error("Input must be a valid number");
  }
  return "$" + val.toFixed(2);
}

module.exports = { formatCurrency };
