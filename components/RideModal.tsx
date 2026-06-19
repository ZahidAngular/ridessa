"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface RideData {
  id: number;
  title: string;
  category: string;
  desc: string;
  imgs: string[];
}

interface Props {
  ride: RideData | null;
  onClose: () => void;
}

export default function RideModal({ ride, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client
  useEffect(() => { setMounted(true); }, []);

  // Reset active image when ride changes
  useEffect(() => { setActiveImg(0); }, [ride]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (ride) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [ride]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {ride && (
        <div className="rm-portal" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            className="rm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="rm-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30, rotateX: 12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button className="rm-close" onClick={onClose} aria-label="Close">✕</button>

            {/* ── Main Image ── */}
            <div className="rm-main-img-wrap">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={ride.imgs[activeImg]}
                  alt={ride.title}
                  className="rm-main-img"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Category badge */}
              <span className="rm-badge">{ride.category}</span>

              {/* Prev/Next arrows if more than 1 image */}
              {ride.imgs.length > 1 && (
                <>
                  <button
                    className="rm-arrow rm-arrow--left"
                    onClick={() => setActiveImg(i => (i - 1 + ride.imgs.length) % ride.imgs.length)}
                  >‹</button>
                  <button
                    className="rm-arrow rm-arrow--right"
                    onClick={() => setActiveImg(i => (i + 1) % ride.imgs.length)}
                  >›</button>
                </>
              )}

              {/* Image counter */}
              {ride.imgs.length > 1 && (
                <span className="rm-counter">{activeImg + 1} / {ride.imgs.length}</span>
              )}
            </div>

            {/* ── Thumbnails ── */}
            {ride.imgs.length > 1 && (
              <div className="rm-thumbs">
                {ride.imgs.map((src, i) => (
                  <button
                    key={i}
                    className={`rm-thumb ${i === activeImg ? "rm-thumb--active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}

            {/* ── Content ── */}
            <div className="rm-body">
              <h2 className="rm-title">{ride.title}</h2>
              <p className="rm-desc">{ride.desc}</p>
              <Link href="/booking" className="rm-cta" onClick={onClose}>
                Book This Ride →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
