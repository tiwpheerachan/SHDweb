import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * IconCloud — a draggable 3D sphere of logos that auto-rotates like a globe.
 * Pure DOM + rAF (no deps): each logo is projected from a point on a unit
 * sphere; depth drives scale, opacity and blur.
 */
export function IconCloud({ images, className }: { images: string[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLImageElement | null>>([]);
  const state = useRef({
    rotX: -0.15,
    rotY: 0,
    velX: 0,
    velY: 0.0035,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const n = images.length;
    // even distribution on a unit sphere (Fibonacci lattice)
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: Array<[number, number, number]> = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / Math.max(1, n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }

    let raf = 0;
    const render = () => {
      const c = containerRef.current;
      if (c) {
        const size = c.clientWidth;
        const radius = size * 0.36;
        const cx = size / 2;
        const cy = size / 2;
        const s = state.current;

        if (!s.dragging) {
          s.rotY += s.velY;
          s.rotX += s.velX;
          s.velY += (0.0035 - s.velY) * 0.03; // ease back to gentle spin
          s.velX *= 0.92; // vertical drift decays
        }

        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);
        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);

        for (let i = 0; i < n; i++) {
          const el = iconRefs.current[i];
          if (!el) continue;
          const [x, y, z] = pts[i];
          const x1 = x * cosY + z * sinY;
          const z1 = -x * sinY + z * cosY;
          const y2 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;

          const scale = (z2 + 1.7) / 2.7; // 0.26 (back) .. 1 (front)
          const sx = cx + x1 * radius;
          const sy = cy + y2 * radius;
          const depth = (z2 + 1) / 2; // 0 back .. 1 front

          el.style.transform = `translate(-50%,-50%) translate(${sx.toFixed(1)}px,${sy.toFixed(1)}px) scale(${scale.toFixed(3)})`;
          el.style.opacity = (0.28 + depth * 0.72).toFixed(3);
          el.style.filter = z2 < 0 ? `blur(${((-z2) * 1.4).toFixed(2)}px)` : "none";
          el.style.zIndex = String(Math.round(depth * 100));
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [images]);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.rotY += dx * 0.006;
    s.rotX -= dy * 0.006;
    s.velY = dx * 0.0006;
    s.velX = -dy * 0.0006;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    state.current.dragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn(
        "relative aspect-square w-full cursor-grab touch-none select-none active:cursor-grabbing",
        className
      )}
    >
      {images.map((src, i) => (
        <img
          key={src}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-0 top-0 h-auto w-[68px] max-w-none object-contain will-change-transform md:w-[76px]"
        />
      ))}
    </div>
  );
}
