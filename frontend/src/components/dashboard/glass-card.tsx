"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  as?: "div" | "section"
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
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
          "relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl shadow-xl shadow-black/20",
          glow && "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]",
          hover && "transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.05] hover:shadow-xl",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  )
}
