import { useTheme } from "../context/ThemeContext";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const isUrl = note.sourceType === "url";
  const { theme } = useTheme();

  return (
    <article
      className={`group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-900 hover:border-slate-700"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                isUrl
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {isUrl ? "↗" : "✦"}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isUrl
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {isUrl ? "PUBLIC URL" : "TEXT NOTE"}
            </span>
          </div>

          <h3
            className={`min-w-0 truncate text-base font-semibold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {note.title}
          </h3>
        </div>

        <div
          className={`shrink-0 transition ${
            theme === "dark"
              ? "text-slate-600 group-hover:text-slate-500"
              : "text-slate-300 group-hover:text-slate-400"
          }`}
        >
          •••
        </div>
      </div>

      {/* Content */}
      <p
        className={`mt-4 min-w-0 flex-1 break-words text-sm leading-6 line-clamp-4 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {note.content}
      </p>

      {/* Source URL */}
      {isUrl && note.sourceUrl && (
        <p
          className={`mt-4 min-w-0 truncate rounded-lg px-3 py-2 text-xs ${
            theme === "dark"
              ? "bg-slate-800 text-slate-400"
              : "bg-slate-50 text-slate-400"
          }`}
        >
          {note.sourceUrl}
        </p>
      )}

      {/* Actions */}
      <div
        className={`mt-5 flex min-w-0 gap-2 border-t pt-4 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-slate-100"
        }`}
      >
        <button
          type="button"
          onClick={() => onEdit(note)}
          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            theme === "dark"
              ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(note._id)}
          className="min-w-0 flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default NoteCard;