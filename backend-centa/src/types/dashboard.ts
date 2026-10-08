export interface DashboardStatistics {
  totalUsers: number;
  totalContacts: number;

  totalCategories: number;
  totalArticles: number;

  publishedArticles: number;
  draftArticles: number;

  totalServices: number;
}

export interface LatestContact {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  createdAt: string;
}

export interface DashboardData {
  statistics: DashboardStatistics;
  latestContacts: LatestContact[];
}

export interface DashboardResponse {
  status: "success";
  message: string;
  data: DashboardData;
}