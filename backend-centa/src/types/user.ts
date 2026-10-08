export type UserRole =
  | "ADMIN"
  | "SUPER_ADMIN";


export interface User {

  id: string;

  name: string;

  email: string;

  role: UserRole;

  createdAt: string;

  updatedAt: string;

}


export interface UserPayload {

  name: string;

  email: string;

  password?: string;

  role: UserRole;

}


export interface Pagination {

  total: number;

  page: number;

  limit: number;

  totalPages: number;

}


export interface GetUsersResponse {

  success: boolean;

  data: User[];

  pagination: Pagination;

}


export interface UserQuery {

  page?: number;

  limit?: number;

  search?: string;

}