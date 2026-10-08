import api from "./api";

import type {
  GetUsersResponse,
  UserQuery,
} from "../types/user";

export const getUsers = async (
  params: UserQuery = {}
): Promise<GetUsersResponse> => {
  const response = await api.get("/users", {
    params,
  });

  return response.data;
};
