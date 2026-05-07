// Mock data for portfolio. Will be replaced with backend integration in Phase 2.

export const profile = {
  name: "Mudit Sinha",
  firstName: "Mudit",
  lastName: "Sinha",
  role: "GenAI Engineer",
  tagline: "Building production-grade LLM applications, agentic workflows, and enterprise AI copilots.",
  location: "Indore, Madhya Pradesh, India",
  email: "muditsinha4899@gmail.com",
  linkedin: "https://www.linkedin.com/in/mudit-sinha-35107617b",
  resumeUrl: "/assets/Mudit_Sinha_Resume.docx",
  yearsExperience: "3+",
  about:
    "GenAI Engineer with 3+ years of experience across AI product development, LLM application engineering, and enterprise deployment. I build and scale production-grade solutions using RAG / GraphRAG, agentic workflows, and cloud LLM platforms (AWS Bedrock & OpenAI). My work consistently delivers measurable business impact through AI copilots, robust backend APIs, model integration, and release hardening for enterprise environments.",
  highlights: [
    "Production Text2SQL assistant for Marsh's Blue(i) — ~70% faster insight discovery",
    "Smart visualization engine that auto-selects charts from SQL structure & result shape",
    "Tenant-aware prompt management (Redis + MongoDB) — zero-downtime prompt updates",
    "FastAPI + Docker on AWS — improved system scalability & reliability by 65%",
    "Dual-layer AI safety: AWS Bedrock Guardrails + custom guardrail via LCEL middleware",
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
      "Owning end-to-end AI product engineering — Text2SQL copilots, smart visualization, GraphRAG retrieval, Splunk integration, tenant-aware prompt management, and enterprise release hardening.",
    achievements: [
      "Built and deployed a production Text2SQL assistant for Marsh's Blue(i) platform, enabling natural-language querying and improving insight discovery efficiency by ~70%.",
      "Developed a smart visualization recommendation engine that analyzes SQL structure (GROUP BY, aggregations, time columns, lat/lon) and result shape to auto-select chart type (bar, pie, line, area, scatter, map) with correct axis mappings — eliminating manual chart configuration for analysts.",
      "Developed FastAPI backend services for RAG and GraphRAG use cases — ingestion, query orchestration, chat history, and multi-tenant support.",
      "Implemented Neo4j-based GraphRAG retrieval with query classification, rewriting, entity/relationship retrieval, and explainable execution traces for stakeholder visibility.",
      "Developed and deployed backend services using FastAPI and Docker on AWS, improving system scalability and reliability by 65%.",
      "Implemented REST endpoints for Splunk authentication, search job creation, status polling, result retrieval, real-time export streaming, and HEC event ingestion.",
      "Introduced asynchronous processing and caching strategies, reducing API response latency and improving throughput under concurrent enterprise usage.",
      "Built a tenant-aware prompt management system using Redis + MongoDB — all LLM prompts (intent classifier, keyword extractor, param extractor, duplicate validator, summarizer) are stored per-consumer in MongoDB and cached in Redis with TTL, enabling zero-downtime prompt updates without redeployment.",
      "Led UAT and release review cycles across 50+ repositories, resolving vulnerabilities and improving production stability and deployment readiness."
    ],
    stack: ["Python", "FastAPI", "Docker", "AWS", "AWS Bedrock", "OpenAI", "Neo4j", "MongoDB", "Redis", "Splunk", "LangChain", "LangGraph"]
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
    subtitle: "Production GraphRAG & ServiceNow conversational microservice",
    description:
      "Production backend APIs for enterprise knowledge assistants — document ingestion, GraphRAG retrieval, tenant management, chat history, and voice endpoints. Includes an observability-friendly execution-trace pipeline (step-level logging, timing, and LLM interaction summaries) to support debugging and stakeholder trust. Also designed a standalone FastAPI microservice for conversational ServiceNow incident management — search, create, and update flows with full multi-turn state management persisted in MongoDB.",
    stack: ["FastAPI", "GraphRAG", "Neo4j", "MongoDB", "AWS Bedrock", "ServiceNow"],
    metrics: ["Multi-tenant", "Step-level traces", "Multi-turn state"],
    accent: "amber"
  },
  {
    id: "proj-2",
    title: "AI Coding Assistant",
    subtitle: "Multi-agent platform — 14 specialized GPT-4o / 4.1 agents",
    description:
      "A full-stack AI-powered coding assistant with 3 distinct modes (Normal, Interview, System Design) orchestrating a pipeline of 14 specialized GPT-4o / 4.1 agents — each with single-responsibility design and independently tuned temperature settings. Multi-language execution & testing workflows (Python / JavaScript / Java) with persisted session history for repeatable interview prep.",
    stack: ["OpenAI GPT-4o", "GPT-4.1", "Streamlit", "Python", "Multi-agent"],
    metrics: ["3 modes", "14 specialized agents", "3 languages"],
    accent: "emerald"
  },
  {
    id: "proj-3",
    title: "AI Search Agent",
    subtitle: "Stateful multi-source research with LangGraph",
    description:
      "A stateful multi-source research agent that retrieves and synthesizes insights from Google, Bing, and Reddit using LangGraph node orchestration — reducing total search latency by 3x. Integrated Bright Data's SERP API and Reddit Dataset API for structured web scraping, with an async snapshot polling mechanism (up to 60 retries, 5s intervals) to handle long-running data collection jobs.",
    stack: ["LangGraph", "Streamlit", "OpenAI", "Bright Data SERP", "Reddit API"],
    metrics: ["3x latency reduction", "Async snapshot polling", "Source-level analysis"],
    accent: "sky"
  },
  {
    id: "proj-4",
    title: "Bedrock Adapter",
    subtitle: "Multi-LLM chat orchestration with dual-layer safety",
    description:
      "A multi-LLM chat orchestration backend using FastAPI + LangChain, supporting dynamic routing between OpenAI GPT and AWS Bedrock models with model metadata managed in MongoDB. Stateful multi-turn chat API built on LangChain's RunnableWithMessageHistory — conversation context persists across sessions with automatic title generation via GPT-4o-mini. Dual-layer AI safety pipeline integrates AWS Bedrock Guardrails and a custom external guardrail service as LangChain LCEL middleware — intercepting unsafe prompts before LLM invocation.",
    stack: ["FastAPI", "LangChain", "AWS Bedrock", "OpenAI", "MongoDB", "LCEL"],
    metrics: ["Multi-LLM routing", "Stateful sessions", "Dual-layer guardrails"],
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
    items: ["MongoDB", "PostgreSQL", "Neo4j", "Qdrant", "Elasticsearch", "Redis", "SSIS"]
  },
  {
    category: "Platforms & Tools",
    items: ["AWS Bedrock", "OpenAI API", "Docker", "AWS", "Splunk", "Git", "REST APIs", "Socket.IO"]
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
    title: "65% Scalability Improvement",
    org: "Solugenix — FastAPI + Docker on AWS",
    description: "Designed and shipped backend services that meaningfully improved system scalability and reliability."
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
