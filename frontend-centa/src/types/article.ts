export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  category: Category;
  author: Author;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetArticlesResponse {
  status: string;
  data: Article[];
  pagination: Pagination;
}

export interface GetArticleResponse {
  status: string;
  data: Article;
}

export interface CreateArticleDto {
  title: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  categoryId: string;
}

export interface UpdateArticleDto {
  title: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  categoryId: string;
}

export interface ArticleQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: "DRAFT" | "PUBLISHED";
  categoryId?: string;
  sortBy?: "title" | "createdAt" | "updatedAt" | "publishedAt";
  sortOrder?: "asc" | "desc";
}