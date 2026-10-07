import { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Sidebar from "../components/Sidebar";
import {
  getNotes,
  deleteNote,
} from "../services/noteService";

const Knowledge = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const loadNotes = async () => {
    try {
      setError("");

      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load your knowledge."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    setNotes((currentNotes) => [
      newNote,
      ...currentNotes,
    ]);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note._id === updatedNote._id
          ? updatedNote
          : note
      )
    );

    setEditingNote(null);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleDelete = async (noteId) => {
    try {
      setError("");

      await deleteNote(noteId);

      setNotes((currentNotes) =>
        currentNotes.filter(
          (note) => note._id !== noteId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete knowledge."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa] lg:flex-row">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Workspace
            </p>

            <div className="mt-1 flex items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Knowledge
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Manage the knowledge your Second Brain uses
                  for retrieval.
                </p>
              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                {notes.length}{" "}
                {notes.length === 1 ? "item" : "items"}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="min-w-0">
              {loading && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white"
                    />
                  ))}
                </div>
              )}

              {!loading && notes.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                    ✦
                  </div>

                  <h2 className="mt-5 font-semibold text-slate-900">
                    No knowledge yet
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Add your first text note or public URL to
                    start building your Second Brain.
                  </p>
                </div>
              )}

              {!loading && notes.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {notes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </section>

            <aside className="min-w-0">
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <NoteForm
                  onNoteCreated={handleNoteCreated}
                  editingNote={editingNote}
                  onNoteUpdated={handleNoteUpdated}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Knowledge;