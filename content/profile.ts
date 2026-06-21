import type { SiteProfile } from "@/lib/types";

// All contact facts verified. LinkedIn can't be auto-checked (it 999-walls
// automated requests); confirmed manually by Zaid.
export const profile: SiteProfile = {
  name: "Zaid Malick",
  headline: "AI Engineer building agentic systems that ship.",
  subline:
    "Agent orchestration, RAG, and eval-first development. Recent CS grad (LIU Post '26); incoming MS Generative AI at CUNY SPS (Aug 2026).",
  bio: "I build agent orchestration and retrieval systems with an eval-first discipline — the engineering judgment is knowing where the model belongs and where deterministic code does. My thesis: the role that thrives directs AI rather than competes with it. Currently hunting AI Engineer, Forward Deployed Engineer, and Applied AI roles.",
  location: "New York",
  education:
    "B.S. Computer Science, LIU Post (2026). Incoming M.S. Generative AI, CUNY SPS (Aug 2026).",
  targetRoles: ["AI Engineer", "Forward Deployed Engineer", "Applied AI Engineer"],
  skills: [
    "Agent orchestration",
    "Multi-agent systems",
    "RAG / retrieval",
    "Eval-driven development",
    "Prompt engineering",
    "LLM cost control",
    "Claude API",
    "Gemini / Google ADK",
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "MCP integrations",
    "Vector stores (FAISS)",
    "Docker",
    "Google Cloud Run",
  ],
  contact: {
    email: "zaidmalick6@gmail.com",
    github: "ZMalick",
    githubUrl: "https://github.com/ZMalick",
    linkedinUrl: "https://www.linkedin.com/in/zaid-malick",
    resumeUrl: "/resume.pdf",
  },
};
