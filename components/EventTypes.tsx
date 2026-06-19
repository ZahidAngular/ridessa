"use client";
import { motion } from "framer-motion";
import Tilt3D from "./Tilt3D";
import Link from "next/link";

const events = [
  {
    title: "School Fairs",
    desc: "Make your school fair legendary. Rides, games, and food stalls that kids and parents both love.",
    img: "/jumping-castles/jumping-castles-1.png",
    tag: "MOST POPULAR",
  },
  {
    title: "Corporate Events",
    desc: "Stand out at your next corporate event. We turn ordinary company days into extraordinary memories.",
    img: "/royal-wheel/royal-wheel-1.png",
    tag: "TEAM FAVOURITE",
  },
  {
    title: "Birthday Parties",
    desc: "The ultimate birthday experience. A full carnival brought directly to your backyard.",
    img: "/flying-cars/flying-cars-1.png",
    tag: "FUN FOR ALL AGES",
  },
  {
    title: "Wedding Fun",
    desc: "Add a magical twist to your wedding. Carnival games and rides your guests will never forget.",
    img: "/sizzler/sizzler-1.png",
    tag: "UNFORGETTABLE",
  },
];

export default function EventTypes() {
  return (
    <section className="ev-section">
      <div className="ev-bg-glow ev-bg-glow--1" aria-hidden />
      <div className="ev-bg-glow ev-bg-glow--2" aria-hidden />

      <div className="ev-inner">
        <motion.p
          className="ev-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ✦ 02 — WE COME TO YOU
        </motion.p>

        <motion.h2
          className="ev-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          PERFECT FOR<br />
          <span className="text-3d-pop">EVERY EVENT</span>
        </motion.h2>

        <div className="ev-grid">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 70, rotateX: 28 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <Tilt3D className="ev-card" max={12}>
                {/* Image */}
                <div className="ev-card-img-wrap">
                  <img src={ev.img} alt={ev.title} className="ev-card-img" />
                  <div className="ev-card-overlay" aria-hidden />
                  <span className="ev-card-tag">{ev.tag}</span>
                </div>

                {/* Content */}
                <div className="ev-card-body">
                  <h3 className="ev-card-title">{ev.title}</h3>
                  <p className="ev-card-desc">{ev.desc}</p>
                  <Link href="/booking" className="ev-card-link">
                    Book This Event <span className="ev-card-arrow">→</span>
                  </Link>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
