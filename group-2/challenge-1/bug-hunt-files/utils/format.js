// format.js
// This module formats a todo object into a specific structure

function formatTodo(todo) {
  return {
    id: todo.id,
    name: todo.title,
    done: todo.completed,
  };
}

module.exports = { formatTodo };
