"use client";

import { useEffect, useState } from "react";
import { submitDailyReport } from "@/app/lib/reportService";
import { calculateRisk } from "@/app/lib/riskService";
import { generateAlerts } from "@/app/lib/alertsService";

export default function StaffReportPage() {
  const [loggedInStaff, setLoggedInStaff] = useState(null);

  const [formData, setFormData] = useState({
    centerId: "",
    centerName: "",
    staffId: "",
    staffName: "",
    reportDate: "",
    patientsToday: "",
    emergencyCases: "",
    totalBeds: "",
    occupiedBeds: "",
    doctorsAssigned: "",
    doctorsPresent: "",
  });

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    currentStock: "",
    dailyUsage: "",
    minimumRequired: "",
  });

  const [medicines, setMedicines] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const staff = {
      centerId: localStorage.getItem("centerId") || "",
      centerName: localStorage.getItem("centerName") || "",
      staffId: localStorage.getItem("staffId") || "",
      staffName: localStorage.getItem("staffName") || "",
    };

    setLoggedInStaff(staff);

    setFormData((prev) => ({
      ...prev,
      centerId: staff.centerId,
      centerName: staff.centerName,
      staffId: staff.staffId,
      staffName: staff.staffName,
    }));

    setPageLoading(false);
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleMedicineChange(e) {
    setMedicineForm({
      ...medicineForm,
      [e.target.name]: e.target.value,
    });
  }

  function addMedicine() {
    if (
      !medicineForm.name ||
      !medicineForm.currentStock ||
      !medicineForm.dailyUsage ||
      !medicineForm.minimumRequired
    ) {
      setMessage("Please fill all medicine fields");
      return;
    }

    const newMedicine = {
      name: medicineForm.name,
      currentStock: Number(medicineForm.currentStock),
      dailyUsage: Number(medicineForm.dailyUsage),
      minimumRequired: Number(medicineForm.minimumRequired),
    };

    setMedicines([...medicines, newMedicine]);

    setMedicineForm({
      name: "",
      currentStock: "",
      dailyUsage: "",
      minimumRequired: "",
    });

    setMessage("");
  }

  function removeMedicine(indexToRemove) {
    setMedicines(medicines.filter((_, index) => index !== indexToRemove));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loggedInStaff) {
      setMessage("Staff data not loaded yet");
      return;
    }

    if (medicines.length === 0) {
      setMessage("Please add at least one medicine");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const reportData = {
        ...formData,

        centerId: loggedInStaff.centerId,
        centerName: loggedInStaff.centerName,
        staffId: loggedInStaff.staffId,
        staffName: loggedInStaff.staffName,

        patientsToday: Number(formData.patientsToday),
        emergencyCases: Number(formData.emergencyCases),
        totalBeds: Number(formData.totalBeds),
        occupiedBeds: Number(formData.occupiedBeds),
        doctorsAssigned: Number(formData.doctorsAssigned),
        doctorsPresent: Number(formData.doctorsPresent),

        medicines,
      };

      const riskResult = calculateRisk(reportData);

      const finalReportData = {
        ...reportData,
        riskScore: riskResult.totalRisk,
        riskStatus: riskResult.status,
        riskBreakdown: riskResult.breakdown,
      };

      const result = await submitDailyReport(finalReportData);

      if (result.success) {
        await generateAlerts(finalReportData, result.id);

        setMessage("Report submitted successfully and alerts generated");

        setFormData({
          centerId: loggedInStaff.centerId,
          centerName: loggedInStaff.centerName,
          staffId: loggedInStaff.staffId,
          staffName: loggedInStaff.staffName,
          reportDate: "",
          patientsToday: "",
          emergencyCases: "",
          totalBeds: "",
          occupiedBeds: "",
          doctorsAssigned: "",
          doctorsPresent: "",
        });

        setMedicines([]);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <ReportShell>
        <div className="glass-card mx-auto max-w-xl rounded-[2.5rem] p-8 text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#13b7a7]/20 border-t-[#13b7a7]" />
          <p className="text-lg font-bold text-[#006a61]">
            Loading staff report page...
          </p>
        </div>
      </ReportShell>
    );
  }

  return (
    <ReportShell>
      <section className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
            Staff Daily Report
          </div>

          <h1 className="bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-5xl font-bold leading-tight tracking-[-0.06em] text-transparent md:text-7xl">
            Submit Daily Report
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3c4947]">
            Enter today’s patient load, bed status, doctor availability, and
            medicine stock details.
          </p>
        </div>

        {/* Staff info */}
        {loggedInStaff && (
          <div className="glass-card mb-10 rounded-[3rem] p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-3">
              <InfoCard
                label="Health Centre"
                value={loggedInStaff.centerName || "Health Centre"}
              />
              <InfoCard
                label="Centre ID"
                value={loggedInStaff.centerId || "N/A"}
              />
              <InfoCard
                label="Staff"
                value={loggedInStaff.staffName || "N/A"}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Report */}
          <section className="glass-card rounded-[3rem] p-6 md:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
                Basic Report
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#01201f]">
                Daily center activity
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <InputField
                type="date"
                name="reportDate"
                label="Report Date"
                value={formData.reportDate}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="patientsToday"
                label="Patients Today"
                placeholder="Patients Today"
                value={formData.patientsToday}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="emergencyCases"
                label="Emergency Cases"
                placeholder="Emergency Cases"
                value={formData.emergencyCases}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="totalBeds"
                label="Total Beds"
                placeholder="Total Beds"
                value={formData.totalBeds}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="occupiedBeds"
                label="Occupied Beds"
                placeholder="Occupied Beds"
                value={formData.occupiedBeds}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="doctorsAssigned"
                label="Doctors Assigned"
                placeholder="Doctors Assigned"
                value={formData.doctorsAssigned}
                onChange={handleChange}
                required
              />

              <InputField
                type="number"
                name="doctorsPresent"
                label="Doctors Present"
                placeholder="Doctors Present"
                value={formData.doctorsPresent}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Medicine Stock */}
          <section className="glass-card rounded-[3rem] p-6 md:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#006a61]">
                Medicine Stock
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#01201f]">
                Add available medicines
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <InputField
                type="text"
                name="name"
                label="Medicine Name"
                placeholder="Medicine Name"
                value={medicineForm.name}
                onChange={handleMedicineChange}
              />

              <InputField
                type="number"
                name="currentStock"
                label="Current Stock"
                placeholder="Current Stock"
                value={medicineForm.currentStock}
                onChange={handleMedicineChange}
              />

              <InputField
                type="number"
                name="dailyUsage"
                label="Daily Usage"
                placeholder="Daily Usage"
                value={medicineForm.dailyUsage}
                onChange={handleMedicineChange}
              />

              <InputField
                type="number"
                name="minimumRequired"
                label="Minimum Required"
                placeholder="Minimum Required"
                value={medicineForm.minimumRequired}
                onChange={handleMedicineChange}
              />
            </div>

            <button
              type="button"
              onClick={addMedicine}
              className="group relative mt-6 overflow-hidden rounded-full bg-[#006a61] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,106,97,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Add Medicine</span>
            </button>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold tracking-[-0.04em] text-[#01201f]">
                Added Medicines
              </h3>

              {medicines.length === 0 ? (
                <EmptyState text="No medicines added yet." />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {medicines.map((medicine, index) => (
                    <MedicineCard
                      key={index}
                      medicine={medicine}
                      index={index}
                      onRemove={removeMedicine}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className="glass-card rounded-[3rem] p-6 md:p-8">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#006a61] px-6 py-5 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-[#006a61]/30 transition-all duration-300 hover:scale-[1.01] hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                {loading ? "Submitting..." : "Submit Report"}
              </span>
            </button>

            {message && (
              <p
                className={`mt-6 rounded-2xl border px-4 py-3 text-center text-sm font-semibold backdrop-blur-xl ${
                  message.includes("successfully")
                    ? "border-emerald-200 bg-emerald-50/70 text-emerald-700"
                    : "border-red-200 bg-red-50/70 text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </section>
    </ReportShell>
  );
}

function ReportShell({ children }) {
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

function InputField({
  label,
  type,
  name,
  placeholder = "",
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#244443]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-2xl border border-white/80 bg-white/45 px-5 py-4 text-[#01201f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 placeholder:text-[#6c7a77] focus:border-[#50dbca] focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(80,219,202,0.18)]"
      />
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[1.7rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/55">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#006a61]">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold text-[#01201f]">{value}</p>
    </div>
  );
}

function MedicineCard({ medicine, index, onRemove }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/55">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-bold tracking-[-0.04em] text-[#01201f]">
            {medicine.name}
          </h4>
          <p className="mt-1 text-sm font-semibold text-[#3c4947]">
            Medicine #{index + 1}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="rounded-full border border-red-200 bg-red-50/80 px-3 py-1 text-xs font-bold text-red-600 transition-all duration-300 hover:bg-red-100"
        >
          Remove
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MiniStat label="Stock" value={medicine.currentStock} />
        <MiniStat label="Daily Usage" value={medicine.dailyUsage} />
        <MiniStat label="Minimum" value={medicine.minimumRequired} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-[1.2rem] border border-white/70 bg-white/40 p-3 backdrop-blur-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#006a61]">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-[#01201f]">{value}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/35 p-6 text-center backdrop-blur-3xl">
      <p className="font-semibold text-[#3c4947]">{text}</p>
    </div>
  );
}