import React from "react";

/**
 * Seamless auto-scrolling ribbon (CSS-only, pauses on hover).
 * Renders the items twice so the loop is continuous.
 */
export default function Marquee({
  items,
  className = "",
  duration = 34,
  reverse = false,
}: {
  items: React.ReactNode[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={"group relative flex overflow-hidden " + className}>
      <div
        className="animate-marquee flex w-max shrink-0 items-center [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <span key={`${dup}-${i}`} className="mx-6 flex items-center md:mx-9">
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
