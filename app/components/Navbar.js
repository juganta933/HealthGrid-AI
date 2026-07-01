import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-6 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/80 bg-white/35 px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_45px_rgba(0,106,97,0.12)] backdrop-blur-3xl backdrop-saturate-150">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#13b7a7] to-[#0058be] text-lg font-bold text-white shadow-[0_0_20px_rgba(19,183,167,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            H
          </div>

          <h2 className="bg-gradient-to-r from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-xl font-bold tracking-[-0.04em] text-transparent">
            HealthGrid AI
          </h2>
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-2 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/login">Login</NavLink>

          <Link
            href="/signup"
            className="group relative overflow-hidden rounded-full bg-[#006a61] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Staff Signup</span>
          </Link>
        </div>

        {/* Mobile Simple Links */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/login"
            className="rounded-full border border-white/80 bg-white/40 px-4 py-2 text-sm font-bold text-[#006a61] backdrop-blur-xl transition-all duration-300 hover:bg-white/70"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#006a61] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#13b7a7]"
          >
            Signup
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#244443] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/55 hover:text-[#006a61] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)]"
    >
      {children}
    </Link>
  );
}