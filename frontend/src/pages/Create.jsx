import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  Copy,
  Eye,
  Sparkles,
} from "lucide-react";
import { Flower } from "../components/Flowers";
import {
  DEFAULT_CONFIG,
  FLOWER_TYPES,
  THREAD_COLORS,
  THREAD_PALETTES,
  encodeConfig,
} from "../lib/config";

const STEPS = ["Names", "The bond", "Memories", "Closing", "Your link"];

export default function Create() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [cfg, setCfg] = useState({
    sister: "",
    sender: "",
    flower: "lotus",
    thread: "gold",
    distance: "nearby",
    year: new Date().getFullYear(),
    memories: ["", "", "", "", "", ""],
    closing: "",
  });

  const pal = THREAD_PALETTES[cfg.thread];
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));

  const setMemory = (i, v) =>
    setCfg((c) => ({ ...c, memories: c.memories.map((m, idx) => (idx === i ? v : m)) }));
  const addMemory = () =>
    cfg.memories.length < 8 && setCfg((c) => ({ ...c, memories: [...c.memories, ""] }));
  const removeMemory = (i) =>
    cfg.memories.length > 4 &&
    setCfg((c) => ({ ...c, memories: c.memories.filter((_, idx) => idx !== i) }));

  const finalCfg = {
    ...cfg,
    sister: cfg.sister.trim() || DEFAULT_CONFIG.sister,
    sender: cfg.sender.trim() || DEFAULT_CONFIG.sender,
    memories: cfg.memories.map((m) => m.trim()).filter(Boolean),
    closing: cfg.closing.trim() || DEFAULT_CONFIG.closing,
  };
  const shareUrl = `${window.location.origin}/?g=${encodeConfig(finalCfg)}`;

  const canNext = () => {
    if (step === 0) return cfg.sister.trim() && cfg.sender.trim();
    if (step === 2) return cfg.memories.filter((m) => m.trim()).length >= 1;
    if (step === 3) return cfg.closing.trim().length > 0;
    return true;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative room-bg min-h-screen flex flex-col items-center px-5 py-10">
      <div className="grain-overlay" />

      {/* header */}
      <div className="relative z-10 w-full max-w-2xl text-center mb-8">
        <div className="flex justify-center mb-4">
          <Flower type={cfg.flower} size={70} animate={false} />
        </div>
        <h1 className="font-title text-3xl md:text-4xl text-ivory">The Thread That Grew</h1>
        <p className="font-body text-ivory-muted mt-2 text-sm">
          A quiet, scroll-driven rakhi you can send to your sibling.
        </p>
      </div>

      {/* step indicator */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-body text-sm transition-colors duration-500"
              style={{
                background: i <= step ? pal.mid : "transparent",
                border: `1.5px solid ${i <= step ? pal.mid : "#4a3a2a"}`,
                color: i <= step ? "#1a0f0f" : "#a69b87",
              }}
            >
              {i < step ? <Check size={15} /> : i + 1}
            </div>
            <span className="font-body text-[10px] md:text-xs text-ivory-muted mt-2 hidden sm:block">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* card */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl p-6 md:p-10"
        style={{
          background: "rgba(26,15,15,0.7)",
          border: "1px solid rgba(212,160,23,0.22)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <StepTitle>Who is this thread for?</StepTitle>
                <Field label="Your sister's name">
                  <TextInput
                    testid="input-sister"
                    value={cfg.sister}
                    onChange={(e) => set("sister", e.target.value)}
                    placeholder="e.g. Rithi"
                  />
                </Field>
                <Field label="Your name">
                  <TextInput
                    testid="input-sender"
                    value={cfg.sender}
                    onChange={(e) => set("sender", e.target.value)}
                    placeholder="e.g. Rahul"
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <StepTitle>Shape the bond</StepTitle>
                <Field label="How far apart are you two?">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["nearby", "Nearby"],
                      ["far", "Far away"],
                    ].map(([val, label]) => (
                      <ChoiceButton
                        key={val}
                        testid={`distance-${val}`}
                        active={cfg.distance === val}
                        pal={pal}
                        onClick={() => set("distance", val)}
                      >
                        {label}
                      </ChoiceButton>
                    ))}
                  </div>
                </Field>

                <Field label="Flower that blooms along the thread">
                  <div className="grid grid-cols-3 gap-3">
                    {FLOWER_TYPES.map((f) => (
                      <ChoiceButton
                        key={f}
                        testid={`flower-${f}`}
                        active={cfg.flower === f}
                        pal={pal}
                        onClick={() => set("flower", f)}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Flower type={f} size={54} animate={false} />
                          <span className="capitalize text-sm">{f}</span>
                        </div>
                      </ChoiceButton>
                    ))}
                  </div>
                </Field>

                <Field label="Thread colour">
                  <div className="grid grid-cols-3 gap-3">
                    {THREAD_COLORS.map((t) => (
                      <ChoiceButton
                        key={t}
                        testid={`thread-${t}`}
                        active={cfg.thread === t}
                        pal={THREAD_PALETTES[t]}
                        onClick={() => set("thread", t)}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className="w-10 h-10 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${THREAD_PALETTES[t].from}, ${THREAD_PALETTES[t].to})`,
                            }}
                          />
                          <span className="capitalize text-sm">{t}</span>
                        </div>
                      </ChoiceButton>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <StepTitle>The memories that bloomed</StepTitle>
                <p className="font-body text-ivory-muted text-sm -mt-2">
                  One small, specific memory per bloom. Precise beats grand — a car ride, a
                  cover-up, an inside joke.
                </p>
                {cfg.memories.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="font-display text-sm mt-3 w-6 shrink-0"
                      style={{ color: pal.mid }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <textarea
                      data-testid={`memory-input-${i}`}
                      value={m}
                      maxLength={110}
                      onChange={(e) => setMemory(i, e.target.value)}
                      placeholder="For the time you…"
                      rows={2}
                      className="flex-1 resize-none rounded-lg bg-black/30 border border-[rgba(212,160,23,0.2)] focus:border-[var(--gold)] outline-none px-3 py-2 font-body text-ivory text-sm transition-colors"
                    />
                    {cfg.memories.length > 4 && (
                      <button
                        data-testid={`remove-memory-${i}`}
                        onClick={() => removeMemory(i)}
                        className="mt-2 text-ivory-muted hover:text-[var(--red)] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {cfg.memories.length < 8 && (
                  <button
                    data-testid="add-memory"
                    onClick={addMemory}
                    className="flex items-center gap-2 font-body text-sm text-[var(--gold)] hover:opacity-80 transition-opacity mt-2"
                  >
                    <Plus size={16} /> Add another bloom
                  </button>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <StepTitle>The closing note</StepTitle>
                <p className="font-body text-ivory-muted text-sm -mt-2">
                  The longer message revealed once she ties the final knot.
                </p>
                <textarea
                  data-testid="input-closing"
                  value={cfg.closing}
                  maxLength={420}
                  onChange={(e) => set("closing", e.target.value)}
                  rows={6}
                  placeholder="Say the thing you never say out loud…"
                  className="w-full resize-none rounded-lg bg-black/30 border border-[rgba(212,160,23,0.2)] focus:border-[var(--gold)] outline-none px-4 py-3 font-body text-ivory transition-colors"
                />
                <span className="font-body text-xs text-ivory-muted">
                  {cfg.closing.length}/420
                </span>
                <Field label="Year">
                  <TextInput
                    testid="input-year"
                    value={cfg.year}
                    onChange={(e) => set("year", e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                  />
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <Sparkles className="text-[var(--gold)]" size={40} />
                </div>
                <StepTitle center>Your thread is ready</StepTitle>
                <p className="font-body text-ivory-muted text-sm">
                  Share this link with {finalCfg.sister}. It opens the full experience — no login
                  needed.
                </p>
                <div
                  className="rounded-lg px-4 py-3 font-body text-sm text-ivory-soft break-all text-left"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,160,23,0.2)" }}
                  data-testid="share-url"
                >
                  {shareUrl}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <PrimaryButton testid="copy-link" pal={pal} onClick={copyLink}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy link"}
                  </PrimaryButton>
                  <a href={shareUrl} data-testid="preview-link">
                    <GhostButton>
                      <Eye size={16} /> Preview
                    </GhostButton>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* nav */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-10">
            <button
              data-testid="prev-step"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 font-body text-sm text-ivory-muted disabled:opacity-30 hover:text-ivory transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <PrimaryButton
              testid="next-step"
              pal={pal}
              disabled={!canNext()}
              onClick={() => canNext() && setStep((s) => s + 1)}
            >
              {step === 3 ? "Create link" : "Continue"} <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        )}
      </div>

      <a
        href="/"
        className="relative z-10 mt-8 font-body text-xs text-ivory-muted/60 hover:text-[var(--gold)] transition-colors underline underline-offset-4"
      >
        view the demo thread
      </a>
    </div>
  );
}

function StepTitle({ children, center }) {
  return (
    <h2 className={`font-title text-2xl md:text-3xl text-ivory ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="font-body text-sm text-ivory-soft">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, testid }) {
  return (
    <input
      data-testid={testid}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg bg-black/30 border border-[rgba(212,160,23,0.2)] focus:border-[var(--gold)] outline-none px-4 py-3 font-body text-ivory transition-colors"
    />
  );
}

function ChoiceButton({ children, active, onClick, pal, testid }) {
  return (
    <button
      data-testid={testid}
      onClick={onClick}
      className="rounded-xl px-4 py-3 font-body transition-all duration-300"
      style={{
        background: active ? "rgba(212,160,23,0.12)" : "rgba(0,0,0,0.25)",
        border: `1.5px solid ${active ? pal.mid : "rgba(212,160,23,0.15)"}`,
        color: "#f5ead6",
      }}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, disabled, pal, testid }) {
  return (
    <button
      data-testid={testid}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm transition-all duration-300 disabled:opacity-40 hover:brightness-110"
      style={{
        background: `linear-gradient(135deg, ${pal.from}, ${pal.to})`,
        color: "#1a0f0f",
        boxShadow: `0 6px 22px ${pal.glow}`,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm text-ivory border border-[rgba(212,160,23,0.3)] hover:bg-[rgba(212,160,23,0.1)] transition-colors duration-300 cursor-pointer">
      {children}
    </div>
  );
}
