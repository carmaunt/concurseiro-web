import { expect, test } from "@playwright/test";

test("visitante é redirecionado ao tentar abrir o dashboard", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page).toHaveURL(/\/login\?next=%2Fdashboard$/);
  await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();
});

test("visitante é redirecionado ao tentar abrir questões", async ({ page }) => {
  await page.goto("/questoes");

  await expect(page).toHaveURL(/\/login\?next=%2Fquestoes$/);
});
