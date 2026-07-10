# Checklist de release

Execute antes de cada publicação em produção.

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
