export interface Service {

  id: string;

  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  icon?: string | null;

  thumbnail?: string | null;

  order: number;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;

}



export interface ServicePayload {

  title: string;

  shortDescription: string;

  description: string;

  icon?: string;

  thumbnail?: string;

  order?: number;

  isActive?: boolean;

}



export interface Pagination {

  total: number;

  page: number;

  limit: number;

  totalPages: number;

}



export interface GetServicesResponse {

  status: string;

  data: Service[];

  pagination: Pagination;

}



export interface ServiceQuery {

  page?: number;

  limit?: number;

  search?: string;

  isActive?: boolean;

  sortBy?:
    | "title"
    | "order"
    | "createdAt";

  sortOrder?:
    | "asc"
    | "desc";

}