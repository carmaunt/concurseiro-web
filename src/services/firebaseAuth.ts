import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getConfiguredFirebaseAuth() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error("A autenticação ainda não foi configurada.");
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}

export async function getGoogleFirebaseIdToken() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(getConfiguredFirebaseAuth(), provider);
  return result.user.getIdToken(true);
}

export async function getEmailFirebaseIdToken(email: string, senha: string) {
  const result = await signInWithEmailAndPassword(getConfiguredFirebaseAuth(), email, senha);
  return result.user.getIdToken(true);
}

export async function createFirebaseEmailAccount({ nome, email, senha }: { nome: string; email: string; senha: string }) {
  const result = await createUserWithEmailAndPassword(getConfiguredFirebaseAuth(), email, senha);
  await updateProfile(result.user, { displayName: nome });
}

export async function signOutFromFirebase() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    return;
  }

  await signOut(getConfiguredFirebaseAuth());
}
