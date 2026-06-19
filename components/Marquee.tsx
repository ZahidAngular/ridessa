"use client";

/*
  Award-style infinite scrolling marquee strip.
  <Marquee items={["FUN RIDES","GAMES","FOOD"]} />
  - direction: "left" | "right"
  - outline: every 2nd item outlined text (gusta style)
*/
export default function Marquee({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Repeat enough times to fill any screen seamlessly
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee" aria-hidden>
      <div
        className={`marquee-track ${direction === "right" ? "marquee-track--rev" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((item, i) => (
          <span key={i} className={`marquee-item ${i % 2 === 1 ? "marquee-item--outline" : ""}`}>
            {item} <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
