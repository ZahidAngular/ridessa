"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/*
  Mouse-parallax wrapper for hero content.
  Layers with .plx-deep move more, .plx-shallow move less — true 3D depth feel.
  Touch devices: static (no parallax).
*/
export default function ParallaxHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // -1 .. 1
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // content moves opposite to mouse slightly — feels like looking around
  const rotX = useTransform(sy, [-1, 1], [4, -4]);
  const rotY = useTransform(sx, [-1, 1], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
