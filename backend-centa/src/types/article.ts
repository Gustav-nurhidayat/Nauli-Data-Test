import { ArticleStatus } from "@prisma/client";

export interface CreateArticleDto {
  title: string;
  content: string;

  categoryId: string;

  excerpt?: string;
  thumbnail?: string;
}

export interface UpdateArticleDto {
  title: string;
  content: string;

  categoryId: string;

  excerpt?: string;
  thumbnail?: string;
}

export interface ArticleQueryDto {
  page?: number;
  limit?: number;

  search?: string;

  categoryId?: string;

  status?: ArticleStatus;

  sortBy?:
    | "title"
    | "createdAt"
    | "updatedAt"
    | "publishedAt";

  sortOrder?: "asc" | "desc";
}