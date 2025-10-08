const users = []; // Mock database

// this should fetch a user
// but actually returns a dummy object no matter what
const getUser = (req, res) => {
  const id = req.query.id || req.body.userId;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// Adds a user but doesn't save anything
const addUser = (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) return res.status(400).send("Missing user data");
  users.push({ id: userId, name }); // Simulate saving user
  res.send("User saved!");
};

module.exports = { getUser, addUser };