const express = require('express');
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// Load data
const items = JSON.parse(fs.readFileSync('./data/items.json'));
const users = JSON.parse(fs.readFileSync('./data/users.json'));
const orders = JSON.parse(fs.readFileSync('./data/orders.json'));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Orders API',
      version: '1.0.0',
      description: 'API for managing snack orders',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./server.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   customer:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         price:
 *                           type: number
 *                   total:
 *                     type: number
 */
app.get('/orders', (req, res) => {
  const result = orders.map(order => {
    const customer = users.find(user => user.id === order.userId)?.name || 'Unknown';
    const orderItems = order.items.reduce((acc, itemId) => {
      const item = items.find(i => i.id === itemId);
      if (item) {
        const existing = acc.find(i => i.name === item.name);
        if (existing) {
          existing.quantity += 1;
        } else {
          acc.push({ name: item.name, quantity: 1, price: item.price });
        }
      }
      return acc;
    }, []);
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { id: order.id, customer, items: orderItems, total };
  });
  res.json(result);
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 customer:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       price:
 *                         type: number
 *                 total:
 *                   type: number
 *       404:
 *         description: Order not found
 */
app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  const customer = users.find(user => user.id === order.userId)?.name || 'Unknown';
  const orderItems = order.items.reduce((acc, itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const existing = acc.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ name: item.name, quantity: 1, price: item.price });
      }
    }
    return acc;
  }, []);
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ id: order.id, customer, items: orderItems, total });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
