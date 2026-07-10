import { Footer } from "./Footer";
import { Header } from "./Header";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
