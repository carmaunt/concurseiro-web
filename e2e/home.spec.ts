import { expect, test } from "@playwright/test";

test("home comunica uma proposta específica baseada no produto", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Descubra onde você mais erra e estude com mais direção",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Questões filtradas e evolução por disciplina, em um só lugar."),
  ).toBeVisible();
  await expect(page.getByText("Sua aprovação começa aqui")).toHaveCount(0);
  await expect(page).toHaveTitle(/Questões e desempenho para concursos/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Filtre questões de concursos e acompanhe acertos, erros e evolução por disciplina para estudar com mais direção.",
  );
});

test("home apresenta provas reais, comparação, plano e perguntas frequentes", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Veja exatamente como o O Concurseiro funciona" }),
  ).toBeVisible();
  await expect(page.getByTestId("product-screenshot")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "O que usuários dizem no Google Play" })).toBeVisible();
  await expect(page.getByText("3 avaliações públicas")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Acesso gratuito" })).toBeVisible();
  await expect(page.getByText("R$ 0")).toBeVisible();
  await expect(
    page.getByRole("table", {
      name: "Comparação entre portal público, conta gratuita e aplicativo Android",
    }),
  ).toBeVisible();
  await expect(page.getByText("O Concurseiro é gratuito?")).toBeVisible();
  await expect(page.getByText("Existe versão para iPhone?")).toBeVisible();
});

test("CTA principal permite responder antes do login", async ({ page }) => {
  await page.route("**/api/backend/api/v1/questoes/amostra**", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            idQuestion: "QAMOSTRA1",
            respostaSelecionada: "A",
            gabarito: "A",
            acertou: true,
            explicacao: "A alternativa A corresponde à regra apresentada.",
          },
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            idQuestion: "QAMOSTRA1",
            questao: "Qual alternativa corresponde à regra apresentada?",
            alternativas: "A) Alternativa correta\nB) Alternativa incorreta",
            disciplina: "Direito Administrativo",
            assunto: "Princípios",
            banca: "CEBRASPE",
            instituicao: "Órgão público",
            ano: 2026,
            modalidade: "A_D",
          },
        ],
      }),
    });
  });

  await page.goto("/");
  await page.getByRole("link", { name: "Testar questões grátis" }).click();

  await expect(page).toHaveURL(/\/experimentar$/);
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole("heading", { name: "Experimente 1 questão grátis" })).toBeVisible();
  await expect(page.getByText("Gabarito:")).toHaveCount(0);

  await page.getByRole("button", { name: "A Alternativa correta" }).click();
  await page.getByRole("button", { name: "Responder sem cadastro" }).click();

  await expect(page.getByText("Boa resposta")).toBeVisible();
  await expect(page.getByText("Gabarito:")).toBeVisible();
  await expect(page).not.toHaveURL(/\/login/);
});
