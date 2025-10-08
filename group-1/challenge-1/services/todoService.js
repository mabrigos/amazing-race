// todoService.js
// Supposed to fetch ALL todos and return only completed ones

const fetch = require("node-fetch"); // might not be installed
const { formatTodo } = require("../utils/format");

async function getCompletedTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos"); // ✅ Correct endpoint
    const data = await res.json(); // ✅ Added missing await

    // ✅ Filter for completed todos
    const completedTodos = data.filter((todo) => todo.completed);

    // ✅ Format the filtered todos
    return completedTodos.map(formatTodo);
  } catch (e) {
    console.error("Error fetching todos:", e.message); // ✅ Improved error handling
    throw e; // Re-throw the error to handle it upstream
  }
}

module.exports = { getCompletedTodos };