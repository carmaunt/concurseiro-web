"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PublicLayout } from "@/components/PublicLayout";
import { getApiErrorMessage } from "@/services/api";
import { saveAuthSession } from "@/services/auth";
import { login } from "@/services/authService";
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
      setError(getApiErrorMessage(err, "Não foi possível entrar."));
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
          </form>
          <p className={styles.switchText}>
            Ainda não tem conta? <Link href="/cadastro">Criar conta</Link>
          </p>
        </Card>
      </section>
    </PublicLayout>
  );
}

function safeNextPath(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}
