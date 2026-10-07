import { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import ChatBox from "../components/ChatBox";
import {
  getNotes,
  deleteNote,
} from "../services/noteService";

const Dashboard = () => {
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
          "Failed to load notes."
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
      await deleteNote(noteId);

      setNotes((currentNotes) =>
        currentNotes.filter(
          (note) => note._id !== noteId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete note."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Your Knowledge Base
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Save knowledge, organize your thoughts, and ask
            your AI-powered knowledge base questions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Knowledge + Form */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Knowledge */}
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  My Knowledge
                </h3>

                <p className="text-sm text-slate-500">
                  {notes.length}{" "}
                  {notes.length === 1
                    ? "knowledge item"
                    : "knowledge items"}
                </p>
              </div>
            </div>

            {loading && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />

                <p className="text-sm text-slate-500">
                  Loading your knowledge...
                </p>
              </div>
            )}

            {!loading && notes.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h4 className="font-semibold text-slate-900">
                  No knowledge yet
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Add your first note or public URL to start
                  building your knowledge base.
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

          {/* Add/Edit Knowledge */}
          <section>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <NoteForm
                onNoteCreated={handleNoteCreated}
                editingNote={editingNote}
                onNoteUpdated={handleNoteUpdated}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </section>
        </div>

        {/* Chat */}
        <section className="mt-8">
          <ChatBox />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;