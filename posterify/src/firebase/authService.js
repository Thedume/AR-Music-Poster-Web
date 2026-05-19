import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, authReady } from "./firebase";

export async function loginWithEmail(email, password) {
  await authReady;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function logout() {
  await authReady;
  await signOut(auth);
}