const express = require("express"); // Importing the Express framework
const { getUser, addUser } = require("./controllers/userController"); // User-related endpoints
const { getItems } = require("./controllers/itemController"); // Item-related endpoints

const app = express(); // Initialize the Express application
app.use(express.json()); // Middleware to parse JSON request bodies

// User endpoints
/**
 * GET /user
 * Retrieves a user by ID.
 * Query Parameters:
 * - id (string): The ID of the user to retrieve.
 * Response:
 * - { status: string, id: string, name: string }
 */
app.get("/user", getUser);

/**
 * POST /user
 * Adds a new user.
 * Request Body:
 * - { userId: string }
 * Response:
 * - Success: "User saved!"
 * - Error: 400 Bad Request if userId is missing.
 */
app.post("/user", addUser);

// Item endpoint
/**
 * GET /items
 * Retrieves a list of items.
 * Query Parameters:
 * - format (boolean): Whether to format the price as currency.
 * Response:
 * - [{ id: number, name: string, price: string | number }]
 */
app.get("/items", getItems);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});