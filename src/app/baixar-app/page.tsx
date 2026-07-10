import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: "Baixar app",
  description: "Baixe o aplicativo O Concurseiro para estudar pelo celular.",
};

export default function BaixarAppPage() {
  const downloadUrl = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL;

  return (
    <PublicLayout>
      <section className="container section">
        <div className="sectionHeader">
          <div>
            <h1>Baixar app</h1>
            <p>Continue seus estudos no aplicativo O Concurseiro.</p>
          </div>
        </div>
        <Card>
          <h2>App O Concurseiro</h2>
          <p className="muted">
            Estude pelo celular e acompanhe sua preparação de onde estiver.
          </p>
          <Button href={downloadUrl || "/"} variant={downloadUrl ? "primary" : "secondary"}>
            {downloadUrl ? "Baixar o app" : "Disponível em breve"}
          </Button>
        </Card>
      </section>
    </PublicLayout>
  );
}
