"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        document.cookie = "userRole=admin; path=/; max-age=86400";
        router.push("/admin/dashboard");
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e9fffb] px-6 py-28 text-[#01201f]">
      {/* Liquid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(80,219,202,0.38),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(255,180,165,0.32),transparent_35%)]" />

        <div className="absolute -left-40 -top-40 h-[620px] w-[620px] animate-pulse rounded-full bg-[#71f8e6]/45 blur-[150px] [animation-duration:15s]" />
        <div className="absolute -right-60 top-1/3 h-[720px] w-[720px] animate-pulse rounded-full bg-[#d8e2ff]/40 blur-[150px] [animation-duration:20s]" />
        <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] animate-pulse rounded-full bg-[#ffdad3]/35 blur-[150px] [animation-duration:18s]" />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(60deg,rgba(0,106,97,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
      </div>

      <section className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        {/* Left content */}
        <div className="hidden lg:block">
          <div className="glass-card rounded-[3rem] p-10">
            <div className="mb-8 inline-flex rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
              Admin Control
            </div>

            <h1 className="max-w-xl bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-6xl font-bold leading-tight tracking-[-0.06em] text-transparent">
              Command center for health decisions.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#3c4947]">
              Login to review center reports, monitor high-risk facilities,
              check medicine stock pressure, and act before problems become
              critical.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <AdminStat title="Centers" value="Live" />
              <AdminStat title="Alerts" value="Smart" />
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="glass-card relative mx-auto w-full max-w-md rounded-[3rem] p-7 md:p-9">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#71f8e6]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#d8e2ff]/40 blur-3xl" />

          <div className="relative">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#13b7a7] to-[#0058be] text-2xl font-bold text-white shadow-[0_0_28px_rgba(19,183,167,0.35)]">
                A
              </div>

              <h1 className="text-4xl font-bold tracking-[-0.05em] text-[#01201f]">
                Admin Login
              </h1>

              <p className="mt-2 text-sm font-medium text-[#3c4947]">
                Enter admin credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#244443]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  className="w-full rounded-2xl border border-white/80 bg-white/45 px-5 py-4 text-[#01201f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 placeholder:text-[#6c7a77] focus:border-[#50dbca] focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(80,219,202,0.18)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#244443]">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-white/80 bg-white/45 px-5 py-4 text-[#01201f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 placeholder:text-[#6c7a77] focus:border-[#50dbca] focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(80,219,202,0.18)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-[#006a61] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-[#006a61]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {loading ? "Logging in..." : "Login as Admin"}
                </span>
              </button>
            </form>

            {message && (
              <p className="mt-6 rounded-2xl border border-red-200 bg-red-50/70 px-4 py-3 text-center text-sm font-semibold text-red-600 backdrop-blur-xl">
                {message}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminStat({ title, value }) {
  return (
    <div className="rounded-[1.7rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/55">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold text-[#01201f]">{value}</p>
    </div>
  );
}