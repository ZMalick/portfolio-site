import type { FaqItem } from "@/lib/types";

// Grounding for the chatbot + an optional on-page FAQ. Answers model the
// "defer, don't fabricate" behavior for anything not factually settled
// (salary, exact relocation terms) so the bot has a correct example to follow.
export const faq: FaqItem[] = [
  {
    q: "What's your strongest project?",
    a: "The Multi-Agent Research Assistant. It's a three-agent system on Google's ADK with a live deployment on Cloud Run and real eval numbers — 100% routing accuracy (19/19) and Ragas faithfulness of 0.981. It's the clearest end-to-end demonstration of agent orchestration, RAG, and eval-driven development.",
  },
  {
    q: "What's the hardest thing you've built?",
    a: "Getting the Multi-Agent Research Assistant's orchestrator to route reliably between the local paper corpus, web search, and both — then proving it with a labeled eval set rather than vibes. The hard part of agentic systems isn't wiring the agents; it's the boundaries and the measurement.",
  },
  {
    q: "Are you open to relocation?",
    a: "Zaid is actively interviewing for AI Engineer, Forward Deployed Engineer, and Applied AI roles and is open to discussing location, remote, and on-site arrangements. For specifics, the best path is to reach out directly at zaidmalick6@gmail.com.",
  },
  {
    q: "What's your salary expectation?",
    a: "That's not something to pin to a number here — it depends on the role, scope, and location. Reach out to Zaid directly at zaidmalick6@gmail.com to discuss compensation.",
  },
  {
    q: "What are you looking for?",
    a: "AI Engineer / Forward Deployed Engineer / Applied AI roles where the work is building agentic and LLM systems for real users — orchestration, RAG, evals, and the production engineering around them.",
  },
  {
    q: "What's your approach to building with LLMs?",
    a: "Eval-first, and disciplined about where the model belongs. The Lifeguard Scheduling Tool is the clearest example: exactly one file calls the LLM (to parse free-text requests); everything else — day-counting, coverage checks — is deterministic Python with unit tests. Knowing when NOT to use the model is half the job.",
  },
];
