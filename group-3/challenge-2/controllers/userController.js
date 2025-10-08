// Placeholder for user-related operations

/**
 * Retrieves a user by ID.
 * Query Parameters:
 * - id (string): The ID of the user to retrieve.
 * Response:
 * - { status: string, id: string, name: string }
 *   - Always returns a placeholder user object.
 */
const getUser = (req, res) => {
  const id = req.query.id || req.body.userId; // Retrieve user ID from query or body
  res.json({ status: "ok", id, name: "placeholder" }); // Return placeholder user
};

/**
 * Adds a new user.
 * Request Body:
 * - { userId: string }
 * Response:
 * - Success: "User saved!"
 * - Error: 400 Bad Request if userId is missing.
 * Note: This function does not persist the user data.
 */
const addUser = (req, res) => {
  const { userId } = req.body; // Extract userId from request body
  if (!userId) return res.status(400).send("Missing user"); // Validate input
  res.send("User saved!"); // Respond with success message (no actual saving)
};

module.exports = { getUser, addUser };