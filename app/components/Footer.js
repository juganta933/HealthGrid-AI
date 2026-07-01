export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#d9fff7] px-6 py-10 text-[#12302f]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#13b7a7]/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-[#ff8c74]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/60 bg-white/35 p-6 shadow-[0_20px_60px_rgba(34,160,150,0.16)] backdrop-blur-2xl">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.04em]">
                HealthGrid AI
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#42615f]">
                Smart Health Center Management for faster decisions.
              </p>
            </div>

            <p className="rounded-full border border-white/60 bg-white/35 px-5 py-2 text-sm font-semibold text-[#2a7772] shadow-inner backdrop-blur-xl">
              AI-Driven PHC & CHC Monitoring
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-medium text-[#42615f]">
          © 2026 HealthGrid AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}