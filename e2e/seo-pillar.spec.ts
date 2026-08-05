import { expect, test } from "@playwright/test";

test("página pilar pública atende a intenção de questões de concursos", async ({ page }) => {
  await page.goto("/questoes-de-concursos");

  await expect(page).toHaveTitle(/Questões de concursos grátis para praticar/);
  await expect(page.getByRole("heading", {
    level: 1,
    name: "Questões de concursos para praticar e medir seu desempenho",
  })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Resolva questões de concursos/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/questoes-de-concursos$/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-image-preview:large/);
  await expect(page.getByRole("link", { name: "Resolver 5 questões grátis" }).first())
    .toHaveAttribute("href", "/experimentar?origem=pagina_pilar");
  await expect(page.getByRole("link", { name: "Cebraspe" })).toHaveAttribute(
    "href",
    "/concursos/bancas/cebraspe",
  );
  await expect(page.getByText("Resolver questões garante aprovação?")).toBeVisible();

  const graphs = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent || "{}")),
  );
  const graphTypes = graphs.flatMap((value) =>
    Array.isArray(value["@graph"]) ? value["@graph"].map((item: Record<string, unknown>) => item["@type"]) : [value["@type"]],
  );
  expect(graphTypes).toContain("WebPage");
  expect(graphTypes).toContain("FAQPage");
});

test("menu público aponta para a landing indexável, não para a área privada", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Menu principal" }).getByRole("link", { name: "Questões" }))
    .toHaveAttribute("href", "/questoes-de-concursos");
});

test("sitemap e robots publicam a pilar e preservam a área autenticada", async ({ request }) => {
  const [sitemap, robots] = await Promise.all([
    request.get("/sitemap.xml"),
    request.get("/robots.txt"),
  ]);

  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("/questoes-de-concursos</loc>");
  expect(sitemapText).toContain("/experimentar</loc>");

  expect(robots.ok()).toBe(true);
  const robotsText = await robots.text();
  expect(robotsText).toContain("Allow: /questoes-de-concursos");
  expect(robotsText).toContain("Disallow: /questoes");
});

test("filtros editoriais não criam páginas indexáveis duplicadas", async ({ page }) => {
  await page.goto("/blog?search=fgv&category=bancas&page=2");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, follow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/blog$/);
});
