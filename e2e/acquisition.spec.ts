import { expect, test } from "@playwright/test";

test("portal atribui a visita e o clique ao Install Referrer da Play Store", async ({ page }) => {
  const events: Array<Record<string, unknown>> = [];
  await page.route("**/api/backend/api/v1/analytics/events", async (route) => {
    events.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({ status: 202, contentType: "application/json", body: "{}" });
  });

  await page.goto("/baixar-app?utm_source=teste&utm_campaign=funil");

  await expect.poll(() => events.some((event) => event.eventName === "portal_landing_viewed")).toBe(true);
  const storeLink = page.getByRole("link", { name: "Baixar no Google Play" });
  await expect(storeLink).toHaveAttribute("href", /[?&]referrer=/);

  const href = await storeLink.getAttribute("href");
  const referrer = new URLSearchParams(new URL(href!).searchParams.get("referrer") || "");
  const acquisitionId = referrer.get("landing_session_id");
  expect(acquisitionId).toMatch(/^web_/);
  expect(referrer.get("cta_id")).toBe("download_page_primary");

  const popupPromise = page.waitForEvent("popup");
  await storeLink.click();
  const popup = await popupPromise;
  await popup.close();

  await expect.poll(() => events.some((event) => event.eventName === "store_cta_clicked")).toBe(true);
  const landing = events.find((event) => event.eventName === "portal_landing_viewed")!;
  const click = events.find((event) => event.eventName === "store_cta_clicked")!;
  expect((landing.metadata as Record<string, unknown>).acquisition_id).toBe(acquisitionId);
  expect((click.metadata as Record<string, unknown>).acquisition_id).toBe(acquisitionId);
  expect((click.metadata as Record<string, unknown>).cta_id).toBe("download_page_primary");
});
