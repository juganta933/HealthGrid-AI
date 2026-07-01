"use client";

export default function Error({ error, reset }) {
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
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-[#ff8c74] to-[#ba1a1a] text-3xl font-bold text-white shadow-[0_0_30px_rgba(186,26,26,0.25)]">
            !
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-600">
            Application Error
          </p>

          <h1 className="mt-4 bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-4xl font-bold tracking-[-0.06em] text-transparent md:text-6xl">
            Something went wrong
          </h1>

          <p className="mx-auto mt-5 max-w-lg rounded-2xl border border-red-200 bg-red-50/70 px-5 py-4 text-sm font-semibold leading-6 text-red-600 backdrop-blur-xl">
            {error?.message || "An unexpected error occurred."}
          </p>

          <button
            type="button"
            onClick={reset}
            className="group relative mt-8 overflow-hidden rounded-full bg-[#006a61] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Try again</span>
          </button>
        </div>
      </section>
    </main>
  );
}