import axios, { type AxiosRequestConfig } from "axios";
import { clearAuthSession } from "./auth";

const PUBLIC_AUTH_PATHS = ["/login", "/cadastro"];
const AUTH_ENDPOINT_PREFIX = "/api/v1/auth/";

type RetriableRequest = AxiosRequestConfig & {
  _sessionRefreshAttempted?: boolean;
};

let refreshInProgress: Promise<void> | null = null;

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
  // O Render pode levar alguns segundos para despertar após inatividade.
  // Mantemos um limite finito, mas suficiente para a primeira chamada autenticada.
  timeout: 30_000,
});

function isBrowser() {
  return typeof window !== "undefined";
}

function shouldRedirectToLogin() {
  return isBrowser() && !PUBLIC_AUTH_PATHS.includes(window.location.pathname);
}

function isAuthEndpoint(url?: string) {
  return Boolean(url?.includes(AUTH_ENDPOINT_PREFIX));
}

function refreshAccessToken() {
  if (!refreshInProgress) {
    refreshInProgress = api
      .post("/api/v1/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshInProgress = null;
      });
  }

  return refreshInProgress;
}

function endSession() {
  clearAuthSession();
  if (shouldRedirectToLogin()) {
    window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`);
  }
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
  async (error: unknown) => {
    const request = axios.isAxiosError(error) ? error.config as RetriableRequest | undefined : undefined;
    const status = getApiErrorStatus(error);

    if (status === 401 && request && !request._sessionRefreshAttempted && !isAuthEndpoint(request.url)) {
      request._sessionRefreshAttempted = true;

      try {
        await refreshAccessToken();
        return api.request(request);
      } catch {
        endSession();
      }
    }

    if (status === 401 && !isAuthEndpoint(request?.url)) endSession();

    return Promise.reject(error);
  },
);
