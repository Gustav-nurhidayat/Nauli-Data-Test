export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}