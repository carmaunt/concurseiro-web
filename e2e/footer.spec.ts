import { expect, test } from "@playwright/test";

const institutionalPages = [
  { name: "Sobre", href: "/sobre", heading: "Estudo com mais direção" },
  { name: "Contato e suporte", href: "/contato", heading: "Contato e suporte" },
  { name: "Política de Privacidade", href: "/privacidade", heading: "Política de Privacidade" },
  { name: "Termos de Uso", href: "/termos", heading: "Termos de Uso" },
  { name: "Política Editorial", href: "/politica-editorial", heading: "Política Editorial" },
];

test("rodapé apresenta todos os destinos institucionais em desktop e celular", async ({ page }) => {
  await page.goto("/");

  const footer = page.getByRole("contentinfo");
  await footer.scrollIntoViewIfNeeded();

  for (const item of institutionalPages) {
    await expect(footer.getByRole("link", { name: item.name, exact: true })).toHaveAttribute(
      "href",
      item.href,
    );
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await footer.scrollIntoViewIfNeeded();

  for (const item of institutionalPages) {
    await expect(footer.getByRole("link", { name: item.name, exact: true })).toBeVisible();
  }
});

for (const item of institutionalPages) {
  test(`${item.name} possui página pública funcional`, async ({ page }) => {
    const response = await page.goto(item.href);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1, name: item.heading })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}
