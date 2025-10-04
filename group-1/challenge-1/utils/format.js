// format.js
// This module formats a todo object into a specific structure

function formatTodo(todo) {
  return {
    id: todo.id, // Corrected property
    name: todo.title, // Kept correct property
    done: todo.completed // Corrected property
  };
}

module.exports = { formatTodo };