// transform.js
// Previous dev's attempt at cleaning the data... didn't quite finish

const fs = require('fs');

function cleanData() {
  const rawDataPath = './orders.json';
  const outputPath = './orders_clean.json';

  if (!fs.existsSync(rawDataPath)) {
    console.error(`Error: Input file not found at ${rawDataPath}`);
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
  const cleaned = rawData
    .map((order, index) => transformOrder(order, index))
    .filter(order => order.orderId && order.total > 0);

  if (cleaned.length > 0) {
    fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));
    console.log(`Processed ${cleaned.length} valid orders out of ${rawData.length}`);
    console.log(`Cleaned data saved to ${outputPath}`);
  } else {
    console.error('No valid orders to save. Output file not created.');
  }

  return cleaned;
}

// normalizeDate: Converts various date formats into a consistent format
function normalizeDate(date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // ISO format
    return date;
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    // US format MM/DD/YYYY
    const [month, day, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } else if (/^\d+$/.test(date)) {
    // Timestamp
    const parsedDate = new Date(parseInt(date, 10));
    return parsedDate.toISOString().split('T')[0];
  }
  return null;
}

// extractCustomerName: Extracts the customer's name from various field structures
function extractCustomerName(order) {
  if (order.custName) return order.custName;
  if (order.customer_name) return order.customer_name;
  if (order.client) return order.client;
  if (order.customer && order.customer.name) return order.customer.name;
  return null;
}

// normalizeTotal: Converts strings and numbers into valid totals
function normalizeTotal(total) {
  const num = parseFloat(total);
  return isNaN(num) ? 0 : num;
}

// normalizeItems: Processes item structures to ensure each item has product, quantity, and price fields
function normalizeItems(order) {
  if (!Array.isArray(order.items)) return [];
  return order.items.map(item => ({
    product: item.product || 'Unknown',
    quantity: parseInt(item.qty, 10) || 0,
    price: normalizeTotal(item.price)
  }));
}

// extractOrderId: Extracts a unique order ID, falling back to index if missing
function extractOrderId(order, index) {
  return order.orderId || order.id || `order-${index + 1}`;
}

// extractEmail: Extracts the customer's email from various field structures
function extractEmail(order) {
  return order.email || order.contactEmail || null;
}

// transformOrder: Transforms a single order object into a normalized format
function transformOrder(order, index) {
  const transformed = {
    orderId: extractOrderId(order, index),
    customerName: extractCustomerName(order),
    email: extractEmail(order),
    date: normalizeDate(order.date || order.order_date || order.created_at || order.timestamp),
    total: normalizeTotal(order.total || order.total_amount || order.total_price || order.amount),
    items: normalizeItems(order)
  };

  console.log('Transformed Order:', transformed); // Debugging output
  return transformed;
}

module.exports = {
  normalizeDate,
  extractCustomerName,
  normalizeTotal,
  normalizeItems,
  transformOrder,
  cleanData,
  extractOrderId,
  extractEmail
};