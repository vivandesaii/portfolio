"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO } from "@/lib/content";

const BOOT_LINES = [
  "vivan@uoft:~$ ./init --profile",
  "loading modules… backend ✓  ml ✓  quant ✓",
  "ready.",
];

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBooted(true);
      return;
    }
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setShown(i + 1), 350 * (i + 1))
    );
    timers.push(setTimeout(() => setBooted(true), 350 * BOOT_LINES.length + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="flex min-h-[70vh] flex-col justify-center pt-24">
      {!booted ? (
        <button
          className="cursor-pointer text-left text-sm text-muted"
          onClick={() => setBooted(true)}
          aria-label="Skip intro animation"
        >
          {BOOT_LINES.slice(0, shown).map((l) => (
            <div key={l}>{l}</div>
          ))}
          <span className="cursor-blink inline-block h-4 w-2 bg-accent/70 align-middle" />
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm text-muted">vivan@uoft:~$ whoami</p>
          <h1 className="text-4xl font-medium text-accent sm:text-5xl">
            {HERO.name}
          </h1>
          <p className="mt-4 text-sm text-muted">{HERO.status}</p>
          <p className="mt-6 max-w-xl text-lg text-fg/90">{HERO.positioning}</p>
        </motion.div>
      )}
    </section>
  );
}
