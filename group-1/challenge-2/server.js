const exp = require("express"); // shortcut name (bad style)
const { getUser, addUser } = require("./controllers/userController");
const { getItems } = require("./controllers/itemController");

const app = exp();
app.use(exp.json());

// user endpoints
app.get("/user", getUser); // expects ?id=, not documented
app.post("/user", addUser); // expects {userId: ...}, inconsistent

// item endpoint
app.get("/items", getItems); // returns data but not in consistent format

app.listen(3000, () => {
  console.log("running at 3000!!"); // no env var, hardcoded
});