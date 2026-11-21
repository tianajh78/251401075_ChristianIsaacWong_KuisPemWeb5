import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoEdit";

export default function TodoList({ todos, addTodo, deleteTodo }) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (todo) => {
    if (window.confirm(`Hapus tugas "${todo.title}"?`)) deleteTodo(todo.id);
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
        >
          Tambah Todo
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2">Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                Belum ada tugas.
              </td>
            </tr>
          )}
          {todos.map((todo) => (
            <tr key={todo.id} className="border-b border-gray-100">
              <td className="max-w-[200px] truncate py-3">{todo.title}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => navigate(`/todo/${todo.id}`)}
                    className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700"
                    aria-label="Lihat detail"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(todo)}
                    className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
                    aria-label="Hapus"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <TodoModal
          heading="Tambah Todo"
          submitLabel="Tambah"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            addTodo(data);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}
