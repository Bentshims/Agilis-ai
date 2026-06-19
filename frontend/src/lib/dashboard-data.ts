export interface DashboardStats {
  totalTasks: number
  tasksChange: number
  activeAgents: number
  totalAgents: number
  creditsUsed: number
  creditsChange: number
  avgTime: string
  avgTimeChange: number
}

export interface TaskChartData {
  date: string
  completed: number
  failed: number
}

export interface Activity {
  id: string
  type: "task_completed" | "task_failed" | "agent_activated" | "agent_deactivated" | "member_joined" | "task_created"
  message: string
  timestamp: string
  user: {
    name: string
    image?: string
  }
}

export interface AgentSummary {
  id: string
  name: string
  type: string
  status: "active" | "idle" | "error"
  tasksToday: number
  successRate: number
  lastRun: string
}

export const mockStats: DashboardStats = {
  totalTasks: 248,
  tasksChange: 12.5,
  activeAgents: 3,
  totalAgents: 5,
  creditsUsed: 1240,
  creditsChange: 8.2,
  avgTime: "3.2s",
  avgTimeChange: -5.1,
}

export const mockChartData: TaskChartData[] = [
  { date: "Lun", completed: 18, failed: 2 },
  { date: "Mar", completed: 24, failed: 1 },
  { date: "Mer", completed: 15, failed: 3 },
  { date: "Jeu", completed: 30, failed: 0 },
  { date: "Ven", completed: 22, failed: 2 },
  { date: "Sam", completed: 12, failed: 1 },
  { date: "Dim", completed: 8, failed: 0 },
]

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "task_completed",
    message: "Article blog 'Tendances IA 2026' généré",
    timestamp: "Il y a 5 min",
    user: { name: "Agent Marketing" },
  },
  {
    id: "2",
    type: "task_created",
    message: "Analyse financière Q2 lancée",
    timestamp: "Il y a 18 min",
    user: { name: "Sophie Martin", image: "/avatar-placeholder.svg" },
  },
  {
    id: "3",
    type: "agent_activated",
    message: "Agent Finance activé sur l'espace de travail",
    timestamp: "Il y a 1h",
    user: { name: "Thomas Dubois", image: "/avatar-placeholder.svg" },
  },
  {
    id: "4",
    type: "task_completed",
    message: "Post LinkedIn 'Innovation produit' publié",
    timestamp: "Il y a 2h",
    user: { name: "Agent Marketing" },
  },
  {
    id: "5",
    type: "member_joined",
    message: "Lucas Bernard a rejoint l'organisation",
    timestamp: "Il y a 3h",
    user: { name: "Lucas Bernard", image: "/avatar-placeholder.svg" },
  },
  {
    id: "6",
    type: "task_failed",
    message: "Analyse de tendances - limite API atteinte",
    timestamp: "Il y a 4h",
    user: { name: "Agent Marketing" },
  },
]

export const mockAgents: AgentSummary[] = [
  {
    id: "1",
    name: "Agent Marketing",
    type: "MARKETING",
    status: "active",
    tasksToday: 18,
    successRate: 94,
    lastRun: "Il y a 2 min",
  },
  {
    id: "2",
    name: "Agent Finance",
    type: "FINANCE",
    status: "active",
    tasksToday: 7,
    successRate: 100,
    lastRun: "Il y a 15 min",
  },
  {
    id: "3",
    name: "Agent Support",
    type: "CUSTOM",
    status: "idle",
    tasksToday: 0,
    successRate: 0,
    lastRun: "Hier",
  },
]
