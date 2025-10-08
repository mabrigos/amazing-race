const { formatCurrency } = require("../utils/format"); // Utility function to format prices as currency

// Hardcoded list of items for demonstration purposes
const items = [
  { id: 1, name: "sword", price: 100 },
  { id: 2, name: "shield", price: 200 }
];

/**
 * Retrieves a list of items.
 * Query Parameters:
 * - format (boolean): If true, formats the price as currency.
 * Response:
 * - [{ id: number, name: string, price: string | number }]
 *   - price is formatted as a string if `format` is true, otherwise as a number.
 */
const getItems = (req, res) => {
  res.json(
    items.map(item => ({
      ...item,
      price: req.query.format
        ? formatCurrency(item.price) // Format price as currency if requested
        : item.price.toString() // Convert price to string if not formatted
    }))
  );
};

module.exports = { getItems };