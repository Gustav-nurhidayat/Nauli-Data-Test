export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  avatar?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginData {
  user: AuthUser;
  mfaRequired: boolean;
  preMfaSession?: string;
}

export interface AuthResponse {
  status: "success" | "error";
  message: string;
  data: LoginData;
}

export interface ProfileResponse {
  status: "success" | "error";
  data: AuthUser;
}