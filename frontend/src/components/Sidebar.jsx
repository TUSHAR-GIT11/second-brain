import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  {
    label: "Overview",
    path: "/",
    icon: "⌂",
  },
  {
    label: "Knowledge",
    path: "/knowledge",
    icon: "▣",
  },
  {
    label: "AI Chat",
    path: "/chat",
    icon: "✦",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="w-full shrink-0 lg:w-64">
      {/* Mobile Top Bar */}
      <div className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            S
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Second Brain
            </h1>

            <p className="text-[11px] text-slate-400">
              AI knowledge base
            </p>
          </div>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label="Open navigation"
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <button
            type="button"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
            aria-label="Close navigation"
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl dark:bg-slate-900">
            {/* Drawer Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                  S
                </div>

                <div>
                  <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                    Second Brain
                  </h1>

                  <p className="text-[11px] text-slate-400">
                    AI knowledge base
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeSidebar}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Workspace
              </p>

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <span className="flex h-7 w-7 items-center justify-center">
                    {item.icon}
                  </span>

                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              {/* AI Status */}
              <div className="rounded-xl bg-slate-50 px-3 py-3 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    AI Ready
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-slate-400">
                  Your knowledge base is ready.
                </p>
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="mb-3 mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <span>
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </span>

                <span className="text-base">
                  {theme === "light" ? "🌙" : "☀️"}
                </span>
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            S
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Second Brain
            </h1>

            <p className="text-[11px] text-slate-400">
              AI knowledge base
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Workspace
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="flex h-7 w-7 items-center justify-center">
                {item.icon}
              </span>

              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-xl bg-slate-50 px-3 py-3 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                AI Ready
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              Your knowledge base is ready.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;