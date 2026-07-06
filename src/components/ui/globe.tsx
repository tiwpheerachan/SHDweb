import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ---- SHD business locations ---- */
const LOCATIONS: { name: string; lat: number; lng: number; hub?: boolean }[] = [
  { name: "Shenzhen", lat: 22.54, lng: 114.06, hub: true },
  { name: "Vietnam", lat: 21.03, lng: 105.85 },
  { name: "Thailand", lat: 13.76, lng: 100.5 },
  { name: "Philippines", lat: 14.6, lng: 120.98 },
  { name: "Indonesia", lat: -6.21, lng: 106.85 },
  { name: "Saudi Arabia", lat: 24.71, lng: 46.68 },
  { name: "UAE", lat: 25.2, lng: 55.27 },
  { name: "Mexico", lat: 19.43, lng: -99.13 },
  { name: "Brazil", lat: -23.55, lng: -46.63 },
];

// network links: hub → everyone, plus a few regional links
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
  [2, 3], [3, 4], [5, 6], [7, 8],
];

type V3 = [number, number, number];

const toVec = (lat: number, lng: number): V3 => {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};
const rotY = (v: V3, a: number): V3 => {
  const s = Math.sin(a), c = Math.cos(a);
  return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
};
const rotX = (v: V3, a: number): V3 => {
  const s = Math.sin(a), c = Math.cos(a);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
};
const slerp = (a: V3, b: V3, t: number): V3 => {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  d = Math.max(-1, Math.min(1, d));
  const th = Math.acos(d);
  if (th < 1e-4) return a;
  const s = Math.sin(th);
  const w1 = Math.sin((1 - t) * th) / s;
  const w2 = Math.sin(t * th) / s;
  return [a[0] * w1 + b[0] * w2, a[1] * w1 + b[1] * w2, a[2] * w1 + b[2] * w2];
};

// fibonacci sphere for the dotted globe
function fibSphere(n: number): V3[] {
  const pts: V3[] = [];
  const off = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return pts;
}

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = fibSphere(1500);
    const locVecs = LOCATIONS.map((l) => toVec(l.lat, l.lng));

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;

    const resize = () => {
      size = canvas.offsetWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = size / 2;
      cy = size / 2;
      R = size * 0.4;
    };
    resize();
    window.addEventListener("resize", resize);

    // rotation state
    let yaw = -1.1; // start showing Asia
    let pitch = -0.28;
    let velYaw = 0;
    let velPitch = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      velYaw = 0;
      velPitch = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      yaw += dx * 0.006;
      pitch += dy * 0.006;
      pitch = Math.max(-1.15, Math.min(1.15, pitch));
      velYaw = dx * 0.006;
      velPitch = dy * 0.006;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const project = (v: V3) => {
      const a = rotX(rotY(v, yaw), pitch);
      return { x: cx + a[0] * R, y: cy - a[1] * R, z: a[2] };
    };

    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, size, size);

      // idle auto-rotate + inertia
      if (!dragging) {
        yaw += velYaw;
        pitch += velPitch;
        pitch = Math.max(-1.15, Math.min(1.15, pitch));
        velYaw *= 0.94;
        velPitch *= 0.94;
        if (Math.abs(velYaw) < 0.0006) yaw += 0.0016; // gentle spin
      }

      // sphere fill (ocean)
      const grad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.2, cx, cy, R * 1.05);
      grad.addColorStop(0, "rgba(40,74,170,0.55)");
      grad.addColorStop(1, "rgba(8,20,55,0.9)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // dotted globe
      for (let i = 0; i < dots.length; i++) {
        const p = project(dots[i]);
        const front = p.z > 0;
        const alpha = front ? 0.18 + 0.55 * p.z : 0.05;
        ctx.beginPath();
        ctx.arc(p.x, p.y, front ? 1.25 : 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,192,255,${alpha})`;
        ctx.fill();
      }

      // network arcs
      const SEG = 44;
      for (let k = 0; k < LINKS.length; k++) {
        const [ia, ib] = LINKS[k];
        const a = locVecs[ia];
        const b = locVecs[ib];
        const phase = (t * 0.28 + k * 0.16) % 1;
        for (let s = 0; s < SEG; s++) {
          const tt = s / (SEG - 1);
          const m = slerp(a, b, tt);
          const lift = 1 + 0.22 * Math.sin(Math.PI * tt);
          const p = project([m[0] * lift, m[1] * lift, m[2] * lift]);
          if (p.z <= -0.05) continue;
          const baseA = p.z > 0 ? 0.28 : 0.08;
          // faint arc line
          if (s > 0) {
            const prev = slerp(a, b, (s - 1) / (SEG - 1));
            const pl = 1 + 0.22 * Math.sin(Math.PI * ((s - 1) / (SEG - 1)));
            const pp = project([prev[0] * pl, prev[1] * pl, prev[2] * pl]);
            ctx.beginPath();
            ctx.moveTo(pp.x, pp.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(120,170,255,${baseA})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          // travelling pulse
          const dist = Math.abs(tt - phase);
          if (dist < 0.08 && p.z > 0) {
            const glow = (1 - dist / 0.08) * p.z;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.4 * glow + 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,222,46,${0.9 * glow})`;
            ctx.fill();
          }
        }
      }

      // markers
      for (let i = 0; i < LOCATIONS.length; i++) {
        const loc = LOCATIONS[i];
        const p = project(locVecs[i]);
        if (p.z <= 0) continue;
        const r = loc.hub ? 4 : 3;
        // pulsing ring
        const pr = (loc.hub ? 1 : 0.7) * (1 + Math.sin(t * 2 + i));
        const ringA = 0.35 * Math.max(0, 1 - ((t * 2 + i) % (Math.PI)) / Math.PI) * p.z;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + pr * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,222,46,${0.25 * p.z})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // glow dot
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, `rgba(255,222,46,${0.9 * p.z})`);
        g.addColorStop(1, "rgba(255,222,46,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = loc.hub ? "#ffffff" : "#ffde2e";
        ctx.fill();
        // label
        ctx.font = `${loc.hub ? "700 11px" : "600 10px"} Inter, sans-serif`;
        ctx.fillStyle = `rgba(255,255,255,${(loc.hub ? 0.95 : 0.6) * p.z})`;
        ctx.fillText(loc.hub ? "Shenzhen HQ" : loc.name, p.x + r + 4, p.y + 3);
        void ringA;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[480px]", className)}>
      <div className="pointer-events-none absolute inset-[-8%] rounded-full bg-brand/30 blur-3xl" />
      <canvas
        ref={canvasRef}
        className="relative h-full w-full touch-none select-none"
        style={{ cursor: "grab" }}
      />
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white/40">
        Drag to rotate
      </div>
    </div>
  );
}
