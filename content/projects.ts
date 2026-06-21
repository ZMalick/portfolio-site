import type { Project } from "@/lib/types";

// Every fact here was verified this session (live URLs, repos, metrics).
// Executive Assistant + Lifeguard ship as case studies until their public
// repos are pushed (gated) — then their repo links + proof badges flip.

export const projects: Project[] = [
  {
    slug: "multi-agent-research-assistant",
    title: "Multi-Agent Research Assistant",
    tagline: "Three agents, routed retrieval, real eval numbers.",
    blurb:
      "A three-agent system on Google's ADK that routes each question between a curated paper corpus (RAG) and live web search — with a live Cloud Run demo and Ragas eval scores to back it.",
    writeup:
      "A production multi-agent research system built on Google's Agent Development Kit. An orchestrator routes each question to the right source — a local corpus of 15 arXiv papers (RAG over a FAISS vector store), live web search via Tavily, or both — then a researcher answers and a reviewer checks the work. Built with Gemini 2.5 (Flash for the agents, Pro as the eval judge), served from a FastAPI backend and a Streamlit UI, containerized and deployed to Google Cloud Run. Measured with Ragas on a labeled set rather than vibes. Built as the capstone for the Synapse 'Master Agentic AI' certification.",
    tech: [
      "Google ADK",
      "Gemini 2.5",
      "FAISS",
      "Vertex AI embeddings",
      "Tavily",
      "Ragas",
      "FastAPI",
      "Docker",
      "Cloud Run",
    ],
    highlights: [
      "Live demo on Google Cloud Run — Streamlit UI + FastAPI backend",
      "100% routing accuracy (19/19) on a labeled eval set",
      "Ragas: faithfulness 0.981, context recall 0.933, answer relevancy 0.83",
      "Orchestrator, researcher, and reviewer agents on Gemini 2.5",
      "Grounded RAG over 15 arXiv papers with citations",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://research-assistant-ui-969189630215.us-central1.run.app",
      },
      {
        label: "GitHub",
        href: "https://github.com/ZMalick/multi-agent-research-assistant",
      },
    ],
    proof: "live-demo",
    featured: true,
    order: 1,
  },
  {
    slug: "executive-assistant",
    title: "Executive Assistant",
    tagline: "A 25-skill personal AI assistant, built eval-first.",
    blurb:
      "A personal AI assistant on Claude with 25 task-specific skills and MCP integrations — wrapped in an eval-driven development loop with adversarial bug hunts and regression detection.",
    writeup:
      "A personal AI executive-assistant framework: 25 task-specific skills (briefing, planning, follow-ups, research, evals, and more) running on Claude with persistent memory and Model Context Protocol integrations into Gmail, Calendar, and the web. The engineering that matters is the eval-driven development loop — each skill has its own eval harness with adversarial bug hunts and 30-day regression detection, so changes are measured instead of guessed. It's the most complete expression of the thesis: directing AI across a real workflow, with the discipline of tests around it.",
    tech: ["Claude", "MCP", "Python", "Eval harness", "Gmail / Calendar"],
    highlights: [
      "25 task-specific skills under one assistant",
      "Eval-driven: per-skill harnesses, adversarial bug hunts, 30-day regression detection",
      "MCP integrations — Gmail, Calendar, web",
    ],
    links: [
      {
        label: "Architecture",
        href: "https://github.com/ZMalick/ai-executive-assistant",
      },
    ],
    proof: "case-study",
    featured: true,
    order: 2,
  },
  {
    slug: "lifeguard-scheduling-tool",
    title: "Lifeguard Scheduling Tool",
    tagline: "A deliberately narrow AI boundary.",
    blurb:
      "A scheduling tool where Claude parses free-text time-off requests and nothing else — every other decision is deterministic Python with 50 unit tests.",
    writeup:
      "A scheduling tool for a county aquatic center that draws a deliberately narrow boundary around the LLM. Claude (Haiku) parses lifeguards' free-text time-off requests into structured date ranges — and that is the only place the model is used. Everything else is deterministic Python with unit tests: counting days, flagging excess requests and consecutive-day runs, detecting coverage gaps across the daily checkpoints, and writing back to the schedule. A Streamlit UI keeps a human in the loop for approval. The point is the judgment: knowing where the model belongs, and where it doesn't.",
    tech: ["Python", "Claude (Haiku)", "pytest", "Streamlit", "openpyxl"],
    highlights: [
      "LLM isolated to one file — Claude parses requests; the rest is deterministic",
      "50 unit tests across the parser and the scheduling rules",
      "Human-in-the-loop Streamlit approval; anonymized sample data included",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/ZMalick/lifeguard-scheduling-tool" },
    ],
    proof: "public-repo",
    featured: true,
    order: 3,
  },
  {
    slug: "paper-trading-bot",
    title: "Paper Trading Bot",
    tagline: "Five strategies, backtested, on a live dashboard.",
    blurb:
      "An algorithmic paper-trading system running five strategies — including a Random Forest ensemble — against Alpaca, with backtesting and a real-time Streamlit/Plotly dashboard.",
    writeup:
      "An algorithmic paper-trading system running five strategies — SMA crossover, RSI, MACD, mean reversion, and a Random Forest ML ensemble — against Alpaca's paper-trading API with $100k of simulated capital. A backtesting engine compares strategies on historical data, and a Streamlit + Plotly dashboard tracks Sharpe ratio, max drawdown, win rate, and equity curves in real time. ML, finance, and systems in one project.",
    tech: ["Python", "Alpaca API", "Random Forest", "Streamlit", "Plotly"],
    highlights: [
      "5 strategies including a Random Forest ML ensemble",
      "Alpaca paper trading with $100k simulated capital",
      "Backtesting + real-time dashboard (Sharpe, drawdown, win rate)",
    ],
    links: [{ label: "GitHub", href: "https://github.com/ZMalick/Paper-Trading-Bot" }],
    proof: "public-repo",
    featured: true,
    order: 4,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
