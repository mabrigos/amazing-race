// report.js
// Generate business insights from cleaned data

const fs = require('fs');

function generateReport() {
  try {
    const orders = JSON.parse(fs.readFileSync('orders_clean.json', 'utf8'));
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum,o)=> sum + (o.total || 0), 0);
    
    // Count orders by status
    const ordersByStatus = orders.reduce((acc,o)=> {
      const s = o.status || 'unknown';
      acc[s] = (acc[s]||0)+1;
      return acc;
    }, {});
    
    // Aggregate customer spend
    const spendByCustomer = orders.reduce((acc,o)=> {
      const name = o.customerName || 'Unknown';
      acc[name] = (acc[name]||0) + (o.total || 0);
      return acc;
    }, {});
    const topCustomers = Object.entries(spendByCustomer)
      .map(([customer,total]) => ({ customer, total }))
      .sort((a,b)=> b.total - a.total)
      .slice(0,5);
    
    // Average order value
    const avgOrderValue = orders.length ? +(totalRevenue / orders.length).toFixed(2) : 0;
    
    const report = {
      summary: {
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        averageOrderValue: avgOrderValue
      },
      ordersByStatus: ordersByStatus,
      topCustomers: topCustomers
    };
    
    console.log('\n📊 SALES REPORT\n');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  } catch (error) {
    console.error('Error: Make sure to run transform.js first!');
    console.error(error.message);
  }
}

if (require.main === module) {
  generateReport();
}

module.exports = { generateReport };