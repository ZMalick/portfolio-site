"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view. Returns a ref to attach and an
 * `inView` boolean. Respects prefers-reduced-motion and SSR/unsupported
 * environments by reporting `true` immediately (content is never trapped hidden).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      // Reveal immediately. This is a mount-time environment check (matchMedia
      // isn't available during SSR/render), so the synchronous set is intended.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px", ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
