export type UserRole = "ADMIN" | "VISITANTE" | "USUARIO_FINAL";

export type AuthSession = {
  email?: string | null;
  role?: UserRole | string | null;
};

const STORAGE_KEYS = {
  sessionActive: "oconcurseiro.sessionActive",
  userEmail: "oconcurseiro.userEmail",
  userRole: "oconcurseiro.userRole",
} as const;

const SESSION_HINT_COOKIE = "oconcurseiro_session";
// O cookie é apenas uma pista para o middleware permitir que o navegador
// tente renovar a sessão. A autenticação real continua sendo HttpOnly na API.
const SESSION_HINT_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function isBrowser() {
  return typeof window !== "undefined";
}

export function parseUserRole(value: unknown): UserRole | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "ADMIN" || normalized === "VISITANTE" || normalized === "USUARIO_FINAL") {
    return normalized;
  }
  return null;
}

export function hasAuthSession() {
  if (!isBrowser()) return false;
  return localStorage.getItem(STORAGE_KEYS.sessionActive) === "true";
}

export function getStoredSession(): AuthSession | null {
  if (!isBrowser() || !hasAuthSession()) return null;
  return {
    email: localStorage.getItem(STORAGE_KEYS.userEmail),
    role: parseUserRole(localStorage.getItem(STORAGE_KEYS.userRole)),
  };
}

export function saveAuthSession({ email, role }: AuthSession) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.sessionActive, "true");

  if (email) localStorage.setItem(STORAGE_KEYS.userEmail, email);
  const parsedRole = parseUserRole(role);
  if (parsedRole) localStorage.setItem(STORAGE_KEYS.userRole, parsedRole);
  document.cookie = `${SESSION_HINT_COOKIE}=1; Path=/; Max-Age=${SESSION_HINT_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
}

export function clearAuthSession() {
  if (!isBrowser()) return;
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  document.cookie = `${SESSION_HINT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}
