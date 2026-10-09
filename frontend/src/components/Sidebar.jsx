
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useSidebar } from "../context/SidebarContext";

const navItems = [
  { label: "Overview", path: "/", icon: "⌂" },
  { label: "Knowledge", path: "/knowledge", icon: "▣" },
  { label: "AI Chat", path: "/chat", icon: "✦" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isCollapsed, toggleSidebar } = useSidebar();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center rounded-xl py-2.5 text-sm font-medium transition ${
      isCollapsed ? "justify-center px-2" : "gap-3 px-3"
    } ${
      isActive
        ? "bg-slate-950 text-white"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="w-full shrink-0 lg:w-auto">
      {/* Mobile Top Bar */}
      <div className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
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
          <button
            type="button"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
            aria-label="Close navigation"
          />

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

            {/* Mobile Navigation */}
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Footer */}
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

              <button
                type="button"
                onClick={toggleTheme}
                className="mb-3 mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <span>
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </span>
                <span>{theme === "light" ? "🌙" : "☀️"}</span>
              </button>

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
      <aside
        className={`hidden h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-300 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:flex ${
          isCollapsed ? "lg:w-[72px]" : "lg:w-64"
        }`}
      >
        {/* Brand and Toggle */}
        <div
          className={`shrink-0 border-b border-slate-200 dark:border-slate-800 ${
            isCollapsed
              ? "flex flex-col items-center gap-2 py-3"
              : "flex h-16 items-center justify-between gap-2 px-4"
          }`}
        >
          <div
            className={`flex min-w-0 items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm">
              S
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="whitespace-nowrap text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  Second Brain
                </h1>
                <p className="whitespace-nowrap text-[11px] text-slate-400">
                  AI knowledge base
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${
              isCollapsed ? "h-8 w-9" : "h-8 w-8"
            }`}
            aria-label={
              isCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
              {isCollapsed ? (
                <path d="m13 9 3 3-3 3" />
              ) : (
                <path d="m16 9-3 3 3 3" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 space-y-1 overflow-x-hidden p-3">
          {!isCollapsed && (
            <p className="mb-3 whitespace-nowrap px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Workspace
            </p>
          )}

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={navLinkClass}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-base">
                {item.icon}
              </span>

              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Footer */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div
            className={`rounded-xl bg-slate-50 py-3 dark:bg-slate-800 ${
              isCollapsed ? "flex justify-center px-1" : "px-3"
            }`}
            title={isCollapsed ? "AI Ready" : undefined}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

              {!isCollapsed && (
                <span className="whitespace-nowrap text-xs font-medium text-slate-700 dark:text-slate-300">
                  AI Ready
                </span>
              )}
            </div>

            {!isCollapsed && (
              <p className="mt-1 text-[11px] text-slate-400">
                Your knowledge base is ready.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
