export type Role =
  | "SUPER_ADMIN"
  | "ADMIN";


export interface User {

  id: string;

  name: string;

  email: string;

  role: Role;

  createdAt: string;

  updatedAt: string;

}


export interface UserPayload {

  name: string;

  email: string;

  password?: string;

  role?: Role;

}


export interface Pagination {

  total: number;

  page: number;

  limit: number;

  totalPages: number;

}


export interface GetUsersResponse {

  status?: string;

  success?: boolean;

  data: User[];

  pagination: Pagination;

}


export interface UserQuery {

  page?: number;

  limit?: number;

  search?: string;

}