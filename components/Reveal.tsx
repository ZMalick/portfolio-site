"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/useInView";

/**
 * Wraps children in a div that fades + rises into view on scroll. `delay`
 * (ms) staggers reveals when several sit near each other. Server components
 * can render this freely — only the wrapper is client-side.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-inview={inView ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`reveal-on-scroll ${className}`.trim()}
    >
      {children}
    </div>
  );
}
