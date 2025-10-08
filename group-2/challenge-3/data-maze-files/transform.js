// transform.js
// Previous dev's attempt at cleaning the data... didn't quite finish

const fs = require("fs");

function cleanData() {
  const rawData = JSON.parse(fs.readFileSync("orders.json", "utf8"));
  const cleaned = rawData
    .map((order, index) => transformOrder(order, index))
    .filter((order) => order.orderId && order.total > 0);

  fs.writeFileSync("orders_clean.json", JSON.stringify(cleaned, null, 2));
  console.log(
    `Processed ${cleaned.length} valid orders out of ${rawData.length}`
  );
  return cleaned;
}

function normalizeDate(date) {
  if (!date) return null;
  if (!isNaN(date)) return new Date(parseInt(date)).toISOString().split("T")[0];
  const parts = date.split("/");
  if (parts.length === 3) {
    const [month, day, year] = parts;
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return isNaN(parsedDate) ? null : parsedDate.toISOString().split("T")[0];
  }
  const parsedDate = new Date(date);
  return isNaN(parsedDate) ? null : parsedDate.toISOString().split("T")[0];
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

function extractEmail(order) {
  return order.customer_email || order.email || order.contact || null;
}

function extractOrderId(order) {
  return order.order_id || order.id || order.orderId || null;
}

function normalizeTotal(total) {
  const num = parseFloat(total);
  return isNaN(num) ? 0 : num;
}

function normalizeItems(order) {
  if (!order.items && !order.products) return [];
  const items = order.items || order.products;
  return items.map((item) => ({
    product:
      item.product || item.product_name || item.item || item.name || "Unknown",
    quantity: parseInt(item.qty || item.quantity || item.amount || 0),
    price: normalizeTotal(item.price || item.unit_price || item.cost || 0),
  }));
}

function transformOrder(order) {
  return {
    orderId: extractOrderId(order),
    customerName: extractCustomerName(order),
    email: extractEmail(order),
    date: normalizeDate(
      order.order_date || order.date || order.created_at || order.timestamp
    ),
    total: normalizeTotal(order.total || order.total_amount),
    status:
      order.status || order.orderStatus || order.order_status || "unknown",
    items: normalizeItems(order),
  };
}

if (require.main === module) {
  cleanData();
}

module.exports = {
  normalizeDate,
  extractCustomerName,
  extractEmail,
  extractOrderId,
  normalizeTotal,
  normalizeItems,
  transformOrder,
  cleanData,
};
