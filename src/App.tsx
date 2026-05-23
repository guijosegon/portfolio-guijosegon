import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiAward, FiCode, FiFolder, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
};

type Language = "pt-br" | "en-en" | "es-es";

const translations: Record<
  Language,
  {
    documentTitle: string;
    portfolio: string;
    navAbout: string;
    navProjects: string;
    navBlog: string;
    themeLight: string;
    themeDark: string;
    heroTitle: string;
    heroText: string;
    viewProjects: string;
    profileAlt: string;
    aboutTitle: string;
    aboutText: string;
    experienceTitle: string;
    hardSkillsTitle: string;
    softSkillsTitle: string;
    experienceItems: { companyPeriod: string; description: string }[];
    hardSkillsItems: {
      backend: string;
      database: string;
      frontend: string;
      architecture: string;
      devops: string;
    };
    softSkillsItems: string[];
    projectsTitle: string;
    projectsIntro: string;
    featuredTitle: string;
    otherReposTitle: string;
    personalProjectsLabel: string;
    noDescription: string;
    viewOnGithub: string;
    blogTitle: string;
    blogIntro: string;
    blogArticleTitle: string;
    blogArticleText: string;
    blogArticleMeta: string;
    accessResearch: string;
    footerText: string;
    footerLocation: string;
    rightsReserved: string;
    fetchError: string;
  }
> = {
  "pt-br": {
    documentTitle: "Guilherme José Gonçalves | Portfólio",
    portfolio: "Portfólio",
    navAbout: "Sobre mim",
    navProjects: "Projetos",
    navBlog: "Blog",
    themeLight: "☀️ Claro",
    themeDark: "🌙 Escuro",
    heroTitle: "Olá, eu sou Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Arquitetura limpa, APIs escaláveis e automação de entregas | DDD, CQRS, Azure DevOps",
    viewProjects: "Ver Projetos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mim",
    aboutText:
      "Sou Desenvolvedor Full Stack com foco em .NET e produtos web escaláveis, atuando na construção, evolução e sustentação de soluções com atenção a arquitetura, qualidade de código, performance e entrega contínua. Tenho experiência prática no desenvolvimento de APIs e aplicações web com .NET, EF Core, React/Next.js, SQL Server, PostgreSQL e MongoDB, aplicando princípios como Clean Architecture, DDD e CQRS para orientar decisões sustentáveis e manter sistemas mais evolutivos. Também atuo na estruturação de testes unitários, end-to-end e de carga, buscando maior cobertura das regras de negócio, previsibilidade em mudanças e redução de riscos em produção. No ciclo de entrega, trabalho com pipelines de CI/CD no Azure DevOps, automação de builds e deploys, além de práticas de code review e apoio a decisões arquiteturais. Tenho utilizado ferramentas e agentes de IA, como Claude Code e Codex, para apoiar padronização, documentação técnica, revisão de código e ganho de produtividade no desenvolvimento.",
    experienceTitle: "Experiência",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (dez 2025 – atual)",
        description:
          "Atuo no backend com .NET + PostgreSQL e no frontend com React/Next.js, com foco em arquitetura evolutiva, previsibilidade de entregas e qualidade. Entreguei features como SSO, Analytics, Audit Log, rebrand da plataforma, E2E/Load e Webhooks, padronizei validações e fluxo de erros com CQRS/MediatR e FluentValidation, apoiei a documentação interna orientada a IA e contribuí para pipelines e releases no Azure DevOps.",
      },
      {
        companyPeriod: "Narwal Sistemas (jul 2023 – mai 2026)",
        description:
          "Atuei como Desenvolvedor Full Stack e Scrum Master, contribuindo para a evolução contínua das soluções do produto com foco em estabilidade, qualidade e alinhamento entre engenharia e negócio. Participei da sustentação, evolução funcional e apoio técnico ao time, fortalecendo o fluxo de entrega e a colaboração entre áreas.",
      },
      {
        companyPeriod: "Márcio Bikes (2022)",
        description: "Assistente geral (oficina/estoque), atuando de forma multifuncional.",
      },
    ],
    hardSkillsItems: {
      backend: "Back-end:",
      database: "Banco de dados:",
      frontend: "Front-end:",
      architecture: "Arquitetura:",
      devops: "DevOps:",
    },
    softSkillsItems: [
      "Capacidade de aprendizagem rápida",
      "Responsabilidade com entregas",
      "Organização e planejamento",
      "Comunicação e colaboração",
      "Liderança (Scrum Master)",
      "Resolução de problemas",
      "Adaptabilidade",
      "Proatividade",
    ],
    projectsTitle: "Projetos",
    projectsIntro:
      "Projetos pessoais e estudos aplicados que uso para praticar arquitetura, backend, frontend e desenho de APIs.",
    featuredTitle: "Destaques",
    otherReposTitle: "Outros projetos pessoais",
    personalProjectsLabel: "Projeto pessoal",
    noDescription: "Sem descrição.",
    viewOnGithub: "Ver no GitHub",
    blogTitle: "Blog",
    blogIntro: "Artigos e materiais de estudo publicados para consolidar aprendizados, documentar referências técnicas e registrar práticas que aplico no dia a dia.",
    blogArticleTitle: "Scrum na Prática: Entregando Valor com Agilidade",
    blogArticleText:
      "Material produzido para organizar conceitos, papéis, cerimônias e práticas do Scrum de forma objetiva, conectando teoria com aplicação prática em times de produto e engenharia.",
    blogArticleMeta: "Pesquisa autoral • Agile, Scrum, entrega contínua",
    accessResearch: "Acessar pesquisa",
    footerText:
      "Portfólio pessoal desenvolvido para apresentar experiência, projetos e interesses técnicos com foco em engenharia de software, arquitetura e evolução contínua.",
    footerLocation: "Criciúma, Santa Catarina, Brasil",
    rightsReserved: "Todos os direitos reservados.",
    fetchError: "Erro ao buscar repositórios:",
  },
  "en-en": {
    documentTitle: "Guilherme José Gonçalves | Portfolio",
    portfolio: "Portfolio",
    navAbout: "About me",
    navProjects: "Projects",
    navBlog: "Blog",
    themeLight: "☀️ Light",
    themeDark: "🌙 Dark",
    heroTitle: "Hi, I'm Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Clean architecture, scalable APIs, and delivery automation | DDD, CQRS, Azure DevOps",
    viewProjects: "View Projects",
    profileAlt: "Photo of Guilherme José Gonçalves",
    aboutTitle: "About me",
    aboutText:
      "I am a Full Stack Developer focused on .NET and scalable web products, working across the construction, evolution, and support of solutions with attention to architecture, code quality, performance, and continuous delivery. I have hands-on experience building APIs and web applications with .NET, EF Core, React/Next.js, SQL Server, PostgreSQL, and MongoDB, applying principles such as Clean Architecture, DDD, and CQRS to support sustainable decisions and keep systems easier to evolve. I also work on unit, end-to-end, and load testing to increase business-rule coverage, improve change predictability, and reduce production risks. In the delivery cycle, I work with CI/CD pipelines in Azure DevOps, build and deployment automation, code review practices, and architectural decision support. I have been using AI tools and agents, such as Claude Code and Codex, to help with standardization, technical documentation, code review, and engineering productivity.",
    experienceTitle: "Experience",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (Dec 2025 – Present)",
        description:
          "Working on the backend with .NET + PostgreSQL and on the frontend with React/Next.js, focused on evolvable architecture, delivery predictability, and quality. Delivered features such as SSO, Analytics, Audit Log, platform rebrand, E2E/Load and Webhooks, standardized validations and error flow with CQRS/MediatR and FluentValidation, supported AI-oriented internal documentation, and contributed to Azure DevOps pipelines and releases.",
      },
      {
        companyPeriod: "Narwal Sistemas (Jul 2023 – May 2026)",
        description:
          "Worked as a Full Stack Developer and Scrum Master, contributing to the continuous evolution of product solutions with a focus on stability, quality, and alignment between engineering and business. Supported production work, functional evolution, and technical collaboration across the team, strengthening delivery flow and cross-functional coordination.",
      },
      {
        companyPeriod: "Márcio Bikes (2022)",
        description: "General assistant (workshop/inventory), working in a multi-functional role.",
      },
    ],
    hardSkillsItems: {
      backend: "Back-end:",
      database: "Database:",
      frontend: "Front-end:",
      architecture: "Architecture:",
      devops: "DevOps:",
    },
    softSkillsItems: [
      "Fast learning ability",
      "Delivery ownership",
      "Organization and planning",
      "Communication and collaboration",
      "Leadership (Scrum Master)",
      "Problem solving",
      "Adaptability",
      "Proactivity",
    ],
    projectsTitle: "Projects",
    projectsIntro:
      "Personal projects and applied studies I use to practice architecture, backend, frontend, and API design.",
    featuredTitle: "Highlights",
    otherReposTitle: "Other personal projects",
    personalProjectsLabel: "Personal project",
    noDescription: "No description.",
    viewOnGithub: "View on GitHub",
    blogTitle: "Blog",
    blogIntro: "Articles and study materials published to consolidate learnings, document technical references, and capture practices I apply in day-to-day engineering work.",
    blogArticleTitle: "Scrum in Practice: Delivering Value with Agility",
    blogArticleText:
      "A material created to organize Scrum concepts, roles, ceremonies, and practices in an objective way, connecting theory with practical application in product and engineering teams.",
    blogArticleMeta: "Original research • Agile, Scrum, continuous delivery",
    accessResearch: "Read research",
    footerText:
      "Personal portfolio built to present experience, projects, and technical interests with a focus on software engineering, architecture, and continuous improvement.",
    footerLocation: "Criciuma, Santa Catarina, Brazil",
    rightsReserved: "All rights reserved.",
    fetchError: "Error fetching repositories:",
  },
  "es-es": {
    documentTitle: "Guilherme José Gonçalves | Portafolio",
    portfolio: "Portafolio",
    navAbout: "Sobre mí",
    navProjects: "Proyectos",
    navBlog: "Blog",
    themeLight: "☀️ Claro",
    themeDark: "🌙 Oscuro",
    heroTitle: "Hola, soy Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Arquitectura limpia, APIs escalables y automatización de entregas | DDD, CQRS, Azure DevOps",
    viewProjects: "Ver Proyectos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mí",
    aboutText:
      "Soy Desarrollador Full Stack con enfoque en .NET y productos web escalables, trabajando en la construcción, evolución y sustentación de soluciones con atención a la arquitectura, calidad de código, performance y entrega continua. Tengo experiencia práctica en el desarrollo de APIs y aplicaciones web con .NET, EF Core, React/Next.js, SQL Server, PostgreSQL y MongoDB, aplicando principios como Clean Architecture, DDD y CQRS para orientar decisiones sostenibles y mantener sistemas más evolutivos. También trabajo en la estructuración de pruebas unitarias, end-to-end y de carga, buscando mayor cobertura de reglas de negocio, previsibilidad en cambios y reducción de riesgos en producción. En el ciclo de entrega, trabajo con pipelines de CI/CD en Azure DevOps, automatización de builds y deploys, además de prácticas de code review y apoyo a decisiones arquitectónicas. He utilizado herramientas y agentes de IA, como Claude Code y Codex, para apoyar la estandarización, documentación técnica, revisión de código y productividad en el desarrollo.",
    experienceTitle: "Experiencia",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (dic 2025 – actual)",
        description:
          "Actúo en el backend con .NET + PostgreSQL y en el frontend con React/Next.js, con foco en arquitectura evolutiva, previsibilidad de entregas y calidad. Entregué features como SSO, Analytics, Audit Log, rebrand de la plataforma, E2E/Load y Webhooks, estandaricé validaciones y flujo de errores con CQRS/MediatR y FluentValidation, apoyé la documentación interna orientada a IA y contribuí a pipelines y releases en Azure DevOps.",
      },
      {
        companyPeriod: "Narwal Sistemas (jul 2023 – may 2026)",
        description:
          "Actué como Desarrollador Full Stack y Scrum Master, contribuyendo a la evolución continua de las soluciones del producto con foco en estabilidad, calidad y alineación entre ingeniería y negocio. Participé en la sustentación, evolución funcional y apoyo técnico al equipo, fortaleciendo el flujo de entrega y la colaboración entre áreas.",
      },
      {
        companyPeriod: "Márcio Bikes (2022)",
        description: "Asistente general (taller/stock), actuando de forma multifuncional.",
      },
    ],
    hardSkillsItems: {
      backend: "Back-end:",
      database: "Base de datos:",
      frontend: "Front-end:",
      architecture: "Arquitectura:",
      devops: "DevOps:",
    },
    softSkillsItems: [
      "Capacidad de aprendizaje rápido",
      "Responsabilidad con entregas",
      "Organización y planificación",
      "Comunicación y colaboración",
      "Liderazgo (Scrum Master)",
      "Resolución de problemas",
      "Adaptabilidad",
      "Proactividad",
    ],
    projectsTitle: "Proyectos",
    projectsIntro:
      "Proyectos personales y estudios aplicados que utilizo para practicar arquitectura, backend, frontend y diseño de APIs.",
    featuredTitle: "Destacados",
    otherReposTitle: "Otros proyectos personales",
    personalProjectsLabel: "Proyecto personal",
    noDescription: "Sin descripción.",
    viewOnGithub: "Ver en GitHub",
    blogTitle: "Blog",
    blogIntro: "Artículos y materiales de estudio publicados para consolidar aprendizajes, documentar referencias técnicas y registrar prácticas que aplico en el trabajo diario de ingeniería.",
    blogArticleTitle: "Scrum en la Práctica: Entregando Valor con Agilidad",
    blogArticleText:
      "Material creado para organizar conceptos, roles, ceremonias y prácticas de Scrum de forma objetiva, conectando teoría con aplicación práctica en equipos de producto e ingeniería.",
    blogArticleMeta: "Investigación autoral • Agile, Scrum, entrega continua",
    accessResearch: "Acceder a la investigación",
    footerText:
      "Portafolio personal desarrollado para presentar experiencia, proyectos e intereses técnicos con foco en ingeniería de software, arquitectura y mejora continua.",
    footerLocation: "Criciúma, Santa Catarina, Brasil",
    rightsReserved: "Todos los derechos reservados.",
    fetchError: "Error al buscar repositorios:",
  },
};

const projectTags: Record<string, string[]> = {
  "poc-gestao-saude-idosos": ["C#", ".NET 8", "PostgreSQL", "MVC", "Razor", "Dashboards", "Google Charts"],
  "GuiaCompletoScrum": ["Agile", "Scrum", "Processos", "Artigo"],
  "portfolio-guijosegon": ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  "grpc-agendamento-docker": ["C#", ".NET 8", "gRPC", "Docker"],
  "compilador-didatico-ll1": ["C#", ".NET 8", "Compiladores"],
  "agendamento-academia-minimal-api": ["Minimal API", ".NET 8", "SQLite", "xUnit", "Swagger"],
  "api-controle-visitantes": ["Node", "MongoDB", "REST", "Express", "Mongoose"],
  "app-travels": ["Java", "SQLite", "Retrofit", "Mobile"],
  "comparador-sequencial-vs-paralelo": ["Java 17+", "Multithreading", "ForkJoinPool"],
  "dijkstra-caminho-mais-barato": ["Node", "Algoritmos", "Dijkstra"],
  "site-institucional": ["React", "Node", "Next"],
  "unimotors-springboot-api": ["Spring Boot 3", "Java 17", "PostgreSQL", "Flyway"],
};

const projectDescriptions: Record<Language, Record<string, string>> = {
  "pt-br": {
    "poc-gestao-saude-idosos":
      "Aplicação focada em gestão de saúde para idosos, com dashboards e visualização de indicadores para apoiar acompanhamento clínico e operacional.",
    "portfolio-guijosegon":
      "Meu portfólio pessoal em React, usado para consolidar identidade profissional, apresentar experiência e organizar projetos públicos.",
    "grpc-agendamento-docker":
      "Estudo prático de comunicação entre serviços com gRPC e conteinerização, explorando performance, contratos e ambiente reproduzível.",
    "compilador-didatico-ll1":
      "Projeto acadêmico para estudo de compiladores e parsing LL(1), com foco em fundamentos de análise sintática.",
    "agendamento-academia-minimal-api":
      "API enxuta para agendamento em academia, criada para praticar Minimal APIs, testes e documentação de endpoints.",
    "api-controle-visitantes":
      "API REST para controle de visitantes, cobrindo cadastro, fluxo de acesso e persistência com MongoDB.",
    "app-travels":
      "Aplicação mobile de estudos para organização de viagens, consumo de APIs e persistência local.",
    "comparador-sequencial-vs-paralelo":
      "Experimento comparando processamento sequencial e paralelo em Java, avaliando desempenho e concorrência.",
    "dijkstra-caminho-mais-barato":
      "Implementação do algoritmo de Dijkstra para estudo de grafos e cálculo de rotas de menor custo.",
    "site-institucional":
      "Projeto web institucional com foco em estruturação de interface, navegação e apresentação de conteúdo.",
    "unimotors-springboot-api":
      "API em Spring Boot para gestão de domínio de negócio, praticando modelagem relacional, migrações e arquitetura em camadas.",
  },
  "en-en": {
    "poc-gestao-saude-idosos":
      "An application focused on elderly healthcare management, with dashboards and indicators to support clinical and operational follow-up.",
    "portfolio-guijosegon":
      "My personal React portfolio, built to consolidate professional positioning, present experience, and organize public projects.",
    "grpc-agendamento-docker":
      "A practical study of service-to-service communication with gRPC and containerization, exploring performance, contracts, and reproducible environments.",
    "compilador-didatico-ll1":
      "An academic project for compiler and LL(1) parsing studies, focused on syntax analysis fundamentals.",
    "agendamento-academia-minimal-api":
      "A lean scheduling API for gym scenarios, built to practice Minimal APIs, tests, and endpoint documentation.",
    "api-controle-visitantes":
      "A REST API for visitor management, covering registration, access flow, and MongoDB persistence.",
    "app-travels":
      "A study-oriented mobile application for trip organization, API consumption, and local persistence.",
    "comparador-sequencial-vs-paralelo":
      "An experiment comparing sequential and parallel processing in Java, evaluating performance and concurrency.",
    "dijkstra-caminho-mais-barato":
      "An implementation of Dijkstra's algorithm for graph studies and least-cost route calculation.",
    "site-institucional":
      "An institutional web project focused on interface structure, navigation, and content presentation.",
    "unimotors-springboot-api":
      "A Spring Boot API for business-domain management, practicing relational modeling, migrations, and layered architecture.",
  },
  "es-es": {
    "poc-gestao-saude-idosos":
      "Aplicación enfocada en la gestión de salud para personas mayores, con dashboards e indicadores para apoyar el seguimiento clínico y operativo.",
    "portfolio-guijosegon":
      "Mi portafolio personal en React, creado para consolidar posicionamiento profesional, presentar experiencia y organizar proyectos públicos.",
    "grpc-agendamento-docker":
      "Estudio práctico de comunicación entre servicios con gRPC y contenerización, explorando rendimiento, contratos y entornos reproducibles.",
    "compilador-didatico-ll1":
      "Proyecto académico para estudiar compiladores y parsing LL(1), con foco en fundamentos de análisis sintáctico.",
    "agendamento-academia-minimal-api":
      "API liviana para agendamiento en gimnasio, creada para practicar Minimal APIs, pruebas y documentación de endpoints.",
    "api-controle-visitantes":
      "API REST para control de visitantes, cubriendo registro, flujo de acceso y persistencia con MongoDB.",
    "app-travels":
      "Aplicación móvil de estudio para organización de viajes, consumo de APIs y persistencia local.",
    "comparador-sequencial-vs-paralelo":
      "Experimento comparando procesamiento secuencial y paralelo en Java, evaluando rendimiento y concurrencia.",
    "dijkstra-caminho-mais-barato":
      "Implementación del algoritmo de Dijkstra para estudio de grafos y cálculo de rutas de menor costo.",
    "site-institucional":
      "Proyecto web institucional con foco en estructura de interfaz, navegación y presentación de contenido.",
    "unimotors-springboot-api":
      "API en Spring Boot para gestión de dominio de negocio, practicando modelado relacional, migraciones y arquitectura en capas.",
  },
};

const featuredRepoNames = [
  "poc-gestao-saude-idosos",
  "portfolio-guijosegon",
];

const MotionCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-50">
      <a
        href="https://github.com/guijosegon"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-zinc-950 text-zinc-200 p-3 rounded-full shadow-lg border border-zinc-800 hover:bg-black transition"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/guilhermejosegon"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-zinc-950 text-zinc-200 p-3 rounded-full shadow-lg border border-zinc-800 hover:bg-black transition"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="mailto:guilhermejosegon@gmail.com"
        className="bg-zinc-950 text-zinc-200 p-3 rounded-full shadow-lg border border-zinc-800 hover:bg-black transition"
        aria-label="Email"
      >
        <FaEnvelope />
      </a>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    return savedLanguage && translations[savedLanguage] ? savedLanguage : "pt-br";
  });

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const t = translations[language];

  useEffect(() => {
    document.title = t.documentTitle;
    localStorage.setItem("theme", JSON.stringify(darkMode));
    localStorage.setItem("language", language);
  }, [darkMode, language, t.documentTitle]);

  useEffect(() => {
    const cacheKey = "github_repos";
    const cacheTimeKey = "github_repos_time";
    const cacheDuration = 60 * 60 * 1000;

    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cached && cachedTime && Date.now() - parseInt(cachedTime) < cacheDuration) {
      setRepos(JSON.parse(cached));
      return;
    }

    fetch("https://api.github.com/users/guijosegon/repos")
      .then((res) => res.json())
      .then((data: GithubRepo[]) => {
        setRepos(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
      })
      .catch((err) => console.error(t.fetchError, err));
  }, [t.fetchError]);

  const scrollToId = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const sortedRepos = useMemo(() => {
    const filtered = repos.filter(
      (r) =>
        !r.fork &&
        r.name !== "guijosegon" &&
        r.name !== "guia-completo-scrum" &&
        r.name !== "project-assets"
    );

    // ordena por último push
    return filtered.sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
  }, [repos]);

  const featuredRepos = useMemo(() => {
    const set = new Set(featuredRepoNames.map((n) => n.toLowerCase()));
    return sortedRepos.filter((r) => set.has(r.name.toLowerCase()));
  }, [sortedRepos]);

  const nonFeaturedRepos = useMemo(() => {
    const set = new Set(featuredRepoNames.map((n) => n.toLowerCase()));
    return sortedRepos.filter((r) => !set.has(r.name.toLowerCase()));
  }, [sortedRepos]);

  const languageOptions: { value: Language; label: string }[] = [
    { value: "pt-br", label: "pt" },
    { value: "en-en", label: "en" },
    { value: "es-es", label: "es" },
  ];
  const selectedLanguageIndex = Math.max(
    0,
    languageOptions.findIndex((option) => option.value === language)
  );
  const currentProjectDescriptions = projectDescriptions[language];

  return (
    <div
      className={`${
        darkMode ? "bg-black text-zinc-100" : "bg-stone-100 text-gray-900"
      } min-h-screen font-sans`}
    >
      <header className={`sticky top-0 z-10 ${darkMode ? "bg-black/95 border-b border-zinc-900" : "bg-white"} shadow`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left">{t.portfolio}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm font-medium">
            <nav className="flex justify-center md:justify-start gap-2 text-center md:text-left">
              <button
                onClick={() => scrollToId("sobre")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "border-zinc-800 hover:bg-zinc-950" : "hover:bg-gray-200"
                }`}
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => scrollToId("projetos")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "border-zinc-800 hover:bg-zinc-950" : "hover:bg-gray-200"
                }`}
              >
                {t.navProjects}
              </button>
              <button
                onClick={() => scrollToId("blog")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "border-zinc-800 hover:bg-zinc-950" : "hover:bg-gray-200"
                }`}
              >
                {t.navBlog}
              </button>
            </nav>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <div
                className={`relative w-[96px] h-7 rounded-full border overflow-hidden ${
                  darkMode ? "bg-zinc-950 border-zinc-800" : "bg-gray-100 border-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-1/3 rounded-full shadow-sm transition-transform duration-300 ${
                    darkMode ? "bg-zinc-800" : "bg-white"
                  }`}
                  style={{ transform: `translateX(${selectedLanguageIndex * 100}%)` }}
                  aria-hidden="true"
                />

                <div className="relative z-10 grid grid-cols-3 h-full">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setLanguage(option.value)}
                      className={`text-[11px] uppercase tracking-normal transition ${
                        language === option.value
                          ? darkMode
                            ? "text-white"
                            : "text-gray-900"
                          : darkMode
                          ? "text-zinc-500 hover:text-zinc-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      aria-label={`Mudar idioma para ${option.label}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`text-base w-8 h-8 border rounded-full shadow-sm transition flex items-center justify-center ${
                  darkMode ? "border-zinc-800 hover:bg-zinc-950" : "hover:bg-gray-200"
                }`}
                aria-label={darkMode ? t.themeLight : t.themeDark}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-16 max-w-5xl mx-auto">
        <motion.section
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-4xl font-bold leading-snug">{t.heroTitle}</h2>
            <p className="text-lg mt-4 max-w-2xl">{t.heroText}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => scrollToId("projetos")}
                className={`px-6 py-2 rounded-md transition ${
                  darkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
              >
                {t.viewProjects}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/perfil.png"
              alt={t.profileAlt}
              className="w-56 h-56 rounded-full object-cover"
            />
          </div>
        </motion.section>

        <section id="sobre" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">{t.aboutTitle}</h3>

          <p className="text-base leading-relaxed">{t.aboutText}</p>

          <div className="mt-8 space-y-6">
            <MotionCard delay={0.1}>
              <div
                className={`p-6 rounded shadow hover:scale-[1.01] transition-all duration-300 border border-transparent ${
                  darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                }`}
              >
                <h4 className="flex items-center gap-2 text-xl font-semibold mb-6">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                    darkMode ? "border-zinc-800 text-zinc-300" : "border-gray-300 text-gray-700"
                  }`}>
                    <FiAward size={16} />
                  </span>
                  {t.experienceTitle}
                </h4>

                <ul className="space-y-6">
                  {t.experienceItems.map((item) => (
                    <li key={item.companyPeriod} className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
                      <div className="text-lg font-semibold mb-2">{item.companyPeriod}</div>
                      <div className={`text-sm leading-relaxed md:text-base ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{item.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MotionCard delay={0.2}>
                <div
                  className={`p-6 rounded shadow hover:scale-[1.01] transition-all duration-300 border border-transparent h-full ${
                    darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                  }`}
                >
                  <h4 className="flex items-center gap-2 text-xl font-semibold mb-6">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                      darkMode ? "border-zinc-800 text-zinc-300" : "border-gray-300 text-gray-700"
                    }`}>
                      <FiCode size={16} />
                    </span>
                    {t.hardSkillsTitle}
                  </h4>

                  <ul className="text-sm space-y-3 md:text-base">
                    <li><span className="font-semibold">{t.hardSkillsItems.backend}</span> C#, .NET, ASP.NET Core, EF Core</li>
                    <li><span className="font-semibold">{t.hardSkillsItems.database}</span> PostgreSQL, SQL Server, MongoDB</li>
                    <li><span className="font-semibold">{t.hardSkillsItems.frontend}</span> React, Next.js, React Query, Ant Design, Styled Components</li>
                    <li><span className="font-semibold">{t.hardSkillsItems.architecture}</span> Clean Architecture, DDD, CQRS/MediatR, FluentValidation, APIs escaláveis, Clean Code</li>
                    <li><span className="font-semibold">{t.hardSkillsItems.devops}</span> Azure DevOps, CI/CD, automação de builds e deploys, testes E2E e carga</li>
                  </ul>
                </div>
              </MotionCard>

              <MotionCard delay={0.3}>
                <div
                  className={`p-6 rounded shadow hover:scale-[1.01] transition-all duration-300 border border-transparent h-full ${
                    darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                  }`}
                >
                  <h4 className="flex items-center gap-2 text-xl font-semibold mb-6">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                      darkMode ? "border-zinc-800 text-zinc-300" : "border-gray-300 text-gray-700"
                    }`}>
                      <FiUser size={16} />
                    </span>
                    {t.softSkillsTitle}
                  </h4>

                  <ul className="text-sm list-disc list-inside space-y-2 md:text-base">
                    {t.softSkillsItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </MotionCard>
            </div>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <h3 className="text-2xl font-bold mb-2">{t.projectsTitle}</h3>
          <p className="mb-6">{t.projectsIntro}</p>

          {featuredRepos.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mb-3">{t.featuredTitle}</h4>
              <div className="grid gap-4 mb-10">
                {featuredRepos.map((repo, index) => (
                  <MotionCard key={repo.id} delay={index * 0.08}>
                    <div
                      className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                        darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                      }`}
                    >
                      <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] mb-3 ${
                        darkMode ? "text-zinc-500" : "text-gray-500"
                      }`}>
                        <FiFolder size={14} />
                        {t.personalProjectsLabel}
                      </div>
                      <h5 className="text-lg font-semibold mb-1">{repo.name}</h5>

                      {projectTags[repo.name]?.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs ${
                            darkMode ? "bg-black text-zinc-300 border border-zinc-800" : "bg-gray-200 text-gray-900"
                          } px-4 py-0.5 rounded-full mr-2 mb-2 inline-block`}
                        >
                          {tag}
                        </span>
                      ))}

                      <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"} mb-2`}>
                        {currentProjectDescriptions[repo.name] || repo.description || t.noDescription}
                      </p>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm underline"
                      >
                        {t.viewOnGithub}
                      </a>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </>
          )}

          <h4 className="text-lg font-semibold mb-3">{t.otherReposTitle}</h4>
          <div className="grid gap-4">
            {nonFeaturedRepos.slice(0, 10).map((repo, index) => (
              <MotionCard key={repo.id} delay={index * 0.08}>
                <div
                  className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                    darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                  }`}
                >
                  <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] mb-3 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    <FiFolder size={14} />
                    {t.personalProjectsLabel}
                  </div>
                  <h5 className="text-lg font-semibold mb-1">{repo.name}</h5>

                  {projectTags[repo.name]?.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs ${
                        darkMode ? "bg-black text-zinc-300 border border-zinc-800" : "bg-gray-200 text-gray-900"
                      } px-4 py-0.5 rounded-full mr-2 mb-2 inline-block`}
                    >
                      {tag}
                    </span>
                  ))}

                  <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"} mb-2`}>
                    {currentProjectDescriptions[repo.name] || repo.description || t.noDescription}
                  </p>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm underline"
                  >
                    {t.viewOnGithub}
                  </a>
                </div>
              </MotionCard>
            ))}
          </div>
        </section>

        <section id="blog" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">{t.blogTitle}</h3>
          <p className="mb-6">{t.blogIntro}</p>

          <div className="grid gap-4">
            <div
              className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
              }`}
            >
              <div className={`text-xs uppercase tracking-[0.18em] mb-3 ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                {t.blogArticleMeta}
              </div>
              <h4 className="text-lg font-semibold mb-1">{t.blogArticleTitle}</h4>
              <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"} mb-2`}>
                {t.blogArticleText}
              </p>
              <a
                href="https://github.com/guijosegon/GuiaCompletoScrum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                {t.accessResearch}
              </a>
            </div>
          </div>
        </section>

        <FloatingSocials />
      </main>

      <footer className={`mt-24 border-t ${darkMode ? "border-zinc-900 bg-zinc-950" : "border-gray-300 bg-white/70"}`}>
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className={`text-xs uppercase tracking-[0.24em] mb-3 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
              Guilherme Jose Goncalves
            </p>
            <p className={`text-sm leading-relaxed md:text-base ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
              {t.footerText}
            </p>
          </div>

          <div className={`text-sm md:text-right ${darkMode ? "text-zinc-500" : "text-gray-600"}`}>
            <p>{t.footerLocation}</p>
            <p>© {new Date().getFullYear()} Guilherme José Gonçalves.</p>
            <p>{t.rightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
