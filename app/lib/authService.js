import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function signupStaff(staffData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      staffData.email,
      staffData.password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      role: "staff",

      fullName: staffData.fullName,
      email: staffData.email,
      phone: staffData.phone,
      staffId: staffData.staffId,
      designation: staffData.designation,

      centerId: staffData.centerId,
      centerName: staffData.centerName,
      district: staffData.district,

      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      user,
      role: "staff",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function loginStaff(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const userDocSnap = await getDoc(doc(db, "users", user.uid));

    if (!userDocSnap.exists()) {
      return {
        success: false,
        error: "Staff record not found",
      };
    }

    const userData = userDocSnap.data();

    if (userData.role !== "staff") {
      return {
        success: false,
        error: "Only staff can login here",
      };
    }

    return {
      success: true,
      user,
      role: "staff",
      staffData: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function logoutStaff() {
  try {
    await signOut(auth);

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