"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          let start = 0;
          const duration = 1500;
          const step = Math.max(1, Math.ceil(value / (duration / 16)));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else { setCount(start); }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
}

function AnimatedBar({ height, delay = 0 }: { height: number; delay?: number }) {
  return (
    <motion.div
      className="w-full rounded-sm bg-foreground/20"
      style={{ height: `${height}%`, transformOrigin: "bottom" }}
      animate={{ scaleY: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function ActivityFeed({ items, delay = 0 }: { items: { text: string; time: string; done: boolean }[]; delay?: number }) {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-3 py-2"
        >
          <span className={`size-1.5 rounded-full ${item.done ? "bg-white/40" : "bg-foreground/60 animate-pulse"}`} />
          <span className="flex-1 text-[11px] text-foreground/70">{item.text}</span>
          <span className="text-[10px] text-muted-foreground">{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroMockup() {
  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/80 shadow-2xl shadow-black/[0.15] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-5 py-3">
          <span className="size-2.5 rounded-full bg-red-500/50" />
          <span className="size-2.5 rounded-full bg-yellow-500/50" />
          <span className="size-2.5 rounded-full bg-green-500/50" />
          <div className="ml-4 flex gap-1">
            <span className="h-2 w-16 rounded bg-white/8" />
            <span className="h-2 w-8 rounded bg-white/5" />
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr]">
          <div className="border-r border-white/[0.06] p-4">
            <div className="mb-6 flex items-center gap-2">
              <div className="size-5 rounded-lg bg-white/10" />
              <span className="h-2.5 w-14 rounded bg-white/8" />
            </div>
            {["Agents", "Tâches", "Analytics", "Paramètres"].map((label, i) => (
              <div key={label} className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 ${i === 0 ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}>
                <span className={`size-1 rounded-full ${i === 0 ? "bg-foreground/80" : "bg-white/20"}`} />
                <span className={`text-xs ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            ))}
            <div className="mt-6 border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="size-5 rounded-full bg-white/10" />
                <span className="text-xs text-muted-foreground">Alex K.</span>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-foreground/80">Agents actifs</span>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground tracking-tight">
                    <AnimatedNumber value={4} />
                  </span>
                  <span className="text-[10px] text-muted-foreground">/ 10</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1">
                <span className="size-1.5 rounded-full bg-green-500/70 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">En ligne</span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { name: "Marketing", status: "running", count: "12" },
                { name: "Finance", status: "running", count: "8" },
                { name: "Support", status: "idle", count: "3" },
              ].map((a) => (
                <div key={a.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${a.status === "running" ? "bg-green-500/70" : "bg-yellow-500/70"}`} />
                    <span className="text-[10px] text-muted-foreground">{a.name}</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="text-sm font-bold text-foreground tracking-tight">{a.count}</span>
                    <span className="text-[10px] text-muted-foreground">tâches</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-foreground/80">Exécutions (7j)</span>
                <span className="text-[10px] text-muted-foreground">+23%</span>
              </div>
              <div className="flex items-end gap-1.5" style={{ height: 40 }}>
                {[35, 60, 45, 80, 55, 70, 90].map((v, i) => (
                  <div key={i} className="flex-1">
                    <AnimatedBar height={v} delay={i * 0.1} />
                  </div>
                ))}
              </div>
            </div>

            <ActivityFeed
              items={[
                { text: "Rapport mensuel généré", time: "2 min", done: true },
                { text: "Campagne email envoyée", time: "15 min", done: true },
                { text: "Analyse des anomalies...", time: "en cours", done: false },
              ]}
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
