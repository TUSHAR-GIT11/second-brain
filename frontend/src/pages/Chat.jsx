import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Sidebar />

      <div className="min-h-screen lg:ml-64">
        <Header />

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              AI Assistant
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Ask your Second Brain
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ask questions and get answers grounded in the
              knowledge you have saved.
            </p>
          </div>

          <ChatBox />
        </main>
      </div>
    </div>
  );
};

export default Chat;