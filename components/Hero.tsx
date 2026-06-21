import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* faint grid that fades downward */}
      <div className="pointer-events-none absolute inset-0 grid-faint" aria-hidden />
      {/* soft accent glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "var(--color-accent)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28 md:pb-28">
        <p className="eyebrow reveal" style={{ animationDelay: "0ms" }}>
          AI Engineer · Forward Deployed Engineer
        </p>

        {/* No entrance fade on the headline: it's the LCP element, and an
            opacity animation defers the largest paint. It renders immediately;
            the smaller elements around it still stagger in. */}
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {profile.headline}
        </h1>

        <p
          className="reveal mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {profile.subline}
        </p>

        <div
          className="reveal mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#ask"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-accent-soft active:translate-y-0"
          >
            Ask my portfolio
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-line-bright px-5 py-2.5 font-mono text-sm text-fg transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0"
          >
            View work
          </a>
          <a
            href={profile.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline ml-1 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            GitHub ↗
          </a>
        </div>

        <p
          className="reveal mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-faint"
          style={{ animationDelay: "320ms" }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Open to AI Engineer / FDE / Applied AI roles
          <span className="text-line-bright">·</span>
          {profile.location}
        </p>
      </div>
    </section>
  );
}
