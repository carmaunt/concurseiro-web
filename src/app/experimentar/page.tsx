import type { Metadata } from "next";
import { PublicLayout } from "@/components/PublicLayout";
import { AmostraQuestoes } from "./AmostraQuestoes";

export const metadata: Metadata = {
  title: "Experimente questões grátis",
  description:
    "Resolva cinco questões de concursos antes de criar sua conta e veja o gabarito após cada resposta.",
};

export default function ExperimentarPage() {
  return (
    <PublicLayout>
      <AmostraQuestoes />
    </PublicLayout>
  );
}
