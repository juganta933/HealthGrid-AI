import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function HomePage() {
  const heroCards = [
    {
      icon: "📋",
      title: "Daily Report Submission",
      text: "Streamlined digital reporting for frontline staff with automated validation.",
      color: "bg-[#71f8e6]/30",
    },
    {
      icon: "💊",
      title: "Stock-out Prediction",
      text: "AI-powered forecasting to prevent medical supply shortages before they occur.",
      color: "bg-[#ffdad3]/45",
    },
  ];

  const features = [
    {
      icon: "📊",
      title: "Risk Score Calculation",
      text: "Dynamic scoring of facilities based on patient inflow, staff availability, and disease outbreaks.",
      color: "bg-[#006a61]/10",
    },
    {
      icon: "🔁",
      title: "Redistribution Recommendations",
      text: "Smart supply chain balancing to ensure every center has essential life-saving drugs.",
      color: "bg-[#0058be]/10",
    },
    {
      icon: "🖥️",
      title: "Admin Dashboard",
      text: "A bird's-eye view for health secretaries to manage district-wide performance metrics.",
      color: "bg-[#9e412f]/10",
    },
    {
      icon: "🧠",
      title: "AI Summary",
      text: "Daily natural language briefings summarizing critical issues and suggested actions.",
      color: "bg-[#13b7a7]/10",
    },
  ];

  const processSteps = [
    {
      no: "01",
      title: "Staff submits",
      text: "Frontline workers input daily metrics through a clean digital report interface.",
      border: "border-[#006a61]",
      textColor: "text-[#006a61]",
    },
    {
      no: "02",
      title: "AI analyzes",
      text: "The system checks risk, stock pressure, bed usage, and emergency load.",
      border: "border-[#0058be]",
      textColor: "text-[#0058be]",
    },
    {
      no: "03",
      title: "Admin sees alerts",
      text: "Critical warnings and redistribution suggestions appear on the dashboard.",
      border: "border-[#9e412f]",
      textColor: "text-[#9e412f]",
    },
  ];

  return (
    <main
      className={`${spaceGrotesk.className} relative min-h-screen overflow-hidden bg-[#e9fffb] px-6 pb-20 pt-20 text-[#01201f]`}
    >
      {/* Liquid Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(80,219,202,0.38),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(255,180,165,0.32),transparent_35%)]" />

        <div className="absolute -left-40 -top-40 h-[620px] w-[620px] animate-pulse rounded-full bg-[#71f8e6]/45 blur-[150px] [animation-duration:15s]" />

        <div className="absolute -right-60 top-1/3 h-[720px] w-[720px] animate-pulse rounded-full bg-[#d8e2ff]/40 blur-[150px] [animation-duration:20s]" />

        <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] animate-pulse rounded-full bg-[#ffdad3]/35 blur-[150px] [animation-duration:18s]" />

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(60deg,rgba(0,106,97,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto mb-32 grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-10">
          <div className="inline-flex rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] shadow-[0_10px_30px_rgba(0,106,97,0.08)] backdrop-blur-3xl">
            HealthGrid AI
          </div>

          <h1 className="max-w-3xl bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-5xl font-bold leading-tight tracking-[-0.05em] text-transparent md:text-7xl">
            Smarter Health Centers.
            <br />
            Faster Decisions.
          </h1>

          <p className="max-w-xl text-lg leading-8 text-[#3c4947] md:text-xl">
            Transforming PHC/CHC management with real-time AI analytics.
            HealthGrid AI automates reporting, predicts stock-outs, and
            optimizes resource distribution across your clinical network.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row">
            {heroCards.map((card) => (
              <SmallGlassCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* Right Dashboard */}
        <div className="relative animate-[float_10s_ease-in-out_infinite]">
          <div className="glass-card relative overflow-hidden rounded-[56px] p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/10 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#71f8e6]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[#d8e2ff]/25 blur-3xl" />

            <div className="relative">
              {/* Dashboard Header */}
              <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-[#006a61]">
                    Live Overview
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#3c4947]">
                    Regional Dashboard - Sector 7
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-[#006a61]/20 bg-[#006a61]/10 px-4 py-2">
                  <div className="h-2 w-2 animate-ping rounded-full bg-[#006a61]" />
                  <span className="text-xs font-bold tracking-wider text-[#006a61]">
                    LIVE SYSTEM
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <MetricCard title="Risk Level">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full bg-[#ba1a1a] shadow-[0_0_15px_rgba(186,26,26,0.45)]" />
                    <span className="text-2xl font-semibold">
                      High Attention
                    </span>
                  </div>
                </MetricCard>

                <MetricCard title="Beds Capacity">
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-2xl font-semibold">82%</span>

                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[conic-gradient(#13B7A7_82%,rgba(19,183,167,0.1)_0)] shadow-[0_0_15px_rgba(80,219,202,0.4)]">
                      <div className="h-10 w-10 rounded-full bg-white/90" />
                    </div>
                  </div>
                </MetricCard>
              </div>

              {/* Recommendation */}
              <div className="group relative mb-12 cursor-pointer overflow-hidden rounded-[32px] border border-[#006a61]/20 bg-[#006a61]/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#006a61]/10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start gap-5">
                  <div className="rounded-2xl bg-[#006a61] p-3 text-white shadow-[0_0_15px_rgba(80,219,202,0.4)] transition-transform duration-300 group-hover:scale-110">
                    🧠
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#006a61]">
                      AI Recommendation
                    </h4>
                    <p className="leading-relaxed text-[#3c4947]">
                      Redistribute 500 units of Paracetamol from CHC-Alpha to
                      PHC-Beta based on 48h trend.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                  href="/login"
                  className="flex-1 rounded-2xl bg-[#006a61] py-5 text-center text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-[#006a61]/30 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="flex-1 rounded-2xl border-2 border-[#006a61]/30 py-5 text-center text-sm font-bold uppercase tracking-widest text-[#006a61] transition-all duration-300 hover:border-[#006a61] hover:bg-[#006a61]/5 active:scale-95"
                >
                  Staff Signup
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Decor */}
          <div className="glass-card absolute -right-8 -top-8 flex h-28 w-28 animate-bounce items-center justify-center rounded-3xl text-5xl shadow-2xl [animation-duration:4s]">
            🏥
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto mb-32 max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-[-0.02em] text-[#01201f] md:text-4xl">
            Enterprise-Grade Health Intelligence
          </h2>

          <p className="mx-auto max-w-2xl leading-7 text-[#3c4947]">
            Comprehensive tools designed to empower district administrators and
            medical officers with actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureGlassCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Process Flow */}
      <section className="glass-card relative mx-auto max-w-7xl overflow-hidden rounded-[64px] p-8 md:p-16">
        <div className="relative z-10">
          <h2 className="mb-16 text-center text-3xl font-semibold tracking-[-0.02em] text-[#01201f] md:text-4xl">
            Seamless Information Pipeline
          </h2>

          <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="absolute left-[15%] right-[15%] top-1/3 z-0 hidden h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#006a61]/10 via-[#006a61]/40 to-[#006a61]/10 lg:block" />

            {processSteps.map((step) => (
              <ProcessStep key={step.no} {...step} />
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#006a61]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#0058be]/5 blur-3xl" />
      </section>
    </main>
  );
}

function SmallGlassCard({ icon, title, text, color }) {
  return (
    <div className="glass-card group flex-1 cursor-default rounded-3xl p-6">
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${color} text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#71f8e6] group-hover:shadow-[0_0_15px_rgba(80,219,202,0.4)]`}
      >
        {icon}
      </div>

      <h3 className="mb-3 text-2xl font-semibold text-[#01201f]">{title}</h3>
      <p className="text-sm font-medium leading-6 text-[#3c4947]">{text}</p>
    </div>
  );
}

function MetricCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-2 hover:border-[#50dbca]/80 hover:bg-white/60 hover:shadow-[0_22px_55px_rgba(0,106,97,0.18)]">
      <span className="mb-2 block text-xs font-bold uppercase tracking-tight text-[#3c4947]">
        {title}
      </span>
      {children}
    </div>
  );
}

function FeatureGlassCard({ icon, title, text, color }) {
  return (
    <div className="glass-card group rounded-[40px] p-8 md:p-10">
      <div
        className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#71f8e6] group-hover:shadow-[0_0_20px_rgba(80,219,202,0.35)]`}
      >
        {icon}
      </div>

      <h3 className="mb-4 text-2xl font-semibold text-[#01201f]">{title}</h3>
      <p className="leading-relaxed text-[#3c4947]">{text}</p>
    </div>
  );
}

function ProcessStep({ no, title, text, border, textColor }) {
  return (
    <div className="group relative z-10 flex flex-col items-center text-center">
      <div
        className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border-4 bg-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${border}`}
      >
        <span className={`text-2xl font-semibold ${textColor}`}>{no}</span>
      </div>

      <h4 className="mb-4 text-2xl font-semibold text-[#01201f]">{title}</h4>

      <p className="max-w-xs leading-7 text-[#3c4947]">{text}</p>
    </div>
  );
}