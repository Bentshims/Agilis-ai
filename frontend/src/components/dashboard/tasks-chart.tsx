"use client"

import { GlassCard } from "@/components/dashboard/glass-card"
import type { TaskChartData } from "@/lib/dashboard-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface TasksChartProps {
  data: TaskChartData[]
}

export function TasksChart({ data }: TasksChartProps) {
  return (
    <GlassCard glow className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground/90">
          Tâches sur 7 jours
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald" />
            <span className="text-xs text-muted-foreground">Succès</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="text-xs text-muted-foreground">Échec</span>
          </div>
        </div>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.7 0.2 160)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.7 0.2 160)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.5 0 0)" stopOpacity={0.1} />
                <stop offset="100%" stopColor="oklch(0.5 0 0)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.5 0 0 / 0.5)", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.5 0 0 / 0.5)", fontSize: 11 }}
              dx={-4}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.15 0 0 / 0.95)",
                border: "1px solid oklch(0.5 0 0 / 0.15)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                fontSize: "12px",
              }}
              itemStyle={{ color: "oklch(0.9 0 0 / 0.9)" }}
              labelStyle={{ color: "oklch(0.6 0 0 / 0.7)" }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="oklch(0.7 0.2 160)"
              strokeWidth={2}
              strokeOpacity={0.8}
              fill="url(#completedGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "oklch(0.7 0.2 160)", strokeWidth: 0, strokeOpacity: 0.8 }}
            />
            <Area
              type="monotone"
              dataKey="failed"
              stroke="oklch(0.5 0 0)"
              strokeWidth={1.5}
              strokeOpacity={0.15}
              fill="url(#failedGradient)"
              dot={false}
              activeDot={{ r: 3, fill: "oklch(0.5 0 0)", strokeWidth: 0, strokeOpacity: 0.3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
