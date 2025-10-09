require("dotenv").config(); // Load environment variables
const express = require("express");
const { getUser, addUser } = require("./controllers/userController");
const { getItems } = require("./controllers/itemController");

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

app.use(express.json());

// User endpoints
app.get("/user", getUser); // Fetch user by ID
app.post("/user", addUser); // Add a new user

// Item endpoint
app.get("/items", getItems); // Fetch items with optional price formatting

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
