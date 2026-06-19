"use client"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/dashboard/glass-card"
import type { Activity } from "@/lib/dashboard-data"
import { motion } from "motion/react"

const activityIcons: Record<Activity["type"], string> = {
  task_completed: "✓",
  task_failed: "✗",
  task_created: "→",
  agent_activated: "●",
  agent_deactivated: "○",
  member_joined: "+",
}

const activityColors: Record<Activity["type"], string> = {
  task_completed: "text-white bg-white/10",
  task_failed: "text-red-400 bg-red-500/10",
  task_created: "text-white/70 bg-white/[0.06]",
  agent_activated: "text-white bg-white/10",
  agent_deactivated: "text-white/50 bg-white/[0.04]",
  member_joined: "text-white/70 bg-white/[0.06]",
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <GlassCard glow className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Activité récente</h3>
        <span className="text-xs text-white/40">Aujourd'hui</span>
      </div>

      <div className="flex flex-col gap-1">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.03]"
          >
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                activityColors[activity.type]
              )}
            >
              {activityIcons[activity.type]}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-sm text-white/80 truncate">
                {activity.message}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{activity.user.name}</span>
                <span className="size-1 rounded-full bg-white/20" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}
