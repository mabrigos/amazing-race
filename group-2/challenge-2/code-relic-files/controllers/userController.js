// Controller for user-related operations

/**
 * Fetches a user by ID.
 * If no ID is provided, returns an error response.
 */
const getUser = (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Placeholder logic for fetching user
  res.json({ status: "ok", id, name: "John Doe" });
};

/**
 * Adds a new user.
 * Validates the input and returns a success response.
 */
const addUser = (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Placeholder logic for adding user
  res.status(201).json({ message: "User added successfully", userId });
};

module.exports = { getUser, addUser };
