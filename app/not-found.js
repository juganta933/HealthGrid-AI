import Link from "next/link";

export default function NotFound() {
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

      <section className="glass-card relative w-full max-w-2xl overflow-hidden rounded-[3rem] p-8 text-center md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#71f8e6]/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#d8e2ff]/40 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-[#13b7a7] to-[#0058be] text-3xl font-bold text-white shadow-[0_0_30px_rgba(19,183,167,0.35)]">
            !
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#006a61]">
            Page Not Found
          </p>

          <h1 className="mt-4 bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-7xl font-bold tracking-[-0.08em] text-transparent md:text-8xl">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em] text-[#01201f] md:text-4xl">
            This page does not exist.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-6 text-[#3c4947] md:text-base">
            The page you are looking for may have been moved, deleted, or never
            existed.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group relative overflow-hidden rounded-full bg-[#006a61] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Go Home</span>
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-white/80 bg-white/45 px-7 py-3 text-sm font-bold text-[#006a61] shadow-[0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}