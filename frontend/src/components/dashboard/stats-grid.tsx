import { HugeiconsIcon } from "@hugeicons/react"
import {
  TaskIcon,
  AiBrainIcon,
  CreditCardIcon,
  ClockIcon,
} from "@hugeicons/core-free-icons"
import { StatCard } from "@/components/dashboard/stat-card"
import type { DashboardStats } from "@/lib/dashboard-data"

interface StatsGridProps {
  stats: DashboardStats
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Tâches exécutées"
        value={stats.totalTasks}
        change={stats.tasksChange}
        icon={<HugeiconsIcon icon={TaskIcon} size={14} />}
      />
      <StatCard
        label="Agents actifs"
        value={`${stats.activeAgents}/${stats.totalAgents}`}
        change={60}
        icon={<HugeiconsIcon icon={AiBrainIcon} size={14} />}
      />
      <StatCard
        label="Crédits consommés"
        value={stats.creditsUsed}
        change={stats.creditsChange}
        icon={<HugeiconsIcon icon={CreditCardIcon} size={14} />}
      />
      <StatCard
        label="Temps moyen"
        value={stats.avgTime}
        change={stats.avgTimeChange}
        icon={<HugeiconsIcon icon={ClockIcon} size={14} />}
        format="time"
        accent
      />
    </div>
  )
}
