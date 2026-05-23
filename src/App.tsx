import { useEffect, useMemo, useState } from "react";
import { BiLogoMicrosoft } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiArrowRight, FiAward, FiCode, FiFolder, FiUser } from "react-icons/fi";
import { SiDocker, SiDotnet, SiMongodb, SiNextdotjs, SiPostgresql, SiReact, SiStyledcomponents } from "react-icons/si";
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
type AboutTab = "experience" | "hard-skills" | "soft-skills";
type ProjectTab = "featured" | "all";

const translations: Record<
  Language,
  {
    documentTitle: string;
    portfolio: string;
    navAbout: string;
    navProjects: string;
    navBlog: string;
    navContact: string;
    themeLight: string;
    themeDark: string;
    heroTitle: string;
    heroText: string;
    heroEyebrow: string;
    heroCtaSecondary: string;
    viewProjects: string;
    profileAlt: string;
    aboutTitle: string;
    aboutText: string;
    techStackLabel: string;
    experienceTitle: string;
    hardSkillsTitle: string;
    softSkillsTitle: string;
    tabsLabel: string;
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
    projectsAsideLabel: string;
    projectsAsideText: string;
    noDescription: string;
    viewOnGithub: string;
    blogTitle: string;
    blogIntro: string;
    blogArticleTitle: string;
    blogArticleText: string;
    blogArticleMeta: string;
    accessResearch: string;
    contactTitle: string;
    contactIntro: string;
    contactEmailLabel: string;
    contactSocialLabel: string;
    contactEmailCta: string;
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
    navContact: "Contato",
    themeLight: "☀️ Claro",
    themeDark: "🌙 Escuro",
    heroTitle: "Olá, eu sou Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Arquitetura limpa, APIs escaláveis e automação de entregas | DDD, CQRS, Azure DevOps",
    heroEyebrow: "Engenharia de software com foco em produto, arquitetura e entrega",
    heroCtaSecondary: "Ir para contato",
    viewProjects: "Ver Projetos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mim",
    aboutText:
      "Sou Desenvolvedor Full Stack com mais de quatro anos de experiência em software, com foco em .NET e produtos web escaláveis. Atuo no desenvolvimento de APIs e aplicações com .NET, EF Core, React/Next.js, SQL Server, PostgreSQL e MongoDB, aplicando princípios como Clean Architecture, DDD e CQRS para manter soluções mais evolutivas. Também trabalho com testes, CI/CD no Azure DevOps, code review e apoio a decisões arquiteturais, além de utilizar ferramentas de IA para documentação técnica, padronização e ganho de produtividade.",
    techStackLabel: "Tecnologias e práticas",
    experienceTitle: "Experiência",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    tabsLabel: "Navegação da seção Sobre",
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
    projectsAsideLabel: "Curadoria",
    projectsAsideText:
      "Os projetos aqui funcionam como laboratório de arquitetura, modelagem de APIs, experiências com frontend e organização de código.",
    noDescription: "Sem descrição.",
    viewOnGithub: "Ver no GitHub",
    blogTitle: "Blog",
    blogIntro: "Artigos e materiais de estudo publicados para consolidar aprendizados, documentar referências técnicas e registrar práticas que aplico no dia a dia.",
    blogArticleTitle: "Scrum na Prática: Entregando Valor com Agilidade",
    blogArticleText:
      "Material produzido para organizar conceitos, papéis, cerimônias e práticas do Scrum de forma objetiva, conectando teoria com aplicação prática em times de produto e engenharia.",
    blogArticleMeta: "Pesquisa autoral • Agile, Scrum, entrega contínua",
    accessResearch: "Acessar pesquisa",
    contactTitle: "Contato",
    contactIntro:
      "Se quiser conversar sobre oportunidades, produto, arquitetura ou projetos, você pode falar comigo por email ou pelos links profissionais abaixo.",
    contactEmailLabel: "Email",
    contactSocialLabel: "Redes profissionais",
    contactEmailCta: "Enviar email",
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
    navContact: "Contact",
    themeLight: "☀️ Light",
    themeDark: "🌙 Dark",
    heroTitle: "Hi, I'm Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Clean architecture, scalable APIs, and delivery automation | DDD, CQRS, Azure DevOps",
    heroEyebrow: "Software engineering focused on product, architecture, and delivery",
    heroCtaSecondary: "Jump to contact",
    viewProjects: "View Projects",
    profileAlt: "Photo of Guilherme José Gonçalves",
    aboutTitle: "About me",
    aboutText:
      "I am a Full Stack Developer with more than four years of experience in software, focused on .NET and scalable web products. I build APIs and web applications with .NET, EF Core, React/Next.js, SQL Server, PostgreSQL, and MongoDB, applying principles such as Clean Architecture, DDD, and CQRS to keep systems easier to evolve. I also work with testing, CI/CD in Azure DevOps, code review, and architectural decision support, while using AI tools to improve technical documentation, standardization, and engineering productivity.",
    techStackLabel: "Technologies and practices",
    experienceTitle: "Experience",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    tabsLabel: "About section navigation",
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
    projectsAsideLabel: "Curation",
    projectsAsideText:
      "These projects work as a lab for architecture, API design, frontend experiments, and code organization.",
    noDescription: "No description.",
    viewOnGithub: "View on GitHub",
    blogTitle: "Blog",
    blogIntro: "Articles and study materials published to consolidate learnings, document technical references, and capture practices I apply in day-to-day engineering work.",
    blogArticleTitle: "Scrum in Practice: Delivering Value with Agility",
    blogArticleText:
      "A material created to organize Scrum concepts, roles, ceremonies, and practices in an objective way, connecting theory with practical application in product and engineering teams.",
    blogArticleMeta: "Original research • Agile, Scrum, continuous delivery",
    accessResearch: "Read research",
    contactTitle: "Contact",
    contactIntro:
      "If you want to talk about opportunities, product, architecture, or projects, you can reach me by email or through the professional links below.",
    contactEmailLabel: "Email",
    contactSocialLabel: "Professional links",
    contactEmailCta: "Send email",
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
    navContact: "Contacto",
    themeLight: "☀️ Claro",
    themeDark: "🌙 Oscuro",
    heroTitle: "Hola, soy Guilherme José Gonçalves",
    heroText:
      "Full Stack Developer | .NET, React/Next.js | Arquitectura limpia, APIs escalables y automatización de entregas | DDD, CQRS, Azure DevOps",
    heroEyebrow: "Ingeniería de software con foco en producto, arquitectura y entrega",
    heroCtaSecondary: "Ir a contacto",
    viewProjects: "Ver Proyectos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mí",
    aboutText:
      "Soy Desarrollador Full Stack con más de cuatro años de experiencia en software, con enfoque en .NET y productos web escalables. Desarrollo APIs y aplicaciones web con .NET, EF Core, React/Next.js, SQL Server, PostgreSQL y MongoDB, aplicando principios como Clean Architecture, DDD y CQRS para mantener soluciones más evolutivas. También trabajo con pruebas, CI/CD en Azure DevOps, code review y apoyo a decisiones arquitectónicas, además de utilizar herramientas de IA para documentación técnica, estandarización y productividad en el desarrollo.",
    techStackLabel: "Tecnologías y prácticas",
    experienceTitle: "Experiencia",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    tabsLabel: "Navegación de la sección Sobre",
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
    projectsAsideLabel: "Curaduría",
    projectsAsideText:
      "Estos proyectos funcionan como laboratorio de arquitectura, modelado de APIs, experimentos de frontend y organización de código.",
    noDescription: "Sin descripción.",
    viewOnGithub: "Ver en GitHub",
    blogTitle: "Blog",
    blogIntro: "Artículos y materiales de estudio publicados para consolidar aprendizajes, documentar referencias técnicas y registrar prácticas que aplico en el trabajo diario de ingeniería.",
    blogArticleTitle: "Scrum en la Práctica: Entregando Valor con Agilidad",
    blogArticleText:
      "Material creado para organizar conceptos, roles, ceremonias y prácticas de Scrum de forma objetiva, conectando teoría con aplicación práctica en equipos de producto e ingeniería.",
    blogArticleMeta: "Investigación autoral • Agile, Scrum, entrega continua",
    accessResearch: "Acceder a la investigación",
    contactTitle: "Contacto",
    contactIntro:
      "Si quieres hablar sobre oportunidades, producto, arquitectura o proyectos, puedes contactarme por correo o por los enlaces profesionales de abajo.",
    contactEmailLabel: "Correo",
    contactSocialLabel: "Redes profesionales",
    contactEmailCta: "Enviar correo",
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

const techHighlights = [
  { icon: SiDotnet, label: "C# / .NET" },
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: BiLogoMicrosoft, label: "Azure DevOps / Azure" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiStyledcomponents, label: "Styled Components" },
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
    return saved ? JSON.parse(saved) : true;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    return savedLanguage && translations[savedLanguage] ? savedLanguage : "pt-br";
  });
  const [aboutTab, setAboutTab] = useState<AboutTab>("experience");
  const [projectTab, setProjectTab] = useState<ProjectTab>("featured");

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
  const aboutTabs: { key: AboutTab; label: string }[] = [
    { key: "experience", label: t.experienceTitle },
    { key: "hard-skills", label: t.hardSkillsTitle },
    { key: "soft-skills", label: t.softSkillsTitle },
  ];
  const projectTabs: { key: ProjectTab; label: string }[] = [
    { key: "featured", label: t.featuredTitle },
    { key: "all", label: t.otherReposTitle },
  ];
  const activeProjectList = projectTab === "featured" ? featuredRepos : nonFeaturedRepos.slice(0, 10);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-zinc-100" : "bg-stone-100 text-gray-900"
      } min-h-screen font-sans`}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-24 left-[-10%] h-80 w-80 rounded-full blur-3xl ${darkMode ? "bg-cyan-500/10" : "bg-sky-300/30"}`} />
        <div className={`absolute top-[28rem] right-[-10%] h-96 w-96 rounded-full blur-3xl ${darkMode ? "bg-indigo-500/10" : "bg-indigo-200/40"}`} />
      </div>
      <header className="sticky top-0 z-20 px-4 pt-4">
        <div
          className={`max-w-5xl mx-auto rounded-full border shadow-lg backdrop-blur-xl ${
            darkMode
              ? "border-zinc-800/80 bg-black/70 shadow-black/30"
              : "border-white/80 bg-white/80 shadow-gray-200/80"
          }`}
        >
          <div className="px-5 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-center md:text-left">
                {t.portfolio}
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 text-sm font-medium">
              <nav
                className={`flex flex-wrap justify-center md:justify-start gap-2 text-center md:text-left rounded-full border p-1 ${
                  darkMode ? "border-zinc-800 bg-zinc-950/70" : "border-gray-200 bg-white/70"
                }`}
              >
              <button
                onClick={() => scrollToId("sobre")}
                className={`text-xs px-3 h-8 rounded-full transition ${
                  darkMode ? "text-zinc-300 hover:bg-black hover:text-white" : "hover:bg-gray-200"
                }`}
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => scrollToId("projetos")}
                className={`text-xs px-3 h-8 rounded-full transition ${
                  darkMode ? "text-zinc-300 hover:bg-black hover:text-white" : "hover:bg-gray-200"
                }`}
              >
                {t.navProjects}
              </button>
              <button
                onClick={() => scrollToId("blog")}
                className={`text-xs px-3 h-8 rounded-full transition ${
                  darkMode ? "text-zinc-300 hover:bg-black hover:text-white" : "hover:bg-gray-200"
                }`}
              >
                {t.navBlog}
              </button>
              <button
                onClick={() => scrollToId("contato")}
                className={`text-xs px-3 h-8 rounded-full transition ${
                  darkMode ? "text-zinc-300 hover:bg-black hover:text-white" : "hover:bg-gray-200"
                }`}
              >
                {t.navContact}
              </button>
              </nav>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <div
                  className={`relative w-[96px] h-8 rounded-full border overflow-hidden ${
                    darkMode ? "bg-zinc-950 border-zinc-800" : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-7 w-1/3 rounded-full shadow-sm transition-transform duration-300 ${
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
                  className={`text-base w-8 h-8 border rounded-full transition flex items-center justify-center ${
                    darkMode ? "border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-black" : "hover:bg-gray-200"
                  }`}
                  aria-label={darkMode ? t.themeLight : t.themeDark}
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative px-6 py-16 max-w-5xl mx-auto">
        <motion.section
          className={`relative overflow-hidden rounded-[2rem] border px-8 py-10 md:px-10 md:py-12 ${
            darkMode
              ? "border-zinc-900 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(135deg,#050505_10%,#0b1220_55%,#050505_100%)]"
              : "border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.45),_transparent_30%),linear-gradient(135deg,#ffffff_10%,#e0f2fe_55%,#f5f5f4_100%)]"
          }`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 opacity-40">
            <div className={`absolute -right-12 top-10 h-40 w-40 rounded-full blur-2xl ${darkMode ? "bg-cyan-400/20" : "bg-sky-300/50"}`} />
            <div className={`absolute bottom-0 left-1/3 h-32 w-32 rounded-full blur-2xl ${darkMode ? "bg-indigo-400/20" : "bg-indigo-200/50"}`} />
          </div>

          <div className="relative grid md:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
            <div>
              <p className={`text-xs uppercase tracking-[0.28em] ${darkMode ? "text-cyan-200/70" : "text-sky-700"}`}>
                {t.heroEyebrow}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-4">{t.heroTitle}</h2>
              <p className={`text-lg mt-5 max-w-2xl ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{t.heroText}</p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => scrollToId("projetos")}
                  className={`px-6 py-3 rounded-full transition inline-flex items-center gap-2 ${
                    darkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {t.viewProjects}
                  <FiArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollToId("contato")}
                  className={`px-6 py-3 rounded-full border transition ${
                    darkMode ? "border-zinc-700 text-zinc-100 hover:bg-zinc-950" : "border-gray-300 hover:bg-white/80"
                  }`}
                >
                  {t.heroCtaSecondary}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className={`relative rounded-[2rem] border p-3 backdrop-blur ${
                darkMode ? "border-zinc-800 bg-black/40" : "border-white/80 bg-white/70"
              }`}>
                <div className={`absolute inset-0 rounded-[2rem] ${darkMode ? "bg-gradient-to-b from-white/5 to-transparent" : "bg-gradient-to-b from-white/60 to-transparent"}`} />
                <img
                  src="/perfil.png"
                  alt={t.profileAlt}
                  className="relative w-56 h-56 md:w-72 md:h-72 rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <section id="sobre" className="mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.28em] ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                {t.aboutTitle}
              </p>
              <h3 className="text-3xl font-bold mt-3 mb-4">{t.aboutTitle}</h3>
              <p className={`text-base leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{t.aboutText}</p>
              <div className="mt-6">
                <p className={`text-xs uppercase tracking-[0.18em] mb-3 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  {t.techStackLabel}
                </p>
                <div className="grid grid-cols-4 gap-x-6 gap-y-5 max-w-md">
                  {techHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        title={item.label}
                        aria-label={item.label}
                        className={`flex items-center justify-center ${
                          darkMode ? "text-zinc-300" : "text-gray-700"
                        }`}
                      >
                        <Icon className={darkMode ? "text-zinc-100" : "text-gray-900"} size={28} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div
                role="tablist"
                aria-label={t.tabsLabel}
                className={`inline-flex flex-wrap gap-2 rounded-full border p-1 ${
                  darkMode ? "border-zinc-800 bg-zinc-950" : "border-gray-200 bg-white"
                }`}
              >
                {aboutTabs.map((tab) => (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={aboutTab === tab.key}
                    onClick={() => setAboutTab(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      aboutTab === tab.key
                        ? darkMode
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : darkMode
                        ? "text-zinc-400 hover:bg-black hover:text-zinc-100"
                        : "text-gray-600 hover:bg-stone-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <MotionCard delay={0.1}>
                <div
                  className={`rounded-[1.75rem] border p-6 md:p-8 ${
                    darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900" : "bg-white text-gray-900"
                  }`}
                >
                  <h4 className="flex items-center gap-2 text-xl font-semibold mb-6">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                      darkMode ? "border-zinc-800 text-zinc-300" : "border-gray-300 text-gray-700"
                    }`}>
                      {aboutTab === "experience" ? <FiAward size={16} /> : aboutTab === "hard-skills" ? <FiCode size={16} /> : <FiUser size={16} />}
                    </span>
                    {aboutTabs.find((tab) => tab.key === aboutTab)?.label}
                  </h4>

                  {aboutTab === "experience" && (
                    <ul className="space-y-6">
                      {t.experienceItems.map((item) => (
                        <li key={item.companyPeriod} className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
                          <div className="text-lg font-semibold mb-2">{item.companyPeriod}</div>
                          <div className={`text-sm leading-relaxed md:text-base ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{item.description}</div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {aboutTab === "hard-skills" && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className={`rounded-2xl border p-4 ${darkMode ? "border-zinc-800 bg-black/25" : "border-gray-200 bg-stone-50"}`}>
                        <p className="font-semibold mb-2">{t.hardSkillsItems.backend}</p>
                        <p className={darkMode ? "text-zinc-300" : "text-gray-700"}>C#, .NET, ASP.NET Core, EF Core</p>
                      </div>
                      <div className={`rounded-2xl border p-4 ${darkMode ? "border-zinc-800 bg-black/25" : "border-gray-200 bg-stone-50"}`}>
                        <p className="font-semibold mb-2">{t.hardSkillsItems.database}</p>
                        <p className={darkMode ? "text-zinc-300" : "text-gray-700"}>PostgreSQL, SQL Server, MongoDB</p>
                      </div>
                      <div className={`rounded-2xl border p-4 ${darkMode ? "border-zinc-800 bg-black/25" : "border-gray-200 bg-stone-50"}`}>
                        <p className="font-semibold mb-2">{t.hardSkillsItems.frontend}</p>
                        <p className={darkMode ? "text-zinc-300" : "text-gray-700"}>React, Next.js, React Query, Ant Design, Styled Components</p>
                      </div>
                      <div className={`rounded-2xl border p-4 ${darkMode ? "border-zinc-800 bg-black/25" : "border-gray-200 bg-stone-50"}`}>
                        <p className="font-semibold mb-2">{t.hardSkillsItems.architecture}</p>
                        <p className={darkMode ? "text-zinc-300" : "text-gray-700"}>Clean Architecture, DDD, CQRS/MediatR, FluentValidation, APIs escaláveis</p>
                      </div>
                      <div className={`rounded-2xl border p-4 md:col-span-2 ${darkMode ? "border-zinc-800 bg-black/25" : "border-gray-200 bg-stone-50"}`}>
                        <p className="font-semibold mb-2">{t.hardSkillsItems.devops}</p>
                        <p className={darkMode ? "text-zinc-300" : "text-gray-700"}>Azure DevOps, CI/CD, automação de builds e deploys, testes E2E e carga</p>
                      </div>
                    </div>
                  )}

                  {aboutTab === "soft-skills" && (
                    <div className="grid gap-3 md:grid-cols-2">
                      {t.softSkillsItems.map((item) => (
                        <div
                          key={item}
                          className={`rounded-2xl border px-4 py-3 ${darkMode ? "border-zinc-800 bg-black/25 text-zinc-300" : "border-gray-200 bg-stone-50 text-gray-700"}`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </MotionCard>
            </div>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className={`text-xs uppercase tracking-[0.28em] ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                {t.personalProjectsLabel}
              </p>
              <h3 className="text-3xl font-bold mt-3 mb-3">{t.projectsTitle}</h3>
              <p className={`mb-6 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{t.projectsIntro}</p>

              <div className={`rounded-[1.75rem] border p-6 ${darkMode ? "border-zinc-900 bg-zinc-950" : "border-gray-200 bg-white"}`}>
                <div className={`text-xs uppercase tracking-[0.18em] mb-3 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  {t.projectsAsideLabel}
                </div>
                <p className={`text-base leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  {t.projectsAsideText}
                </p>
              </div>
            </div>

            <div>
              <div className={`inline-flex flex-wrap gap-2 rounded-full border p-1 mb-6 ${
                darkMode ? "border-zinc-800 bg-zinc-950" : "border-gray-200 bg-white"
              }`}>
                {projectTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setProjectTab(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      projectTab === tab.key
                        ? darkMode
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : darkMode
                        ? "text-zinc-400 hover:bg-black hover:text-zinc-100"
                        : "text-gray-600 hover:bg-stone-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
            {activeProjectList.map((repo, index) => (
              <MotionCard key={repo.id} delay={index * 0.08}>
                <div
                  className={`rounded-[1.5rem] border p-5 transition duration-300 hover:-translate-y-1 ${
                    darkMode ? "bg-zinc-950 text-zinc-100 border-zinc-900 hover:border-zinc-700" : "bg-white text-gray-900 hover:border-gray-300"
                  }`}
                >
                  <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] mb-3 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    <FiFolder size={14} />
                    {t.personalProjectsLabel}
                  </div>
                  <h5 className="text-lg font-semibold mb-1">{repo.name}</h5>

                  <div className="mb-3">
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
                  </div>

                  <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"} mb-4`}>
                    {currentProjectDescriptions[repo.name] || repo.description || t.noDescription}
                  </p>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm underline ${
                      darkMode ? "text-cyan-300" : "text-sky-700"
                    }`}
                  >
                    {t.viewOnGithub}
                  </a>
                </div>
              </MotionCard>
            ))}
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="mt-24">
          <div className={`rounded-[2rem] border p-8 md:p-10 ${
            darkMode
              ? "border-zinc-900 bg-[linear-gradient(135deg,#060606_0%,#101827_100%)]"
              : "border-gray-200 bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_100%)]"
          }`}>
            <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-start">
              <div>
                <p className={`text-xs uppercase tracking-[0.28em] ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  {t.blogTitle}
                </p>
                <h3 className="text-3xl font-bold mt-3 mb-4">{t.blogTitle}</h3>
                <p className={`${darkMode ? "text-zinc-300" : "text-gray-700"}`}>{t.blogIntro}</p>
              </div>

              <div
                className={`rounded-[1.5rem] border p-6 md:p-7 ${
                  darkMode ? "border-zinc-800 bg-black/35" : "border-white/70 bg-white/75"
                }`}
              >
                <div className={`text-xs uppercase tracking-[0.18em] mb-3 ${
                  darkMode ? "text-zinc-500" : "text-gray-500"
                }`}>
                  {t.blogArticleMeta}
                </div>
                <h4 className="text-xl font-semibold mb-3">{t.blogArticleTitle}</h4>
                <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"} mb-5`}>
                  {t.blogArticleText}
                </p>
                <a
                  href="https://github.com/guijosegon/GuiaCompletoScrum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm ${
                    darkMode ? "text-cyan-300" : "text-sky-700"
                  }`}
                >
                  {t.accessResearch}
                  <FiArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="mt-24">
          <div className={`rounded-[2rem] border p-8 md:p-10 ${
            darkMode
              ? "border-zinc-900 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_25%),#050505]"
              : "border-gray-200 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.25),_transparent_25%),#ffffff]"
          }`}>
            <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start">
              <div>
                <p className={`text-xs uppercase tracking-[0.28em] ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  {t.contactTitle}
                </p>
                <h3 className="text-3xl font-bold mt-3 mb-4">{t.contactTitle}</h3>
                <p className={`max-w-2xl text-base leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  {t.contactIntro}
                </p>
              </div>

              <div className="grid gap-4">
                <div className={`rounded-[1.5rem] border p-5 ${
                  darkMode ? "border-zinc-800 bg-zinc-950" : "border-gray-200 bg-white"
                }`}>
                  <p className={`text-xs uppercase tracking-[0.18em] mb-3 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                    {t.contactEmailLabel}
                  </p>
                  <p className="text-lg font-semibold break-all">guilhermejosegon@gmail.com</p>
                  <a
                    href="mailto:guilhermejosegon@gmail.com"
                    className={`inline-flex items-center gap-2 mt-4 text-sm ${
                      darkMode ? "text-cyan-300" : "text-sky-700"
                    }`}
                  >
                    {t.contactEmailCta}
                    <FiArrowRight size={15} />
                  </a>
                </div>

                <div className={`rounded-[1.5rem] border p-5 ${
                  darkMode ? "border-zinc-800 bg-zinc-950" : "border-gray-200 bg-white"
                }`}>
                  <p className={`text-xs uppercase tracking-[0.18em] mb-4 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                    {t.contactSocialLabel}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/guijosegon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                        darkMode ? "border-zinc-700 text-zinc-200 hover:bg-black" : "border-gray-300 text-gray-700 hover:bg-stone-50"
                      }`}
                    >
                      <FaGithub />
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/guilhermejosegon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                        darkMode ? "border-zinc-700 text-zinc-200 hover:bg-black" : "border-gray-300 text-gray-700 hover:bg-stone-50"
                      }`}
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FloatingSocials />
      </main>

      <footer className={`mt-16 border-t ${darkMode ? "border-zinc-950 bg-black" : "border-gray-200 bg-stone-100/80"}`}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className={`text-xs text-center ${darkMode ? "text-zinc-600" : "text-gray-500"}`}>
            © {new Date().getFullYear()} Guilherme José Gonçalves. {t.rightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
}
