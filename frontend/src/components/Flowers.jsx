import React from "react";
import { motion } from "framer-motion";

// Hand-drawn / botanical style inline SVG flowers.
// Each accepts a `size` and renders in warm gold/vermillion tones.

const bloomStagger = {
  hidden: { scale: 0.1, opacity: 0 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Marigold({ size = 120 }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g>
        {petals.map((_, i) => {
          const angle = (i / petals.length) * 360;
          return (
            <motion.ellipse
              key={i}
              cx="50"
              cy="24"
              rx="7"
              ry="14"
              fill={i % 2 === 0 ? "#e8b84b" : "#d4a017"}
              stroke="#9b6a0a"
              strokeWidth="0.6"
              transform={`rotate(${angle} 50 50)`}
              variants={bloomStagger}
              custom={i}
            />
          );
        })}
        {petals.slice(0, 12).map((_, i) => {
          const angle = (i / 12) * 360 + 15;
          return (
            <motion.ellipse
              key={`in-${i}`}
              cx="50"
              cy="34"
              rx="6"
              ry="10"
              fill="#f2c94c"
              transform={`rotate(${angle} 50 50)`}
              variants={bloomStagger}
              custom={i + 6}
            />
          );
        })}
        <motion.circle cx="50" cy="50" r="9" fill="#c9962a" variants={bloomStagger} custom={18} />
        <motion.circle cx="50" cy="50" r="4" fill="#8a5a10" variants={bloomStagger} custom={19} />
      </g>
    </svg>
  );
}

function Lotus({ size = 120 }) {
  // Petals radiate upward from a base pivot at (50,66).
  const petal = (rot, d, fill, custom) => (
    <motion.path
      key={`${rot}-${custom}`}
      d={d}
      fill={fill}
      stroke="#7a1f1f"
      strokeWidth="0.5"
      transform={`rotate(${rot} 50 66)`}
      variants={bloomStagger}
      custom={custom}
    />
  );
  const outer = "M50 66 C30 46 30 22 50 6 C70 22 70 46 50 66 Z";
  const inner = "M50 66 C38 50 39 30 50 20 C61 30 62 50 50 66 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g>
        {/* base pad */}
        <motion.ellipse cx="50" cy="72" rx="34" ry="8" fill="#3f6f4a" opacity="0.55" variants={bloomStagger} custom={0} />
        {/* outer petals */}
        {[-72, -48, -24, 0, 24, 48, 72].map((r, i) =>
          petal(r, outer, i % 2 === 0 ? "#c85c6a" : "#d98b8b", i)
        )}
        {/* inner petals */}
        {[-46, -23, 0, 23, 46].map((r, i) => petal(r, inner, "#f0b6bd", i + 3))}
        {/* heart petals */}
        {[-20, 0, 20].map((r, i) => petal(r, "M50 66 C44 54 45 40 50 32 C55 40 56 54 50 66 Z", "#f6d7db", i + 6))}
        {/* center */}
        <motion.circle cx="50" cy="52" r="6" fill="#e8b84b" variants={bloomStagger} custom={10} />
        <motion.circle cx="50" cy="52" r="2.6" fill="#b9860f" variants={bloomStagger} custom={11} />
      </g>
    </svg>
  );
}

function Mogra({ size = 120 }) {
  // small jasmine cluster
  const flower = (cx, cy, s, delay) => (
    <motion.g key={`${cx}-${cy}`} variants={bloomStagger} custom={delay}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={cx}
          cy={cy - 9 * s}
          rx={4 * s}
          ry={7 * s}
          fill="#f7f0df"
          stroke="#d8c9a6"
          strokeWidth="0.4"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={3 * s} fill="#e8b84b" />
    </motion.g>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {flower(50, 46, 1, 0)}
      {flower(30, 62, 0.7, 1)}
      {flower(70, 62, 0.7, 2)}
      {flower(50, 74, 0.6, 3)}
    </svg>
  );
}

export function Flower({ type = "lotus", size = 120, animate = true }) {
  const Comp = type === "marigold" ? Marigold : type === "mogra" ? Mogra : Lotus;
  return (
    <motion.div
      initial={animate ? "hidden" : "show"}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
      style={{ lineHeight: 0 }}
    >
      <Comp size={size} />
    </motion.div>
  );
}

// Small static flower used in the rakhi ring / clusters
export function TinyFlower({ type = "lotus", size = 40 }) {
  const Comp = type === "marigold" ? Marigold : type === "mogra" ? Mogra : Lotus;
  return (
    <motion.div
      initial="show"
      animate="show"
      variants={{ show: {} }}
      style={{ lineHeight: 0 }}
    >
      <Comp size={size} />
    </motion.div>
  );
}
