// todoService.js
// Fetches ALL todos and returns only completed ones

const fetch = require('node-fetch') // Ensure this is installed
const https = require('https') // Import https for agent
const { formatTodo } = require('../utils/format')

// Create an agent to bypass SSL validation
const agent = new https.Agent({ rejectUnauthorized: false })

async function getCompletedTodos() {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
			agent
		}) // ✅ Added agent to bypass SSL validation
		const data = await res.json() // ✅ Added missing await

		// ✅ Filter for completed todos
		const completedTodos = data.filter((todo) => todo.completed)

		// ✅ Format the filtered todos
		return completedTodos.map(formatTodo)
	} catch (e) {
		console.error('Error fetching todos:', e.message) // ✅ Improved error message
		return [] // Return an empty array in case of failure
	}
}

module.exports = { getCompletedTodos }
