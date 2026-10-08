import http from "./api";

import type {
  GetArticlesResponse,
  GetArticleResponse,
  CreateArticleDto,
  UpdateArticleDto,
  ArticleQuery,
} from "../types/article";

export const getArticles = async (params?: ArticleQuery) => {
  const { data } = await http.get<GetArticlesResponse>(
    "/articles",
    {
      params,
    }
  );

  return data;
};

export const getArticleById = async (id: string) => {
  const { data } = await http.get<GetArticleResponse>(
    `/articles/${id}`
  );

  return data;
};

export const createArticle = async (
  body: CreateArticleDto
) => {
  const { data } = await http.post(
    "/articles",
    body
  );

  return data;
};

export const updateArticle = async (
  id: string,
  body: UpdateArticleDto
) => {
  const { data } = await http.put(
    `/articles/${id}`,
    body
  );

  return data;
};

export const deleteArticle = async (id: string) => {
  const { data } = await http.delete(
    `/articles/${id}`
  );

  return data;
};

export const publishArticle = async (
  id: string
) => {
  const { data } = await http.patch(
    `/articles/${id}/publish`
  );

  return data;
};

export const draftArticle = async (
  id: string
) => {
  const { data } = await http.patch(
    `/articles/${id}/draft`
  );

  return data;
};