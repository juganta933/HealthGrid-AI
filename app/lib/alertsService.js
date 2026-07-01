import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function generateAlerts(reportData, reportId) {
  const alerts = [];

  // Bed occupancy alert
  const bedOccupancy =
    reportData.totalBeds > 0
      ? (reportData.occupiedBeds / reportData.totalBeds) * 100
      : 0;

  if (bedOccupancy >= 90) {
    alerts.push({
      centerId: reportData.centerId,
      reportId,
      type: "BED_OCCUPANCY",
      severity: "Critical",
      message: `Bed occupancy is ${bedOccupancy.toFixed(1)}%`,
    });
  } else if (bedOccupancy >= 75) {
    alerts.push({
      centerId: reportData.centerId,
      reportId,
      type: "BED_OCCUPANCY",
      severity: "High",
      message: `Bed occupancy is ${bedOccupancy.toFixed(1)}%`,
    });
  }

  // Doctor shortage alert
  const doctorAvailability =
    reportData.doctorsAssigned > 0
      ? (reportData.doctorsPresent / reportData.doctorsAssigned) * 100
      : 0;

  if (doctorAvailability <= 25) {
    alerts.push({
      centerId: reportData.centerId,
      reportId,
      type: "DOCTOR_SHORTAGE",
      severity: "Critical",
      message: `Only ${reportData.doctorsPresent} out of ${reportData.doctorsAssigned} doctors are present`,
    });
  } else if (doctorAvailability <= 50) {
    alerts.push({
      centerId: reportData.centerId,
      reportId,
      type: "DOCTOR_SHORTAGE",
      severity: "High",
      message: `Only ${reportData.doctorsPresent} out of ${reportData.doctorsAssigned} doctors are present`,
    });
  }

  // Medicine stock alerts
  if (reportData.medicines && reportData.medicines.length > 0) {
    reportData.medicines.forEach((medicine) => {
      const daysLeft =
        medicine.dailyUsage > 0
          ? medicine.currentStock / medicine.dailyUsage
          : 999;

      if (daysLeft <= 3) {
        alerts.push({
          centerId: reportData.centerId,
          reportId,
          type: "STOCK_SHORTAGE",
          severity: "Critical",
          message: `${medicine.name} may run out in ${daysLeft.toFixed(1)} days`,
        });
      } else if (daysLeft <= 7) {
        alerts.push({
          centerId: reportData.centerId,
          reportId,
          type: "STOCK_SHORTAGE",
          severity: "Warning",
          message: `${medicine.name} may run out in ${daysLeft.toFixed(1)} days`,
        });
      }
    });
  }

  for (const alert of alerts) {
    await addDoc(collection(db, "alerts"), {
      ...alert,
      isResolved: false,
      createdAt: serverTimestamp(),
    });
  }

  return alerts;
}