"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";
import { reportClientError } from "@/services/telemetry";
import styles from "./error.module.css";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportClientError(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
          <h1>Não foi possível carregar esta página</h1>
          <p>Tente novamente. Se o problema persistir, volte mais tarde.</p>
          <Button type="button" onClick={reset}>
            Tentar novamente
          </Button>
      </div>
    </main>
  );
}
