import { useState } from "react";
import api from "../services/api";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setError("");
    setQuery("");
    setLoading(true);

    const userMessage = {
      role: "user",
      content: trimmedQuery,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    try {
      const response = await api.post("/chat", {
        query: trimmedQuery,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to get an answer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Ask your knowledge base
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask questions based on the knowledge you have saved.
        </p>
      </div>

      <div className="min-h-[320px] max-h-[500px] space-y-4 overflow-y-auto bg-slate-50 p-5">
        {messages.length === 0 && !loading && (
          <div className="flex min-h-[260px] items-center justify-center text-center">
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                ✦
              </div>

              <h3 className="font-medium text-slate-800">
                Ask anything from your knowledge
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Your answers are generated using the knowledge
                you have saved in Second Brain.
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "rounded-br-md bg-slate-900 text-white"
                  : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
              }`}
            >
              <p className="mb-1 text-xs font-semibold opacity-60">
                {message.role === "user" ? "You" : "Second Brain"}
              </p>

              <p className="whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="border-t border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 border-t border-slate-200 p-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something from your knowledge base..."
          disabled={loading}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
        />

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "..." : "Ask"}
        </button>
      </form>
    </section>
  );
};

export default ChatBox;