"use client";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Rides",
    desc: "Browse our 20+ attractions — rides, games, and food stalls. Pick what fits your event perfectly.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 4 L24 24 L38 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We Deliver & Set Up",
    desc: "Our professional team handles full delivery, installation, and safety checks. You don't lift a finger.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="14" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M36 20 L44 26 L44 34 L36 34" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="12" cy="38" r="4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="38" r="4" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "You Party!",
    desc: "Sit back and enjoy the smiles. We manage everything on the day so you can celebrate stress-free.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6 L28 18 L42 18 L31 26 L35 38 L24 30 L13 38 L17 26 L6 18 L20 18 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Professional Setup",
    desc: "Certified operators on-site for the entire event.",
    icon: "🏆",
  },
  {
    title: "All South Australia",
    desc: "We travel anywhere across SA — metro or regional.",
    icon: "📍",
  },
  {
    title: "Fully Insured",
    desc: "Complete public liability insurance for your peace of mind.",
    icon: "🛡️",
  },
  {
    title: "20+ Attractions",
    desc: "Rides, games, and food — a complete carnival experience.",
    icon: "🎡",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function WhyChooseUs() {
  return (
    <section className="why-section py-28 px-6 md:px-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="why-bg-blob why-bg-blob--1" aria-hidden />
      <div className="why-bg-blob why-bg-blob--2" aria-hidden />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Eyebrow */}
        <motion.p
          className="why-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ✦ HOW IT WORKS
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="why-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          THREE EASY <br />
          <span className="why-heading-accent">STEPS TO FUN</span>
        </motion.h2>

        {/* Steps */}
        <motion.div
          className="why-steps-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} className="why-step-card" variants={itemVariants}>
              <div className="why-step-number">{step.number}</div>
              <div className="why-step-icon">{step.icon}</div>
              <h3 className="why-step-title">{step.title}</h3>
              <p className="why-step-desc">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="why-step-arrow" aria-hidden>→</div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="why-divider" />

        {/* Features grid */}
        <motion.p
          className="why-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ✦ WHY CHOOSE US
        </motion.p>

        <motion.h2
          className="why-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          THE CARNIVAL <br />
          <span className="why-heading-accent">DIFFERENCE</span>
        </motion.h2>

        <motion.div
          className="why-features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((f, i) => (
            <motion.div key={i} className="why-feature-card" variants={itemVariants}>
              <span className="why-feature-icon">{f.icon}</span>
              <h4 className="why-feature-title">{f.title}</h4>
              <p className="why-feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
