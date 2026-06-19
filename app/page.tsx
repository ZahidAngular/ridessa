"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Attractions from "@/components/Attractions";
import EventTypes from "@/components/EventTypes";
import StatsSection from "@/components/StatsSection";
import Marquee from "@/components/Marquee";
import Scroll3D from "@/components/Scroll3D";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <Navbar overHero />
      <Hero />
      <Scroll3D intensity={0.9}>
        <Attractions />
      </Scroll3D>
      <Marquee items={["CARNIVAL RIDES", "FUN GAMES", "SWEET TREATS", "BIG PRIZES"]} />
      <Scroll3D>
        <EventTypes />
      </Scroll3D>
      <Marquee items={["SCHOOL FAIRS", "BIRTHDAYS", "CORPORATE", "WEDDINGS"]} direction="right" />
      <Scroll3D intensity={1.2}>
        <StatsSection />
      </Scroll3D>

      {/* Ready to Start CTA */}
      <Scroll3D intensity={1.3}>
      <section
        className="py-32 text-center px-10 border-t border-[var(--border-faint)] relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--bg-section) 50%, transparent))" }}
      >
        {/* 3D rotating carnival ring */}
        <div className="ring3d-wrap" aria-hidden>
          <div className="ring3d">
            {["🎡","🎠","🎢","🍭","🎪","🎯","🍿","⭐"].map((e, i) => (
              <span key={i} style={{ ["--a" as string]: `${i * 45}deg` }}>{e}</span>
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-tight text-[var(--text)]">
            READY TO START <br /> THE <span className="text-3d-pop">PARTY?</span>
          </h2>
          <p className="text-[var(--text-soft)] mb-12 max-w-2xl mx-auto text-lg">
            Don't settle for boring. Make your next event the talk of the town with Carnival Rides of SA.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/booking" className="bg-[var(--text)] text-[var(--bg)] px-12 py-5 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform inline-block">
              Get a Free Quote
            </Link>
            <a href="tel:0408817628" className="border-2 border-[var(--brand)] text-[var(--brand)] px-12 py-5 rounded-full font-black uppercase tracking-tighter hover:bg-[var(--brand)] hover:text-white transition-all inline-block">
              Contact Support
            </a>
          </div>
        </motion.div>
      </section>
      </Scroll3D>

      <Footer />
    </main>
  );
}
