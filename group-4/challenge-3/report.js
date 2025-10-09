// report.js
// Generate business insights from cleaned data

const fs = require('fs');

function generateReport() {
  try {
    const orders = JSON.parse(fs.readFileSync('orders_clean.json', 'utf8'));
    
    // TODO: Calculate total revenue
    const totalRevenue = 0;
    
    // TODO: Count orders by status
    const ordersByStatus = {};
    
    // TODO: Find top 5 customers by spending
    const topCustomers = [];
    
    // TODO: Calculate average order value
    const avgOrderValue = 0;
    
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