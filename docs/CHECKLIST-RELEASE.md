# Checklist de release

Execute antes de cada publicação em produção.

## Publicação atual — 11/07/2026

Esta seção registra somente validações efetivamente executadas na primeira
publicação em `https://appoconcurseiro.com.br`.

### Build e segurança

- [x] `npm ci`
- [x] `npm test`
- [x] `npm run test:e2e`
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm audit --audit-level=high`
- [x] `docker compose --env-file .env.production -f compose.production.yaml build`

### Ambiente e infraestrutura

- [x] `CONCURSEIRO_DEPLOYMENT=production` definido na VPS.
- [x] URLs pública da web e da API usam HTTPS.
- [x] `NEXT_PUBLIC_IMAGE_HOSTNAMES` contém somente `images.unsplash.com`.
- [x] `REVALIDATE_SECRET` foi gerado somente na VPS, com permissões restritas.
- [x] Docker, Compose, Nginx, UFW, Fail2ban e renovação automática do Certbot ativos.
- [x] Nginx encaminha apenas para `127.0.0.1:3000`; a porta 3000 não é acessível externamente.
- [x] HTTP e `www` redirecionam permanentemente para `https://appoconcurseiro.com.br`.
- [x] Certificado válido para os dois domínios e `certbot renew --dry-run` aprovado.
- [x] Imagem atual identificada para rollback: `concurseiro-web:rollback-20260711T111514Z`.

### Pós-deploy

- [x] `GET /api/health` retorna 200.
- [x] `GET /api/health/dependencies` retorna 200.
- [x] Rotas públicas `/`, `/noticias`, `/blog`, `/concursos-abertos`, `/editais-previstos`, `/login`, `/sitemap.xml` e `/robots.txt` retornam 200 externamente.
- [x] `POST /api/revalidate` validado localmente com o segredo protegido (200).
- [x] Sitemap público entregue pela aplicação.

### Pendências externas reais

- [ ] Configurar no Render a origem exata `https://appoconcurseiro.com.br` no CORS da API e confirmar em produção.
- [ ] Confirmar no Render que os cookies de autenticação usam `Secure`, `HttpOnly` e a política `SameSite` escolhida para a topologia final.
- [ ] Executar login, logout e rota privada com uma conta de teste autorizada, sem criar dados fictícios em produção.
- [ ] Publicar ao menos um conteúdo editorial acessível pela API e verificar sua URL dinâmica no sitemap, canonical e Open Graph.
- [ ] Integrar o painel/API para chamar a revalidação após publicação ou edição de conteúdo.
- [ ] Escolher e ativar o provedor de monitoramento de erros; a telemetria de terceiros permanece desativada por decisão atual.

## Build e segurança

- [ ] `npm ci`
- [ ] `npm test`
- [ ] `npm run test:e2e`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm audit --audit-level=high`
- [ ] `docker compose --env-file .env.production -f compose.production.yaml build`

## Ambiente

- [ ] `CONCURSEIRO_DEPLOYMENT=production` definido.
- [ ] URLs da web e API usam HTTPS.
- [ ] `NEXT_PUBLIC_IMAGE_HOSTNAMES` contém somente hosts confiáveis.
- [ ] `REVALIDATE_SECRET` foi gerado e não está versionado.
- [ ] A origem definitiva da web foi adicionada ao CORS da API.
- [ ] Cookies da API usam `Secure`, `HttpOnly` e política `SameSite` correta.

## Pós-deploy

- [ ] `GET /api/health` retorna 200.
- [ ] `GET /api/health/dependencies` retorna 200.
- [ ] Login, logout e uma rota privada foram testados.
- [ ] Uma página editorial aparece no sitemap e tem canonical/OG corretos.
- [ ] Publicar ou editar um conteúdo invalida o cache via `/api/revalidate`.
- [ ] Monitoramento/telemetria estão ativos conforme a configuração escolhida.
- [ ] A imagem anterior está identificada para rollback.
