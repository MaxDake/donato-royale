// src/firestoreService.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// ✅ Save a donation to Firestore
export async function addDonation(name, amount) {
  return await addDoc(collection(db, "donations"), {
    name,
    amount: Number(amount),
    timestamp: serverTimestamp(),
  });
}

// ✅ Fetch and listen to donations in real time
export function fetchDonations(callback) {
  const q = query(collection(db, "donations"), orderBy("amount", "desc"));
  return onSnapshot(q, (snapshot) => {
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(donations);
  });
}

