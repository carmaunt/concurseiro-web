import styles from "./Card.module.css";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <article className={[styles.card, className].filter(Boolean).join(" ")}>{children}</article>;
}
