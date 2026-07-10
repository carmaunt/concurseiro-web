# Checklist do Prompt — Concurseiro Web

## Parte 1 — Fundação da web do usuário final

- [x] Projeto frontend web criado em `concurseiro-web`.
- [x] Variáveis de ambiente configuradas.
- [x] Rotas públicas e privadas iniciais criadas.
- [x] Layout base com header, menu, footer e área principal.
- [x] Paleta visual aplicada.
- [x] Ícone do app usado como logo/fav icon.
- [x] Componentes base criados: Header, Footer, Card, Button, Badge, Loading, EmptyState, Layout público e Layout autenticado.

## Parte 2 — Home pública em formato de feed

- [x] Hero discreto criado.
- [x] Bloco de destaque conectado à API de conteúdos.
- [x] Feed com notícias, blog, concursos e editais conectado à API.
- [x] Cards editoriais preparados com capa, categoria, título, resumo, data e link.
- [x] Chamada discreta para baixar o app.
- [x] Feed refinado com destaque maior, contagem natural e sem repetição do conteúdo destacado.
- [ ] Questões em destaque vindas da API editorial ou endpoint próprio.

## Parte 3 — Autenticação e área logada

- [x] Tela de login criada.
- [x] Tela de cadastro criada.
- [x] Fluxo de autenticação atual reutilizado.
- [x] Token mantido em cookie pelo backend; frontend guarda apenas marcador de sessão.
- [x] Rotas privadas protegidas.
- [x] Login redireciona para `/dashboard`.
- [x] Usuário não logado é redirecionado para `/login`.
- [x] Dashboard inicial criado com dados mínimos e EmptyStates.

## Parte 4 — Conteúdos gerenciados pelo painel admin

- [x] Entidade/tabela `conteudos_portal` criada no backend.
- [x] Migration Liquibase criada.
- [x] Endpoints públicos para conteúdos publicados criados.
- [x] Endpoints administrativos protegidos para CRUD criados.
- [x] Tela “Conteúdos” criada no painel admin.
- [x] Controle rascunho/publicado criado.
- [x] Conteúdo publicado aparece na web pública.
- [x] Rascunho não aparece na web pública.
- [x] Slug amigável e único por tipo.
- [ ] Categorias e tags como entidades próprias.
- [ ] Banners da home.
- [ ] Configurações do portal.
- [ ] Upload de imagem de capa.

## Parte 5 — Área de questões na web

- [x] Página `/questoes` protegida por login.
- [x] Listagem de questões vindo da API.
- [x] Endpoint web-safe criado para não expor gabarito/explicação.
- [x] Filtros iniciais por texto, disciplina, banca, assunto, órgão e ano.
- [x] Tela de resolução individual criada em `/questoes/[idQuestion]`.
- [x] Envio de resposta para API.
- [x] Histórico de resposta no backend.
- [ ] Favoritos e revisão.

## Parte 6 — Dashboard do estudante

- [x] Dashboard inicial criado.
- [x] EmptyState quando não há métricas.
- [x] Métricas reais do estudante no backend.
- [x] Últimas questões respondidas.
- [x] Disciplinas mais estudadas.
- [ ] Revisão de erros.
- [ ] Continuar estudando.

## Parte 7 — SEO, blog, notícias e páginas públicas

- [x] Páginas individuais por slug criadas.
- [x] Metadados SEO usando dados do backend quando disponíveis.
- [x] Estrutura semântica inicial.
- [x] Listagens públicas criadas.
- [x] `robots.txt` criado.
- [x] `sitemap.xml` criado.
- [x] Breadcrumb, tags, leia também e Open Graph básico nas páginas de artigo.
- [x] Busca simples no portal.
- [ ] Sitemap dinâmico incluindo slugs publicados.

## Parte 8 — Qualidade, responsividade e segurança

- [x] Layout responsivo inicial.
- [x] Estados loading/erro/vazio básicos.
- [x] Rotas privadas protegidas.
- [x] Endpoint de questões web não expõe gabarito.
- [x] Paginação em conteúdos e questões.
- [x] Lint/build/testes executados.
- [x] Auditoria visual mobile com screenshots.
- [ ] Tratamento de refresh token expirado mais refinado.
- [ ] Testes E2E dos fluxos principais.

## Parte 9 — Documentação e entrega

- [x] README da web atualizado.
- [x] Variáveis de ambiente documentadas.
- [x] Rotas principais documentadas.
- [x] Endpoints usados documentados.
- [x] Checklist de progresso criado.
- [x] Documentação específica dos endpoints de Conteúdos.
- [ ] Pendências refinadas por release.
