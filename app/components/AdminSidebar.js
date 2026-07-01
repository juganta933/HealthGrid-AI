"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    document.cookie = "userRole=; path=/; max-age=0";
    router.push("/admin/login");
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-4">
      <nav className="mx-auto max-w-7xl overflow-hidden rounded-full border border-[#006a61]/25 bg-[#01201f]/75 px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_45px_rgba(0,32,31,0.28)] backdrop-blur-3xl backdrop-saturate-150">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/admin/dashboard" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#71f8e6] to-[#13b7a7] text-lg font-bold text-[#01201f] shadow-[0_0_22px_rgba(113,248,230,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              A
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-[#71f8e6] via-[#50dbca] to-white bg-clip-text text-xl font-bold tracking-[-0.04em] text-transparent">
                Admin Panel
              </h2>

              <p className="hidden text-xs font-semibold text-[#b7d8d5] sm:block">
                HealthGrid AI
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-2 md:flex">
            <AdminNavLink href="/admin/dashboard">Dashboard</AdminNavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="group relative overflow-hidden rounded-full bg-[#71f8e6] px-5 py-2.5 text-sm font-bold text-[#01201f] shadow-[0_12px_28px_rgba(113,248,230,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_rgba(113,248,230,0.32)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#71f8e6] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-3xl transition-all duration-300 hover:bg-white/20 md:hidden"
          >
            <span className="text-xl font-bold">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="relative mt-4 space-y-3 rounded-[1.8rem] border border-white/15 bg-white/10 p-4 backdrop-blur-3xl md:hidden">
            <Link
              href="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block rounded-full px-4 py-3 text-sm font-bold text-[#d7f7f5] transition-all duration-300 hover:bg-white/12 hover:text-[#71f8e6]"
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full bg-[#71f8e6] px-4 py-3 text-left text-sm font-bold text-[#01201f] shadow-[0_12px_28px_rgba(113,248,230,0.22)] transition-all duration-300 hover:bg-white"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

function AdminNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#d7f7f5] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12 hover:text-[#71f8e6] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_25px_rgba(0,0,0,0.18)]"
    >
      {children}
    </Link>
  );
}