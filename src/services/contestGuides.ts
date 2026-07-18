export const CONTEST_GUIDE_DIMENSIONS = ["areas", "estados", "bancas", "escolaridades"] as const;

export type ContestGuideDimension = (typeof CONTEST_GUIDE_DIMENSIONS)[number];

export type ContestGuide = {
  dimension: ContestGuideDimension;
  slug: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  intro: string;
  searchTerm: string;
  facts: Array<{ label: string; value: string }>;
  watchItems: string[];
  studyItems: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const contestGuideDimensionInfo: Record<ContestGuideDimension, {
  label: string;
  title: string;
  description: string;
}> = {
  areas: {
    label: "Área",
    title: "Concursos por área profissional",
    description: "Escolha uma carreira para entender o foco dos editais e organizar as matérias mais recorrentes.",
  },
  estados: {
    label: "Estado",
    title: "Concursos por estado",
    description: "Acompanhe oportunidades federais, estaduais e municipais com um ponto de partida para cada unidade da federação.",
  },
  bancas: {
    label: "Banca",
    title: "Concursos por banca organizadora",
    description: "Conheça formatos recorrentes e adapte o treino à organizadora indicada no edital.",
  },
  escolaridades: {
    label: "Escolaridade",
    title: "Concursos por escolaridade",
    description: "Encontre uma trilha compatível com a formação exigida e confirme os requisitos no edital oficial.",
  },
};

type AreaSeed = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  roles: string;
  watchItems: string[];
  studyItems: string[];
};

const areaSeeds: AreaSeed[] = [
  {
    slug: "seguranca-publica",
    name: "Segurança pública",
    summary: "Polícias, bombeiros, sistema penal e outros órgãos ligados à proteção pública.",
    intro: "A área de segurança pública reúne carreiras com etapas e requisitos muito diferentes. Além da prova objetiva, o edital pode prever avaliação física, médica, psicológica, investigação social e curso de formação.",
    roles: "polícias, bombeiros e sistema penal",
    watchItems: ["Requisitos de idade, habilitação e formação", "Etapas físicas e exames previstos no edital", "Cronograma entre prova, avaliações e curso de formação"],
    studyItems: ["Comece pelas disciplinas básicas indicadas no edital", "Treine questões da banca e da carreira escolhida", "Planeje a preparação física somente conforme as regras oficiais"],
  },
  {
    slug: "tribunais",
    name: "Tribunais",
    summary: "Carreiras administrativas, judiciárias e especializadas do Poder Judiciário.",
    intro: "Concursos de tribunais podem oferecer cargos administrativos e especialidades de nível técnico ou superior. O conteúdo jurídico e a legislação interna variam conforme o órgão e o cargo.",
    roles: "tribunais e órgãos do sistema de Justiça",
    watchItems: ["Ramo do tribunal e local de lotação", "Especialidade e formação exigida para o cargo", "Legislação específica indicada no conteúdo programático"],
    studyItems: ["Separe disciplinas básicas das matérias jurídicas", "Inclua leitura de lei quando o edital exigir", "Resolva provas anteriores do mesmo ramo e da mesma banca"],
  },
  {
    slug: "fiscal",
    name: "Fiscal",
    summary: "Administrações tributárias federais, estaduais e municipais.",
    intro: "A carreira fiscal costuma combinar conhecimentos gerais, direito, contabilidade, auditoria e legislação tributária. A distribuição das matérias e o peso de cada bloco dependem do cargo e do ente responsável.",
    roles: "administrações tributárias e fazendárias",
    watchItems: ["Peso e nota mínima por bloco de disciplinas", "Legislação tributária específica do ente", "Possíveis provas discursivas ou de títulos"],
    studyItems: ["Construa base gradual em contabilidade e direito tributário", "Use o peso das disciplinas para distribuir o tempo", "Faça simulados completos depois de consolidar a teoria"],
  },
  {
    slug: "controle",
    name: "Controle",
    summary: "Tribunais de contas, controladorias e auditoria governamental.",
    intro: "A área de controle fiscaliza recursos, contratos e resultados da administração pública. Os editais podem cobrar direito, administração pública, auditoria, contabilidade e conhecimentos especializados.",
    roles: "tribunais de contas e controladorias",
    watchItems: ["Área de especialidade do cargo", "Normas de auditoria e controle citadas no edital", "Formato e temas possíveis da prova discursiva"],
    studyItems: ["Relacione orçamento, contabilidade pública e controle", "Treine estudos de caso quando houver discursiva", "Priorize provas da mesma instituição e banca"],
  },
  {
    slug: "administrativa",
    name: "Administrativa",
    summary: "Cargos de apoio e gestão presentes em órgãos de todas as esferas.",
    intro: "Carreiras administrativas aparecem em órgãos federais, estaduais e municipais. As atribuições e os requisitos mudam bastante, portanto o nome do cargo não basta para definir o conteúdo da preparação.",
    roles: "apoio administrativo e gestão pública",
    watchItems: ["Atribuições reais descritas no edital", "Escolaridade e experiência eventualmente exigidas", "Lotação, jornada e estrutura remuneratória"],
    studyItems: ["Fortaleça português, raciocínio e informática quando previstos", "Estude administração e legislação conforme o edital", "Compare provas do mesmo cargo antes de montar o ciclo"],
  },
  {
    slug: "educacao",
    name: "Educação",
    summary: "Docência, pedagogia e apoio técnico-administrativo em redes de ensino.",
    intro: "Concursos de educação abrangem professores, pedagogos e equipes de apoio. A formação, a habilitação por disciplina e a legislação educacional precisam ser conferidas para cada cargo.",
    roles: "redes de ensino e instituições educacionais",
    watchItems: ["Licenciatura ou habilitação exigida", "Legislação da rede e plano de carreira", "Prova de títulos, didática ou aula prática"],
    studyItems: ["Combine fundamentos pedagógicos com a especialidade", "Revise legislação educacional indicada", "Prepare títulos e documentos antes do prazo"],
  },
  {
    slug: "saude",
    name: "Saúde",
    summary: "Profissionais assistenciais, vigilância e apoio em órgãos públicos de saúde.",
    intro: "A área de saúde reúne profissões regulamentadas e funções administrativas. Registro profissional, especialidade, experiência e jornadas específicas podem fazer parte dos requisitos.",
    roles: "hospitais, secretarias e órgãos de saúde",
    watchItems: ["Registro no conselho e especialização exigida", "Carga horária, plantões e local de exercício", "Protocolos e legislação sanitária do conteúdo"],
    studyItems: ["Divida o estudo entre conhecimentos gerais e específicos", "Resolva questões da sua profissão e nível de atuação", "Confirme se referências técnicas foram atualizadas no edital"],
  },
  {
    slug: "tecnologia-da-informacao",
    name: "Tecnologia da informação",
    summary: "Desenvolvimento, infraestrutura, segurança, dados e governança de TI.",
    intro: "Concursos de tecnologia podem separar vagas por desenvolvimento, infraestrutura, segurança, dados ou governança. O edital é a referência para tecnologias, normas e profundidade esperadas.",
    roles: "equipes públicas de tecnologia e dados",
    watchItems: ["Ênfase técnica e experiência exigida", "Versões, normas e referências expressamente citadas", "Existência de prova prática ou discursiva"],
    studyItems: ["Mapeie cada tópico técnico para teoria e questões", "Não presuma tecnologias fora do conteúdo programático", "Treine explicações objetivas para provas discursivas"],
  },
];

const areaGuides: ContestGuide[] = areaSeeds.map((area) => ({
  dimension: "areas",
  slug: area.slug,
  name: area.name,
  title: `Concursos da área de ${area.name}`,
  summary: area.summary,
  description: `Guia de concursos da área de ${area.name}: o que conferir nos editais, como organizar os estudos e publicações relacionadas.`,
  intro: area.intro,
  searchTerm: area.name,
  facts: [
    { label: "Recorte", value: "Área profissional" },
    { label: "Inclui", value: area.roles },
  ],
  watchItems: area.watchItems,
  studyItems: area.studyItems,
  faq: [
    {
      question: `Quais matérias estudar para concursos de ${area.name}?`,
      answer: "Use o conteúdo programático do edital como fonte principal. Provas anteriores ajudam a medir recorrência, mas não substituem a lista oficial de disciplinas.",
    },
    {
      question: "Este guia substitui a leitura do edital?",
      answer: "Não. O guia organiza o ponto de partida; requisitos, etapas, datas e regras válidas são exclusivamente os publicados pelo órgão e pela banca.",
    },
  ],
}));

type StateSeed = { slug: string; name: string; uf: string; region: string; preposition: string };

const stateSeeds: StateSeed[] = [
  { slug: "acre", name: "Acre", uf: "AC", region: "Norte", preposition: "no Acre" },
  { slug: "alagoas", name: "Alagoas", uf: "AL", region: "Nordeste", preposition: "em Alagoas" },
  { slug: "amapa", name: "Amapá", uf: "AP", region: "Norte", preposition: "no Amapá" },
  { slug: "amazonas", name: "Amazonas", uf: "AM", region: "Norte", preposition: "no Amazonas" },
  { slug: "bahia", name: "Bahia", uf: "BA", region: "Nordeste", preposition: "na Bahia" },
  { slug: "ceara", name: "Ceará", uf: "CE", region: "Nordeste", preposition: "no Ceará" },
  { slug: "distrito-federal", name: "Distrito Federal", uf: "DF", region: "Centro-Oeste", preposition: "no Distrito Federal" },
  { slug: "espirito-santo", name: "Espírito Santo", uf: "ES", region: "Sudeste", preposition: "no Espírito Santo" },
  { slug: "goias", name: "Goiás", uf: "GO", region: "Centro-Oeste", preposition: "em Goiás" },
  { slug: "maranhao", name: "Maranhão", uf: "MA", region: "Nordeste", preposition: "no Maranhão" },
  { slug: "mato-grosso", name: "Mato Grosso", uf: "MT", region: "Centro-Oeste", preposition: "no Mato Grosso" },
  { slug: "mato-grosso-do-sul", name: "Mato Grosso do Sul", uf: "MS", region: "Centro-Oeste", preposition: "no Mato Grosso do Sul" },
  { slug: "minas-gerais", name: "Minas Gerais", uf: "MG", region: "Sudeste", preposition: "em Minas Gerais" },
  { slug: "para", name: "Pará", uf: "PA", region: "Norte", preposition: "no Pará" },
  { slug: "paraiba", name: "Paraíba", uf: "PB", region: "Nordeste", preposition: "na Paraíba" },
  { slug: "parana", name: "Paraná", uf: "PR", region: "Sul", preposition: "no Paraná" },
  { slug: "pernambuco", name: "Pernambuco", uf: "PE", region: "Nordeste", preposition: "em Pernambuco" },
  { slug: "piaui", name: "Piauí", uf: "PI", region: "Nordeste", preposition: "no Piauí" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", uf: "RJ", region: "Sudeste", preposition: "no Rio de Janeiro" },
  { slug: "rio-grande-do-norte", name: "Rio Grande do Norte", uf: "RN", region: "Nordeste", preposition: "no Rio Grande do Norte" },
  { slug: "rio-grande-do-sul", name: "Rio Grande do Sul", uf: "RS", region: "Sul", preposition: "no Rio Grande do Sul" },
  { slug: "rondonia", name: "Rondônia", uf: "RO", region: "Norte", preposition: "em Rondônia" },
  { slug: "roraima", name: "Roraima", uf: "RR", region: "Norte", preposition: "em Roraima" },
  { slug: "santa-catarina", name: "Santa Catarina", uf: "SC", region: "Sul", preposition: "em Santa Catarina" },
  { slug: "sao-paulo", name: "São Paulo", uf: "SP", region: "Sudeste", preposition: "em São Paulo" },
  { slug: "sergipe", name: "Sergipe", uf: "SE", region: "Nordeste", preposition: "em Sergipe" },
  { slug: "tocantins", name: "Tocantins", uf: "TO", region: "Norte", preposition: "no Tocantins" },
];

const stateGuides: ContestGuide[] = stateSeeds.map((state) => ({
  dimension: "estados",
  slug: state.slug,
  name: `${state.name} (${state.uf})`,
  title: `Concursos ${state.preposition}: editais e preparação`,
  summary: `Ponto de partida para acompanhar seleções estaduais e municipais de ${state.name}.`,
  description: `Concursos ${state.preposition}: como acompanhar editais oficiais, comparar oportunidades e organizar a preparação no estado de ${state.name}.`,
  intro: `Esta página organiza a busca por concursos ${state.preposition}. Ela não presume que uma seleção esteja aberta: oportunidades só são apresentadas como confirmadas quando existe publicação oficial do órgão ou da banca.`,
  searchTerm: state.name,
  facts: [
    { label: "Unidade federativa", value: `${state.name} — ${state.uf}` },
    { label: "Região", value: state.region },
  ],
  watchItems: [
    `Diário Oficial e portais oficiais do estado de ${state.name}`,
    "Sites dos órgãos municipais, estaduais e das bancas contratadas",
    "Retificações, cronograma, lotação e requisitos de cada cargo",
  ],
  studyItems: [
    "Separe oportunidades confirmadas de anúncios ainda sem edital",
    "Compare o conteúdo programático com provas anteriores do órgão e da banca",
    "Monte o ciclo de estudo somente após conferir requisitos e etapas oficiais",
  ],
  faq: [
    {
      question: `Onde acompanhar concursos ${state.preposition}?`,
      answer: `Consulte o Diário Oficial, os portais dos órgãos de ${state.name} e a página da banca indicada. Agregadores ajudam a descobrir oportunidades, mas a confirmação deve vir da fonte oficial.`,
    },
    {
      question: `Todo concurso com vagas em ${state.name} é estadual?`,
      answer: "Não. Pode haver seleções federais com lotação no estado, concursos estaduais e concursos municipais. O edital identifica o órgão, a esfera e os locais de exercício.",
    },
  ],
}));

type BoardSeed = {
  slug: string;
  name: string;
  summary: string;
  profile: string;
  watchItems: string[];
  studyItems: string[];
};

const boardSeeds: BoardSeed[] = [
  { slug: "cebraspe", name: "Cebraspe", summary: "Treino orientado pelo formato e pelos critérios definidos em cada edital.", profile: "A organizadora pode adotar itens de certo ou errado ou questões de múltipla escolha. Eventual penalização por resposta incorreta depende expressamente das regras da prova.", watchItems: ["Formato dos itens e regra de pontuação", "Nota mínima por prova ou bloco", "Comandos como “certo”, “errado”, “exceto” e “incorreto”"], studyItems: ["Treine no mesmo formato previsto para a prova", "Meça acertos, erros e omissões separadamente", "Justifique por que cada item está certo ou errado durante a revisão"] },
  { slug: "fgv", name: "FGV", summary: "Preparação baseada no edital, na linguagem dos enunciados e em provas comparáveis.", profile: "As provas variam por carreira e órgão. Enunciados contextualizados e alternativas próximas podem aparecer, mas o padrão válido é sempre o do edital e das provas recentes equivalentes.", watchItems: ["Extensão e comando de cada enunciado", "Distribuição de questões e pesos", "Jurisprudência, normas ou referências delimitadas no edital"], studyItems: ["Resolva a questão antes de comparar alternativas", "Revise o motivo exato de cada erro", "Use provas recentes da mesma área e nível de cargo"] },
  { slug: "fcc", name: "FCC", summary: "Questões objetivas e preparação ajustada ao cargo e à área de conhecimento.", profile: "A Fundação Carlos Chagas organiza provas para diferentes carreiras. A cobrança pode combinar conceitos, interpretação e aplicação de normas, com variação relevante entre editais.", watchItems: ["Conteúdo por especialidade", "Peso e quantidade de questões por disciplina", "Atualização legislativa exigida"], studyItems: ["Crie revisões curtas de conceitos e normas", "Compare alternativas palavra por palavra", "Priorize provas da mesma área profissional"] },
  { slug: "vunesp", name: "Vunesp", summary: "Prática por provas anteriores sem generalizar além do edital vigente.", profile: "A Vunesp organiza concursos de diferentes níveis e órgãos. Questões objetivas são frequentes, mas matérias, profundidade e critérios mudam conforme a seleção.", watchItems: ["Programa de cada disciplina", "Duração e composição da prova", "Critérios de desempate e nota mínima"], studyItems: ["Treine blocos com tempo controlado", "Registre padrões de erro por disciplina", "Reforce o conteúdo específico do órgão"] },
  { slug: "cesgranrio", name: "Cesgranrio", summary: "Estudo por conteúdo programático e amostras recentes da organizadora.", profile: "A Cesgranrio realiza seleções em áreas variadas. O estilo e a complexidade dependem do contratante e do cargo, por isso provas equivalentes são uma referência melhor do que generalizações.", watchItems: ["Conhecimentos básicos e específicos", "Peso das questões e critérios de classificação", "Referências técnicas indicadas"], studyItems: ["Selecione provas de área e escolaridade semelhantes", "Treine leitura e resolução sob tempo", "Revise lacunas usando o conteúdo do edital"] },
  { slug: "instituto-aocp", name: "Instituto AOCP", summary: "Preparação direcionada pela composição real da prova e pela especialidade.", profile: "O Instituto AOCP organiza concursos de diferentes áreas. A prova objetiva e outras etapas devem ser analisadas no edital específico, inclusive quanto a pesos e mínimos.", watchItems: ["Quadro de provas por cargo", "Regras de habilitação em cada etapa", "Conteúdo específico e legislação local"], studyItems: ["Mapeie cada item do edital", "Resolva provas do mesmo nível de escolaridade", "Faça simulados com a distribuição oficial"] },
  { slug: "ibfc", name: "IBFC", summary: "Questões e simulados alinhados ao cargo, sem depender de um perfil genérico.", profile: "O IBFC atua em seleções com cargos e etapas diversos. O candidato deve conferir a estrutura da prova, as notas mínimas e o detalhamento do conteúdo no documento oficial.", watchItems: ["Número de alternativas e regra de correção", "Mínimos por disciplina ou bloco", "Etapas adicionais além da objetiva"], studyItems: ["Use provas recentes e comparáveis", "Transforme erros recorrentes em revisões", "Simule tempo e ordem de resolução"] },
  { slug: "quadrix", name: "Quadrix", summary: "Atenção ao formato adotado e à regra de pontuação de cada seleção.", profile: "O Instituto Quadrix pode organizar provas com formatos distintos. A leitura do edital é indispensável para saber se há itens de julgamento, múltipla escolha e alguma regra específica de pontuação.", watchItems: ["Tipo de questão previsto", "Pontuação de acertos, erros e itens em branco", "Conteúdo e legislação do conselho ou órgão"], studyItems: ["Adapte o treino ao formato anunciado", "Calcule desempenho com a regra oficial", "Resolva provas do mesmo setor quando disponíveis"] },
  { slug: "idecan", name: "Idecan", summary: "Planejamento apoiado em provas recentes e nas regras específicas do edital.", profile: "O Idecan organiza concursos em várias áreas e escolaridades. Quantidade de questões, distribuição de matérias e etapas adicionais precisam ser verificadas para cada seleção.", watchItems: ["Estrutura da prova por cargo", "Conteúdos específicos e legislação", "Prazos de recursos e critérios de classificação"], studyItems: ["Comece pelo edital verticalizado", "Escolha provas anteriores comparáveis", "Revise os temas com maior incidência sem abandonar os demais"] },
];

const boardGuides: ContestGuide[] = boardSeeds.map((board) => ({
  dimension: "bancas",
  slug: board.slug,
  name: board.name,
  title: `Como estudar para provas da ${board.name}`,
  summary: board.summary,
  description: `Guia da banca ${board.name}: pontos para conferir no edital, estratégia de questões e preparação sem generalizações enganosas.`,
  intro: board.profile,
  searchTerm: board.name,
  facts: [
    { label: "Recorte", value: "Banca organizadora" },
    { label: "Regra principal", value: "O edital vigente prevalece" },
  ],
  watchItems: board.watchItems,
  studyItems: board.studyItems,
  faq: [
    { question: `Como começar a estudar para a ${board.name}?`, answer: "Leia a estrutura da prova, organize o conteúdo programático e resolva provas recentes de cargos com área e escolaridade semelhantes." },
    { question: `${board.name} usa sempre o mesmo formato?`, answer: "Não necessariamente. O órgão contratante, o cargo e o edital podem alterar formato, pesos, pontuação e etapas. Confirme tudo no documento oficial." },
  ],
}));

type EducationSeed = {
  slug: string;
  name: string;
  requirement: string;
  summary: string;
  intro: string;
  watchItems: string[];
  studyItems: string[];
};

const educationSeeds: EducationSeed[] = [
  { slug: "nivel-fundamental", name: "Nível fundamental", requirement: "Ensino fundamental", summary: "Oportunidades cujo requisito escolar deve ser confirmado no edital.", intro: "Concursos de nível fundamental podem exigir formação completa ou incompleta, além de habilitação, curso específico ou experiência para determinados cargos. O edital define o requisito válido.", watchItems: ["Etapa do ensino fundamental exigida", "Habilitação ou experiência adicional", "Atividades, esforço físico e local de trabalho"], studyItems: ["Revise português e matemática conforme o programa", "Pratique questões do mesmo nível e cargo", "Inclua conhecimentos específicos somente quando previstos"] },
  { slug: "nivel-medio", name: "Nível médio", requirement: "Ensino médio", summary: "Cargos administrativos, operacionais e de apoio com requisitos variados.", intro: "Concursos de nível médio abrangem muitas carreiras. Alguns cargos acrescentam habilitação, curso de formação ou requisitos físicos, então a escolaridade isolada não garante elegibilidade.", watchItems: ["Conclusão do ensino médio na data indicada", "CNH, idade ou curso de formação quando exigidos", "Etapas além da prova objetiva"], studyItems: ["Construa base nas disciplinas comuns do edital", "Priorize o conteúdo específico do cargo", "Treine questões da banca na mesma escolaridade"] },
  { slug: "nivel-tecnico", name: "Nível técnico", requirement: "Formação técnica", summary: "Vagas que combinam ensino médio e habilitação profissional específica.", intro: "Cargos técnicos normalmente indicam a área do curso e podem exigir registro no conselho profissional. Nomenclaturas parecidas não significam requisitos equivalentes.", watchItems: ["Curso técnico aceito e carga horária", "Registro profissional eventualmente obrigatório", "Experiência, certificação ou atribuições do cargo"], studyItems: ["Separe conhecimentos gerais e núcleo técnico", "Use referências técnicas indicadas no edital", "Resolva provas da mesma especialidade"] },
  { slug: "nivel-superior", name: "Nível superior", requirement: "Graduação", summary: "Cargos de formação geral ou graduação específica em diferentes carreiras.", intro: "Concursos de nível superior podem aceitar qualquer graduação ou exigir curso, registro e especialização específicos. A comprovação costuma ocorrer na posse, mas a regra deve ser lida no edital.", watchItems: ["Graduação aceita e momento de comprovação", "Registro em conselho e pós-graduação exigidos", "Prova discursiva, prática ou avaliação de títulos"], studyItems: ["Equilibre disciplinas gerais e conhecimentos da especialidade", "Prepare discursivas e títulos quando previstos", "Escolha provas anteriores de formação equivalente"] },
];

const educationGuides: ContestGuide[] = educationSeeds.map((education) => ({
  dimension: "escolaridades",
  slug: education.slug,
  name: education.name,
  title: `Concursos de ${education.name.toLowerCase()}`,
  summary: education.summary,
  description: `Guia de concursos de ${education.name.toLowerCase()}: requisitos, pontos do edital e como organizar os estudos para esse nível de formação.`,
  intro: education.intro,
  searchTerm: education.name,
  facts: [
    { label: "Escolaridade", value: education.requirement },
    { label: "Confirmação", value: "Requisito definido no edital" },
  ],
  watchItems: education.watchItems,
  studyItems: education.studyItems,
  faq: [
    { question: `Quais cargos aceitam ${education.name.toLowerCase()}?`, answer: "A lista varia em cada seleção. Consulte o quadro de vagas e os requisitos do cargo; o título informal da vaga não substitui a exigência descrita no edital." },
    { question: "Quando preciso comprovar a escolaridade?", answer: "O edital informa a etapa de comprovação, frequentemente relacionada à posse. Leia também as retificações e as normas do órgão responsável." },
  ],
}));

const guidesByDimension: Record<ContestGuideDimension, ContestGuide[]> = {
  areas: areaGuides,
  estados: stateGuides,
  bancas: boardGuides,
  escolaridades: educationGuides,
};

export function getContestGuides(dimension: ContestGuideDimension) {
  return guidesByDimension[dimension];
}

export function getAllContestGuides() {
  return CONTEST_GUIDE_DIMENSIONS.flatMap((dimension) => guidesByDimension[dimension]);
}

export function getContestGuide(dimension: string, slug: string) {
  if (!CONTEST_GUIDE_DIMENSIONS.includes(dimension as ContestGuideDimension)) return undefined;
  return guidesByDimension[dimension as ContestGuideDimension].find((guide) => guide.slug === slug);
}

export function contestGuideHref(guide: Pick<ContestGuide, "dimension" | "slug">) {
  return `/concursos/${guide.dimension}/${guide.slug}`;
}

export function getContestGuideSitemapPaths() {
  return ["/concursos", ...getAllContestGuides().map(contestGuideHref)];
}
