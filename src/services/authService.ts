import { api, unwrapApiData } from "./api";
import { parseUserRole } from "./auth";
import {
  createFirebaseEmailAccount,
  getEmailFirebaseIdToken,
  getGoogleFirebaseIdToken,
  signOutFromFirebase,
} from "./firebaseAuth";

export type LoginPayload = {
  email: string;
  senha: string;
};

export type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
};

type AuthResponse = {
  email?: string;
  role?: string;
};

export async function login(payload: LoginPayload) {
  const idToken = await getEmailFirebaseIdToken(payload.email, payload.senha);
  return loginWithFirebaseToken(idToken);
}

async function loginWithFirebaseToken(idToken: string) {
  const response = await api.post("/api/v1/auth/firebase", { idToken });
  const data = unwrapApiData<AuthResponse>(response.data);

  return {
    email: data.email,
    role: parseUserRole(data.role),
  };
}

export async function register(payload: RegisterPayload) {
  await createFirebaseEmailAccount(payload);
  await signOutFromFirebase();
}

export async function loginWithGoogle() {
  const idToken = await getGoogleFirebaseIdToken();
  return loginWithFirebaseToken(idToken);
}

export async function logout() {
  try {
    await api.post("/api/v1/auth/logout");
  } finally {
    await signOutFromFirebase();
  }
}

export async function me() {
  const response = await api.get("/api/v1/auth/me");
  const data = unwrapApiData<AuthResponse & { tipoConta?: string; status?: string }>(response.data);

  return {
    email: data.email,
    role: parseUserRole(data.role),
    tipoConta: data.tipoConta,
    status: data.status,
  };
}
