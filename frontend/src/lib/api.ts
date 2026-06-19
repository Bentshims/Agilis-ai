const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.message || data.error || "Une erreur est survenue";
    throw new ApiError(
      Array.isArray(message) ? message[0] : message,
      res.status
    );
  }

  return data as T;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  stripeCustomerId?: string;
  createdAt: string;
  members?: Array<{
    role: string;
    workspace: {
      id: string;
      name: string;
      slug: string;
      logo?: string;
    };
  }>;
}

export interface AuthResponse {
  user: User;
}

export const api = {
  signup(data: { email: string; password: string; name?: string }) {
    return request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signin(data: { email: string; password: string }) {
    return request<AuthResponse>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signout() {
    return request<{ message: string }>("/api/auth/signout", {
      method: "POST",
    });
  },

  refresh() {
    return request<{ message: string }>("/api/auth/refresh", {
      method: "POST",
    });
  },

  getMe() {
    return request<User>("/api/auth/me");
  },

  updateWorkspace(id: string, data: { name?: string; description?: string }) {
    return request<{ id: string; name: string; slug: string }>(`/api/workspaces/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  inviteMember(workspaceId: string, email: string) {
    return request<{ id: string }>(`/api/workspaces/${workspaceId}/invitations`, {
      method: "POST",
      body: JSON.stringify({ email, role: "MEMBER" }),
    });
  },
};

export { ApiError };
