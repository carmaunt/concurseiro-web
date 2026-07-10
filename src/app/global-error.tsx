"use client";

import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";
import { reportClientError } from "@/services/telemetry";
import styles from "./error.module.css";

export default function GlobalErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    reportClientError(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <main className={styles.page}>
          <div className={styles.card}>
              <h1>Ocorreu um problema inesperado</h1>
              <p>Recarregue a página para tentar novamente.</p>
              <Link href="/">
                Voltar ao início
              </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
