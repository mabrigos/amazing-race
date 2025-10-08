// todo.test.js
// Run with: npx jest tests/todo.test.js

const { getCompletedTodos } = require("../services/todoService");

test("should only return completed todos", async () => {
  const todos = await getCompletedTodos();
  expect(Array.isArray(todos)).toBe(true);
  expect(todos.every(t => t.done === true)).toBe(true); // ❌ will fail
});

test("should have correct fields", async () => {
  const todos = await getCompletedTodos();
  expect(todos[0]).toHaveProperty("id");
  expect(todos[0]).toHaveProperty("name");
  expect(todos[0]).toHaveProperty("done");
});

test("should format todos correctly", async () => {
  const todos = await getCompletedTodos();
  expect(todos.length).toBeGreaterThan(0);
  
  const firstTodo = todos[0];
  expect(typeof firstTodo.id).toBe("number");
  expect(typeof firstTodo.name).toBe("string");
  expect(firstTodo.done).toBe(true);
});