import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Instagram } from "lucide-react";
import { Flower, TinyFlower } from "./Flowers";
import { THREAD_PALETTES } from "../lib/config";

export default function RakhiClimax({ config }) {
  const pal = THREAD_PALETTES[config.thread] || THREAD_PALETTES.gold;
  const [tied, setTied] = useState(false);
  const stageRef = useRef(null);
  const weaveRef = useRef(null);
  const weaveInView = useInView(weaveRef, { margin: "-30% 0px -30% 0px" });

  const ringFlowers = Array.from({ length: 8 });

  return (
    <section className="relative z-10">
      {/* Weaving transition text */}
      <div
        ref={weaveRef}
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={weaveInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-title text-3xl md:text-5xl text-ivory leading-snug max-w-2xl"
        >
          Every one of these is still tied to you.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={weaveInView ? { opacity: 0.6 } : {}}
          transition={{ duration: 2, delay: 0.6 }}
          className="font-body text-ivory-muted mt-6 text-base md:text-lg max-w-md"
        >
          The thread has wound itself into a rakhi — every bloom now part of it.
        </motion.p>
      </div>

      {/* Rakhi stage */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24">
        <div ref={stageRef} className="relative" style={{ width: 340, maxWidth: "90vw" }}>
          {/* candlelight bloom on tie */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 420,
              height: 420,
              background: `radial-gradient(circle, ${pal.glow} 0%, rgba(212,160,23,0.12) 35%, transparent 70%)`,
            }}
            initial={{ opacity: 0.15, scale: 0.6 }}
            animate={tied ? { opacity: 1, scale: 1.15 } : { opacity: 0.15, scale: 0.6 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* ring of tiny flowers appear on tie */}
          {ringFlowers.map((_, i) => {
            const angle = (i / ringFlowers.length) * 2 * Math.PI;
            const r = 150;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ marginLeft: -20, marginTop: -20 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  tied
                    ? { opacity: 0.9, scale: 1, x, y }
                    : { opacity: 0, scale: 0, x: 0, y: 0 }
                }
                transition={{ duration: 1.1, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <TinyFlower type={config.flower} size={40} />
              </motion.div>
            );
          })}

          {/* Thread + knot SVG */}
          <svg viewBox="0 0 340 340" className="relative w-full" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="rakhiThread" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={pal.from} />
                <stop offset="50%" stopColor={pal.mid} />
                <stop offset="100%" stopColor={pal.to} />
              </linearGradient>
            </defs>

            {/* left tail (always tied side) */}
            <path
              d="M170 170 C120 175 70 185 20 250 C10 262 25 275 40 268 C80 250 120 210 170 200"
              stroke="url(#rakhiThread)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* left decorative loop */}
            <path
              d="M170 170 C110 150 70 120 90 90 C104 68 140 78 150 110 C156 132 168 155 170 170"
              stroke="url(#rakhiThread)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* right loop + tail: animate in on tie */}
            <motion.path
              d="M170 170 C230 150 270 120 250 90 C236 68 200 78 190 110 C184 132 172 155 170 170"
              stroke="url(#rakhiThread)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: tied ? 0 : 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
            <motion.path
              d="M170 170 C220 175 270 185 320 250 C330 262 315 275 300 268 C260 250 220 210 170 200"
              stroke="url(#rakhiThread)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: tied ? 0 : 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* loose end (visible only before tie) */}
            <motion.path
              d="M170 170 C220 175 270 195 315 235"
              stroke="url(#rakhiThread)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              animate={{ opacity: tied ? 0 : 0.85 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* central medallion */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: 120,
                height: 120,
                background: "radial-gradient(circle, #2a1512 0%, #1a0f0f 70%)",
                border: `2px solid ${pal.mid}`,
                boxShadow: `0 0 30px ${pal.glow}`,
              }}
              animate={tied ? { rotate: [0, 8, 0], scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 1.6 }}
            >
              <div className="diya-flicker">
                <Flower type="marigold" size={110} animate={false} />
              </div>
            </motion.div>
          </div>

          {/* loose-end tie button */}
          <AnimatePresence>
            {!tied && (
              <motion.button
                data-testid="tie-knot-button"
                onClick={() => setTied(true)}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute"
                style={{ left: "93%", top: "69%" }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="block w-6 h-6 rounded-full pulse-soft" style={{ background: pal.mid, boxShadow: `0 0 20px 6px ${pal.glow}` }} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* prompt / instruction */}
        <AnimatePresence mode="wait">
          {!tied ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="font-title text-2xl md:text-3xl text-ivory">Tie the last knot.</p>
              <p className="font-body text-ivory-muted mt-2 text-sm">
                Tap the loose end of the thread
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="closing"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 text-center max-w-xl px-4"
              data-testid="closing-message"
            >
              <p className="font-body text-ivory text-xl md:text-2xl leading-relaxed">
                {config.closing}
              </p>
              <p className="font-sign text-[var(--gold)] text-4xl md:text-5xl mt-10">
                — {config.sender}
              </p>
              <p className="font-body text-ivory-muted mt-4 text-sm tracking-wide">
                written with love for {config.sister}, Raksha Bandhan {config.year}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer credit */}
      <footer className="relative z-10 pb-16 flex flex-col items-center gap-3">
        <a
          href="https://www.instagram.com/ultrahulbuilds/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="credit-link"
          className="group flex items-center gap-2 text-ivory-muted hover:text-[var(--gold)] transition-colors duration-300"
        >
          <Instagram size={16} />
          <span className="font-body text-sm tracking-wide">made by ultrahul</span>
        </a>
        <a
          href="/create"
          data-testid="create-own-link"
          className="font-body text-xs text-ivory-muted/60 hover:text-[var(--gold)] transition-colors duration-300 underline underline-offset-4"
        >
          create your own thread
        </a>
      </footer>
    </section>
  );
}
