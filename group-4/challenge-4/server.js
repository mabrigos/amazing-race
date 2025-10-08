const express = require('express')
const fs = require('fs/promises')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()
const PORT = 3000

// Swagger setup
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Snack Ordering API',
			version: '1.0.0',
			description: 'API for managing snack orders'
		}
	},
	apis: ['./server.js']
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * /:orderId:
 *   get:
 *     summary: Get order details by ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */

// Base endpoint
app.get('/:orderId', async (req, res) => {
	const { orderId } = req.params

	try {
		// Read data files
		const [ordersData, usersData, itemsData] = await Promise.all([
			fs.readFile('./data/orders.json', 'utf-8'),
			fs.readFile('./data/users.json', 'utf-8'),
			fs.readFile('./data/items.json', 'utf-8')
		])

		const orders = JSON.parse(ordersData)
		const users = JSON.parse(usersData)
		const items = JSON.parse(itemsData)

		// Find the order
		const order = orders.find((o) => o.id === parseInt(orderId))
		if (!order) {
			return res.status(404).json({ error: 'Order not found' })
		}

		// Find the customer
		const customer = users.find((u) => u.id === order.userId)
		if (!customer) {
			return res.status(404).json({ error: 'Customer not found' })
		}

		// Build items array
		const orderItems = order.items
			.map((orderItemId) => {
				const item = items.find((i) => i.id === orderItemId)
				if (item) {
					return {
						name: item.name,
						quantity: 1, // Default quantity to 1 since orders.json does not specify quantity
						price: item.price
					}
				}
				return null
			})
			.filter(Boolean)

		// Calculate total
		const total = orderItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		)

		// Build response
		const response = {
			id: order.id,
			customer: customer.name,
			items: orderItems,
			total
		}

		res.json(response)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
