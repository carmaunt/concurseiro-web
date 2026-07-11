# Deploy na VPS Node.js da HostGator

Este projeto precisa de uma VPS com Node.js/Docker. Hospedagem compartilhada não atende ao uso de SSR, Proxy e Route Handlers do Next.js.

## Estado da primeira publicação

Em 11/07/2026, a aplicação foi publicada em
`https://appoconcurseiro.com.br`, em Docker, atrás de Nginx e com certificado
Let's Encrypt. O container está exposto somente como `127.0.0.1:3000` e o
firewall libera apenas SSH na porta `22022`, HTTP e HTTPS.

Os segredos permanecem exclusivamente em `/opt/concurseiro-web/.env.production`
na VPS, com permissão `600`; nunca os copie para o repositório ou para logs.

## Preparação na VPS

1. Instale Docker Engine e Docker Compose Plugin.
2. Instale Nginx e certbot, ou use o proxy reverso já fornecido pelo seu plano.
3. Copie o projeto para `/opt/concurseiro-web`.
4. Copie `.env.production.example` para `.env.production` e preencha os valores reais.
5. Execute `docker compose --env-file .env.production -f compose.production.yaml up -d --build`.
6. Verifique `curl http://127.0.0.1:3000/api/health` antes de expor o domínio.

## Nginx

O proxy deve encaminhar o domínio HTTPS para `http://127.0.0.1:3000` e preservar `Host`, `X-Forwarded-For` e `X-Forwarded-Proto`.

## DNS e API

Depois que o domínio estiver emitindo HTTPS:

1. Defina `NEXT_PUBLIC_WEB_URL` com a URL canônica HTTPS.
2. Inclua essa mesma origem em `CORS_ALLOWED_ORIGINS` na API.
3. Mantenha cookies da API em `Secure=true` e ajuste a política `SameSite` conforme a topologia final.
4. Configure o painel/API para chamar `POST https://SEU-DOMINIO/api/revalidate` com `Authorization: Bearer REVALIDATE_SECRET` após mudanças editoriais.

## Atualização manual segura

Execute como `deploy` na VPS:

```bash
cd /opt/concurseiro-web
git fetch origin
git status --short
git pull --ff-only origin main
npm ci
npm test
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=high

current_image=$(docker compose --env-file .env.production -f compose.production.yaml images -q concurseiro-web)
docker image tag "$current_image" "concurseiro-web:rollback-$(date -u +%Y%m%dT%H%M%SZ)"
docker compose --env-file .env.production -f compose.production.yaml up -d --build
curl --fail http://127.0.0.1:3000/api/health
curl --fail http://127.0.0.1:3000/api/health/dependencies
```

Depois confirme externamente a home, login, uma página pública e os dois health
checks. Não execute `git reset --hard`: se houver alteração local inesperada,
interrompa a atualização e investigue antes.

## Rollback

Para cada atualização, anote a tag criada no passo anterior. Se a nova versão
falhar depois de subir, restaure a imagem marcada sem apagar volumes ou
segredos:

```bash
cd /opt/concurseiro-web
docker compose --env-file .env.production -f compose.production.yaml down
docker tag concurseiro-web:rollback-AAAAMMDDTHHMMSSZ concurseiro-web-concurseiro-web:latest
docker compose --env-file .env.production -f compose.production.yaml up -d
curl --fail http://127.0.0.1:3000/api/health
curl --fail http://127.0.0.1:3000/api/health/dependencies
```

Substitua a tag de exemplo pela tag efetivamente criada. Sempre valide login,
uma rota privada, uma listagem e uma página de conteúdo após rollback.

Use também o [CHECKLIST-RELEASE.md](CHECKLIST-RELEASE.md) antes de expor uma nova versão.
