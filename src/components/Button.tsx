import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseProps & {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

function isLinkButtonProps(props: ButtonProps | LinkButtonProps): props is LinkButtonProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const className = [styles.button, styles[props.variant ?? "primary"], props.className]
    .filter(Boolean)
    .join(" ");

  if (isLinkButtonProps(props)) {
    return (
      <Link className={className} href={props.href} target={props.target} rel={props.rel}>
        {props.children}
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
