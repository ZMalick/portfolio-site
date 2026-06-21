import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ChatLazy from "@/components/ChatLazy";

export default function AskSection() {
  return (
    <section id="ask" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        index="02"
        eyebrow="Ask my portfolio"
        title="Don't take my word for it. Ask."
      />

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          An AI assistant grounded only in the facts on this page — it answers questions
          about my work and won&rsquo;t invent anything it doesn&rsquo;t know.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10">
        <ChatLazy />
      </Reveal>
    </section>
  );
}
