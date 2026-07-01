"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardData, resolveAlert } from "@/app/lib/adminService";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const result = await getAdminDashboardData();

        if (result.success) {
          setDashboardData(result.data);
        } else {
          setMessage(result.error);
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  async function handleResolveAlert(alertId) {
    const result = await resolveAlert(alertId);

    if (result.success) {
      setDashboardData((prev) => ({
        ...prev,
        recentAlerts: prev.recentAlerts.filter((alert) => alert.id !== alertId),
      }));
    } else {
      setMessage(result.error);
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="glass-card mx-auto max-w-xl rounded-[2.5rem] p-8 text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#13b7a7]/20 border-t-[#13b7a7]" />
          <p className="text-lg font-bold text-[#006a61]">
            Loading admin dashboard...
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (message) {
    return (
      <DashboardShell>
        <div className="glass-card mx-auto max-w-xl rounded-[2.5rem] p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-red-500">
            Error
          </p>
          <p className="mt-3 text-lg font-semibold text-[#01201f]">
            {message}
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardShell>
        <div className="glass-card mx-auto max-w-xl rounded-[2.5rem] p-8 text-center">
          <p className="text-lg font-bold text-[#006a61]">
            No dashboard data found.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <section className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
            Admin Control Room
          </div>

          <h1 className="bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-5xl font-bold leading-tight tracking-[-0.06em] text-transparent md:text-7xl">
            Admin Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3c4947]">
            Monitor reports, review high-risk centers, resolve alerts, and
            understand the health system status from one place.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          <OverviewCard
            title="Total Reports"
            value={dashboardData.totalReports}
            tone="from-[#13b7a7] to-[#0058be]"
          />

          <OverviewCard
            title="Critical Reports"
            value={dashboardData.criticalReports}
            tone="from-[#ff6b6b] to-[#ba1a1a]"
          />

          <OverviewCard
            title="High Risk Reports"
            value={dashboardData.highRiskReports}
            tone="from-[#ffb4a5] to-[#f4846c]"
          />
        </div>

        {/* Alerts */}
        <section className="glass-card mb-12 rounded-[3rem] p-6 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
                Recent Alerts
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#01201f]">
                Urgent center warnings
              </h2>
            </div>

            <div className="rounded-full border border-white/70 bg-white/40 px-5 py-2 text-sm font-bold text-[#006a61] backdrop-blur-3xl">
              {dashboardData.recentAlerts.length} Active
            </div>
          </div>

          {dashboardData.recentAlerts.length === 0 ? (
            <EmptyState text="No alerts found." />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {dashboardData.recentAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onResolve={handleResolveAlert}
                />
              ))}
            </div>
          )}
        </section>

        {/* Reports */}
        <section className="glass-card rounded-[3rem] p-6 md:p-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
              Recent Reports
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#01201f]">
              Latest submitted health center reports
            </h2>
          </div>

          {dashboardData.recentReports.length === 0 ? (
            <EmptyState text="No reports found." />
          ) : (
            <div className="space-y-6">
              {dashboardData.recentReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </section>
      </section>
    </DashboardShell>
  );
}

function DashboardShell({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e9fffb] px-6 py-28 text-[#01201f]">
      {/* Liquid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.95),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(80,219,202,0.38),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(255,180,165,0.32),transparent_35%)]" />

        <div className="absolute -left-40 -top-40 h-[620px] w-[620px] animate-pulse rounded-full bg-[#71f8e6]/45 blur-[150px] [animation-duration:15s]" />
        <div className="absolute -right-60 top-1/3 h-[720px] w-[720px] animate-pulse rounded-full bg-[#d8e2ff]/40 blur-[150px] [animation-duration:20s]" />
        <div className="absolute bottom-0 left-1/4 h-[520px] w-[520px] animate-pulse rounded-full bg-[#ffdad3]/35 blur-[150px] [animation-duration:18s]" />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(60deg,rgba(0,106,97,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
      </div>

      {children}
    </main>
  );
}

function OverviewCard({ title, value, tone }) {
  return (
    <div className="glass-card group rounded-[2.5rem] p-6 transition-all duration-300 hover:-translate-y-2">
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-xl font-bold text-white shadow-[0_0_25px_rgba(19,183,167,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
      >
        {String(title).charAt(0)}
      </div>

      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
        {title}
      </p>

      <p className="mt-3 text-5xl font-bold tracking-[-0.06em] text-[#01201f]">
        {value}
      </p>
    </div>
  );
}

function AlertCard({ alert, onResolve }) {
  return (
    <div className="group rounded-[2rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/55">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-[-0.04em] text-[#01201f]">
            {alert.type}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#3c4947]">
            Centre: {alert.centerId}
          </p>
        </div>

        <span className="rounded-full border border-red-200 bg-red-50/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-red-600">
          {alert.severity}
        </span>
      </div>

      <p className="leading-7 text-[#3c4947]">{alert.message}</p>

      <button
        onClick={() => onResolve(alert.id)}
        className="group/btn relative mt-5 overflow-hidden rounded-full bg-[#006a61] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        <span className="relative">Mark as Resolved</span>
      </button>
    </div>
  );
}

function ReportCard({ report }) {
  return (
    <div className="rounded-[2.5rem] border border-white/70 bg-white/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/55">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#01201f]">
            {report.centerId}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#3c4947]">
            Date: {report.reportDate}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white/45 px-4 py-3 text-sm font-bold text-[#006a61] backdrop-blur-3xl">
          Risk Score: {report.riskScore}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ReportStat label="Patients Today" value={report.patientsToday} />
        <ReportStat label="Emergency Cases" value={report.emergencyCases} />
        <ReportStat label="Doctors Assigned" value={report.doctorsAssigned} />
        <ReportStat label="Doctors Present" value={report.doctorsPresent} />
        <ReportStat label="Total Beds" value={report.totalBeds ?? "Not saved"} />
        <ReportStat label="Occupied Beds" value={report.occupiedBeds} />
        <ReportStat label="Risk Status" value={report.riskStatus} />
      </div>

      {report.medicines && report.medicines.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
            Medicines
          </h4>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {report.medicines.map((medicine, index) => (
              <div
                key={index}
                className="rounded-[1.5rem] border border-white/70 bg-white/40 p-4 backdrop-blur-3xl"
              >
                <p className="font-bold text-[#01201f]">{medicine.name}</p>

                <p className="mt-2 text-sm text-[#3c4947]">
                  Stock:{" "}
                  <span className="font-bold text-[#006a61]">
                    {medicine.stock}
                  </span>
                </p>

                <p className="mt-1 text-sm text-[#3c4947]">
                  Minimum Required:{" "}
                  <span className="font-bold text-[#006a61]">
                    {medicine.minimumRequired ?? "Not saved"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReportStat({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-white/70 bg-white/40 p-4 backdrop-blur-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#006a61]">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-[#01201f]">{value}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/35 p-8 text-center backdrop-blur-3xl">
      <p className="font-semibold text-[#3c4947]">{text}</p>
    </div>
  );
}