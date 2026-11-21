import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/TodoEdit";

export default function TodoDetail({ todos, updateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">Tugas tidak ditemukan.</p>
        <button onClick={() => navigate("/")} className="rounded bg-red-600 px-3 py-1.5 text-sm text-white">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-2xl grid-cols-[1fr_auto] gap-8 rounded-lg border border-gray-200 p-6 shadow-sm">
        <div>
          <h3 className="font-bold">Judul</h3>
          <p className="mb-3 text-xs">{todo.title}</p>
          <h3 className="font-bold">Deskripsi</h3>
          <div className="h-24 rounded border border-indigo-200 p-2 text-xs">{todo.description}</div>
        </div>

        <div className="min-w-40">
          <h3 className="font-bold">Status</h3>
          <p className="mb-2 text-xs">{todo.status}</p>
          <h3 className="font-bold">Prioritas</h3>
          <p className="mb-2 text-xs">{todo.priority}</p>
          <h3 className="font-bold">Deadline</h3>
          <p className="mb-3 text-xs">{todo.deadline}</p>
          <div className="flex gap-2">
            <button onClick={() => navigate("/")} className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700">
              Kembali
            </button>
            <button onClick={() => setShowEdit(true)} className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">
              Update
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          heading="Update Todo"
          submitLabel="Update"
          initialData={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
            setShowEdit(false);
          }}
        />
      )}
    </div>
  );
}
