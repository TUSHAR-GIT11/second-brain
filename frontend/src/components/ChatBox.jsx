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
    <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            ✦
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Second Brain AI
            </h3>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400">
                Grounded in your knowledge
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-[360px] max-h-[560px] min-w-0 space-y-5 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
        {messages.length === 0 && !loading && (
          <div className="flex min-h-[300px] items-center justify-center text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl shadow-sm">
                ✦
              </div>

              <h4 className="mt-5 text-base font-semibold text-slate-900">
                Ask your knowledge base
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask questions about the notes and sources you've
                saved. Answers are generated using your retrieved
                knowledge.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "What have I saved?",
                  "Explain React Hooks",
                  "What is Express routing?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
  className={`flex min-w-0 max-w-[95%] gap-3 sm:max-w-[78%] ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:flex ${
                    isUser
                      ? "bg-slate-200 text-slate-600"
                      : "bg-slate-950 text-white"
                  }`}
                >
                  {isUser ? "Y" : "✦"}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                    isUser
                      ? "rounded-tr-md bg-slate-950 text-white"
                      : "rounded-tl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide opacity-50">
                    {isUser ? "You" : "Second Brain"}
                  </p>

                  <p className="whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="flex max-w-[78%] gap-3">
              <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white sm:flex">
                ✦
              </div>

              <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="border-t border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 bg-white p-4 sm:p-5"
      >
        <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something from your knowledge..."
            disabled={loading}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>

        <p className="mt-2 px-1 text-[11px] text-slate-400">
          Answers are generated only from your saved knowledge.
        </p>
      </form>
    </section>
  );
};

export default ChatBox;