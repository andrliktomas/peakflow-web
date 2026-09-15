"use client";

import { useEffect } from "react";

/**
 * Fades in every `[data-reveal]` section as it scrolls into view.
 * Mount once per page; the sections themselves stay server-rendered.
 *
 * Anything still hidden after 3s is shown regardless — a safety net for
 * browsers where the observer never fires (and it means content is never
 * permanently invisible if JS half-loads).
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08 },
      );
      for (const el of els) observer.observe(el);
    } else {
      for (const el of els) el.classList.add("in");
    }

    const failsafe = window.setTimeout(() => {
      for (const el of els) el.classList.add("in");
    }, 3000);

    return () => {
      observer?.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
