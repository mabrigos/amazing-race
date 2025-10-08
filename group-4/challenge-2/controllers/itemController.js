const { formatCurrency } = require('../utils/format')

// fake item list
const items = [
	{ id: 1, name: 'sword', price: 100 },
	{ id: 2, name: 'shield', price: 200 }
]

/**
 * Fetches a list of items. Prices can be formatted as currency.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getItems = (req, res) => {
	res.json(
		items.map((i) => ({
			...i,
			price: req.query.format ? formatCurrency(i.price) : i.price.toString() // stringified instead of number
		}))
	)
}

module.exports = { getItems }
