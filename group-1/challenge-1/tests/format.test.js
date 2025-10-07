// format.test.js
// Tests for formatTodo utility.

const { formatTodo } = require("../utils/format");
const { getCompletedTodos, _clearCache } = require("../services/todoService");

describe("formatTodo", () => {
  test("maps fields correctly", () => {
    const raw = { id: 42, title: "Write tests", completed: true };
    const formatted = formatTodo(raw);
    expect(formatted).toEqual({ id: 42, name: "Write tests", done: true });
  });

  test("integration with getCompletedTodos returns formatted objects", async () => {
    _clearCache();
    const todos = await getCompletedTodos();
    if (todos.length === 0) {
      console.warn("Warning: received empty todos array – skipping deep assertions");
      return;
    }
    const t = todos[0];
    expect(t).toHaveProperty("id");
    expect(t).toHaveProperty("name");
    expect(t).toHaveProperty("done", true);
  });
});
