import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";
import Toast from "./components/Confirm";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const addTodo = (data) => {
    setTodos((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [...prev, { id: nextId, ...data }];
    });
    notify("Tugas berhasil ditambahkan.");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data, id } : t)));
    notify("Tugas berhasil diperbarui.");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus.");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />} />
        <Route path="/todo/:id" element={<TodoDetail todos={todos} updateTodo={updateTodo} />} />
      </Routes>
      <Toast message={toast} />
    </>
  );
}
