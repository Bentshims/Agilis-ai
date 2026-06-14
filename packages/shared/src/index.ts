export type AgentType = 'marketing' | 'finance' | 'custom';

export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  provider: string;
  model: string;
  systemPrompt: string;
  tools: string[];
}

export interface Task {
  id: string;
  agentId: string;
  userId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  stripeCustomerId?: string;
  subscriptionStatus?: 'active' | 'inactive' | 'canceled';
}
