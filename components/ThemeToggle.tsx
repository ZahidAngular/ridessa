"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    setTheme(current || "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ridessa-theme", next);
    } catch {}
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--glass)] ${className}`}
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`relative w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--glass)] hover:bg-[var(--glass-strong)] hover:border-[var(--brand)] transition-all flex items-center justify-center overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun size={16} className="text-[var(--accent)]" />
          ) : (
            <Moon size={16} className="text-[var(--brand)]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
