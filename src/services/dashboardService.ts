import { api, unwrapApiData } from "./api";
import type { DashboardEstudante } from "@/types/dashboard";

export async function carregarDashboardEstudante() {
  const response = await api.get("/api/v1/estudante/dashboard");
  const dashboard = unwrapApiData<DashboardEstudante>(response.data);

  return {
    ...dashboard,
    desempenhoPorDisciplina: dashboard.desempenhoPorDisciplina.map((item) => {
      const erros = item.erros ?? Math.max(item.total - item.acertos, 0);
      const aproveitamento = item.aproveitamento ?? (
        item.total === 0 ? 0 : Math.round((item.acertos * 1000) / item.total) / 10
      );

      return {
        ...item,
        erros,
        aproveitamento,
      };
    }),
  };
}
