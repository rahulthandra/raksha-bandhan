import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Flower } from "./Flowers";

// One memory bloom along the thread.
// Alternates the flower to left / right of the central thread.
export default function MemoryNode({ text, flower, index, threadGlow }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const [bloomed, setBloomed] = useState(false);
  const side = index % 2 === 0 ? "left" : "right";

  useEffect(() => {
    if (inView) setBloomed(true);
  }, [inView]);

  const flowerState = !bloomed
    ? { scale: 0.05, opacity: 0 }
    : inView
    ? { scale: 1, opacity: 1 }
    : { scale: 0.6, opacity: 0.38 };

  const textState = inView
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : bloomed
    ? { opacity: 0.32, y: 0, filter: "blur(0.5px)" }
    : { opacity: 0, y: 24, filter: "blur(3px)" };

  return (
    <div
      ref={ref}
      className="relative min-h-[85vh] flex items-center justify-center"
      data-testid={`memory-node-${index}`}
    >
      {/* node glow marker on the thread */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          background: threadGlow,
          boxShadow: `0 0 18px 4px ${threadGlow}`,
        }}
        animate={{ scale: inView ? 1.3 : 0.7, opacity: bloomed ? 1 : 0.2 }}
        transition={{ duration: 1 }}
      />

      <div
        className={`relative w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
          side === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Flower half */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          {/* stem branch from center thread to flower */}
          <svg
            className="absolute top-1/2 hidden md:block"
            style={{ [side === "right" ? "left" : "right"]: "-8%", width: "18%", height: 60 }}
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
          >
            <motion.path
              d={side === "right" ? "M100 30 C60 30 40 20 0 26" : "M0 30 C40 30 60 20 100 26"}
              stroke={threadGlow}
              strokeWidth="1.4"
              fill="none"
              animate={{ opacity: bloomed ? 0.8 : 0 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <motion.div animate={flowerState} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="drop-shadow-[0_0_20px_rgba(212,160,23,0.25)]">
              <Flower type={flower} size={150} animate={bloomed} />
            </div>
          </motion.div>
        </div>

        {/* Text half */}
        <motion.div
          className={`w-full md:w-1/2 ${side === "right" ? "md:text-right" : "md:text-left"} text-center`}
          animate={textState}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-[var(--gold)] text-sm tracking-[0.3em] uppercase opacity-70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className="font-body text-ivory text-xl md:text-2xl leading-relaxed mt-3"
            data-testid={`memory-text-${index}`}
          >
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
