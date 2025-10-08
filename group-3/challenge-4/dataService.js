const fs = require('fs/promises');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

async function getData() {
  try {
    const [itemsData, ordersData, usersData] = await Promise.all([
      fs.readFile(path.join(dataDir, 'items.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'orders.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'users.json'), 'utf-8'),
    ]);

    const items = JSON.parse(itemsData);
    const orders = JSON.parse(ordersData);
    const users = JSON.parse(usersData);

    return { items, orders, users };
  } catch (error) {
    console.error('Error reading data files:', error);
    throw new Error('Failed to load data');
  }
}

function joinData({ items, orders, users }) {
  return orders.map(order => {
    const customer = users.find(user => user.id === order.userId)?.name || 'Unknown';
    const orderItems = order.items.map(orderItem => {
      const item = items.find(i => i.id === orderItem.itemId);
      return {
        name: item?.name || 'Unknown',
        quantity: orderItem.quantity,
        price: item?.price || 0,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      id: order.id,
      customer,
      items: orderItems,
      total,
    };
  });
}

module.exports = { getData, joinData };