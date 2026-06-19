"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import ContactModal from "./ContactModal";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled]     = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen]      = useState(false);

  // Transparent = floating at the very top, no solid background yet.
  const transparent = !scrolled && !menuOpen;
  // While floating over the dark hero image, force light text so the menu
  // stays visible in light mode (where --text is dark navy). Otherwise the
  // navbar sits on a solid --bg and uses the normal themed text colour.
  const navText = overHero && transparent ? "#ffffff" : "var(--text)";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        style={{ ["--nav-text" as string]: navText }}
        className={`fixed top-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
          scrolled || menuOpen
            ? "bg-[var(--bg)] shadow-2xl py-3"
            : "bg-transparent py-5 md:py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="flex items-center justify-between">

            {/* ── DESKTOP: Left Links ── */}
            <div className="hidden md:flex flex-1 gap-8 text-[var(--nav-text)] font-black text-[12px] uppercase tracking-widest">
              <Link href="/" className="hover:text-[var(--brand)] transition-colors">Home</Link>
              <Link href="/all-rides" className="hover:text-[var(--brand)] transition-colors">All Rides</Link>
            </div>

            {/* ── MOBILE: Hamburger ── */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-[var(--nav-text)] focus:outline-none"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </button>
            </div>

            {/* ── Center Logo ── */}
            <div className="flex-shrink-0 px-4 md:px-10">
              <Link href="/">
                <img
                  src="https://ridessa.com.au/img/Newlogo.png"
                  alt="Logo"
                  className={`transition-all duration-500 ease-in-out object-contain ${
                    scrolled ? "h-12 md:h-16" : "h-16 md:h-28"
                  }`}
                />
              </Link>
            </div>

            {/* ── Right Side ── */}
            <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden md:block text-[var(--nav-text)] font-black uppercase text-[12px] tracking-widest hover:text-[var(--brand)] transition-colors bg-transparent border-none cursor-pointer outline-none"
              >
                Contact Us
              </button>

              <ThemeToggle />

              <Link
                href="/booking"
                className="bg-[var(--brand)] text-white px-5 md:px-8 py-2.5 md:py-3 rounded-full font-black uppercase tracking-widest text-[11px] md:text-[12px] hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                Bookings
              </Link>
            </div>

          </div>
        </div>

        {/* ── Mobile Dropdown Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[var(--bg)] border-t border-[var(--border-faint)] px-6 py-6 flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-[var(--text)] font-black uppercase tracking-widest text-sm hover:text-[var(--brand)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/all-rides"
              onClick={() => setMenuOpen(false)}
              className="text-[var(--text)] font-black uppercase tracking-widest text-sm hover:text-[var(--brand)] transition-colors"
            >
              All Rides
            </Link>
            <button
              onClick={() => { setIsModalOpen(true); setMenuOpen(false); }}
              className="text-left text-[var(--text)] font-black uppercase tracking-widest text-sm hover:text-[var(--brand)] transition-colors bg-transparent border-none cursor-pointer outline-none"
            >
              Contact Us
            </button>
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="inline-block bg-[var(--brand)] text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[12px] text-center hover:scale-105 transition-all shadow-lg"
            >
              Bookings
            </Link>
          </div>
        </div>
      </nav>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
