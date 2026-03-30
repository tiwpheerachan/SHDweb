import React from "react";
import { useReveal } from "./useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Wraps children in a stagger-animated container using CSS .stagger-children */
export default function StaggerReveal({ children, className = "" }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`stagger-children ${shown ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
