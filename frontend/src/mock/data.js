// Mock data for portfolio. Will be replaced with backend integration in Phase 2.

export const profile = {
  name: "Mudit Sinha",
  firstName: "Mudit",
  lastName: "Sinha",
  role: "GenAI Engineer",
  tagline: "Building production-grade LLM applications, agentic workflows, and enterprise AI copilots.",
  location: "Indore, Madhya Pradesh, India",
  email: "muditsinha4899@gmail.com",
  phone: "+91 6265290180",
  linkedin: "https://www.linkedin.com/in/mudit-sinha-35107617b",
  resumeUrl: "/assets/Mudit_Sinha_Resume.docx",
  yearsExperience: "3+",
  about:
    "GenAI Engineer with 3+ years of experience across AI product development, LLM application engineering, and enterprise deployment. I build and scale production-grade solutions using RAG / GraphRAG, agentic workflows, and cloud LLM platforms (AWS Bedrock & OpenAI). My work consistently delivers measurable business impact through AI copilots, robust backend APIs, model integration, and release hardening for enterprise environments.",
  highlights: [
    "Production Text2SQL assistant for Marsh's Blue(i) — ~70% faster insight discovery",
    "AWS Bedrock adapter with model fallback for enterprise reliability",
    "FastAPI backends for RAG / GraphRAG with multi-tenant orchestration",
    "Led UAT & release reviews across 50+ repositories"
  ]
};

export const stats = [
  { value: "3+", label: "Years building AI products" },
  { value: "50+", label: "Repos hardened for release" },
  { value: "~70%", label: "Insight discovery boost" },
  { value: "14", label: "Specialized agents shipped" }
];

export const experiences = [
  {
    id: "exp-1",
    company: "Solugenix",
    location: "Indore",
    role: "AI Developer",
    start: "Oct 2023",
    end: "Present",
    current: true,
    summary:
      "Owning end-to-end AI product engineering — from Text2SQL copilots and Bedrock adapters to GraphRAG retrieval and enterprise release hardening.",
    achievements: [
      "Built and deployed a production Text2SQL assistant for Marsh's Blue(i) platform, enabling natural-language querying and improving insight discovery efficiency by ~70%.",
      "Designed an AWS Bedrock integration adapter with model fallback handling for enterprise chatbot workflows, improving LLM response reliability.",
      "Developed FastAPI backend services for RAG and GraphRAG use cases — ingestion, query orchestration, chat history, and multi-tenant support.",
      "Implemented Neo4j-based GraphRAG retrieval with query classification, rewriting, entity/relationship retrieval, and explainable execution traces.",
      "Led UAT and release review cycles across 50+ repositories, resolving vulnerabilities and improving production stability and deployment readiness."
    ],
    stack: ["Python", "FastAPI", "AWS Bedrock", "OpenAI", "Neo4j", "MongoDB", "LangChain", "LangGraph"]
  },
  {
    id: "exp-2",
    company: "Feynn Labs",
    location: "Bhopal",
    role: "Machine Learning Intern",
    start: "Mar 2023",
    end: "Jun 2023",
    current: false,
    summary: "Engineered and validated ML prototypes, with a focus on calibration and feature/algorithm tuning.",
    achievements: [
      "Engineered and validated ML prototypes, improving model performance by ~15-30% through feature and algorithm tuning.",
      "Reduced false positives in predictive tasks by iterating on data quality and model calibration."
    ],
    stack: ["Python", "scikit-learn", "Pandas", "NumPy"]
  },
  {
    id: "exp-3",
    company: "VegaVisionary",
    location: "Bhopal",
    role: "AI & Data Science Trainer",
    start: "Jan 2023",
    end: "Mar 2023",
    current: false,
    summary: "Delivered hands-on AI / Data Science training for undergraduate cohorts.",
    achievements: [
      "Delivered practical AI/Data Science training for undergraduate cohorts, emphasizing industry-relevant workflows and project execution."
    ],
    stack: ["Python", "ML", "Data Science"]
  }
];

export const projects = [
  {
    id: "proj-1",
    title: "Genix-Nova Backend",
    subtitle: "Production GraphRAG knowledge assistant",
    description:
      "Production backend APIs for enterprise knowledge assistants — document ingestion, GraphRAG retrieval, tenant management, chat history, and voice endpoints. Includes an observability-friendly execution-trace pipeline with step-level logging, timing, and LLM interaction summaries to support debugging and stakeholder trust.",
    stack: ["FastAPI", "GraphRAG", "Neo4j", "MongoDB", "AWS Bedrock"],
    metrics: ["Multi-tenant", "Step-level traces", "Voice endpoints"],
    accent: "amber"
  },
  {
    id: "proj-2",
    title: "AI Coding Assistant",
    subtitle: "Multi-agent platform — 14 specialized agents",
    description:
      "A multi-agent coding assistant orchestrating 14 specialized agents for code generation, testing, evaluation, interview simulation, and system design guidance. Multi-language execution and testing workflows (Python / JavaScript / Java) with persisted session history for repeatable interview prep.",
    stack: ["OpenAI", "Streamlit", "Python", "Multi-agent"],
    metrics: ["14 agents", "3 languages", "Persisted sessions"],
    accent: "emerald"
  },
  {
    id: "proj-3",
    title: "AI Search Agent",
    subtitle: "Stateful multi-source research with LangGraph",
    description:
      "A stateful multi-source research agent that retrieves and synthesizes insights from Google, Bing, and Reddit using LangGraph node orchestration. Reddit post/comment retrieval and source-level analysis significantly improve answer quality for fast-changing topics.",
    stack: ["LangGraph", "Streamlit", "OpenAI", "Reddit API"],
    metrics: ["3 sources", "Stateful graph", "Source-level analysis"],
    accent: "sky"
  },
  {
    id: "proj-4",
    title: "Bedrock Adapter",
    subtitle: "Enterprise-grade LLM invocation layer",
    description:
      "A generic Bedrock model invocation API with configurable generation parameters, retries, and fallback strategies — purpose-built to improve reliability for enterprise chatbot workflows under partial outages.",
    stack: ["FastAPI", "AWS Bedrock", "Python"],
    metrics: ["Model fallback", "Configurable params", "Retry policy"],
    accent: "rose"
  }
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "SQL"]
  },
  {
    category: "GenAI",
    items: ["LLM Apps", "Agentic AI", "RAG", "GraphRAG", "Prompt Engineering", "LLM Evaluation"]
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "Flask", "Streamlit", "LangChain", "LangGraph"]
  },
  {
    category: "Datastores & Infra",
    items: ["MongoDB", "PostgreSQL", "Neo4j", "Qdrant", "Elasticsearch", "SSIS"]
  },
  {
    category: "Platforms & Tools",
    items: ["AWS Bedrock", "OpenAI API", "Git", "REST APIs", "Socket.IO"]
  }
];

export const education = [
  {
    school: "IIPS, DAVV Indore",
    degree: "M.Tech, Computer Science",
    period: "Jul 2018 — Jun 2023",
    score: "CGPA 8.8"
  }
];

export const achievements = [
  {
    title: "Pat on the Back — 2x",
    org: "Solugenix",
    description: "Recognized twice for outstanding performance and impact on enterprise AI delivery."
  },
  {
    title: "~70% Insight Discovery Boost",
    org: "Marsh Blue(i) — via Solugenix",
    description: "Production Text2SQL assistant materially accelerated business analyst workflows."
  },
  {
    title: "50+ Repos Release-Hardened",
    org: "Enterprise UAT & Release Review",
    description: "Drove vulnerability resolution and deployment readiness across a large repo footprint."
  }
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];
