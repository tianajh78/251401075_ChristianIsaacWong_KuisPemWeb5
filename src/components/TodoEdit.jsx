import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos";

const EMPTY = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoModal({ heading, submitLabel, initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(initialData ?? EMPTY);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError("Judul dan deadline wajib diisi.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  const input = "w-full rounded border border-indigo-300 px-2 py-1 text-sm outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
        <h2 className="mb-3 text-center text-sm font-bold">{heading}</h2>

        <label className="text-sm font-bold">Judul</label>
        <input name="title" value={form.title} onChange={handleChange} className={`${input} mb-3`} />

        <label className="text-sm font-bold">Deskripsi</label>
        <textarea name="description" rows={3} value={form.description} onChange={handleChange} className={`${input} mb-3`} />

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={input}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-bold">Prioritas</label>
            <select name="priority" value={form.priority} onChange={handleChange} className={input}>
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label className="text-sm font-bold">Deadline</label>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className={`${input} mb-3`} />

        {error && <p className="mb-2 text-xs text-red-600">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} className="rounded bg-red-600 py-1.5 text-sm text-white hover:bg-red-700">
            Batal
          </button>
          <button type="submit" className="rounded bg-blue-600 py-1.5 text-sm text-white hover:bg-blue-700">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
