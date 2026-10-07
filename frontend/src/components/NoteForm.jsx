import { useEffect, useState } from "react";
import {
  createNote,
  updateNote,
} from "../services/noteService";

const NoteForm = ({
  onNoteCreated,
  editingNote,
  onNoteUpdated,
  onCancelEdit,
}) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    sourceType: "text",
    sourceUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(editingNote);

  useEffect(() => {
    if (editingNote) {
      setForm({
        title: editingNote.title,
        content: editingNote.content,
        sourceType: editingNote.sourceType,
        sourceUrl: editingNote.sourceUrl || "",
      });
    } else {
      setForm({
        title: "",
        content: "",
        sourceType: "text",
        sourceUrl: "",
      });
    }

    setError("");
  }, [editingNote]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        const updatedNote = await updateNote(
          editingNote._id,
          form
        );

        onNoteUpdated(updatedNote);
      } else {
        const newNote = await createNote(form);

        onNoteCreated(newNote);

        setForm({
          title: "",
          content: "",
          sourceType: "text",
          sourceUrl: "",
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save knowledge."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      title: "",
      content: "",
      sourceType: "text",
      sourceUrl: "",
    });

    setError("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {isEditing ? "Edit Knowledge" : "Add Knowledge"}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isEditing
            ? "Update your saved knowledge."
            : "Add a note or public URL to your knowledge base."}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="e.g. React Hooks"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-slate-800"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Source Type
        </label>

        <select
          name="sourceType"
          value={form.sourceType}
          onChange={handleChange}
          disabled={
            isEditing && editingNote.sourceType === "url"
          }
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-600 dark:focus:ring-slate-800 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          <option value="text">Text Note</option>
          <option value="url">Public URL</option>
        </select>
      </div>

      {form.sourceType === "text" ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Knowledge
          </label>

          <textarea
            name="content"
            placeholder="Write your knowledge..."
            value={form.content}
            onChange={handleChange}
            rows="7"
            required
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-slate-800"
          />
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Public URL
          </label>

          <input
            type="url"
            name="sourceUrl"
            placeholder="https://example.com/article"
            value={form.sourceUrl}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-slate-800"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Knowledge"
            : "Add Knowledge"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;