"use client"
import { submitLead } from "@/lib/formService";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MessageSquare, Send, Sparkles, MapPin, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";

const eventTypes = ["Birthday Party", "School Fair", "Corporate Event", "Wedding", "Festival", "Other"];

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [eventType, setEventType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   console.log("Contact form submitted:", {
  //     name: data.get("name"),
  //     email: data.get("email"),
  //     phone: data.get("phone"),
  //     eventType,
  //     message: data.get("message"),
  //   });
  //   setSubmitted(true);
  //   setTimeout(() => {
  //     setSubmitted(false);
  //     onClose();
  //   }, 2200);
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // 1. Form se data nikalna
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  try {
    // 2. Service ko call karna
    // Hum 'comment' ke andar sari extra malomat (Event Type + Message) bhej rahe hain
    await submitLead({
      fullName: name,
      email: email,
      phone: phone,
      comment: `Event Type: ${eventType} | Message: ${message}`,
    });

    // 3. Agar submission kamyab ho jaye
    setSubmitted(true);
    
    // 2 second baad modal band karna
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);

  } catch (error) {
    // 4. Agar koi error aaye
    console.error("Form Submit Error:", error);
    alert("Sorry! Message nahi ja saka. Please call us directly.");
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--backdrop)] backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
            className="relative w-full max-w-5xl bg-[var(--bg-overlay)] rounded-[36px] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_80px_-10px_var(--tint-brand-glow)] border border-[var(--border)] max-h-[92vh]"
          >
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 z-10" style={{ background: "linear-gradient(to right, var(--brand), var(--accent), var(--brand))" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>

            {/* ============ LEFT SIDE ============ */}
            <div className="w-full md:w-[40%] p-10 md:p-12 flex flex-col items-center justify-between relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--bg-overlay-soft) 0%, var(--bg-overlay) 50%, var(--bg-overlay-soft) 100%)" }}>
              {/* Decorative radial glows */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--tint-brand-soft)] blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--tint-accent-soft)] blur-[100px] rounded-full pointer-events-none" />

              {/* Floating sparkles */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 text-[var(--accent)] opacity-60 pointer-events-none"
              >
                <Sparkles size={18} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-32 left-6 text-[var(--brand)] opacity-60 pointer-events-none"
              >
                <Sparkles size={14} />
              </motion.div>

              {/* Sticky Note */}
              <div className="flex-1 flex items-center justify-center w-full relative">
                <motion.div
                  initial={{ rotate: -3 }}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative cursor-pointer"
                >
                  <div className="bg-[var(--accent)] p-8 shadow-2xl relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-md rotate-2 shadow-md" />
                    <h2 className="text-black font-black italic text-4xl text-center leading-none">
                      CONTACT <br /> <span className="text-5xl">US</span>
                    </h2>
                  </div>
                  <div className="absolute top-2 left-2 w-full h-full bg-[var(--brand)] -z-10 shadow-[0_0_30px_var(--tint-brand-glow)]" />
                </motion.div>
              </div>

              {/* Tagline */}
              <p className="text-[var(--text)] font-black uppercase tracking-[0.25em] text-[10px] opacity-70 my-6 text-center relative">
                ✨ We're ready for the fun! ✨
              </p>

              {/* Pro Contact Info Strip */}
              <div className="w-full space-y-3 text-[var(--text)] relative">
                <ContactRow icon={<Phone size={14} />} label="Direct Line" value="0408 817 628" />
                <ContactRow icon={<Mail size={14} />} label="Email" value="info@ridessa.com.au" />
                <ContactRow icon={<MapPin size={14} />} label="Service" value="All South Australia" />
                <div className="flex items-center gap-2 pt-2 mt-3 border-t border-[var(--border)]">
                  <Clock size={12} className="text-[var(--accent)]" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-[var(--accent)]">
                    Replies within 1 hour
                  </span>
                </div>
              </div>
            </div>

            {/* ============ RIGHT SIDE ============ */}
            <div className="w-full md:w-[60%] p-8 md:p-12 relative overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--glass)] border border-[var(--border)] flex items-center justify-center text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--glass-strong)] hover:rotate-90 transition-all duration-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Heading */}
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[var(--tint-brand-soft)] border border-[var(--brand)]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--brand)]">
                          Available Now
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black italic uppercase text-[var(--text)] leading-tight">
                        GET IN <span className="text-[var(--brand)] drop-shadow-[0_0_20px_var(--tint-brand-glow-strong)]">TOUCH</span>
                      </h3>
                      <p className="text-[var(--text-soft)] mt-2 text-sm">
                        Tell us about your event — we'll craft the perfect carnival package.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <InputField icon={<User size={16} />} type="text" placeholder="Full Name" delay={0.05} name="name" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField icon={<Mail size={16} />} type="email" placeholder="Email Address" delay={0.1} name="email" />
                        <InputField icon={<Phone size={16} />} type="tel" placeholder="Phone Number" delay={0.15} name="phone" />
                      </div>

                      {/* Dropdown */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                      >
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-2xl px-5 py-4 text-left flex items-center gap-3 focus:outline-none hover:border-[var(--brand)]/40 focus:border-[var(--brand)] transition-all"
                        >
                          <span className="text-[var(--brand)]"><Sparkles size={16} /></span>
                          <span className={`flex-1 ${eventType ? "text-[var(--text)]" : "text-[var(--text-faint)]"}`}>
                            {eventType || "Select Event Type"}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`text-[var(--text-soft)] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.98 }}
                              className="absolute z-20 mt-2 w-full bg-[var(--bg-overlay-soft)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
                            >
                              {eventTypes.map((t) => (
                                <button
                                  type="button"
                                  key={t}
                                  onClick={() => {
                                    setEventType(t);
                                    setDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-5 py-3 text-sm text-[var(--text-base)] hover:bg-[var(--tint-brand-soft)] hover:text-[var(--brand)] transition-colors flex items-center gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                  {t}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="relative group"
                      >
                        <div className="absolute top-4 left-5 text-[var(--text-faint)] group-focus-within:text-[var(--brand)] transition-colors pointer-events-none">
                          <MessageSquare size={16} />
                        </div>
                        <textarea
                          rows={4}
                          name="message"
                          placeholder="Tell us about your event…"
                          className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-2xl pl-12 pr-5 py-4 text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--brand)] focus:bg-[var(--glass-strong)] focus:ring-4 focus:ring-[var(--tint-brand-faint)] transition-all resize-none"
                        />
                      </motion.div>

                      {/* Footer */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-between gap-4 pt-4"
                      >
                        <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-widest font-bold hidden sm:block">
                          🔒 Your info stays private
                        </p>

                        <div className="flex items-center gap-6 ml-auto">
                          <button
                            type="button"
                            onClick={onClose}
                            className="text-[var(--text-faint)] font-black uppercase text-xs tracking-widest hover:text-[var(--text)] transition-all"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="relative bg-[var(--brand)] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_var(--tint-brand-glow-strong)] overflow-hidden group"
                          >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            <span className="relative flex items-center gap-2">
                              <Send size={14} /> Send Message
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  /* SUCCESS STATE */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                      className="w-20 h-20 rounded-full bg-[var(--tint-brand-soft)] border-2 border-[var(--brand)] flex items-center justify-center mb-6 shadow-[0_0_40px_var(--tint-brand-glow-strong)]"
                    >
                      <CheckCircle2 size={42} className="text-[var(--brand)]" />
                    </motion.div>
                    <h3 className="text-4xl font-black italic uppercase text-[var(--text)] mb-3">
                      MESSAGE <span className="text-[var(--accent)]">SENT!</span>
                    </h3>
                    <p className="text-[var(--text-soft)] max-w-sm">
                      Thanks for reaching out — we'll get back to you within the hour. Get ready for unforgettable moments! 🎢
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------- Helpers -------- */

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="w-8 h-8 rounded-full bg-[var(--glass)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-widest text-[var(--text-faint)] font-black">{label}</p>
        <p className="text-[var(--text)] font-bold truncate">{value}</p>
      </div>
    </div>
  );
}

function InputField({
  icon,
  type,
  placeholder,
  delay = 0,
  name,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  delay?: number;
  name?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-5 text-[var(--text-faint)] group-focus-within:text-[var(--brand)] transition-colors pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-2xl pl-12 pr-5 py-4 text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--brand)] focus:bg-[var(--glass-strong)] focus:ring-4 focus:ring-[var(--tint-brand-faint)] transition-all"
      />
    </motion.div>
  );
}
