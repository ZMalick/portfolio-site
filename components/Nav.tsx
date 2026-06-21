"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { label: "Work", href: "#work" },
  { label: "Ask", href: "#ask" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section crossing a thin band near the top wins.
        const onscreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onscreen[0]) setActive(onscreen[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          aria-label="Zaid Malick — home"
        >
          <span className="inline-block h-2.5 w-2.5 bg-accent transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-medium text-fg">zaid malick</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`link-underline font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <a
          href={profile.contact.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line-bright px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Résumé&nbsp;↗
        </a>
      </nav>
    </header>
  );
}
