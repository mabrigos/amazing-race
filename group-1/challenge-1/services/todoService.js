// todoService.js
// Fetches todos from remote placeholder API and exposes only completed ones, formatted.

const fetch = require("node-fetch");
const { formatTodo } = require("../utils/format");

// Simple in-memory cache to avoid repeated network calls within the same process run.
let _cache = {
  fetchedAt: null,
  todos: null
};
const CACHE_TTL_MS = 60_000; // 1 minute TTL (overkill here but illustrates approach)

/**
 * Retrieve completed todos from remote API.
 * - Applies simple in-memory caching (1 min).
 * - Formats each todo to { id, name, done } shape.
 * - Returns an empty array on failure (never throws to caller).
 *
 * @returns {Promise<Array<{id:number,name:string,done:boolean}>>}
 */
async function getCompletedTodos() {
  // Serve from cache if fresh
  if (_cache.todos && _cache.fetchedAt && Date.now() - _cache.fetchedAt < CACHE_TTL_MS) {
    return _cache.todos;
  }

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) {
      throw new Error(`Unexpected response: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const completed = data.filter(todo => todo && todo.completed === true).map(formatTodo);
    // Update cache
    _cache = { fetchedAt: Date.now(), todos: completed };
    return completed;
  } catch (e) {
    console.error("Error fetching todos:", e);
    return [];
  }
}

/** Clears the internal cache (mainly for testing). */
function _clearCache() {
  _cache = { fetchedAt: null, todos: null };
}

module.exports = { getCompletedTodos, _clearCache };