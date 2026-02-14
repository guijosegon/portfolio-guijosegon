import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
    noDescription: string;
    viewOnGithub: string;
    blogTitle: string;
    blogIntro: string;
    blogArticleTitle: string;
    blogArticleText: string;
    accessResearch: string;
    footerText: string;
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
      "Sou desenvolvedor full stack com foco em .NET e aplicações web. Hoje atuo no LogX (Narwal Sistemas), trabalhando com .NET + PostgreSQL no back-end e React/Next.js no front-end. Gosto de construir soluções simples, bem organizadas e fáceis de evoluir, com atenção a arquitetura, boas validações e entrega contínua (CI/CD).",
    viewProjects: "Ver Projetos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mim",
    aboutText:
      "Trabalho com desenvolvimento web há alguns anos e meu foco é criar software que o time consiga manter e evoluir com tranquilidade. Tenho experiência com APIs e integrações, sustentação em produção e melhorias contínuas no fluxo de entrega. No dia a dia, atuo no LogX com .NET e PostgreSQL (EF Core, CQRS/MediatR e FluentValidation) e também no front com React/Next.js usando React Query, Ant Design e Styled Components. Recentemente, montei um repositório interno de documentação voltado para uso com IA para padronizar decisões e acelerar o onboarding do time.",
    experienceTitle: "Experiência",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (Narwal Sistemas) (2025 – Atual)",
        description:
          "Desenvolvedor Full Stack com .NET + PostgreSQL e React/Next.js, seguindo arquitetura por feature, CQRS (MediatR) e validações com FluentValidation, entregando soluções simples (KISS), escaláveis e fáceis de evoluir.",
      },
      {
        companyPeriod: "Narwal Sistemas (2022 – 2025)",
        description:
          "Desenvolvedor Full Stack e Scrum Master, contribuindo para o desenvolvimento e evolução de soluções do produto, com foco em entrega contínua, qualidade e colaboração entre engenharia e negócio, atuando como referência técnica e apoiando decisões de arquitetura.",
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
      "Repositórios públicos do meu GitHub (com alguns destaques alinhados ao que estou trabalhando hoje).",
    featuredTitle: "Destaques",
    otherReposTitle: "Outros repositórios",
    noDescription: "Sem descrição.",
    viewOnGithub: "Ver no GitHub",
    blogTitle: "Blog",
    blogIntro: "Pesquisas e artigos de estudos realizados:",
    blogArticleTitle: "Scrum na Prática: Entregando Valor com Agilidade",
    blogArticleText:
      "Um guia com conceitos, papéis, eventos e boas práticas para aplicar Scrum de forma objetiva no dia a dia.",
    accessResearch: "Acessar pesquisa",
    footerText:
      "Este é um portfólio pessoal desenvolvido em React + TypeScript com Vite e Tailwind CSS, hospedado no Render. Usado especialmente para aprendizagem e evolução contínua.",
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
      "I'm a full stack developer focused on .NET and web applications. I currently work at LogX (Narwal Sistemas), building with .NET + PostgreSQL on the back end and React/Next.js on the front end. I like building simple, well-structured, easy-to-evolve solutions with attention to architecture, solid validations, and continuous delivery (CI/CD).",
    viewProjects: "View Projects",
    profileAlt: "Photo of Guilherme José Gonçalves",
    aboutTitle: "About me",
    aboutText:
      "I've been working with web development for a few years, and my focus is to create software that teams can maintain and evolve smoothly. I have experience with APIs and integrations, production support, and continuous improvements in delivery flow. Day to day, I work at LogX with .NET and PostgreSQL (EF Core, CQRS/MediatR, and FluentValidation), and on the front end with React/Next.js using React Query, Ant Design, and Styled Components. Recently, I built an internal documentation repository for AI-assisted workflows to standardize decisions and speed up team onboarding.",
    experienceTitle: "Experience",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (Narwal Sistemas) (2025 – Current)",
        description:
          "Full Stack Developer with .NET + PostgreSQL and React/Next.js, using feature-based architecture, CQRS (MediatR), and FluentValidation to deliver simple (KISS), scalable, and easy-to-evolve solutions.",
      },
      {
        companyPeriod: "Narwal Sistemas (2022 – 2025)",
        description:
          "Full Stack Developer and Scrum Master, contributing to product solution development and evolution, focused on continuous delivery, quality, and collaboration between engineering and business, acting as a technical reference and supporting architecture decisions.",
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
      "Public repositories from my GitHub (including highlights aligned with what I'm currently building).",
    featuredTitle: "Highlights",
    otherReposTitle: "Other repositories",
    noDescription: "No description.",
    viewOnGithub: "View on GitHub",
    blogTitle: "Blog",
    blogIntro: "Research and study articles:",
    blogArticleTitle: "Scrum in Practice: Delivering Value with Agility",
    blogArticleText:
      "A guide with concepts, roles, events, and best practices to apply Scrum objectively in day-to-day work.",
    accessResearch: "Read research",
    footerText:
      "This is a personal portfolio built with React + TypeScript using Vite and Tailwind CSS, hosted on Render. Mainly used for learning and continuous improvement.",
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
      "Soy desarrollador full stack con enfoque en .NET y aplicaciones web. Actualmente trabajo en LogX (Narwal Sistemas), usando .NET + PostgreSQL en el back-end y React/Next.js en el front-end. Me gusta construir soluciones simples, bien organizadas y fáciles de evolucionar, con atención a la arquitectura, buenas validaciones y entrega continua (CI/CD).",
    viewProjects: "Ver Proyectos",
    profileAlt: "Foto de Guilherme José Gonçalves",
    aboutTitle: "Sobre mí",
    aboutText:
      "Trabajo con desarrollo web desde hace algunos años y mi foco es crear software que el equipo pueda mantener y evolucionar con tranquilidad. Tengo experiencia con APIs e integraciones, soporte en producción y mejoras continuas en el flujo de entrega. En el día a día, trabajo en LogX con .NET y PostgreSQL (EF Core, CQRS/MediatR y FluentValidation), y también en el front con React/Next.js usando React Query, Ant Design y Styled Components. Recientemente monté un repositorio interno de documentación orientado al uso con IA para estandarizar decisiones y acelerar el onboarding del equipo.",
    experienceTitle: "Experiencia",
    hardSkillsTitle: "Hard Skills",
    softSkillsTitle: "Soft Skills",
    experienceItems: [
      {
        companyPeriod: "LogX (Narwal Sistemas) (2025 – Actual)",
        description:
          "Desarrollador Full Stack con .NET + PostgreSQL y React/Next.js, siguiendo arquitectura por feature, CQRS (MediatR) y validaciones con FluentValidation, entregando soluciones simples (KISS), escalables y fáciles de evolucionar.",
      },
      {
        companyPeriod: "Narwal Sistemas (2022 – 2025)",
        description:
          "Desarrollador Full Stack y Scrum Master, contribuyendo al desarrollo y evolución de soluciones del producto, con foco en entrega continua, calidad y colaboración entre ingeniería y negocio, actuando como referencia técnica y apoyando decisiones de arquitectura.",
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
      "Repositorios públicos de mi GitHub (con algunos destacados alineados con lo que estoy trabajando hoy).",
    featuredTitle: "Destacados",
    otherReposTitle: "Otros repositorios",
    noDescription: "Sin descripción.",
    viewOnGithub: "Ver en GitHub",
    blogTitle: "Blog",
    blogIntro: "Investigaciones y artículos de estudio:",
    blogArticleTitle: "Scrum en la Práctica: Entregando Valor con Agilidad",
    blogArticleText:
      "Una guía con conceptos, roles, eventos y buenas prácticas para aplicar Scrum de forma objetiva en el día a día.",
    accessResearch: "Acceder a la investigación",
    footerText:
      "Este es un portafolio personal desarrollado con React + TypeScript usando Vite y Tailwind CSS, alojado en Render. Usado especialmente para aprendizaje y evolución continua.",
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
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/guilhermejosegon"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="mailto:guilhermejosegon@gmail.com"
        className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-500 transition"
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

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen font-sans`}
    >
      <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left">{t.portfolio}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm font-medium">
            <nav className="flex justify-center md:justify-start gap-2 text-center md:text-left">
              <button
                onClick={() => scrollToId("sobre")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => scrollToId("projetos")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                {t.navProjects}
              </button>
              <button
                onClick={() => scrollToId("blog")}
                className={`text-xs px-3 h-8 border rounded-full shadow-sm transition ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                {t.navBlog}
              </button>
            </nav>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <div
                className={`relative w-[96px] h-7 rounded-full border overflow-hidden ${
                  darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-1/3 rounded-full shadow-sm transition-transform duration-300 ${
                    darkMode ? "bg-gray-700" : "bg-white"
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
                          ? "text-gray-400 hover:text-gray-200"
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
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
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
            <p className="text-lg mt-4">{t.heroText}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => scrollToId("projetos")}
                className={`px-6 py-2 rounded-md transition ${
                  darkMode ? "bg-black text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-200"
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MotionCard delay={0.1}>
              <div
                className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                  darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                }`}
              >
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm">
                    📌
                  </span>
                  {t.experienceTitle}
                </h4>

                <ul className="text-sm space-y-4">
                  {t.experienceItems.map((item) => (
                    <li key={item.companyPeriod}>
                      <div className="font-semibold">{item.companyPeriod}</div>
                      <div className="text-sm">{item.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionCard>

            <MotionCard delay={0.2}>
              <div
                className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                  darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                }`}
              >
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm">
                    🛠️
                  </span>
                  {t.hardSkillsTitle}
                </h4>

                <ul className="text-sm space-y-2">
                  <li><span className="font-semibold">{t.hardSkillsItems.backend}</span> C#, .NET, ASP.NET Core, EF Core</li>
                  <li><span className="font-semibold">{t.hardSkillsItems.database}</span> PostgreSQL, SQL Server, MongoDB</li>
                  <li><span className="font-semibold">{t.hardSkillsItems.frontend}</span> Razor, React, Next.js, React Query, Ant Design, Styled Components, Recharts</li>
                  <li><span className="font-semibold">{t.hardSkillsItems.architecture}</span> CQRS/MediatR, DDD, FluentValidation, MVC, folder-by-feature, KISS, Clean Code, SOLID</li>
                  <li><span className="font-semibold">{t.hardSkillsItems.devops}</span> Azure DevOps, Pipelines/Releases, CI/CD, Docker</li>
                </ul>
              </div>
            </MotionCard>

            <MotionCard delay={0.3}>
              <div
                className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                  darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                }`}
              >
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-600 text-white rounded-full text-sm">
                    🧠
                  </span>
                  {t.softSkillsTitle}
                </h4>

                <ul className="text-sm list-disc list-inside space-y-1">
                  {t.softSkillsItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </MotionCard>
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
                        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                      }`}
                    >
                      <h5 className="text-lg font-semibold mb-1">{repo.name}</h5>

                      {projectTags[repo.name]?.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs ${
                            darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-200 text-gray-900"
                          } px-4 py-0.5 rounded-full mr-2 mb-2 inline-block`}
                        >
                          {tag}
                        </span>
                      ))}

                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-2`}>
                        {repo.description || t.noDescription}
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
                    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                  }`}
                >
                  <h5 className="text-lg font-semibold mb-1">{repo.name}</h5>

                  {projectTags[repo.name]?.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs ${
                        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-200 text-gray-900"
                      } px-4 py-0.5 rounded-full mr-2 mb-2 inline-block`}
                    >
                      {tag}
                    </span>
                  ))}

                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-2`}>
                    {repo.description || t.noDescription}
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
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              }`}
            >
              <h4 className="text-lg font-semibold mb-1">{t.blogArticleTitle}</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-2`}>
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

      <footer className="text-center py-6 text-sm border-t mt-24 border-gray-700">
        <p className="text-sm text-gray-600 mb-2">
          {t.footerText}
        </p>
        © {new Date().getFullYear()} Guilherme José Gonçalves. {t.rightsReserved}
      </footer>
    </div>
  );
}
