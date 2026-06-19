"use client";
import { useEffect, useRef, useState } from "react";

/*
  Award-style custom cursor (desktop only).
  - Small brand dot follows mouse instantly
  - Larger ring follows with smooth lag
  - Grows on links/buttons/cards
*/
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only on devices with a fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;   // mouse
    let rx = -100, ry = -100;   // ring (lagged)
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Grow on interactive elements
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], .tilt3d, .cursor-grow")) {
        ring.classList.add("cc-ring--active");
      } else {
        ring.classList.remove("cc-ring--active");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef}  className="cc-dot"  aria-hidden />
      <div ref={ringRef} className="cc-ring" aria-hidden />
    </>
  );
}
