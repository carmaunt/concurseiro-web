"use client";

import { useSyncExternalStore } from "react";
import { Button } from "./Button";
import { buildAttributedGooglePlayUrl, trackStoreClick } from "@/services/productAnalytics";

const subscribeHydration = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type AttributedStoreLinkProps = {
  href: string;
  ctaId: string;
  children: React.ReactNode;
  appearance?: "button" | "text";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function AttributedStoreLink({
  href,
  ctaId,
  children,
  appearance = "button",
  variant = "primary",
  className,
}: AttributedStoreLinkProps) {
  const isHydrated = useSyncExternalStore(
    subscribeHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const attributedHref = isHydrated ? buildAttributedGooglePlayUrl(href, ctaId) : href;
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = buildAttributedGooglePlayUrl(href, ctaId);
    trackStoreClick(ctaId);
  };

  if (appearance === "text") {
    return (
      <a
        className={className}
        href={attributedHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      className={className}
      href={attributedHref}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
