import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function submitDailyReport(reportData) {
  try {
    const docRef = await addDoc(collection(db, "dailyReports"), {
      ...reportData,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}