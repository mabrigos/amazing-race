const { formatCurrency } = require("../utils/format");

// fake item list
const items = [
  { id: 1, name: "sword", price: 100 },
  { id: 2, name: "shield", price: 200 }
];

/**
 * Gets items but price formatting inconsistent
 */
const getItems = (req, res) => {
  res.json(
    items.map(i => ({
      ...i,
      price: req.query.format ? formatCurrency(i.price) : i.price // Consistent formatting
    }))
  );
};

module.exports = { getItems };