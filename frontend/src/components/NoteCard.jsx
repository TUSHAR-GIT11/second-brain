const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {note.title}
          </h3>

          <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {note.sourceType === "url" ? "Public URL" : "Text Note"}
          </span>
        </div>
      </div>

      <p className="mb-5 line-clamp-4 flex-1 text-sm leading-6 text-slate-600">
        {note.content.length > 150
          ? `${note.content.slice(0, 150)}...`
          : note.content}
      </p>

      <div className="flex gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default NoteCard;