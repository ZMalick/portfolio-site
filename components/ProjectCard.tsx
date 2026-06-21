import type { Project, ProjectProof } from "@/lib/types";
import Reveal from "@/components/Reveal";

const proofLabel: Record<ProjectProof, string> = {
  "live-demo": "Live demo",
  "public-repo": "Public repo",
  "case-study": "Case study",
};

function ProofBadge({ proof }: { proof: ProjectProof }) {
  const live = proof === "live-demo";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${
        live ? "border-accent/40 text-accent" : "border-line-bright text-faint"
      }`}
    >
      {live && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {proofLabel[proof]}
    </span>
  );
}

export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  // Cards in the 3-up grid stagger; the featured lead card reveals on its own.
  const delay = featured ? 0 : (index - 1) * 90;

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-line-bright sm:p-7 ${
          featured ? "md:flex-row md:gap-10 md:p-9" : ""
        }`}
      >
      {/* accent hairline that appears on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100" />

      <div className={featured ? "md:w-1/2" : ""}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-faint">{num}</span>
          <ProofBadge proof={project.proof} />
        </div>

        <h3
          className={`mt-5 font-display font-semibold tracking-tight ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-1.5 font-mono text-sm text-accent/90">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">
          {featured ? project.writeup : project.blurb}
        </p>
      </div>

      <div className={`mt-6 flex flex-col ${featured ? "md:mt-0 md:w-1/2" : ""}`}>
        {featured && (
          <ul className="mb-6 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-line bg-raised px-2 py-0.5 font-mono text-[0.7rem] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.links.length > 0 ? (
              project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline group/link inline-flex items-center gap-1 font-mono text-sm text-fg transition-colors hover:text-accent"
                >
                  {l.label}{" "}
                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))
            ) : (
              <span className="font-mono text-xs text-faint">
                Private system — featured as a case study
              </span>
            )}
          </div>
        </div>
      </div>
      </article>
    </Reveal>
  );
}
