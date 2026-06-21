"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const SUGGESTED_QUESTIONS = [
  "What's your strongest project?",
  "What's the hardest thing you've built?",
  "Are you open to relocation?",
  "What are you looking for?",
];

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";
  const isEmpty = messages.length === 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
      {/* console title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="h-3 w-3 rounded-full bg-line-bright" />
        <span className="ml-3 font-mono text-xs text-faint">ask-zaid · llama-3.3-70b</span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="max-h-[26rem] min-h-[15rem] space-y-5 overflow-y-auto p-5 sm:p-6"
        aria-live="polite"
        aria-atomic="false"
      >
        {isEmpty ? (
          <div>
            <div className="flex gap-3">
              <span className="select-none font-mono text-sm text-accent" aria-hidden>
                ▍
              </span>
              <p className="leading-relaxed text-fg/90">
                Hi — I&rsquo;m Zaid&rsquo;s portfolio assistant. Ask me about his projects, his
                skills, or what he&rsquo;s looking for.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="message-in rounded-full border border-line-bright px-3 py-1.5 font-mono text-xs text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="message-in flex gap-3">
              <span
                className={`mt-0.5 select-none font-mono text-xs uppercase tracking-widest ${
                  m.role === "user" ? "text-faint" : "text-accent"
                }`}
                aria-hidden
              >
                {m.role === "user" ? "you" : "zaid"}
              </span>
              <p
                className={`flex-1 leading-relaxed whitespace-pre-wrap ${
                  m.role === "user" ? "text-muted" : "text-fg"
                }`}
              >
                {messageText(m.parts)}
              </p>
            </div>
          ))
        )}

        {status === "submitted" && (
          <div className="message-in flex gap-3">
            <span className="mt-0.5 font-mono text-xs uppercase tracking-widest text-accent">
              zaid
            </span>
            <span className="flex items-center gap-1 py-1.5" aria-label="thinking">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="cursor-blink inline-block h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ animationDelay: `${i * 180}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {error && (
          <p className="font-mono text-xs text-faint">
            Something went wrong. The assistant may not be connected — reach Zaid directly at{" "}
            <a href="mailto:zaidmalick6@gmail.com" className="text-accent">
              zaidmalick6@gmail.com
            </a>
            .
          </p>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-3 border-t border-line bg-ink px-4 py-3"
      >
        <span className="font-mono text-sm text-faint" aria-hidden>
          &gt;
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          aria-label="Ask Zaid's portfolio assistant a question"
          maxLength={2000}
          className="flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-faint focus:outline-none"
        />
        {busy ? (
          <button
            type="button"
            onClick={() => stop()}
            className="rounded-md border border-line-bright px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent active:translate-y-px"
          >
            stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-md bg-accent px-3 py-1 font-mono text-xs font-medium text-accent-ink transition-[opacity,background-color,transform] hover:bg-accent-soft active:scale-[0.97] disabled:opacity-40 disabled:hover:bg-accent"
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
