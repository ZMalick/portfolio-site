"use client";

import { useState } from "react";

/**
 * The headline email — keeps the mailto link, plus a discrete "copy" affordance
 * with a brief confirmation. Falls back silently to the mailto if the clipboard
 * API is unavailable.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${email}`}
        className="link-underline inline-block font-display text-2xl text-accent sm:text-3xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="rounded-full border border-line-bright px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}
