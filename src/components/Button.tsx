import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
  href: string;
};

function isLinkButtonProps(props: ButtonProps | LinkButtonProps): props is LinkButtonProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const className = [styles.button, styles[props.variant ?? "primary"], props.className]
    .filter(Boolean)
    .join(" ");

  if (isLinkButtonProps(props)) {
    const { children, variant, className: customClassName, ...linkProps } = props;
    const linkClassName = [styles.button, styles[variant ?? "primary"], customClassName]
      .filter(Boolean)
      .join(" ");
    return (
      <Link className={linkClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = { ...props };
  delete buttonProps.variant;
  delete buttonProps.className;
  delete buttonProps.href;

  return (
    <button className={className} {...buttonProps}>
      {props.children}
    </button>
  );
}
