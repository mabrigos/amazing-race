// todoService.js
// Supposed to fetch ALL todos and return only completed ones

const fetch = require("node-fetch"); // might not be installed
const { formatTodo } = require("../utils/format");

async function getCompletedTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos"); // Corrected endpoint
    const data = await res.json(); // Added missing await

    // Filter for completed todos
    const completedTodos = data.filter((todo) => todo.completed);
    return completedTodos.map(formatTodo);
  } catch (e) {
    console.error("Error fetching todos:", e.message); // Improved error logging
  }
}

module.exports = { getCompletedTodos };
