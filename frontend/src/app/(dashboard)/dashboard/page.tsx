import { StatsGrid } from "@/components/dashboard/stats-grid"
import { TasksChart } from "@/components/dashboard/tasks-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { AgentsOverview } from "@/components/dashboard/agents-overview"
import { mockStats, mockChartData, mockActivities, mockAgents } from "@/lib/dashboard-data"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Tableau de bord
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Vue d'ensemble de votre activité Agilis
        </p>
      </div>

      <StatsGrid stats={mockStats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TasksChart data={mockChartData} />
        </div>
        <ActivityFeed activities={mockActivities} />
      </div>

      <AgentsOverview agents={mockAgents} />
    </div>
  )
}
