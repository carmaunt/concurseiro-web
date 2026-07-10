"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PublicLayout } from "@/components/PublicLayout";
import { getApiErrorMessage } from "@/services/api";
import { register } from "@/services/authService";
import styles from "../login/auth.module.css";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register({ nome, email, senha });
      router.push("/login");
    } catch (err) {
      setError(getApiErrorMessage(err, "Não foi possível criar a conta."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PublicLayout>
      <section className={`container section ${styles.authSection}`}>
        <Card className={styles.authCard}>
          <h1>Criar conta</h1>
          <p className="muted">
            Use uma senha com letra maiúscula, minúscula, número e símbolo.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="label">Nome</span>
              <input
                className="input"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
                maxLength={160}
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span className="label">Email</span>
              <input
                className="input"
                type="email"
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
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
              />
            </label>
            {error ? <p className="errorText">{error}</p> : null}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Criando..." : "Criar conta"}
            </Button>
          </form>
          <p className={styles.switchText}>
            Já tem conta? <Link href="/login">Entrar</Link>
          </p>
        </Card>
      </section>
    </PublicLayout>
  );
}
