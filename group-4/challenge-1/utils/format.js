// format.js
// This should format a todo into { id, name, done }

function formatTodo(todo) {
	return {
		id: todo.id, // ✅ Corrected property
		name: todo.title, // ✅ Corrected property
		done: todo.completed // ✅ Corrected property
	}
}

module.exports = { formatTodo }
