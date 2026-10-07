import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getNotes } from "../services/noteService";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const recentNotes = notes.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa] lg:flex-row">
  <Sidebar />

  <div className="min-w-0 flex-1">
        <Header />

        <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Overview
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Your Second Brain
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A personal knowledge base powered by retrieval
              augmented generation.
            </p>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Knowledge items
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {loading ? "—" : notes.length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Saved notes and sources
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Knowledge sources
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {loading
                  ? "—"
                  : notes.filter(
                      (note) => note.sourceType === "url"
                    ).length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Public URLs ingested
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                RAG status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Ready
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Retrieval system available
              </p>
            </div>
          </section>

          {/* Recent Knowledge */}
          <section className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Recent
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                  Recent knowledge
                </h2>
              </div>

              <a
                href="/knowledge"
                className="shrink-0 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                View all →
              </a>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && recentNotes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-lg">
                  ✦
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No knowledge yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                  Add your first note or public URL from the
                  Knowledge section.
                </p>

                <a
                  href="/knowledge"
                  className="mt-5 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Add knowledge
                </a>
              </div>
            )}

            {/* Recent Notes */}
            {!loading && recentNotes.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentNotes.map((note) => (
                  <div
                    key={note._id}
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <span className="min-w-0 truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        {note.sourceType === "url"
                          ? "Public URL"
                          : "Text Note"}
                      </span>

                      <span className="shrink-0 text-slate-300">
                        •••
                      </span>
                    </div>

                    <h3 className="mt-4 min-w-0 truncate text-sm font-semibold text-slate-900">
                      {note.title}
                    </h3>

                    <p className="mt-2 min-w-0 break-words line-clamp-3 text-xs leading-5 text-slate-500">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href="/knowledge"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                +
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Add knowledge
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Save a text note or ingest a public URL.
              </p>

              <span className="mt-4 block text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                Open Knowledge →
              </span>
            </a>

            <a
              href="/chat"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                ✦
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Ask your Second Brain
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Ask questions and retrieve information from
                your saved knowledge.
              </p>

              <span className="mt-4 block text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                Open AI Chat →
              </span>
            </a>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;