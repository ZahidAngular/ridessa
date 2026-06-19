"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Phone, Clock, MapPin, Calendar, Map } from "lucide-react";
import Link from "next/link";
import ParallaxHero from "./ParallaxHero";

const backgroundImages = [
  "https://mobile-amusements.web.app/flying-cars/flying-cars-1.png",
  "https://mobile-amusements.web.app/jumping-castles/jumping-castles-1.png",
  "https://mobile-amusements.web.app/jumping-castles/jumping-castles-2.png"
];

export default function GlobalHero() {
  const [index, setIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven 3D exit — hero sinks back into depth as you scroll past
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // 10 Seconds Image Change Gap
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-[#fcee21] selection:text-black" style={{ perspective: 1200 }}>
      
      {/* 1. SEAMLESS CROSS-FADE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={backgroundImages[index]}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 2.5, ease: "easeInOut" },
              scale: { duration: 12, ease: "linear" } 
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Carnival Background"
          />
        </AnimatePresence>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-10" />
      </div>

      {/* 2. VIBRANT FLOATING WHEELS (Bright Colors, No Dimming) */}
      <motion.div 
        animate={{ 
          x: [0, 60, -30, 0], 
          y: [0, 80, 20, 0],
          rotate: 360 
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] z-20 opacity-90 hidden sm:block pointer-events-none"
      >
        <FerrisWheelIcon color="#fcee21" size={160} />
      </motion.div>

      <motion.div 
        animate={{ 
          x: [0, -80, 40, 0], 
          y: [0, -60, 100, 0],
          rotate: -360 
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[25%] right-[5%] z-20 opacity-90 hidden sm:block pointer-events-none"
      >
        <FerrisWheelIcon color="#e6007e" size={140} />
      </motion.div>

      {/* 3. MAIN CONTENT (Responsive & Balanced) */}
      <motion.div
        className="relative z-30 text-center px-6 max-w-6xl pt-12 pb-32 md:pb-0"
        style={{ scale: heroScale, opacity: heroOpacity, rotateX: heroRotateX, y: heroY, transformStyle: "preserve-3d" }}
      >
        <ParallaxHero>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Heading: 3D extruded carnival text */}
          <h1 className="hero-3d-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-[1000] italic uppercase leading-[0.9] tracking-tighter">
            Unforgettable <br />
            <span className="hero-3d-title--accent">Moments</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
            South Australia's premier carnival hire company. <br className="hidden sm:block" />
            <span className="text-white">We bring the magic and fun directly to you.</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking" className="w-full sm:w-auto bg-[#e6007e] px-10 py-4 rounded-xl font-black text-white uppercase text-sm tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Calendar size={20} /> Book Your Event
            </Link>
            <Link href="/all-rides" className="w-full sm:w-auto border-2 border-[#fcee21] px-10 py-4 rounded-xl font-black text-[#fcee21] uppercase text-sm tracking-widest hover:bg-[#fcee21] hover:text-black transition-all bg-black/40 backdrop-blur-md flex items-center justify-center gap-2">
              <Map size={20} /> View All Rides
            </Link>
          </div>
        </motion.div>
        </ParallaxHero>
      </motion.div>

      {/* 4. PREMIUM INFO BAR (Responsive Grid) */}
      <div className="absolute bottom-4 sm:bottom-8 w-full px-4 sm:px-10 z-40">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-[#e6007e] w-full max-w-7xl mx-auto rounded-2xl p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b-[8px] border-[#fcee21] shadow-2xl"
        >
          {/* Info Block 1 */}
          <a href="tel:0408817628" className="contents">
            <InfoItem icon={<Phone size={22} />} label="Call Us Now" val="0408 817 628" isLast={false} />
          </a>
          {/* Info Block 2 */}
          <InfoItem icon={<Clock size={22} />} label="Open Every Day" val="08:00am - 5:00pm" isLast={false} />
          {/* Info Block 3 */}
          <InfoItem icon={<MapPin size={22} />} label="Service Area" val="All South Australia" isLast={true} />
        </motion.div>
      </div>
    </section>
  );
}

// Re-usable Responsive Info Block
function InfoItem({ icon, label, val, isLast }: { icon: React.ReactNode; label: string; val: string; isLast: boolean }) {
  return (
    <div className={`flex items-center gap-4 text-white justify-center md:justify-start ${!isLast ? 'border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4' : ''}`}>
      <div className="bg-white/20 p-3 rounded-full shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-[10px] md:text-xs uppercase font-black tracking-widest text-pink-100 opacity-90">{label}</p>
        <p className="text-base md:text-xl lg:text-2xl font-black">{val}</p>
      </div>
    </div>
  );
}

// Custom High-Quality Ferris Wheel SVG (Vibrant Colors)
function FerrisWheelIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="filter drop-shadow-lg">
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="7" fill={color} />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 50 + 38 * Math.cos(angle);
        const y = 50 + 38 * Math.sin(angle);
        return (
          <React.Fragment key={i}>
            <line x1="50" y1="50" x2={x} y2={y} stroke={color} strokeWidth="2" opacity="0.8" />
            <circle cx={x} cy={y} r="4.5" fill={color} />
          </React.Fragment>
        );
      })}
    </svg>
  );
}