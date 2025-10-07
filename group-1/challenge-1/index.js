// index.js
// Entry point: fetch and display completed todos.

const { getCompletedTodos } = require("./services/todoService");

(async () => {
  const todos = await getCompletedTodos();
  if (!Array.isArray(todos) || todos.length === 0) {
    console.log("No completed todos available.");
    return;
  }
  // Show a concise list and a count.
  console.log(`Fetched ${todos.length} completed todos.`);
  console.log("First 5:", todos.slice(0,5).map(t => t.name));
})();