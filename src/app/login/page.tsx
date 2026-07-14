"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PublicLayout } from "@/components/PublicLayout";
import { getApiErrorMessage } from "@/services/api";
import { saveAuthSession } from "@/services/auth";
import { login, loginWithGoogle } from "@/services/authService";
import styles from "./auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    // Alguns navegadores preenchem credenciais sem disparar onChange. Ler o
    // formulário evita enviar estados vazios quando o autofill está ativo.
    const formData = new FormData(event.currentTarget);
    const emailInformado = String(formData.get("email") || "").trim();
    const senhaInformada = String(formData.get("senha") || "");

    setEmail(emailInformado);
    setSenha(senhaInformada);

    try {
      const session = await login({ email: emailInformado, senha: senhaInformada });
      saveAuthSession(session);
      router.push(safeNextPath(searchParams.get("next")));
    } catch (err) {
      setError(getFirebaseLoginErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setSubmitting(true);

    try {
      const session = await loginWithGoogle();
      saveAuthSession(session);
      router.push(safeNextPath(searchParams.get("next")));
    } catch (err) {
      setError(getFirebaseLoginErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PublicLayout>
      <section className={`container section ${styles.authSection}`}>
        <Card className={styles.authCard}>
          <h1>Entrar</h1>
          <p className="muted">Acesse sua área de estudante.</p>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="label">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span className="label">Senha</span>
              <input
                className="input"
                type="password"
                name="senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
                minLength={8}
                autoComplete="current-password"
              />
            </label>
            {error ? <p className="errorText">{error}</p> : null}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Entrando..." : "Entrar"}
            </Button>
            <div className={styles.divider} aria-hidden="true"><span>ou</span></div>
            <button
              className={styles.googleButton}
              type="button"
              onClick={handleGoogleLogin}
              disabled={submitting}
            >
              <GoogleIcon />
              Continuar com o Google
            </button>
          </form>
          <p className={styles.switchText}>
            Ainda não tem conta? <Link href="/cadastro">Criar conta</Link>
          </p>
        </Card>
      </section>
    </PublicLayout>
  );
}

function getFirebaseLoginErrorMessage(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const code = String(error.code);
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      return "O login com Google foi cancelado.";
    }
    if (code === "auth/popup-blocked") {
      return "O navegador bloqueou a janela do Google. Permita pop-ups e tente novamente.";
    }
    if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") {
      return "E-mail ou senha inválidos.";
    }
    if (code === "auth/user-disabled") {
      return "Esta conta está desativada.";
    }
  }

  return getApiErrorMessage(error, "Não foi possível entrar com Google.");
}

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.02v2.52h3.24c1.9-1.75 2.97-4.34 2.97-7.37Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.4l-3.24-2.52c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.12-1.31.31-1.92v-2.6H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.52l3.34-2.6Z" />
      <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87C16.96 2.98 14.7 2 12 2a10 10 0 0 0-8.93 5.48l3.34 2.6C7.2 7.72 9.4 5.96 12 5.96Z" />
    </svg>
  );
}

function safeNextPath(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}
