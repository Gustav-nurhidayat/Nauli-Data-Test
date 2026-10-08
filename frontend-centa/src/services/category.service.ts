import http from "./api";

import type {
  CategoryPayload,
  GetCategoriesResponse,
  GetCategoryResponse,
  CategoryQuery,
} from "../types/category";



export const getCategories = async (
  params?: CategoryQuery
) => {
  const { data } = await http.get<GetCategoriesResponse>(
    "/categories",
    {
      params,
    }
  );

  return data;
};

export const getAllCategories = async () => {
  const { data } = await http.get<GetCategoriesResponse>(
    "/categories",
    {
      params: {
        page: 1,
        limit: 1000,
      },
    }
  );

  return data.data;
};

export const getCategoryById = async (
  id: string
) => {
  const { data } =
    await http.get<GetCategoryResponse>(
      `/categories/${id}`
    );

  return data;
};

export const createCategory = async (
  payload: CategoryPayload
) => {
  const { data } = await http.post(
    "/categories",
    payload
  );

  return data;
};

export const updateCategory = async (
  id: string,
  payload: CategoryPayload
) => {
  const { data } = await http.put(
    `/categories/${id}`,
    payload
  );

  return data;
};

export const deleteCategory = async (
  id: string
) => {
  const { data } = await http.delete(
    `/categories/${id}`
  );

  return data;
};