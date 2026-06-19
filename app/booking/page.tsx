"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/lib/formService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Send,
  Utensils,
  Gamepad2,
  Tent
} from "lucide-react";

const R = (n: number) => Math.round(n * 1000) / 1000;

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Browser validates required fields before this runs
    const data = new FormData(e.currentTarget);
    const name  = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");

    // Fold all the booking details into the single CRM comment field
    const comment = [
      `Rides: ${data.get("rides")}`,
      `Games: ${data.get("games")}`,
      `Food: ${data.get("food")}`,
      `Event Type: ${data.get("eventType")}`,
      `Date: ${data.get("date")}`,
      `Organisation: ${data.get("org")}`,
      `Address: ${data.get("address")}`,
      `Details: ${data.get("details")}`,
    ].join(" | ");

    try {
      await submitLead({ fullName: name, email, phone, comment });
      setSubmitted(true);
    } catch (error) {
      console.error("Booking submit error:", error);
      alert("Sorry! Booking request nahi ja saka. Please call us directly.");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 50, rotateX: 10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden mt-24">
      <Navbar />

      {/* Background Decorative Element (Ferris Wheel) */}
      <div className="absolute top-20 right-[-10%] opacity-10 pointer-events-none rotate-12">
        <FerrisWheelIcon color="var(--brand)" size={500} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 pt-32 pb-20" style={{ perspective: 1400 }}>

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-[1000] italic uppercase leading-none tracking-tighter text-[var(--text)]">
            BOOK THE <span className="text-3d-pop">ADVENTURE</span>
          </h1>
          <div className="h-1.5 w-32 bg-[var(--accent)] mx-auto mt-6 rounded-full" />
          <p className="mt-6 text-[var(--text-soft)] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold">
            Fill out the form below to secure your date
          </p>
        </motion.div>

        {/* The Professional Form */}
        <motion.div className="bk-card" {...fadeInUp}>
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="bk-success"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                🎉 <strong>Thank you!</strong> Your booking request is ready — we&apos;ll contact you within 24 hours.
              </motion.div>
            )}
          </AnimatePresence>
          <form className="space-y-14 md:space-y-16" onSubmit={handleSubmit}>

            {/* 01. SELECT ATTRACTIONS */}
            <section>
              <div className="bk-step-head">
                <span className="bk-step-num">01</span>
                <h3 className="bk-step-title">Select Your Attractions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <SelectGroup label="Rides" name="rides" icon={<Tent />} options={["All Rides", "Sizzler", "Dodgem Cars", "Ferris Wheel"]} />
                <SelectGroup label="Games" name="games" icon={<Gamepad2 />} options={["Side Show Alley", "Laughing Clowns", "Lucky Numbers"]} />
                <SelectGroup label="Food" name="food" icon={<Utensils />} options={["Fairy Floss", "Popcorn", "Hot Dogs"]} />
              </div>
            </section>

            {/* 02. EVENT LOGISTICS */}
            <section>
              <div className="bk-step-head">
                <span className="bk-step-num">02</span>
                <h3 className="bk-step-title">Event Logistics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <InputGroup icon={<Calendar />} type="date" placeholder="mm/dd/yyyy" name="date" required />
                <InputGroup icon={<Gamepad2 />} type="text" placeholder="Type of Event (Birthday, Festival...)" name="eventType" required />
                <InputGroup icon={<MapPin />} type="text" placeholder="Organisation Name" name="org" />
              </div>
              <InputGroup icon={<MapPin />} type="text" placeholder="Full Event Address (Street, Suburb, Postcode)" name="address" required />
            </section>

            {/* 03. YOUR INFORMATION */}
            <section>
              <div className="bk-step-head">
                <span className="bk-step-num">03</span>
                <h3 className="bk-step-title">Your Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <InputGroup icon={<User />} type="text" placeholder="Your Full Name" name="name" required />
                <InputGroup icon={<Phone />} type="tel" placeholder="Mobile Number" name="phone" required />
                <InputGroup icon={<Mail />} type="email" placeholder="Email Address" name="email" required />
              </div>
              <textarea
                rows={4}
                name="details"
                placeholder="Any specific requirements, bump-in times or details..."
                className="bk-textarea"
              ></textarea>
            </section>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <p className="text-[var(--text-faint)] text-sm max-w-md text-center md:text-left">
                By submitting this form, you agree to our terms of service. We will contact you within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--brand-rgb),0.45)" }}
                whileTap={{ scale: 0.95 }}
                className="bk-submit"
              >
                Send Booking Request <Send size={18} />
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

// --- Internal Helper Components ---

function InputGroup({ icon, type, placeholder, name, required }: { icon: React.ReactElement<{ size?: number }>, type: string, placeholder: string, name?: string, required?: boolean }) {
  return (
    <div className="relative group">
      <div className="bk-input-icon">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <input type={type} placeholder={placeholder} name={name} required={required} className="bk-input" />
    </div>
  );
}

function SelectGroup({ label, icon, options, name }: { label: string, icon: React.ReactElement<{ size?: number }>, options: string[], name?: string }) {
  return (
    <div className="space-y-3">
      <label className="bk-label">{label}</label>
      <div className="relative group">
        <div className="bk-input-icon z-10">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <select name={name} className="bk-input bk-select">
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <div className="bk-select-arrow">▼</div>
      </div>
    </div>
  );
}

function FerrisWheelIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="50" y1="50" x2={R(50 + 36 * Math.cos(i * 30 * Math.PI / 180))} y2={R(50 + 36 * Math.sin(i * 30 * Math.PI / 180))} stroke={color} strokeWidth="0.5" />
      ))}
    </svg>
  );
}
