export default function Loading() {
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

      <div className="glass-card relative w-full max-w-md rounded-[3rem] p-8 text-center">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#71f8e6]/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#d8e2ff]/40 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-[#13b7a7] to-[#0058be] shadow-[0_0_30px_rgba(19,183,167,0.35)]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#006a61]">
            HealthGrid AI
          </p>

          <h1 className="mt-3 bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-4xl font-bold tracking-[-0.05em] text-transparent">
            Loading page...
          </h1>

          <p className="mt-4 text-sm font-medium leading-6 text-[#3c4947]">
            Preparing your health center workspace.
          </p>
        </div>
      </div>
    </main>
  );
}