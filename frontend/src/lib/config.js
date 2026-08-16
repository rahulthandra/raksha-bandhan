// Default content + URL encode/decode helpers for "The Thread That Grew"

export const FLOWER_TYPES = ["marigold", "mogra", "lotus"];
export const THREAD_COLORS = ["gold", "red", "maroon"];

export const THREAD_PALETTES = {
  gold: { from: "#f2d27a", mid: "#e8b84b", to: "#b9860f", glow: "rgba(232,184,75,0.55)" },
  red: { from: "#e07a6a", mid: "#c0392b", to: "#7a1f1f", glow: "rgba(192,57,43,0.55)" },
  maroon: { from: "#b3564a", mid: "#8f2b28", to: "#4d1212", glow: "rgba(143,43,40,0.55)" },
};

export const DEFAULT_CONFIG = {
  sister: "Rithi",
  sender: "Rahul",
  flower: "lotus",
  thread: "gold",
  distance: "nearby",
  year: 2026,
  memories: [
    "For the times you covered for me — telling them I was studying when I'd really slipped out to catch a movie.",
    "For splitting the last piece so neither of us had to admit we wanted it.",
    "For the fight neither of us apologised for, and the way you called anyway.",
    "For sitting outside my door the night I said I wanted to be left alone.",
    "For laughing at the joke only the two of us still remember.",
    "For being the reason I was never quite as lost as I felt.",
  ],
  closing:
    "Thank you for being there even when I couldn't be there for myself. I know I've been rude — that's just the sibling in me — and I'm no good at saying any of this out loud. But I love you so much, my sister.",
};

export function encodeConfig(cfg) {
  try {
    const json = JSON.stringify(cfg);
    return btoa(encodeURIComponent(json));
  } catch (e) {
    return "";
  }
}

export function decodeConfig(str) {
  try {
    return JSON.parse(decodeURIComponent(atob(str)));
  } catch (e) {
    return null;
  }
}

export function getConfigFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const g = params.get("g");
  if (!g) return { ...DEFAULT_CONFIG };
  const decoded = decodeConfig(g);
  if (!decoded) return { ...DEFAULT_CONFIG };
  return { ...DEFAULT_CONFIG, ...decoded };
}
