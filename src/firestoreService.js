import { db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';

// 💾 Save a donation
export async function saveDonation(name, amount) {
  await addDoc(collection(db, 'donations'), {
    name,
    amount,
    timestamp: serverTimestamp(),
  });
}

// 🔁 Listen for real-time updates
export function listenToDonations(callback) {
  const q = query(collection(db, 'donations'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const donations = snapshot.docs.map((doc) => doc.data());
    callback(donations);
  });
}

// 📤 Add donation (alias for saveDonation)
export const addDonation = saveDonation;

// 📥 Fetch once (not used for real-time but can be helpful)
export async function fetchDonations() {
  const q = query(collection(db, 'donations'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

