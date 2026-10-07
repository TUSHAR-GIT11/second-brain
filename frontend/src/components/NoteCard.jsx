const NoteCard = ({ note, onEdit, onDelete }) => {
  const isUrl = note.sourceType === "url";

  return (
    <article className="group flex min-w-0 h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                isUrl
                  ? "bg-blue-50 text-blue-600"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {isUrl ? "↗" : "✦"}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isUrl
                  ? "bg-blue-50 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isUrl ? "PUBLIC URL" : "TEXT NOTE"}
            </span>
          </div>

          <h3 className="min-w-0 truncate text-base font-semibold text-slate-900">
            {note.title}
          </h3>
        </div>

        <div className="text-slate-300 transition group-hover:text-slate-400">
          •••
        </div>
      </div>

      {/* Content */}
      <p className="mt-4 min-w-0 flex-1 break-words text-sm leading-6 text-slate-500 line-clamp-4">
        {note.content}
      </p>

      {/* Source */}
      {isUrl && note.sourceUrl && (
        <p className="mt-4 min-w-0 truncate rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-400">
          {note.sourceUrl}
        </p>
      )}

      {/* Actions */}
      <div className="mt-5 flex min-w-0 gap-2 border-t border-slate-100 pt-4">
        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"

        className="min-w-0 flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      </div>
    </article>
  );
};

export default NoteCard;