import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { PublicLayout } from "@/components/PublicLayout";

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="container section">
        <EmptyState
          title="Página não encontrada"
          description="O endereço pode ter mudado ou o conteúdo ainda não foi publicado no portal."
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <Button href="/" variant="secondary">
            Voltar ao início
          </Button>
          <Button href="/noticias" variant="ghost">
            Ver notícias
          </Button>
          <Button href="/blog" variant="ghost">
            Ver blog
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
