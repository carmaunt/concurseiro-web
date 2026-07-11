# O Concurseiro Web

Frontend web destinado ao usuário final do O Concurseiro.

## Stack

- Next.js 16
- React 19
- TypeScript
- Axios
- TanStack Query
- CSS Modules e CSS global

## Como rodar

```bash
cd concurseiro-web
cp .env.example .env.local
npm install
npm run dev
```

## Produção

O deploy de VPS está documentado em [docs/DEPLOY-HOSTGATOR.md](docs/DEPLOY-HOSTGATOR.md). A imagem Docker usa Node 22.16.0 e o build exige URLs HTTPS ao definir `CONCURSEIRO_DEPLOYMENT=production`.

Por padrão, a web espera a API em `http://localhost:8080`.

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `CONCURSEIRO_API_URL` | URL base da Concurseiro API, usada pelo servidor Next e pelo proxy interno. |
| `NEXT_PUBLIC_APP_DOWNLOAD_URL` | Link público da loja/página de download do app. Em produção: `https://play.google.com/store/apps/details?id=br.com.mauricio.oconcurseiro`. |
| `NEXT_PUBLIC_WEB_URL` | URL canônica pública da web, usada em metadata, sitemap e robots. |
| `CONCURSEIRO_DEPLOYMENT` | Defina como `production` no deploy para exigir URLs HTTPS válidas da API e da web. |

## Rotas criadas

Rotas públicas:

- `/`
- `/noticias`
- `/noticias/[slug]`
- `/blog`
- `/blog/[slug]`
- `/concursos-abertos`
- `/concursos-abertos/[slug]`
- `/editais-previstos`
- `/editais-previstos/[slug]`
- `/baixar-app`
- `/login`
- `/cadastro`

Rotas privadas:

- `/dashboard`
- `/questoes`
- `/questoes/[idQuestion]`

## Endpoints usados

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register/final`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET /api/v1/estudante/dashboard`
- `GET /api/v1/questoes/web`
- `GET /api/v1/questoes/web/{idQuestion}`
- `POST /api/v1/questoes/web/{idQuestion}/respostas`
- `GET /api/v1/questoes/web/{idQuestion}/respostas/ultima`
- `GET /api/v1/conteudos`
- `GET /api/v1/conteudos/destaques`
- `GET /api/v1/conteudos/{tipo}/{slug}`

## Decisões importantes

- O navegador usa o proxy same-origin `/api/backend/*`; a URL pública da API não é exposta ao cliente e o navegador não faz CORS direto para o backend.
- A API emite cookies `HttpOnly`. O `proxy.ts` bloqueia o acesso inicial à área privada sem o cookie; a API permanece responsável pela validação definitiva de cada requisição.
- O frontend guarda somente um marcador local para ajustar a navegação. Tokens não são persistidos no `localStorage`.
- Conteúdos editoriais não foram hardcoded. As páginas públicas usam placeholders temporários até existir o módulo de Conteúdos no backend/admin.
- Conteúdos editoriais agora são consumidos da API pública de conteúdos. Quando não houver conteúdo publicado ou a API estiver indisponível, a web exibe EmptyState profissional.
- A home usa componentes editoriais com destaque principal, cards médios e cards compactos. O conteúdo destacado não é repetido no feed.
- Páginas individuais de conteúdo possuem breadcrumb, tags, leitura formatada, conteúdos relacionados, canonical e Open Graph básico.
- As listagens públicas de notícias, blog, concursos abertos e editais previstos possuem busca por URL e paginação real consumindo a API.
- A rota `/questoes` lista questões reais pela API web-safe `GET /api/v1/questoes/web`, que não retorna `gabarito` nem `explicacao`.
- A resolução web envia a resposta ao backend, registra histórico e só revela gabarito/explicação após o envio.
- O dashboard consome métricas reais de `GET /api/v1/estudante/dashboard`: questões resolvidas, acertos, erros, aproveitamento, últimas respostas e desempenho por disciplina.
- A auditoria visual da Parte 6 foi salva em `docs/evidencias/parte-6-dashboard`.

## Pendências técnicas

- Evoluir Conteúdos com categorias/tags independentes, banners e configurações do portal.
- Adicionar upload de imagem de capa conforme storage padrão do projeto.
- Criar endpoints de favoritos/revisão do usuário final no backend.
- Evoluir filtros de questões para usar catálogos por nome/select quando a UX for refinada.
- Evoluir busca pública com filtros por categoria/tag quando esses cadastros estiverem consolidados.
- Antes do deploy, cadastrar a URL final da web em `CORS_ALLOWED_ORIGINS` na API do Render e habilitar a proteção CSRF compatível com o proxy same-origin.
