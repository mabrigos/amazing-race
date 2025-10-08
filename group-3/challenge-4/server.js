const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Helper function to read JSON files
const readJSON = async (fileName) => {
  const filePath = path.join(__dirname, 'data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('Snack Ordering API is running!');
});

// Helper function to group items by ID and calculate quantities
const groupItemsById = (itemIds) => {
  return itemIds.reduce((acc, itemId) => {
    if (!acc[itemId]) {
      acc[itemId] = { itemId, quantity: 0 };
    }
    acc[itemId].quantity += 1;
    return acc;
  }, {});
};

// Endpoint to get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const [orders, users, items] = await Promise.all([
      readJSON('orders.json'),
      readJSON('users.json'),
      readJSON('items.json'),
    ]);

    const order = orders.find((o) => o.id === orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const customer = users.find((u) => u.id === order.userId)?.name || 'Unknown';

    const groupedItems = Object.values(groupItemsById(order.items));
    const detailedItems = groupedItems.map(({ itemId, quantity }) => {
      const itemDetails = items.find((i) => i.id === itemId) || {};
      return {
        name: itemDetails.name || 'Unknown',
        price: itemDetails.price || 0,
        quantity,
      };
    });

    const total = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.status(200).json({
      id: order.id,
      customer,
      items: detailedItems,
      total,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Snack Ordering API',
      version: '1.0.0',
      description: 'API for managing snack orders',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to retrieve
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
 *                       price:
 *                         type: number
 *                       quantity:
 *                         type: integer
 *                 total:
 *                   type: number
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid order ID
 */

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});