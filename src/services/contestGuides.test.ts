import { describe, expect, it } from "vitest";
import {
  CONTEST_GUIDE_DIMENSIONS,
  contestGuideHref,
  getAllContestGuides,
  getContestGuide,
  getContestGuideSitemapPaths,
  getContestGuides,
} from "./contestGuides";

describe("contestGuides", () => {
  it("mantém quatro dimensões e uma base permanente de 48 guias", () => {
    expect(CONTEST_GUIDE_DIMENSIONS).toEqual(["areas", "estados", "bancas", "escolaridades"]);
    expect(getContestGuides("areas")).toHaveLength(8);
    expect(getContestGuides("estados")).toHaveLength(27);
    expect(getContestGuides("bancas")).toHaveLength(9);
    expect(getContestGuides("escolaridades")).toHaveLength(4);
    expect(getAllContestGuides()).toHaveLength(48);
  });

  it("gera rotas únicas, válidas e incluídas no sitemap", () => {
    const routes = getAllContestGuides().map(contestGuideHref);
    const sitemapPaths = getContestGuideSitemapPaths();

    expect(new Set(routes).size).toBe(routes.length);
    expect(sitemapPaths).toHaveLength(49);
    expect(sitemapPaths[0]).toBe("/concursos");
    expect(sitemapPaths).toContain("/concursos/areas/seguranca-publica");
    expect(sitemapPaths).toContain("/concursos/estados/bahia");
    expect(sitemapPaths).toContain("/concursos/bancas/cebraspe");
    expect(sitemapPaths).toContain("/concursos/escolaridades/nivel-medio");
  });

  it("não publica páginas sem orientação ou com dimensão inválida", () => {
    for (const guide of getAllContestGuides()) {
      expect(guide.title.length).toBeGreaterThan(20);
      expect(guide.description.length).toBeGreaterThan(80);
      expect(guide.intro.length).toBeGreaterThan(100);
      expect(guide.watchItems).toHaveLength(3);
      expect(guide.studyItems).toHaveLength(3);
      expect(guide.faq).toHaveLength(2);
    }

    expect(getContestGuide("estados", "bahia")?.searchTerm).toBe("Bahia");
    expect(getContestGuide("dimensao-invalida", "bahia")).toBeUndefined();
    expect(getContestGuide("estados", "estado-inexistente")).toBeUndefined();
  });
});
