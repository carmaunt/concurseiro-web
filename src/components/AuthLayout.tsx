"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { getApiErrorStatus } from "@/services/api";
import { hasAuthSession, saveAuthSession } from "@/services/auth";
import { me } from "@/services/authService";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function validateSession() {
      if (!hasAuthSession()) {
        router.replace("/login");
        return;
      }

      try {
        const user = await me();
        saveAuthSession(user);
        if (active) setAuthorized(true);
      } catch (error) {
        const status = getApiErrorStatus(error);
        if (status === 401 || status === 403) {
          router.replace("/login");
          return;
        }

        // Falhas transitórias (por exemplo, API em aquecimento) não devem
        // expulsar um usuário que já possui uma sessão local válida.
        if (active) setAuthorized(true);
      } finally {
        if (active) setChecking(false);
      }
    }

    validateSession();

    return () => {
      active = false;
    };
  }, [router]);

  if (checking || !authorized) {
    return (
      <div className="page">
        <Header authenticated />
        <main className="main">
          <section className="container section">
            <Loading label="Validando sessão..." />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header authenticated />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
