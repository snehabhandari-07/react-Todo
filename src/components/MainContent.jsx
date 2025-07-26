import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default function MainContent() {
  const [todo, setTodo] = useState(""); // input text
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleEdit = (index) => {
    let newTodoText = prompt("Update Todo");
    if (newTodoText === null || newTodoText.trim() === "") {
      return;
    }
    // console.log(newTodoText);
    let updateVal = todos.map((val, idx) => {
      if (idx === index) {
        return { ...val, todo: newTodoText.trim() };
      }
      return val;
    });
    setTodos(updateVal);
  };

  const handleDelete = (index) => {
    let afterDelete = todos.filter((_, idx) => idx != index);
    setTodos(afterDelete);
  };

  const handleCheck = (index) => {
    let updateCheck = todos.map((val, idx) => {
      if (idx == index) {
        return { ...val, isCompleted: !val.isCompleted };
      }
      return val;
    });
    setTodos(updateCheck);
  };

  return (
    <div className="mx-auto max-w-lg bg-slate-300 min-h-[500px] rounded p-4">
      <div className="input flex justify-center gap-2">
        <input
          placeholder="Add task"
          className="p-2 rounded"
          value={todo}
          onChange={handleChange}
        />
        <button
          onClick={handleAdd}
          type="submit"
          className="bg-slate-600 text-white p-2 rounded m-1"
        >
          Add
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {todos.map((val, idx) => {
          return (
            <div
              key={val.id}
              className="flex items-center justify-between bg-white p-3 rounded shadow"
            >
              <input
                type="checkbox"
                checked={val.isCompleted}
                onChange={() => handleCheck(idx)}
              ></input>
              <span className={val.isCompleted ? "line-through" : ""}>
                {val.todo}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(idx)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
