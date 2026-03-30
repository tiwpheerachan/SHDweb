import React, { useCallback, useEffect, useRef } from "react";

/**
 * Premium mouse follower with:
 * - Outer glow ring (slow follow, blurred)
 * - Inner dot (fast follow, crisp)
 * - Scales up on interactive elements (a, button, input)
 * - Trail particles on fast movement
 * - Hidden on touch / reduced-motion
 */
export default function MouseFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const visible = useRef(false);
  const raf = useRef(0);

  // Trail particles
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }>>([]);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const spawnParticle = useCallback((x: number, y: number, vx: number, vy: number) => {
    if (particles.current.length > 25) return;
    particles.current.push({
      x, y,
      vx: vx * 0.3 + (Math.random() - 0.5) * 0.8,
      vy: vy * 0.3 + (Math.random() - 0.5) * 0.8,
      life: 1,
      maxLife: 0.4 + Math.random() * 0.3,
    });
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    // Resize canvas
    const canvas = trailCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) visible.current = true;

      // Spawn trail particles on fast movement
      const dx = e.clientX - lastTrailPos.current.x;
      const dy = e.clientY - lastTrailPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 12) {
        spawnParticle(e.clientX, e.clientY, dx * 0.05, dy * 0.05);
        lastTrailPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onLeave = () => {
      visible.current = false;
    };
    const onEnter = () => {
      visible.current = true;
    };

    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };

    // Detect hover on interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")) {
        hovering.current = true;
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")) {
        hovering.current = false;
      }
    };

    const loop = () => {
      const ringLerp = 0.08;
      const dotLerp = 0.22;

      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringLerp;
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * dotLerp;

      const isHover = hovering.current;
      const isClick = clicking.current;
      const isVisible = visible.current;

      const ringScale = isClick ? 0.8 : isHover ? 1.5 : 1;
      const dotScale = isClick ? 1.6 : isHover ? 0.4 : 1;
      const ringOpacity = isVisible ? (isHover ? 0.9 : 0.6) : 0;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.opacity = String(ringOpacity);
        ringRef.current.style.borderColor = isHover
          ? "rgba(79,70,229,0.5)"
          : "rgba(79,70,229,0.25)";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.opacity = isVisible ? "1" : "0";
        dotRef.current.style.background = isHover
          ? "rgba(79,70,229,0.9)"
          : "rgba(15,23,42,0.85)";
      }

      // Draw trail particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const dt = 0.016;
        particles.current = particles.current.filter((p) => {
          p.life -= dt / p.maxLife;
          if (p.life <= 0) return false;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;

          const alpha = p.life * 0.35;
          const size = p.life * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79,70,229,${alpha})`;
          ctx.fill();
          return true;
        });
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, [spawnParticle]);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
        style={{ willChange: "auto" }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(79,70,229,0.25)",
          background: "radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)",
          transition: "opacity 0.3s, border-color 0.3s, width 0.3s, height 0.3s",
          willChange: "transform",
          opacity: 0,
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(15,23,42,0.85)",
          transition: "opacity 0.2s, background 0.25s",
          willChange: "transform",
          opacity: 0,
        }}
      />
    </>
  );
}
