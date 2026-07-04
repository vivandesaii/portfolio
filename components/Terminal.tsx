"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { runCommand } from "@/lib/commands";
import { LINKS } from "@/lib/content";

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

interface Line {
  id: number;
  text: string;
  tone: "normal" | "accent" | "error" | "muted" | "echo";
}

const toneClass: Record<Line["tone"], string> = {
  normal: "text-fg/90",
  accent: "text-accent",
  error: "text-error",
  muted: "text-muted",
  echo: "text-muted",
};

let nextId = 0;

export default function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const raw = input;
    setInput("");
    setHistIdx(-1);
    if (raw.trim()) setHistory((h) => [raw.trim(), ...h]);

    const result = runCommand(raw);
    const newLines: Line[] = [
      { id: nextId++, text: `❯ ${raw}`, tone: "echo" as const },
      ...result.lines.map((l) => ({
        id: nextId++,
        text: l.text,
        tone: (l.tone ?? "normal") as Line["tone"],
      })),
    ];

    if (result.action?.type === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev.slice(-60), ...newLines]);

    if (result.action?.type === "scroll") {
      document
        .getElementById(result.action.target)
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (result.action?.type === "open") {
      window.open(result.action.url, "_blank");
    } else if (result.action?.type === "now-playing") {
      fetchNowPlaying();
    }
  };

  const append = (items: { text: string; tone: Line["tone"] }[]) =>
    setLines((prev) => [
      ...prev.slice(-60),
      ...items.map((l) => ({ id: nextId++, ...l })),
    ]);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/now-playing");
      const data = await res.json();
      if (data.configured && data.title) {
        const bar =
          data.isPlaying && data.progressMs && data.durationMs
            ? (() => {
                const filled = Math.round((data.progressMs / data.durationMs) * 16);
                return `  ▶ ${"━".repeat(filled)}●${"─".repeat(16 - filled)}  ${fmt(
                  data.progressMs
                )} / ${fmt(data.durationMs)}`;
              })()
            : null;
        append([
          {
            text: data.isPlaying ? "♫ now playing" : "♫ last played",
            tone: "muted",
          },
          { text: `  ${data.title} — ${data.artist}`, tone: "accent" },
          ...(bar ? [{ text: bar, tone: "normal" as Line["tone"] }] : []),
        ]);
        if (data.url) window.open(data.url, "_blank");
        return;
      }
      throw new Error("not configured");
    } catch {
      append([
        { text: "♫ on repeat since 2022", tone: "muted" },
        { text: "  WAIT FOR U — Future ft. Drake & Tems", tone: "accent" },
        { text: "  ▶ ━━━━━━━━●───────  2:07 / 3:09", tone: "normal" },
      ]);
      window.open(LINKS.song, "_blank");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      if (history[idx]) {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = histIdx - 1;
      setHistIdx(idx);
      setInput(idx >= 0 ? history[idx] : "");
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-fg/10 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AnimatePresence>
          {lines.length > 0 && (
            <motion.div
              ref={outputRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="max-h-48 overflow-y-auto py-2 text-xs sm:text-sm"
              aria-live="polite"
            >
              {lines.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className={`whitespace-pre-wrap ${toneClass[l.tone]}`}
                >
                  {l.text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="flex items-center gap-2 py-2.5"
          onClick={() => inputRef.current?.focus()}
        >
          <span className="select-none text-accent" aria-hidden>
            ❯
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command input. Type help and press enter for available commands."
            placeholder="type 'help' for commands"
            spellCheck={false}
            autoComplete="off"
            className="w-full bg-transparent text-sm text-fg placeholder:text-muted/50 focus:outline-none caret-accent"
          />
          <span
            className="cursor-blink h-4 w-px shrink-0 bg-accent/70 sm:h-4"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
