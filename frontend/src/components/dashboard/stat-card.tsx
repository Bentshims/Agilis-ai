"use client"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/dashboard/glass-card"
import { motion } from "motion/react"

interface StatCardProps {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
  format?: "percent" | "time"
}

export function StatCard({ label, value, change, icon, format }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <GlassCard glow hover className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
          {label}
        </span>
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/60">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white">
          {value}
        </span>
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isPositive ? "text-white/60" : "text-red-400"
          )}
        >
          <svg
            className={cn("size-3", !isPositive && "rotate-180")}
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              d="M5 6L0 0h10L5 6z"
              fill="currentColor"
            />
          </svg>
          {Math.abs(change)}%
        </motion.span>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.abs(change) * 4, 100)}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            isPositive ? "bg-gradient-to-r from-white/30 to-white/10" : "bg-gradient-to-r from-red-500 to-rose-400"
          )}
        />
      </div>
    </GlassCard>
  )
}
