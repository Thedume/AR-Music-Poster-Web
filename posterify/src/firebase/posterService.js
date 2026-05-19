import {
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const POSTERS_COLLECTION = "posters";

export async function getPosters() {
  const postersQuery = query(
    collection(db, POSTERS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(postersQuery);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getPublicPosters() {
  const postersQuery = query(
    collection(db, POSTERS_COLLECTION),
    where("isPublic", "==", true)
  );

  const snapshot = await getDocs(postersQuery);

  return snapshot.docs
    .map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }))
    .sort((a, b) => Number(a.targetIndex) - Number(b.targetIndex));
}

export async function getPosterById(posterId) {
  const posterRef = doc(db, POSTERS_COLLECTION, posterId);
  const posterSnap = await getDoc(posterRef);

  if (!posterSnap.exists()) {
    return null;
  }

  return {
    id: posterSnap.id,
    ...posterSnap.data(),
  };
}

export async function isTargetIndexDuplicated(targetIndex, currentPosterId = null) {
  const postersQuery = query(
    collection(db, POSTERS_COLLECTION),
    where("targetIndex", "==", Number(targetIndex))
  );

  const snapshot = await getDocs(postersQuery);

  return snapshot.docs.some((docItem) => docItem.id !== currentPosterId);
}

export async function createPoster(poster) {
  await addDoc(collection(db, POSTERS_COLLECTION), {
    ...poster,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePoster(posterId, poster) {
  const posterRef = doc(db, POSTERS_COLLECTION, posterId);

  await updateDoc(posterRef, {
    ...poster,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePoster(posterId) {
  const posterRef = doc(db, POSTERS_COLLECTION, posterId);
  await deleteDoc(posterRef);
}