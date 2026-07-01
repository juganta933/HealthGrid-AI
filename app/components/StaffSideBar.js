"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StaffSidebar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [staffInfo, setStaffInfo] = useState({
    centerName: "",
    centerId: "",
    staffName: "",
  });

  useEffect(() => {
    const centerName = localStorage.getItem("centerName") || "";
    const centerId = localStorage.getItem("centerId") || "";
    const staffName = localStorage.getItem("staffName") || "";

    setStaffInfo({
      centerName,
      centerId,
      staffName,
    });
  }, []);

  function handleLogout() {
    document.cookie = "userRole=; path=/; max-age=0";

    localStorage.removeItem("centerName");
    localStorage.removeItem("centerId");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffId");

    router.push("/login");
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-4">
      <nav className="mx-auto max-w-7xl overflow-hidden rounded-full border border-[#006a61]/25 bg-white/55 px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_45px_rgba(0,106,97,0.14)] backdrop-blur-3xl backdrop-saturate-150">
        <div className="relative flex items-center justify-between">
          {/* Logo / Staff Info */}
          <Link href="/staff/report" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#13b7a7] to-[#0058be] text-lg font-bold text-white shadow-[0_0_20px_rgba(19,183,167,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              S
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-xl font-bold tracking-[-0.04em] text-transparent">
                Staff Panel
              </h2>

              <p className="hidden text-xs font-semibold text-[#3c4947] sm:block">
                {staffInfo.centerName || "Health Centre"} ·{" "}
                {staffInfo.staffName || "Staff"}
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-2 md:flex">
            <StaffNavLink href="/staff/report">Submit Report</StaffNavLink>

            <div className="rounded-full border border-white/70 bg-white/45 px-4 py-2 text-xs font-bold text-[#006a61] shadow-[0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl">
              Centre ID: {staffInfo.centerId || "N/A"}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="group relative overflow-hidden rounded-full bg-[#006a61] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/45 text-[#006a61] shadow-[0_10px_24px_rgba(0,106,97,0.12)] backdrop-blur-3xl transition-all duration-300 hover:bg-white/70 md:hidden"
          >
            <span className="text-xl font-bold">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="relative mt-4 space-y-3 rounded-[1.8rem] border border-white/70 bg-white/45 p-4 backdrop-blur-3xl md:hidden">
            <div className="rounded-[1.4rem] border border-white/70 bg-white/45 p-4">
              <p className="font-bold text-[#01201f]">
                {staffInfo.centerName || "Health Centre"}
              </p>

              <p className="mt-1 text-sm font-semibold text-[#3c4947]">
                Centre ID: {staffInfo.centerId || "N/A"}
              </p>

              <p className="mt-1 text-sm font-semibold text-[#3c4947]">
                Staff: {staffInfo.staffName || "N/A"}
              </p>
            </div>

            <Link
              href="/staff/report"
              onClick={() => setMenuOpen(false)}
              className="block rounded-full px-4 py-3 text-sm font-bold text-[#244443] transition-all duration-300 hover:bg-white/60 hover:text-[#006a61]"
            >
              Submit Report
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full bg-[#006a61] px-4 py-3 text-left text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:bg-[#13b7a7]"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

function StaffNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#244443] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/55 hover:text-[#006a61] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)]"
    >
      {children}
    </Link>
  );
}