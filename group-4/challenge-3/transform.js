// transform.js
// Previous dev's attempt at cleaning the data... didn't quite finish
// Implemented according to tests in test/transform.test.js (TDD spec)

const fs = require('fs');

// ---------- Utility Helpers ----------

/** Pad number with leading zero */
function pad(n) { return n.toString().padStart(2, '0'); }

/**
 * Normalize a variety of incoming date formats to YYYY-MM-DD
 * Supported inputs (examples from dataset):
 * 2024-01-15
 * 01/20/2024 (MM/DD/YYYY)
 * 1706889600000 (timestamp ms or seconds)
 * 2024/02/20
 * 20-02-2024 (DD-MM-YYYY)
 * 20240325 (YYYYMMDD)
 * March 5, 2024 / Feb 15, 2024
 * 04/10/2024 10:30 AM
 * 2024-03-01T14:25:00 / 2024-04-12T16:45:00 (ISO w/ time)
 */
function normalizeDate(value) {
  if (!value && value !== 0) return null;
  const str = String(value).trim();
  if (!str) return null;

  // Numeric timestamp (ms or seconds)
  if (/^\d{10,16}$/.test(str)) {
    let num = parseInt(str, 10);
    if (str.length === 10) num *= 1000; // seconds -> ms
    const d = new Date(num);
    if (!isNaN(d)) return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
  }

  // YYYY-MM-DD (already normalized)
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // ISO with time
  if (/^\d{4}-\d{2}-\d{2}T/.test(str)) {
    const d = new Date(str);
    if (!isNaN(d)) return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
  }

  // YYYY/MM/DD
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(str)) {
    const [y,m,d] = str.split('/').map(Number);
    return `${y}-${pad(m)}-${pad(d)}${''}`.slice(0,10);
  }

  // MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    const [m,d,y] = str.split('/').map(Number);
    return `${y}-${pad(m)}-${pad(d)}`;
  }

  // DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
    const [d,m,y] = str.split('-').map(Number);
    return `${y}-${pad(m)}-${pad(d)}`;
  }

  // YYYYMMDD
  if (/^\d{8}$/.test(str)) {
    const y = str.slice(0,4); const m = str.slice(4,6); const d = str.slice(6,8);
    return `${y}-${m}-${d}`;
  }

  // Natural language / fallback
  const parsed = new Date(str);
  if (!isNaN(parsed)) {
    return `${parsed.getUTCFullYear()}-${pad(parsed.getUTCMonth()+1)}-${pad(parsed.getUTCDate())}`;
  }
  return null; // Unknown format
}

/** Extract customer name from various messy field patterns */
function extractCustomerName(order) {
  if (!order || typeof order !== 'object') return null;
  const candidates = [
    order.custName,
    order.customer_name,
    order.client,
    order.client_name,
    order.customerName,
    order.customer?.name,
    order.customer?.fullname,
    order.customer?.fullName
  ];
  return candidates.find(v => typeof v === 'string' && v.trim()) || null;
}

/** Extract email from various fields */
function extractEmail(order) {
  if (!order || typeof order !== 'object') return null;
  const candidates = [
    order.customer_email,
    order.email,
    order.contact,
    order.contact_email,
    order.client_email,
    order.customer?.email,
    order.customer?.contact,
    order.customer?.Email
  ];
  const email = candidates.find(v => typeof v === 'string' && /@/.test(v));
  return email || null;
}

/** Extract Order ID */
function extractOrderId(order) {
  if (!order || typeof order !== 'object') return null;
  const candidates = [order.order_id, order.id, order.orderId];
  const id = candidates.find(v => typeof v === 'string' && v.trim());
  return id || null;
}

/** Normalize a numeric total from messy fields or direct value */
function normalizeTotal(value) {
  if (value == null) return 0;
  if (typeof value === 'object') return 0;
  const str = String(value).trim();
  if (!str || /^(null|nil|undefined|invalid)$/i.test(str)) return 0;
  const num = parseFloat(str.replace(/[$,]/g, ''));
  return isNaN(num) ? 0 : num;
}

/** Detect & return the total from an order object if present */
function extractTotal(order) {
  if (!order || typeof order !== 'object') return 0;
  const candidates = [order.total, order.total_amount, order.amount, order.total_price];
  for (const c of candidates) {
    const n = normalizeTotal(c);
    if (n) return n;
  }
  // fallback: sum items
  const items = normalizeItems(order);
  if (items.length) return items.reduce((s,i)=> s + i.price * i.quantity, 0);
  return 0;
}

/** Normalize line items into { product, quantity, price }[] */
function normalizeItems(order) {
  if (!order || typeof order !== 'object') return [];
  const raw = Array.isArray(order.items) ? order.items
            : Array.isArray(order.products) ? order.products
            : [];
  return raw
    .filter(Boolean)
    .map(it => {
      const product = [it.product, it.product_name, it.name, it.item, it.item_name]
        .find(v => typeof v === 'string' && v.trim()) || 'UNKNOWN';
      const quantityRaw = [it.quantity, it.qty, it.amount].find(v => v !== undefined && v !== null);
      const quantity = Number.parseFloat(String(quantityRaw).replace(/[^0-9.]/g,''));
      const priceRaw = [it.price, it.unit_price, it.item_price, it.cost].find(v => v !== undefined && v !== null);
      const price = Number.parseFloat(String(priceRaw).replace(/[^0-9.]/g,''));
      return {
        product,
        quantity: (isNaN(quantity) ? 0 : quantity),
        price: (isNaN(price) ? 0 : price)
      };
    });
}

/** Transform a single order into normalized shape */
function transformOrder(order, index = 0) {
  if (!order || typeof order !== 'object') return null;
  const dateField = order.order_date || order.date || order.created_at || order.created || order.timestamp;
  const orderId = extractOrderId(order) || `MISSING-${index}`;
  const date = normalizeDate(dateField);
  const items = normalizeItems(order);
  const total = extractTotal(order);
  return {
    orderId,
    customerName: extractCustomerName(order),
    email: extractEmail(order),
    date,
    total,
    status: order.status || order.orderStatus || order.order_status || 'unknown',
    items
  };
}

/** Process entire dataset and persist cleaned result */
function cleanData() {
  const rawData = JSON.parse(fs.readFileSync('orders.json', 'utf8'));
  const cleaned = rawData
    .map((order, index) => transformOrder(order, index))
    .filter(order => order && order.orderId && order.total > 0);

  fs.writeFileSync('orders_clean.json', JSON.stringify(cleaned, null, 2));
  console.log(`Processed ${cleaned.length} valid orders out of ${rawData.length}`);
  return cleaned;
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
  cleanData
};