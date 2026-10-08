import http from "./api";

import type {
  LoginPayload,
  AuthResponse,
  ProfileResponse,
} from "../types/auth";

export async function login(
  payload: LoginPayload
): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return data;
}

export async function verifyMfa(payload: {
  userId: string;
  email: string;
  role: string;
  code: string;
}) {
  const { data } = await http.post(
    "/verify-mfa",
    payload
  );

  return data;
}

export async function getProfile(): Promise<ProfileResponse> {
  const { data } = await http.get<ProfileResponse>(
    "/auth/profile"
  );

  return data;
}

export function logout(): void {
  localStorage.removeItem("user");
  sessionStorage.removeItem("mfaUser");
}