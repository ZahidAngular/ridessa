"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Tilt3D from "./Tilt3D";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Events Delivered", icon: "🎪" },
  { value: 20,  suffix: "+", label: "Attractions",      icon: "🎡" },
  { value: 10,  suffix: "+", label: "Years Experience", icon: "⭐" },
  { value: 100, suffix: "%", label: "South Australia",  icon: "📍" },
];

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-bg-stripe" aria-hidden />

      <div className="stats-inner">
        <motion.p
          className="stats-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ✦ 03 — BY THE NUMBERS
        </motion.p>

        <motion.h2
          className="stats-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          TRUSTED ACROSS<br />
          <span className="text-3d-pop text-3d-pop--accent">SOUTH AUSTRALIA</span>
        </motion.h2>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotateY: 35 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformPerspective: 900 }}
            >
              <Tilt3D className="stats-card" max={14}>
                <span className="stats-card-icon">{s.icon}</span>
                <p className="stats-card-number">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="stats-card-label">{s.label}</p>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
