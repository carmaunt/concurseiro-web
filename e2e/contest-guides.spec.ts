import { expect, test } from "@playwright/test";

test("diretório organiza os 48 guias nas quatro dimensões", async ({ page }) => {
  await page.goto("/concursos");

  await expect(page.getByRole("heading", { level: 1, name: "Encontre concursos pelo seu perfil de estudo" })).toBeVisible();
  await expect(page.getByText("48 guias permanentes")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Concursos por área profissional" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Concursos por estado" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Concursos por banca organizadora" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Concursos por escolaridade" })).toBeVisible();
  await expect(page.locator('a[href^="/concursos/"]')).toHaveCount(48);
});

for (const guide of [
  { path: "/concursos/areas/seguranca-publica", heading: "Concursos da área de Segurança pública" },
  { path: "/concursos/estados/bahia", heading: "Concursos na Bahia: editais e preparação" },
  { path: "/concursos/bancas/cebraspe", heading: "Como estudar para provas da Cebraspe" },
  { path: "/concursos/escolaridades/nivel-medio", heading: "Concursos de nível médio" },
]) {
  test(`${guide.path} entrega conteúdo permanente e metadados próprios`, async ({ page }) => {
    await page.goto(guide.path);

    await expect(page.getByRole("heading", { level: 1, name: guide.heading })).toBeVisible();
    await expect(page.getByRole("heading", { name: "O que conferir antes de se inscrever" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Como transformar o edital em estudo" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Perguntas frequentes" })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${guide.path}$`));
    await expect(page.locator('script[type="application/ld\\+json"]')).toHaveCount(2);
  });
}

test("diretório e guia permanecem navegáveis no celular", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/concursos");
  await page.getByRole("link", { name: /Bahia \(BA\)/ }).click();

  await expect(page).toHaveURL(/\/concursos\/estados\/bahia$/);
  await expect(page.getByRole("heading", { level: 1, name: "Concursos na Bahia: editais e preparação" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Testar questões grátis" })).toBeVisible();
});

test("sitemap publica o diretório e as quatro dimensões", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const xml = await response.text();

  expect(response.ok()).toBe(true);
  expect(xml).toContain("/concursos</loc>");
  expect(xml).toContain("/concursos/areas/seguranca-publica</loc>");
  expect(xml).toContain("/concursos/estados/bahia</loc>");
  expect(xml).toContain("/concursos/bancas/cebraspe</loc>");
  expect(xml).toContain("/concursos/escolaridades/nivel-medio</loc>");
});
