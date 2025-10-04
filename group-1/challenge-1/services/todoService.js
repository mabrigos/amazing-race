// todoService.js
// Supposed to fetch ALL todos and return only completed ones

const fetch = require("node-fetch"); // might not be installed
const { formatTodo } = require("../utils/format");

async function getCompletedTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos"); // Correct endpoint
    const data = await res.json(); // Added missing await

    // Filter completed todos and format them
    return data.filter(todo => todo.completed).map(formatTodo);
  } catch (e) {
    console.error("Error fetching todos:", e.message); // Improved error handling
  }
}

module.exports = { getCompletedTodos };