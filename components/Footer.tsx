import { profile } from "@/content/profile";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";

export default function Footer() {
  const year = 2026;
  const contacts = [
    { label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { label: "GitHub", value: `github.com/${profile.contact.github}`, href: profile.contact.githubUrl },
    { label: "LinkedIn", value: "in/zaid-malick", href: profile.contact.linkedinUrl },
    { label: "Résumé", value: "resume.pdf", href: profile.contact.resumeUrl },
  ];

  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pb-12 pt-20 sm:px-8 md:pt-28"
    >
      <div className="border-t border-line pt-6">
        <p className="eyebrow flex items-center gap-2">
          <span className="text-accent">04</span>
          <span className="h-px w-6 bg-line-bright" />
          Contact
        </p>
      </div>

      <Reveal delay={60}>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Hiring for an AI Engineer or FDE role? Let&rsquo;s talk.
        </h2>

        <CopyEmail email={profile.contact.email} />
      </Reveal>

      <Reveal delay={120}>
        <ul className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 md:grid-cols-4">
          {contacts.map((c) => (
            <li key={c.label}>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-faint">
                {c.label}
              </p>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-underline mt-1 inline-block text-sm text-fg transition-colors hover:text-accent"
              >
                {c.value}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Zaid Malick</span>
        <span>
          Built with Next.js + Tailwind. The assistant runs on{" "}
          <span className="text-muted">Llama 3.3 70B via Groq</span>.
        </span>
      </div>
    </footer>
  );
}
