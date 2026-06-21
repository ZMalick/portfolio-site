import { profile } from "@/content/profile";

const links = [
  { label: "Work", href: "#work" },
  { label: "Ask", href: "#ask" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
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
