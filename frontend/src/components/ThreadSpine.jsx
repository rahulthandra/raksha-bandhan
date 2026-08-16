import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { THREAD_PALETTES } from "../lib/config";

// A single silk thread drawn down the entire page as the user scrolls.
export default function ThreadSpine({ threadColor = "gold" }) {
  const pal = THREAD_PALETTES[threadColor] || THREAD_PALETTES.gold;
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 0.92], [1, 0]);

  const d =
    "M50,0 C56,90 44,180 50,270 C56,360 44,450 50,540 C56,630 44,720 50,810 C56,900 44,990 50,1000";

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pal.from} />
            <stop offset="50%" stopColor={pal.mid} />
            <stop offset="100%" stopColor={pal.to} />
          </linearGradient>
          <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint full guide */}
        <path
          d={d}
          stroke="url(#threadGrad)"
          strokeWidth="1.1"
          fill="none"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
        />
        {/* drawn thread */}
        <motion.path
          d={d}
          stroke="url(#threadGrad)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          style={{ strokeDashoffset: dashOffset }}
          vectorEffect="non-scaling-stroke"
          filter="url(#threadGlow)"
          className="thread-shimmer"
        />
      </svg>
    </div>
  );
}
