import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      login(response.data.token);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#f7f8fa]">
      {/* Brand panel */}
      <section className="hidden w-1/2 bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
            S
          </div>

          <div>
            <p className="font-semibold">Second Brain</p>
            <p className="text-xs text-slate-500">
              AI-powered knowledge base
            </p>
          </div>
        </div>

        <div className="max-w-lg">
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400">
            ✦ Personal AI Knowledge
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Your knowledge.
            <br />
            Always within reach.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Save what you learn, connect your knowledge, and
            retrieve useful information with an AI assistant
            grounded in your own knowledge base.
          </p>
        </div>

        <p className="text-xs text-slate-600">
          Second Brain · AI-Augmented Knowledge Base
        </p>
      </section>

      {/* Login */}
      <section className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              S
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Second Brain
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your AI-powered knowledge base
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue to your knowledge base.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;