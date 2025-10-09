// transform.js
// Previous dev's attempt at cleaning the data... didn't quite finish

const fs = require('fs')

function normalizeDate(date) {
	if (!date) return null

	// Handle ISO format, US format, timestamp, and other formats
	let parsedDate
	if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(date)) {
		// Check for US format MM/DD/YYYY
		const [month, day, year] = date.split('/')
		parsedDate = new Date(Date.UTC(year, month - 1, day))
	} else {
		parsedDate = new Date(isNaN(date) ? date : parseInt(date))
	}

	if (isNaN(parsedDate)) return null

	return parsedDate.toISOString().split('T')[0] // Return as YYYY-MM-DD
}

function extractCustomerName(order) {
	return (
		order.custName ||
		order.customer_name ||
		order.client ||
		(order.customer && order.customer.name) ||
		(order.customer && order.customer.fullname) ||
		null
	)
}

function extractEmail(order) {
	return (
		order.customer_email ||
		order.email ||
		order.contact ||
		order.contact_email ||
		(order.customer && order.customer.email) ||
		null
	)
}

function extractOrderId(order) {
	return order.order_id || order.id || order.orderId || null
}

function normalizeTotal(total) {
	const parsedTotal = parseFloat(total)
	return isNaN(parsedTotal) || parsedTotal < 0 ? 0 : parsedTotal
}

function normalizeItems(order) {
	const items = order.items || order.products || []
	return items
		.map((item) => ({
			product:
				item.product ||
				item.product_name ||
				item.item ||
				item.name ||
				item.item_name ||
				null,
			quantity: parseInt(item.qty || item.quantity || item.amount || 0),
			price: parseFloat(
				item.price || item.unit_price || item.cost || item.item_price || 0
			)
		}))
		.filter((item) => item.product && item.quantity > 0 && item.price > 0)
}

function transformOrder(order, index) {
	return {
		orderId: extractOrderId(order),
		customerName: extractCustomerName(order),
		email: extractEmail(order),
		orderDate: normalizeDate(
			order.order_date ||
				order.date ||
				order.created ||
				order.timestamp ||
				order.created_at
		),
		total: normalizeTotal(
			order.total || order.total_amount || order.total_price || order.amount
		),
		status: order.status || order.orderStatus || order.order_status || null,
		items: normalizeItems(order)
	}
}

function cleanData() {
	const rawData = JSON.parse(fs.readFileSync('orders.json', 'utf8'))
	const cleaned = rawData
		.map((order, index) => transformOrder(order, index))
		.filter((order) => order.orderId && order.total > 0)

	fs.writeFileSync('orders_clean.json', JSON.stringify(cleaned, null, 2))
	console.log(
		`Processed ${cleaned.length} valid orders out of ${rawData.length}`
	)
	return cleaned
}

if (require.main === module) {
	cleanData()
}

module.exports = {
	normalizeDate,
	extractCustomerName,
	extractEmail,
	extractOrderId,
	normalizeTotal,
	normalizeItems,
	transformOrder,
	cleanData
}
