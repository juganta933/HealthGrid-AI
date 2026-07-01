import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  limit,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getAdminDashboardData() {
  try {
    console.log("Fetching admin dashboard data...");

    const reportsQuery = query(collection(db, "dailyReports"));
    const alertsQuery = query(collection(db, "alerts"), limit(10));

    const reportsSnapshot = await getDocs(reportsQuery);
    const alertsSnapshot = await getDocs(alertsQuery);

    console.log("Reports found:", reportsSnapshot.size);
    console.log("Alerts found:", alertsSnapshot.size);

    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  const alerts = alertsSnapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((alert) => alert.isResolved !== true);

    console.log("Reports data:", reports);
    console.log("Alerts data:", alerts);

    const totalReports = reports.length;

    const criticalReports = reports.filter(
      (report) => report.riskStatus === "Critical"
    ).length;

    const highRiskReports = reports.filter(
      (report) => report.riskStatus === "High"
    ).length;

    return {
      success: true,
      data: {
        totalReports,
        criticalReports,
        highRiskReports,
        recentReports: reports.slice(0, 10),
        recentAlerts: alerts,
      },
    };
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getCentreDetails(centerId) {
  try {
    console.log("Fetching centre details for:", centerId);

    const reportsQuery = query(
      collection(db, "dailyReports"),
      where("centerId", "==", centerId)
    );

    const alertsQuery = query(
      collection(db, "alerts"),
      where("centerId", "==", centerId)
    );

    const reportsSnapshot = await getDocs(reportsQuery);
    const alertsSnapshot = await getDocs(alertsQuery);

    console.log("Centre reports found:", reportsSnapshot.size);
    console.log("Centre alerts found:", alertsSnapshot.size);

    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const alerts = alertsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: {
        latestReport: reports[0] || null,
        alerts,
      },
    };
  } catch (error) {
    console.error("Centre details fetch error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}
export async function resolveAlert(alertId) {
  try {
    const alertRef = doc(db, "alerts", alertId);

    await updateDoc(alertRef, {
      isResolved: true,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}