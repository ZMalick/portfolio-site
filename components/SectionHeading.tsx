import Reveal from "@/components/Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow flex items-center gap-2">
          <span className="text-accent">{index}</span>
          <span className="h-px w-6 bg-line-bright" />
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
