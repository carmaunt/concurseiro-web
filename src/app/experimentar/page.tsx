import type { Metadata } from "next";
import { PublicLayout } from "@/components/PublicLayout";
import { AmostraQuestoes } from "./AmostraQuestoes";

export const metadata: Metadata = {
  title: "Experimente questões grátis",
  description:
    "Resolva cinco questões de concursos antes de criar sua conta e veja o gabarito após cada resposta.",
  alternates: { canonical: "/experimentar" },
  openGraph: {
    title: "Experimente 5 questões de concursos grátis",
    description: "Responda cinco questões sem cadastro e confira o gabarito após cada tentativa.",
    type: "website",
    url: "/experimentar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experimente 5 questões de concursos grátis",
    description: "Responda cinco questões sem cadastro e confira o gabarito após cada tentativa.",
  },
};

export default function ExperimentarPage() {
  return (
    <PublicLayout>
      <AmostraQuestoes />
    </PublicLayout>
  );
}
