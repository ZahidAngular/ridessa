"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/*
  Premium scroll-driven 3D section wrapper (awwwards style).
  As the section scrolls into view it lifts up, un-tilts and scales to flat;
  as it leaves it tilts away again — true 3D depth while scrolling.

  <Scroll3D><MySection/></Scroll3D>
*/
export default function Scroll3D({
  children,
  intensity = 1,
}: {
  children: ReactNode;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // smooth out the scroll value
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  // enter: tilted back + small + low  →  middle: flat full  →  exit: tilt forward slightly
  const rotateX = useTransform(p, [0, 0.35, 0.75, 1], [14 * intensity, 0, 0, -8 * intensity]);
  const scale   = useTransform(p, [0, 0.35, 0.75, 1], [0.92, 1, 1, 0.97]);
  const y       = useTransform(p, [0, 0.35], [60 * intensity, 0]);
  const opacity = useTransform(p, [0, 0.25], [0.4, 1]);

  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: "preserve-3d",
          transformOrigin: "center 70%",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
