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
      const result = await getCentreDetails(centerId);

      if (result.success) {
        setCentreData(result.data);
      } else {
        setMessage(result.error);
      }

      setLoading(false);
    }

    if (centerId) {
      loadCentreDetails();
    }
  }, [centerId]);

  if (loading) {
    return <p>Loading centre details...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!centreData.latestReport) {
    return <p>No report found for this centre.</p>;
  }

  const report = centreData.latestReport;

  return (
    <div>
      <h1>Centre Details</h1>

      <h2>Centre ID: {report.centerId}</h2>

      <h2>Latest Report</h2>

      <p>Date: {report.reportDate}</p>
      <p>Patients Today: {report.patientsToday}</p>
      <p>Emergency Cases: {report.emergencyCases}</p>

      <h2>Bed Status</h2>
      <p>Total Beds: {report.totalBeds}</p>
      <p>Occupied Beds: {report.occupiedBeds}</p>
      <p>Available Beds: {Number(report.totalBeds) - Number(report.occupiedBeds)}</p>

      <h2>Doctor Status</h2>
      <p>Doctors Assigned: {report.doctorsAssigned}</p>
      <p>Doctors Present: {report.doctorsPresent}</p>

      <h2>Medicine Stock</h2>

      {report.medicines && report.medicines.length > 0 ? (
        report.medicines.map((medicine, index) => (
          <div key={index}>
            <p>Medicine Name: {medicine.name}</p>
            <p>Available Stock: {medicine.stock}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No medicine stock data found.</p>
      )}

      <h2>Risk</h2>
      <p>Risk Score: {report.riskScore}</p>
      <p>Risk Status: {report.riskStatus}</p>

      <h2>Alerts</h2>

      {centreData.alerts.length === 0 && <p>No alerts for this centre.</p>}

      {centreData.alerts.map((alert) => (
        <div key={alert.id}>
          <h3>{alert.type}</h3>
          <p>Severity: {alert.severity}</p>
          <p>{alert.message}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}