# Ask My Portfolio — AI Engineer Portfolio Site

Personal portfolio for Zaid Malick (AI Engineer / Forward Deployed Engineer), built
around a live **"Ask my portfolio"** chatbot: a streaming AI assistant grounded on my
bio and project corpus that answers recruiter questions in real time, instead of a
static "about me" page.

**Live site:** https://portfolio-site-lemon-kappa-26.vercel.app

---

## What it is

A Next.js portfolio whose centerpiece is a server-side chat endpoint. A visitor can ask
the site questions — "what's his agent experience?", "is he open to relocation?",
"walk me through the research assistant" — and get grounded, streamed answers drawn
from a curated corpus of verified facts about me and my work.

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind v4**
- **Vercel AI SDK** (`ai` + `@ai-sdk/groq`) for streaming chat
- **Llama 3.3 70B** via **Groq** (fast inference, free tier)
- **Upstash Redis** rate limiting — 10 requests/min per IP (sliding window) on the public endpoint
- Hosted on **Vercel**

## How the chatbot works

- A server-side `/api/chat` route grounds the model on a curated corpus (bio + verified
  project facts) held in the system prompt. No RAG at v1 — the corpus fits in the context
  window, so retrieval adds latency without adding accuracy.
- Only the most recent turns are sent to the model to keep cost bounded.
- Per-IP rate limiting protects the public endpoint and degrades gracefully when the
  Upstash env vars are absent (allows requests locally rather than hard-failing).

> Provider note: the model started as Claude, then Gemini, and settled on Llama 3.3 70B
> via Groq — chosen for a no-cost, no-credit-card public endpoint. The architecture
> (corpus-in-prompt, streaming, input cap, per-IP limit) is provider-agnostic and swaps
> back to Claude by changing one adapter if an Anthropic key is added.

## Featured projects (shown on the site)

Multi-Agent Research Assistant · Executive Assistant · Lifeguard Scheduling Tool · Paper Trading Bot.

## Run locally

```bash
npm install
cp .env.example .env.local   # set GROQ_API_KEY (UPSTASH_* optional, enables rate limiting)
npm run dev                  # http://localhost:3000
```

## Project layout

```
app/
  api/chat/route.ts   # server-side streaming chat endpoint (Groq)
  page.tsx            # single-page portfolio
components/           # Hero, About, ProjectGrid, Chat, Nav, Footer
content/              # profile, projects, corpus, faq — the chatbot's grounding data
lib/                  # rate limiting + shared types
```

All facts in the content corpus are verified against the underlying repos and live endpoints.
