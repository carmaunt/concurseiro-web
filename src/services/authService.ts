import { api, unwrapApiData } from "./api";
import { parseUserRole } from "./auth";

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
  const response = await api.post("/api/v1/auth/login", payload);
  const data = unwrapApiData<AuthResponse>(response.data);

  return {
    email: data.email,
    role: parseUserRole(data.role),
  };
}

export async function register(payload: RegisterPayload) {
  await api.post("/api/v1/auth/register/final", payload);
}

export async function logout() {
  await api.post("/api/v1/auth/logout");
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
