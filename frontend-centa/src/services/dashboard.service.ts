import http from "./api";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard =
  async (): Promise<DashboardResponse> => {
    const { data } =
      await http.get<DashboardResponse>(
        "/dashboard"
      );

    return data;
  };

export interface DashboardXssResponse {
  status: string;
  data: {
    xssPayload: string;
  };
}

export const getDashboardXss =
  async (): Promise<DashboardXssResponse> => {
    const { data } =
      await http.get<DashboardXssResponse>(
        "/dashboard/xss"
      );

    return data;
  };