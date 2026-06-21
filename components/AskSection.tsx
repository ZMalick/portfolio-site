import SectionHeading from "@/components/SectionHeading";
import Chat from "@/components/Chat";

export default function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="02"
        eyebrow="Ask my portfolio"
        title="Don't take my word for it. Ask."
      />

      <p className="mt-6 max-w-2xl leading-relaxed text-muted">
        An AI assistant grounded only in the facts on this page — it answers questions
        about my work and won&rsquo;t invent anything it doesn&rsquo;t know.
      </p>

      <div className="mt-10">
        <Chat />
      </div>
    </section>
  );
}
