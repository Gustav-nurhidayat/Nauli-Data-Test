export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPayload {
  name: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetCategoriesResponse {
  status: string;
  data: Category[];
  pagination: Pagination;
}

export interface GetCategoryResponse {
  status: string;
  data: Category;
}

export interface CategoryQuery {
  page?: number;
  limit?: number;
  search?: string;
}