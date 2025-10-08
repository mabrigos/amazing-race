const { formatCurrency } = require("../utils/format");

// Hardcoded item list for demonstration purposes
const items = [
  { id: 1, name: "Sword", price: 100 },
  { id: 2, name: "Shield", price: 200 },
];

/**
 * Fetches a list of items.
 * If the `format` query parameter is provided, prices are formatted as currency.
 * Otherwise, prices are returned as numbers.
 */
const getItems = (req, res) => {
  const formattedItems = items.map((item) => ({
    ...item,
    price:
      req.query.format === "true" ? formatCurrency(item.price) : item.price,
  }));

  res.json(formattedItems);
};

module.exports = { getItems };
