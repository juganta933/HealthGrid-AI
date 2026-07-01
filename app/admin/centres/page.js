"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCentreDetails } from "@/app/lib/adminService";

export default function CentreDetailsPage() {
  const params = useParams();
  const centerId = params.centerId;

  const [centreData, setCentreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCentreDetails() {
      try {
        console.log("Centre page loaded");
        console.log("Center ID from URL:", centerId);

        const result = await getCentreDetails(centerId);

        console.log("Centre result:", result);

        if (result.success) {
          setCentreData(result.data);
        } else {
          setMessage(result.error);
        }
      } catch (error) {
        console.error("Centre page error:", error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (centerId) {
      loadCentreDetails();
    }
  }, [centerId]);

  if (loading) {
    return (
      <div style={{ color: "black", padding: "20px" }}>
        <p>Loading centre details...</p>
      </div>
    );
  }

  if (message) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <p>Error: {message}</p>
      </div>
    );
  }

  if (!centreData || !centreData.latestReport) {
    return (
      <div style={{ color: "black", padding: "20px" }}>
        <p>No report found for this centre.</p>
      </div>
    );
  }

  const report = centreData.latestReport;

  return (
    <div style={{ color: "black", padding: "20px" }}>
      <h1>Centre Details</h1>

      <h2>Centre ID: {report.centerId}</h2>

      <h2>Latest Report</h2>
      <p>Date: {report.reportDate}</p>
      <p>Patients Today: {report.patientsToday}</p>
      <p>Emergency Cases: {report.emergencyCases}</p>

      <h2>Doctors</h2>
      <p>Doctors Assigned: {report.doctorsAssigned}</p>
      <p>Doctors Present: {report.doctorsPresent}</p>

      <h2>Beds</h2>
      <p>Total Beds: {report.totalBeds ?? "Not saved"}</p>
      <p>Occupied Beds: {report.occupiedBeds}</p>

      <h2>Risk</h2>
      <p>Risk Score: {report.riskScore}</p>
      <p>Risk Status: {report.riskStatus}</p>

      <h2>Medicines</h2>

      {report.medicines && report.medicines.length > 0 ? (
        report.medicines.map((medicine, index) => (
          <div key={index}>
            <p>Name: {medicine.name}</p>
            <p>Stock: {medicine.stock}</p>
            <p>Minimum Required: {medicine.minimumRequired}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No medicines found.</p>
      )}

      <h2>Alerts</h2>

      {centreData.alerts.length === 0 ? (
        <p>No alerts for this centre.</p>
      ) : (
        centreData.alerts.map((alert) => (
          <div key={alert.id}>
            <h3>{alert.type}</h3>
            <p>Severity: {alert.severity}</p>
            <p>{alert.message}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}