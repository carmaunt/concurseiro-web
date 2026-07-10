import styles from "./Skeleton.module.css";

export function Skeleton({ variant = "card", count = 1 }: { variant?: "featured" | "card" | "list"; count?: number }) {
  return (
    <div className={styles.stack} aria-label="Carregando conteúdo">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={[styles.skeleton, styles[variant]].join(" ")}>
          <span />
          <strong />
          <em />
        </div>
      ))}
    </div>
  );
}
