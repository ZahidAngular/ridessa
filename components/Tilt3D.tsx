"use client";
import { useRef, useState, type ReactNode } from "react";

/*
  Award-style 3D tilt wrapper.
  Wrap any card: <Tilt3D>...</Tilt3D>
  - Card tilts toward the mouse in 3D perspective
  - Inner content gets subtle depth (translateZ) via .tilt3d-inner
  - Touch devices: no tilt (safe fallback)
*/
export default function Tilt3D({
  children,
  max = 10,          // max tilt degrees
  scale = 1.02,      // hover scale
  className = "",
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    const rx = (py - 0.5) * -2 * max;  // rotateX
    const ry = (px - 0.5) *  2 * max;  // rotateY
    setStyle({
      transform: `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
    });
    setGlare({
      opacity: 1,
      background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.14) 0%, transparent 60%)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setGlare({ opacity: 0, transition: "opacity 0.4s ease" });
  };

  return (
    <div
      ref={ref}
      className={`tilt3d ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div className="tilt3d-glare" style={glare} aria-hidden />
    </div>
  );
}
