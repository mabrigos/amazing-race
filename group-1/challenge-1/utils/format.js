// format.js
// This module formats a todo object into a specific structure

function formatTodo(todo) {
  return {
    id: todo.id, // Corrected property
    name: todo.title, // Corrected property
    done: todo.completed // Corrected property
  };
}

module.exports = { formatTodo };