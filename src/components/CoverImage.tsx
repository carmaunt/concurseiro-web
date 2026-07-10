import Image from "next/image";
import styles from "./CoverImage.module.css";

type CoverImageProps = {
  src?: string | null;
  alt?: string;
  priority?: boolean;
  variant?: "featured" | "card" | "article" | "compact";
};

export function CoverImage({ src, alt = "", priority = false, variant = "card" }: CoverImageProps) {
  if (!src) {
    return (
      <div className={[styles.fallback, styles[variant]].join(" ")} aria-hidden="true">
        <span />
      </div>
    );
  }

  return (
    <div className={[styles.frame, styles[variant]].join(" ")}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={variant === "featured" ? "(max-width: 780px) 100vw, 44vw" : "(max-width: 780px) 100vw, 33vw"}
      />
    </div>
  );
}
