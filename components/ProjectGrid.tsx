import { featuredProjects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export default function ProjectGrid() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Things I've built and can prove."
      />

      <div className="mt-12 flex flex-col gap-5">
        {lead && <ProjectCard project={lead} index={0} featured />}

        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
