export function calculateRisk(reportData) {
  let bedRisk = 0;
  let doctorRisk = 0;
  let stockRisk = 0;

  // --------------------
  // 1. Bed Risk
  // --------------------
  const bedOccupancy =
    reportData.totalBeds > 0
      ? (reportData.occupiedBeds / reportData.totalBeds) * 100
      : 0;

  if (bedOccupancy >= 90) {
    bedRisk = 30;
  } else if (bedOccupancy >= 75) {
    bedRisk = 20;
  } else if (bedOccupancy >= 50) {
    bedRisk = 10;
  } else {
    bedRisk = 0;
  }

  // --------------------
  // 2. Doctor Risk
  // --------------------
  const doctorAvailability =
    reportData.doctorsAssigned > 0
      ? (reportData.doctorsPresent / reportData.doctorsAssigned) * 100
      : 0;

  if (doctorAvailability <= 25) {
    doctorRisk = 30;
  } else if (doctorAvailability <= 50) {
    doctorRisk = 20;
  } else if (doctorAvailability <= 75) {
    doctorRisk = 10;
  } else {
    doctorRisk = 0;
  }

  // --------------------
  // 3. Medicine Stock Risk
  // --------------------
  if (reportData.medicines && reportData.medicines.length > 0) {
    reportData.medicines.forEach((medicine) => {
      let medicineRisk = 0;

      const daysLeft =
        medicine.dailyUsage > 0
          ? medicine.currentStock / medicine.dailyUsage
          : 999;

      if (daysLeft <= 3) {
        medicineRisk = 40;
      } else if (daysLeft <= 7) {
        medicineRisk = 25;
      } else if (daysLeft <= 14) {
        medicineRisk = 10;
      } else {
        medicineRisk = 0;
      }

      stockRisk = Math.max(stockRisk, medicineRisk);
    });
  }

  const totalRisk = bedRisk + doctorRisk + stockRisk;

  let status = "Stable";

  if (totalRisk >= 81) {
    status = "Critical";
  } else if (totalRisk >= 61) {
    status = "High";
  } else if (totalRisk >= 41) {
    status = "Medium";
  } else {
    status = "Stable";
  }

  return {
    totalRisk,
    status,
    breakdown: {
      bedRisk,
      doctorRisk,
      stockRisk,
    },
  };
}