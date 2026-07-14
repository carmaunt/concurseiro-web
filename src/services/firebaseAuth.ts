import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getConfiguredFirebaseAuth() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error("O login com Google ainda não foi configurado.");
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

export async function signOutFromFirebase() {
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
    return;
  }

  await signOut(getConfiguredFirebaseAuth());
}
