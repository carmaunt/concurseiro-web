import axios from "axios";
import { clearAuthSession } from "./auth";

const PUBLIC_AUTH_PATHS = ["/login", "/cadastro"];

type ApiErrorPayload = {
  title?: unknown;
  detail?: unknown;
  message?: unknown;
  error?: unknown;
};

// O navegador sempre acessa a API pelo proxy same-origin do Next. Isso evita
// CORS e faz os cookies HttpOnly pertencerem ao domínio da própria web.
export const API_BASE_URL = "/api/backend";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 12_000,
});

function isBrowser() {
  return typeof window !== "undefined";
}

function shouldRedirectToLogin() {
  return isBrowser() && !PUBLIC_AUTH_PATHS.includes(window.location.pathname);
}

export function unwrapApiData<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    "success" in payload
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

export function getApiErrorStatus(error: unknown) {
  if (!axios.isAxiosError(error)) return undefined;
  return error.response?.status;
}

export function getApiErrorMessage(error: unknown, fallback = "Não foi possível concluir a operação.") {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) return fallback;
  const data = error.response?.data;

  if (typeof data?.title === "string") return data.title;
  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;
  if (error.code === "ECONNABORTED") return "A solicitação demorou demais. Tente novamente.";
  if (error.code === "ERR_NETWORK") return "Não foi possível conectar ao serviço. Tente novamente.";
  if (error.message) return error.message;

  return fallback;
}

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (getApiErrorStatus(error) === 401) {
      clearAuthSession();

      if (shouldRedirectToLogin()) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);
