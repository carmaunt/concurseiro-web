# Deploy na VPS Node.js da HostGator

Este projeto precisa de uma VPS com Node.js/Docker. Hospedagem compartilhada não atende ao uso de SSR, Proxy e Route Handlers do Next.js.

## Preparação na VPS

1. Instale Docker Engine e Docker Compose Plugin.
2. Instale Nginx e certbot, ou use o proxy reverso já fornecido pelo seu plano.
3. Copie o projeto para `/opt/concurseiro-web`.
4. Copie `.env.production.example` para `.env.production` e preencha os valores reais.
5. Execute `docker compose -f compose.production.yaml up -d --build`.
6. Verifique `curl http://127.0.0.1:3000/api/health` antes de expor o domínio.

## Nginx

O proxy deve encaminhar o domínio HTTPS para `http://127.0.0.1:3000` e preservar `Host`, `X-Forwarded-For` e `X-Forwarded-Proto`.

## DNS e API

Depois que o domínio estiver emitindo HTTPS:

1. Defina `NEXT_PUBLIC_WEB_URL` com a URL canônica HTTPS.
2. Inclua essa mesma origem em `CORS_ALLOWED_ORIGINS` na API.
3. Mantenha cookies da API em `Secure=true` e ajuste a política `SameSite` conforme a topologia final.
4. Configure o painel/API para chamar `POST https://SEU-DOMINIO/api/revalidate` com `Authorization: Bearer REVALIDATE_SECRET` após mudanças editoriais.

## Rollback

Antes de atualizar, marque a imagem atual: `docker image tag concurseiro-web-concurseiro-web:latest concurseiro-web:rollback`.
Se a verificação pós-deploy falhar, restaure com `docker compose -f compose.production.yaml down` e execute a imagem marcada no compose anterior. Sempre valide `/api/health`, `/api/health/dependencies`, login, uma listagem e uma página de conteúdo após qualquer atualização.

Use também o [CHECKLIST-RELEASE.md](CHECKLIST-RELEASE.md) antes de expor uma nova versão.
