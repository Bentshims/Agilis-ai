"use client"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/dashboard/glass-card"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { AiBrainIcon } from "@hugeicons/core-free-icons"
import type { AgentSummary } from "@/lib/dashboard-data"
import { motion } from "motion/react"

const statusConfig = {
  active: { label: "Actif", class: "bg-emerald/10 text-emerald border-emerald/20" },
  idle: { label: "Inactif", class: "bg-foreground/[0.04] text-muted-foreground border-foreground/10" },
  error: { label: "Erreur", class: "bg-red-500/10 text-red-400 border-red-500/20" },
}

interface AgentsOverviewProps {
  agents: AgentSummary[]
}

export function AgentsOverview({ agents }: AgentsOverviewProps) {
  return (
    <GlassCard glow className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground/90">Agents</h3>
        <span className="text-xs text-muted-foreground">
          {agents.filter((a) => a.status === "active").length} actifs
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {agents.map((agent, i) => {
          const status = statusConfig[agent.status]
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="group flex items-center gap-3 rounded-xl border border-foreground/[0.04] bg-foreground/[0.02] p-3 transition-all hover:border-foreground/[0.08] hover:bg-foreground/[0.04]"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-foreground/10 text-foreground/60">
                <HugeiconsIcon icon={AiBrainIcon} size={18} />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground/90">{agent.name}</span>
                  <Badge
                    variant="outline"
                    className={cn("h-5 px-1.5 text-[10px] font-medium border", status.class)}
                  >
                    {status.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{agent.tasksToday} tâches aujourd'hui</span>
                  {agent.successRate > 0 && (
                    <>
                      <span className="size-1 rounded-full bg-foreground/20" />
                      <span className="text-foreground/60">{agent.successRate}% succès</span>
                    </>
                  )}
                </div>
              </div>

              <div className="hidden text-right text-[10px] text-muted-foreground/70 md:block">
                {agent.lastRun}
              </div>
            </motion.div>
          )
        })}
      </div>
    </GlassCard>
  )
}
