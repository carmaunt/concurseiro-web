"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { clearAuthSession, hasAuthSession } from "@/services/auth";
import { logout } from "@/services/authService";
import styles from "./Header.module.css";

const publicLinks = [
  { href: "/", label: "Início" },
  { href: "/questoes", label: "Questões" },
  { href: "/noticias", label: "Notícias" },
  { href: "/blog", label: "Blog" },
  { href: "/concursos-abertos", label: "Concursos abertos" },
  { href: "/editais-previstos", label: "Editais previstos" },
  { href: "/baixar-app", label: "Baixar app" },
];

export function Header({ authenticated = false }: { authenticated?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isLogged = authenticated || hasAuthSession();

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      clearAuthSession();
      router.push("/login");
      setIsLoggingOut(false);
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/" onClick={() => setIsMenuOpen(false)}>
          <Image src="/icon.png" alt="" width={40} height={40} priority />
          <span>O Concurseiro</span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label="Abrir menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={[styles.nav, isMenuOpen ? styles.navOpen : ""].join(" ")}
          aria-label="Menu principal"
        >
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              className={pathname === link.href ? styles.active : undefined}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={[styles.actions, isMenuOpen ? styles.actionsOpen : ""].join(" ")}>
          {isLogged ? (
            <>
              <Button href="/dashboard" variant="secondary">
                Dashboard
              </Button>
              <Button type="button" variant="ghost" onClick={handleLogout} disabled={isLoggingOut}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Entrar
              </Button>
              <Button href="/cadastro" variant="secondary">
                Criar conta
              </Button>
              <Button href="/baixar-app">Baixar app</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
