import React, { useCallback, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** How strong the magnetic pull is (default 0.3) */
  strength?: number;
};

/**
 * Wraps children with a magnetic hover effect.
 * The element subtly moves toward the cursor when hovered.
 */
export default function MagneticButton({ children, className = "", strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={"magnetic-wrap " + className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
