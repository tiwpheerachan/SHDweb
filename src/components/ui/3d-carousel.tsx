import { memo, useEffect, useLayoutEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = (q: string) => (typeof window === "undefined" ? defaultValue : window.matchMedia(q).matches);
  const [matches, setMatches] = useState<boolean>(() => getMatches(query));
  useIsomorphicLayoutEffect(() => {
    const mm = window.matchMedia(query);
    const onChange = () => setMatches(getMatches(query));
    onChange();
    mm.addEventListener("change", onChange);
    return () => mm.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export type CarouselCard = { img: string; char?: boolean; label?: string };

const transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] as const };

const Cylinder = memo(function Cylinder({ cards }: { cards: CarouselCard[] }) {
  const isSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isSm ? 1100 : 1900;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);
  const [dragging, setDragging] = useState(false);

  // gentle auto-rotation when idle
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!dragging) rotation.set(rotation.get() + dt * 0.006);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dragging, rotation]);

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <motion.div
        drag="x"
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDragStart={() => setDragging(true)}
        onDrag={(_, info) => rotation.set(rotation.get() + info.offset.x * 0.05)}
        onDragEnd={() => setDragging(false)}
      >
        {cards.map((card, i) => (
          <motion.div
            key={`${card.img}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            {card.char ? (
              <motion.img
                src={card.img}
                alt={card.label || ""}
                className="pointer-events-none max-h-[66%] w-auto object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.22)]"
                initial={{ filter: "blur(4px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={transition}
              />
            ) : (
              <motion.div
                className="grid aspect-square w-full max-w-[132px] place-items-center overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
                initial={{ filter: "blur(4px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={transition}
              >
                <img src={card.img} alt={card.label || ""} className="pointer-events-none h-full w-full object-cover" draggable={false} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export function ThreeDIconCarousel({ cards, className }: { cards: CarouselCard[]; className?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <Cylinder cards={cards} />
    </div>
  );
}
