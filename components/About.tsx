import { profile } from "@/content/profile";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading index="03" eyebrow="About" title="The short version." />

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={60} className="space-y-5 text-lg leading-relaxed text-muted">
          <p className="text-fg">{profile.bio}</p>
          <p className="font-mono text-sm text-faint">{profile.education}</p>
        </Reveal>

        <Reveal delay={140}>
          <p className="eyebrow">Core skills</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <li
                key={s}
                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-bright hover:text-fg"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
