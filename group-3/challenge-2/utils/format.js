// formats to USD but doesn't check for numbers
function formatCurrency(val) {
  return "$" + val.toFixed(2); // will break if val is string
}

module.exports = { formatCurrency };