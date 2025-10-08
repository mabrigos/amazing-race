// transform.js
// Previous dev's attempt at cleaning the data... didn't quite finish

const fs = require('fs');

function cleanData() {
  const rawData = JSON.parse(fs.readFileSync('orders.json', 'utf8'));
  const cleaned = rawData
    .map((order, index) => transformOrder(order, index))
    .filter(order => order.orderId && order.total > 0);
  
  fs.writeFileSync('orders_clean.json', JSON.stringify(cleaned, null, 2));
  console.log(`Processed ${cleaned.length} valid orders out of ${rawData.length}`);
  return cleaned;
}

// Define the missing functions based on the test cases

function normalizeDate(date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date; // ISO format
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
  } else if (/^\d+$/.test(date)) {
    const parsedDate = new Date(parseInt(date, 10));
    return parsedDate.toISOString().split('T')[0];
  }
  return null;
}

function extractCustomerName(order) {
  return (
    order.custName ||
    order.customer_name ||
    order.client ||
    (order.customer && order.customer.name) ||
    null
  );
}

function normalizeTotal(total) {
  const parsedTotal = parseFloat(total);
  return isNaN(parsedTotal) ? 0 : parsedTotal;
}

function normalizeItems(order) {
  const items = order.items || order.products || [];
  return items.map(item => ({
    product: item.product || item.product_name || item.name || item.item_name || 'Unknown',
    quantity: parseInt(item.qty || item.quantity || item.amount || 0, 10),
    price: parseFloat(item.price || item.unit_price || item.cost || item.item_price || 0)
  }));
}

if (require.main === module) {
  cleanData();
}

module.exports = {
  normalizeDate,
  extractCustomerName,
  normalizeTotal,
  normalizeItems,
  cleanData
};