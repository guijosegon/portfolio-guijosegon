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

const projectTags: Record<string, string[]> = {
  "poc-gestao-saude-idosos": ["C#", ".NET 8", "PostgreSQL", "MVC", "Razor", "Dashboards", "Google Charts"],
  "GuiaCompletoScrum": ["Agile", "Scrum", "Processos", "Artigo"],
  "portfolio-guijosegon": ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  "grpc_agendamento_docker": ["C#", ".NET 8", "gRPC", "Docker"],
  "compilador": ["C#", ".NET 8", "Compiladores"],
  "agendamento_academia_minimalapi": ["Minimal API", ".NET 8", "SQLite", "xUnit", "Swagger"],
  "api-controle-visitantes": ["Node", "MongoDB", "REST", "Express", "Mongoose"],
  "app-travels": ["Java", "SQLite", "Retrofit", "Mobile"],
  "comparador_sequecial_vs_paralelo": ["Java 17+", "Multithreading", "ForkJoinPool"],
  "dijkstra-caminho-mais-barato": ["Node", "Algoritmos", "Dijkstra"],
  "site-institucional": ["React", "Node", "Next"],
  "unimotors_springboot_apirest": ["Spring Boot 3", "Java 17", "PostgreSQL", "Flyway"],
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

  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    document.title = "Guilherme José Gonçalves | Portfólio";
    localStorage.setItem("theme", JSON.stringify(darkMode));

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
      .catch((err) => console.error("Erro ao buscar repositórios:", err));
  }, [darkMode]);

  const scrollToId = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const sortedRepos = useMemo(() => {
    const filtered = repos.filter(
      (r) =>
        !r.fork &&
        r.name !== "guijosegon" &&
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

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen font-sans`}
    >
      <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left">Portfólio</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm font-medium text-center md:text-left">
            <nav className="space-x-4 md:space-x-6 flex justify-center">
              <button onClick={() => scrollToId("sobre")} className="hover:underline">
                Sobre mim
              </button>
              <button onClick={() => scrollToId("projetos")} className="hover:underline">
                Projetos
              </button>
              <button onClick={() => scrollToId("blog")} className="hover:underline">
                Blog
              </button>
            </nav>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`text-xs px-3 py-1 border rounded shadow-sm transition ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              {darkMode ? "☀️ Claro" : "🌙 Escuro"}
            </button>
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
            <h2 className="text-4xl font-bold leading-snug">Olá, eu sou Guilherme Gonçalves</h2>
            <p className="text-lg mt-4">
              Sou desenvolvedor full stack com foco em .NET e aplicações web. Hoje atuo no LogX (Narwal Sistemas),
              trabalhando com .NET + PostgreSQL no back-end e React/Next.js no front-end. Gosto de construir soluções
              simples, bem organizadas e fáceis de evoluir, com atenção a arquitetura, boas validações e entrega contínua (CI/CD).
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => scrollToId("projetos")}
                className={`px-6 py-2 rounded-md transition ${
                  darkMode ? "bg-black text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
              >
                Ver Projetos
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/perfil.png"
              alt="Foto de Guilherme Gonçalves"
              className="w-56 h-56 rounded-full object-cover"
            />
          </div>
        </motion.section>

        <section id="sobre" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Sobre mim</h3>

          <p className="text-base leading-relaxed">
            Trabalho com desenvolvimento web há alguns anos e meu foco é criar software que o time consiga manter
            e evoluir com tranquilidade. Tenho experiência com APIs e integrações, sustentação em produção e
            melhorias contínuas no fluxo de entrega. No dia a dia, atuo no LogX com .NET e PostgreSQL (EF Core,
            CQRS/MediatR e FluentValidation) e também no front com React/Next.js usando React Query, Ant Design
            e Styled Components. Recentemente, montei um repositório interno de documentação voltado para uso
            com IA para padronizar decisões e acelerar o onboarding do time.
          </p>

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
                  Experiência
                </h4>

                <ul className="text-sm space-y-4">
                  <li>
                    <div className="font-semibold">
                      LogX (Narwal Sistemas) <span className="text-xs text-gray-400">(2025 – Atual)</span>
                    </div>
                    <div className="text-sm">
                      Desenvolvedor Full Stack com .NET + PostgreSQL e React/Next.js, seguindo arquitetura por feature, CQRS (MediatR) e validações com FluentValidation, 
                      entregando soluções simples (KISS), escaláveis e fáceis de evoluir.
                     </div>
                  </li>

                  <li>
                    <div className="font-semibold">
                      Narwal Sistemas <span className="text-xs text-gray-400">(2022 – 2025)</span>
                    </div>
                    <div className="text-sm">
                      Desenvolvedor Full Stack e Scrum Master, contribuindo para o desenvolvimento e evolução de soluções do produto, 
                      com foco em entrega contínua, qualidade e colaboração entre engenharia e negócio, atuando como referência técnica e 
                      apoiando decisões de arquitetura.
                    </div>
                  </li>

                  <li>
                    <div className="font-semibold">
                      Márcio Bikes <span className="text-xs text-gray-400">(2022)</span>
                    </div>
                    <div className="text-sm">Assistente geral (oficina/estoque), atuando de forma multifuncional.</div>
                  </li>
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
                  Hard Skills
                </h4>

                <ul className="text-sm space-y-2">
                  <li><span className="font-semibold">Back-end:</span> C#, .NET, ASP.NET Core, EF Core</li>
                  <li><span className="font-semibold">Banco de dados:</span> PostgreSQL, SQL Server, MongoDB</li>
                  <li><span className="font-semibold">Front-end:</span> Razor, React, Next.js, React Query, Ant Design, Styled Components, Recharts</li>
                  <li><span className="font-semibold">Arquitetura:</span> CQRS/MediatR, DDD, FluentValidation, MVC, folder-by-feature, KISS, Clean Code, SOLID</li>
                  <li><span className="font-semibold">DevOps:</span> Azure DevOps, Pipelines/Releases, CI/CD, Docker</li>
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
                  Soft Skills
                </h4>

                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Capacidade de aprendizagem rápida</li>
                  <li>Responsabilidade com entregas</li>
                  <li>Organização e planejamento</li>
                  <li>Comunicação e colaboração</li>
                  <li>Liderança (Scrum Master)</li>
                  <li>Resolução de problemas</li>
                  <li>Adaptabilidade</li>
                  <li>Proatividade</li>
                </ul>
              </div>
            </MotionCard>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <h3 className="text-2xl font-bold mb-2">Projetos</h3>
          <p className="mb-6">
            Repositórios públicos do meu GitHub (com alguns destaques alinhados ao que estou trabalhando hoje).
          </p>

          {featuredRepos.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mb-3">Destaques</h4>
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
                        {repo.description || "Sem descrição."}
                      </p>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm underline"
                      >
                        Ver no GitHub
                      </a>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </>
          )}

          <h4 className="text-lg font-semibold mb-3">Outros repositórios</h4>
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
                    {repo.description || "Sem descrição."}
                  </p>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm underline"
                  >
                    Ver no GitHub
                  </a>
                </div>
              </MotionCard>
            ))}
          </div>
        </section>

        <section id="blog" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Blog</h3>
          <p className="mb-6">Pesquisas e artigos de estudos realizados:</p>

          <div className="grid gap-4">
            <div
              className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              }`}
            >
              <h4 className="text-lg font-semibold mb-1">Scrum na Prática: Entregando Valor com Agilidade</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"} mb-2`}>
                Um guia com conceitos, papéis, eventos e boas práticas para aplicar Scrum de forma objetiva no dia a dia.
              </p>
              <a
                href="https://github.com/guijosegon/GuiaCompletoScrum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                Acessar pesquisa
              </a>
            </div>
          </div>
        </section>

        <FloatingSocials />
      </main>

      <footer className="text-center py-6 text-sm border-t mt-24 border-gray-700">
        <p className="text-sm text-gray-600 mb-2">
          Este é um portfólio pessoal desenvolvido em React + TypeScript com Vite e Tailwind CSS, hospedado no Render.
          Usado especialmente para <strong>aprendizagem</strong> e evolução contínua.
        </p>
        © {new Date().getFullYear()} Guilherme José Gonçalves. Todos os direitos reservados.
      </footer>
    </div>
  );
}