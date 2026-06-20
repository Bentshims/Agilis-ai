"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  accent?: boolean
  as?: "div" | "section"
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
  accent = false,
  as: Comp = "div",
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Comp
        className={cn(
          "relative rounded-2xl border border-border/50 bg-card/30 p-5 backdrop-blur-xl",
          glow && "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(circle_at_50%_0%,oklch(0.5_0_0/0.04),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]",
          hover && "transition-all duration-300 hover:border-border hover:bg-card/50",
          accent && "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(circle_at_50%_0%,oklch(0.7_0.2_160/0.06),transparent_70%)]",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  )
}
