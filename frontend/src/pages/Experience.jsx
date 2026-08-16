import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThreadSpine from "../components/ThreadSpine";
import MemoryNode from "../components/MemoryNode";
import RakhiClimax from "../components/RakhiClimax";
import { getConfigFromUrl, THREAD_PALETTES } from "../lib/config";

export default function Experience() {
  const [config, setConfig] = useState(getConfigFromUrl());
  const pal = THREAD_PALETTES[config.thread] || THREAD_PALETTES.gold;
  const { scrollYProgress } = useScroll();
  const openingOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.15]);

  useEffect(() => {
    setConfig(getConfigFromUrl());
  }, []);

  const distanceLine =
    config.distance === "far"
      ? "The thread doesn't care how many kilometres it has to cross."
      : null;

  return (
    <div className="relative room-bg min-h-screen">
      <div className="grain-overlay" />
      {/* mandala corner accents */}
      <MandalaCorner className="fixed top-0 left-0 opacity-[0.06] z-0" />
      <MandalaCorner className="fixed bottom-0 right-0 rotate-180 opacity-[0.06] z-0" />

      <div className="relative">
        <ThreadSpine threadColor={config.thread} />

        {/* Opening screen */}
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity: openingOpacity }} className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase text-xs md:text-sm text-[var(--gold)]"
            >
              A Raksha Bandhan thread
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-title text-4xl sm:text-5xl lg:text-6xl text-ivory mt-6 max-w-2xl leading-tight"
            >
              Every rakhi starts as a single thread.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2, delay: 1.4 }}
              className="font-body text-ivory-soft mt-6 text-base md:text-lg max-w-md"
            >
              For {config.sister}, from {config.sender}.
            </motion.p>

            {distanceLine && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: 2, delay: 2 }}
                className="font-body italic text-ivory-muted mt-3 text-sm max-w-sm"
              >
                {distanceLine}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.4 }}
              className="mt-16 flex flex-col items-center gap-2"
            >
              <span
                className="w-3 h-3 rounded-full diya-flicker"
                style={{ background: pal.mid, boxShadow: `0 0 18px 6px ${pal.glow}` }}
              />
              <span className="font-body text-xs text-ivory-muted tracking-[0.25em] uppercase mt-3">
                Scroll to begin
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={18} className="text-[var(--gold)]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Blooming sequence */}
        <section className="relative z-10">
          <div className="text-center py-10">
            <p className="font-body text-ivory-muted text-sm tracking-[0.2em] uppercase opacity-60">
              What grew along the way
            </p>
          </div>
          {config.memories.map((text, i) => (
            <MemoryNode
              key={i}
              index={i}
              text={text}
              flower={config.flower}
              threadGlow={pal.mid}
            />
          ))}
        </section>

        {/* Weaving + Final knot + Closing */}
        <RakhiClimax config={config} />
      </div>
    </div>
  );
}

function MandalaCorner({ className }) {
  return (
    <svg className={className} width="220" height="220" viewBox="0 0 200 200" fill="none">
      <g stroke="#e8b84b" strokeWidth="0.6" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="90"
            transform={`rotate(${i * 7.5} 0 0)`}
          />
        ))}
        <circle cx="0" cy="0" r="40" />
        <circle cx="0" cy="0" r="70" />
        <circle cx="0" cy="0" r="100" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`p-${i}`}
            d="M0 55 C15 65 15 85 0 95 C-15 85 -15 65 0 55"
            transform={`rotate(${i * 11} 0 0)`}
          />
        ))}
      </g>
    </svg>
  );
}
