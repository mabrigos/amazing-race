// index.js
// Supposed to run the app and show completed todos

const { getCompletedTodos } = require("./services/todoService");

(async () => {
  const todos = await getCompletedTodos();
  console.log(
    "Completed Todos:",
    todos.map((t) => t.name)
  ); // Corrected property
})();
