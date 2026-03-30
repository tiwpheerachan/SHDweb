import { useEffect, useRef, useState } from "react";

type RevealOpts = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOpts = {}) {
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.12, once = true } = opts;
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown && once) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once, shown]);

  return { ref, shown };
}
