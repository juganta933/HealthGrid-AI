"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupStaff } from "@/app/lib/authService";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    staffId: "",
    designation: "",
    centerId: "",
    centerName: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const result = await signupStaff(formData);

    setLoading(false);

    if (result.success) {
      document.cookie = "userRole=staff; path=/; max-age=86400";

      localStorage.setItem("centerName", formData.centerName);
      localStorage.setItem("centerId", formData.centerId);
      localStorage.setItem("staffName", formData.fullName);
      localStorage.setItem("staffId", formData.staffId);

      router.push("/staff/report");
    } else {
      setMessage(result.error);
    }
  }

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

      <section className="grid w-full max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left info panel */}
        <div className="hidden lg:block">
          <div className="glass-card sticky top-28 rounded-[3rem] p-10">
            <div className="mb-8 inline-flex rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
              Staff Registration
            </div>

            <h1 className="max-w-xl bg-gradient-to-br from-[#006a61] via-[#13b7a7] to-[#0058be] bg-clip-text text-6xl font-bold leading-tight tracking-[-0.06em] text-transparent">
              Join the HealthGrid AI network.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#3c4947]">
              Create your staff account to submit daily health center reports,
              update resource data, and support faster admin decisions.
            </p>

            <div className="mt-10 space-y-4">
              <SignupInfo
                title="Verified Staff Access"
                text="Staff details are linked with centre information."
              />

              <SignupInfo
                title="Centre-Based Reports"
                text="Reports are connected to your assigned PHC/CHC."
              />

              <SignupInfo
                title="Smart Admin Alerts"
                text="Submitted data helps generate risk and stock alerts."
              />
            </div>
          </div>
        </div>

        {/* Signup form */}
        <div className="glass-card relative w-full rounded-[3rem] p-7 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#71f8e6]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#d8e2ff]/40 blur-3xl" />

          <div className="relative">
            <div className="mb-9 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#13b7a7] to-[#0058be] text-2xl font-bold text-white shadow-[0_0_28px_rgba(19,183,167,0.35)]">
                H
              </div>

              <h1 className="text-4xl font-bold tracking-[-0.05em] text-[#01201f]">
                Staff Signup
              </h1>

              <p className="mt-2 text-sm font-medium text-[#3c4947]">
                Create a staff account and connect it with your health centre.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Staff Details */}
              <div>
                <h2 className="mb-5 rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
                  Staff Details
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />

                  <InputField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Staff ID"
                    type="text"
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#244443]">
                      Designation
                    </label>

                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/80 bg-white/45 px-5 py-4 text-[#01201f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 focus:border-[#50dbca] focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(80,219,202,0.18)]"
                    >
                      <option value="">Select designation</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Health Worker">Health Worker</option>
                      <option value="Data Entry Operator">
                        Data Entry Operator
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Centre Details */}
              <div>
                <h2 className="mb-5 rounded-full border border-white/70 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#006a61] backdrop-blur-3xl">
                  Centre Details
                </h2>

                <div className="grid gap-5 md:grid-cols-3">
                  <InputField
                    label="Centre ID"
                    type="text"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleChange}
                    placeholder="Example: PHC001"
                    required
                  />

                  <InputField
                    label="Centre Name"
                    type="text"
                    name="centerName"
                    value={formData.centerName}
                    onChange={handleChange}
                    placeholder="Example: Silchar PHC"
                    required
                  />

                  <InputField
                    label="District"
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-[#006a61] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-[#006a61]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#13b7a7] hover:shadow-[0_18px_40px_rgba(19,183,167,0.32)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {loading ? "Creating staff account..." : "Signup as Staff"}
                </span>
              </button>
            </form>

            {message && (
              <p className="mt-6 rounded-2xl border border-red-200 bg-red-50/70 px-4 py-3 text-center text-sm font-semibold text-red-600 backdrop-blur-xl">
                {message}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  minLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#244443]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="w-full rounded-2xl border border-white/80 bg-white/45 px-5 py-4 text-[#01201f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,106,97,0.08)] backdrop-blur-3xl transition-all duration-300 placeholder:text-[#6c7a77] focus:border-[#50dbca] focus:bg-white/70 focus:shadow-[0_0_0_4px_rgba(80,219,202,0.18)]"
      />
    </div>
  );
}

function SignupInfo({ title, text }) {
  return (
    <div className="rounded-[1.7rem] border border-white/70 bg-white/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(0,106,97,0.1)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/55">
      <h3 className="text-lg font-bold text-[#01201f]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#3c4947]">{text}</p>
    </div>
  );
}