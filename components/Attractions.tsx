"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Ticket, Sparkles } from "lucide-react";
import Tilt3D from "./Tilt3D";
import Link from "next/link";
import RideModal, { type RideData } from "./RideModal";

const allAttractions: RideData[] = [
  { id: 1, title: "Royal Wheel", category: "Rides", desc: "The crowning jewel of the midway — a towering Ferris wheel with breathtaking views over the whole showground.", imgs: ["/royal-wheel/royal-wheel-1.png", "/royal-wheel/royal-wheel-2.png", "/royal-wheel/royal-wheel-3.png", "/royal-wheel/royal-wheel-4.png", "/royal-wheel/royal-wheel-5.png", "/royal-wheel/royal-wheel-6.png"] },
  { id: 2, title: "Riptide", category: "Rides", desc: "Spin, sweep and soar — a fast-paced family thrill that whirls you high into the air.", imgs: ["/riptide/riptide-1.png", "/riptide/riptide-2.png", "/riptide/riptide-3.png", "/riptide/riptide-4.png", "/riptide/riptide-5.png", "/riptide/riptide-6.png"] },
  { id: 3, title: "Bumper Cars", category: "Rides", desc: "Grab the wheel and chase your friends — bumper-to-bumper chaos under flashing lights.", imgs: ["/bumper-cars/bumper-cars-1.png", "/bumper-cars/bumper-cars-2.png", "/bumper-cars/bumper-cars-3.png"] },
  { id: 4, title: "Top Gun", category: "Rides", desc: "Take to the skies — soaring, banking and looping flight for true thrill-seekers.", imgs: ["/top-gun/top-gun-1.png", "/top-gun/top-gun-2.png", "/top-gun/top-gun-3.png"] },
  { id: 5, title: "Sizzler", category: "Rides", desc: "Twist, spin and laugh your head off as the Sizzler whirls you in dizzy circles.", imgs: ["/sizzler/sizzler-1.png", "/sizzler/sizzler-2.png"] },
  { id: 6, title: "Tea Cups", category: "Rides", desc: "Climb into a giant tea cup and spin as fast as you dare — a whirling family favourite.", imgs: ["/tea-cups/tea-cups-1.png", "/tea-cups/tea-cups-2.png", "/tea-cups/tea-cups-3.png", "/tea-cups/tea-cups-4.png"] },
  { id: 7, title: "Fishing Game / Catch A Duck", category: "Games", desc: "Cast the line — or pick a duck. Cast the magnetic line or scoop a floating duck — every catch carries a prize. A timeless sideshow favourite.", imgs: ["/fishing-game-catch-a-duck/fishing-game-catch-a-duck.png"] },
  { id: 8, title: "Catch A Frog", category: "Games", desc: "Launch the frog. Land the lily pad. Whack the lever and land your frog cleanly on a floating pad — easy to play and packed with laughter.", imgs: ["/catch-a-frog/catch-a-frog-1.png", "/catch-a-frog/catch-a-frog-2.png"] },
  { id: 9, title: "Laughing Clowns", category: "Games", desc: "Feed the clowns. Win big. Drop the balls into the swaying clowns' mouths — every ball scores, and the higher your total, the bigger the prize.", imgs: ["/laughing-clowns/laughing-clowns-1.png", "/laughing-clowns/laughing-clowns-2.png"] },
  { id: 10, title: "Balloon Bust", category: "Games", desc: "Pop a balloon, claim a prize. Steady your hand and let the darts fly — bigger pops, bigger prizes. A true sideshow classic.", imgs: ["/balloon-bust/balloon-bust-1.png", "/balloon-bust/balloon-bust-2.png"] },
];

const categories = ["Rides", "Games"];

export default function AttractionsSection() {
  const [activeTab, setActiveTab] = useState("Rides");
  const [selectedRide, setSelectedRide] = useState<RideData | null>(null);

  const filteredItems = allAttractions.filter(item => item.category === activeTab);

  return (
    <section className="py-20 px-4 md:px-12 bg-[var(--bg-section)] min-h-screen relative overflow-hidden">

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--tint-brand-faint)] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--tint-accent-faint)] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-10">

          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[var(--accent)] mb-2">
              <Sparkles size={14} className="animate-pulse" />
              <span className="font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">01 — Our Attractions</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-[1000] italic text-[var(--text)] uppercase leading-[0.85] tracking-tighter">
              Choose Your <br />
              <span className="text-3d-pop">Adventure</span>
            </h2>
          </motion.div>

          {/* TABS */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="bg-[var(--bg-card)] p-1.5 rounded-full border border-[var(--border)] shadow-2xl flex items-center overflow-x-auto no-scrollbar max-w-full">
              <div className="flex flex-nowrap">
                {categories.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 md:px-10 py-3 rounded-full font-[900] text-[11px] md:text-xs uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-[var(--brand)] text-white shadow-[0_0_20px_rgba(var(--brand-rgb),0.6)]'
                        : 'text-[var(--text-faint)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full"
                onClick={() => setSelectedRide(item)}
              >
              <Tilt3D className="group relative flex flex-col rounded-[1rem] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-faint)] shadow-2xl h-full cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imgs[0]}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={item.title}
                  />
                  {/* Photo count badge */}
                  {item.imgs.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                      📷 {item.imgs.length} photos
                    </div>
                  )}
                  <div className="absolute top-5 left-5 bg-[var(--accent)] text-black px-4 py-2 rounded-xl font-[1000] text-[10px] uppercase shadow-xl flex items-center gap-2">
                    <Ticket size={14} strokeWidth={3} /> {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <h3 className="text-2xl md:text-3xl font-[1000] text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors uppercase italic tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-soft)] text-sm md:text-base leading-relaxed mb-8 font-medium line-clamp-3">
                    {item.desc}
                  </p>

                  <div className="mt-auto flex items-center gap-5">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedRide(item); }}
                      className="text-[var(--brand)] font-black uppercase text-[11px] tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all duration-300 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Details <ArrowRight size={18} strokeWidth={3} />
                    </button>
                    <Link
                      href="/booking"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[var(--text-faint)] hover:text-[var(--brand)] font-black uppercase text-[11px] tracking-[0.2em] transition-colors"
                    >
                      Book
                    </Link>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[var(--brand)] group-hover:w-full transition-all duration-700 shadow-[0_0_30px_var(--brand)]" />
                </div>

                {/* Inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_80px_rgba(var(--brand-rgb),0.15)]" />
              </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Ride detail modal */}
      <RideModal ride={selectedRide} onClose={() => setSelectedRide(null)} />
    </section>
  );
}
