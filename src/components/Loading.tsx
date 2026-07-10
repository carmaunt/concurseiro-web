import styles from "./Loading.module.css";

export function Loading({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span>{label}</span>
    </div>
  );
}
