const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Helper function to read JSON files
const readJSONFile = async (fileName) => {
  const filePath = path.join(__dirname, "data", fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

// Endpoint to fetch orders
app.get("/orders", async (req, res) => {
  try {
    const [orders, users, items] = await Promise.all([
      readJSONFile("orders.json"),
      readJSONFile("users.json"),
      readJSONFile("items.json"),
    ]);

    // Updated the logic to handle array of item IDs in orders.json
    const enrichedOrders = orders.map((order) => {
      const customer =
        users.find((user) => user.id === order.userId)?.name || "Unknown";
      const orderItems = order.items.map((itemId) => {
        const itemDetails = items.find((item) => item.id === itemId);
        if (!itemDetails) {
          console.warn(`Item with ID ${itemId} not found in items.json`);
        }
        return {
          name: itemDetails?.name || "Unknown",
          quantity: 1, // Default quantity to 1 for each item ID
          price: itemDetails?.price || 0,
        };
      });
      const total = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return {
        id: order.id,
        customer,
        items: orderItems,
        total,
      };
    });

    res.json(enrichedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
