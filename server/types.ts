// Server-only types for HD-CRM

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export type ClientStatus = "active" | "new" | "overdue";

export interface Client {
  id: string;
  name: string;
  status: ClientStatus;
  balance: number;
  lastContact: string; // ISO 8601 date
  phone: string;
}

export interface PaymentCommitment {
  id: string;
  clientId: string;
  amount: number;
  dueDate: string; // ISO 8601 date
  correlationId: string;
  createdAt: string; // ISO 8601 timestamp
}
