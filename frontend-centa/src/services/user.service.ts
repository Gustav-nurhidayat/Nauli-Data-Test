import http from "./api";

import type {
  User,
  UserPayload,
  GetUsersResponse,
  UserQuery,
} from "../types/user";



export async function getUsers(
  params?: UserQuery
) {

  const response =
    await http.get<GetUsersResponse>(
      "/users",
      {
        params,
      }
    );


  return response.data;

}



export async function getUserById(
  id: string
) {

  const response =
    await http.get<{
      success: boolean;
      data: User;
    }>(
      `/users/${id}`
    );


  return response.data.data;

}



export async function createUser(
  payload: UserPayload
) {

  const response =
    await http.post(
      "/users",
      payload
    );


  return response.data;

}



export async function updateUser(
  id: string,
  payload: UserPayload
) {

  const response =
    await http.put(
      `/users/${id}`,
      payload
    );


  return response.data;

}



export async function deleteUser(
  id: string
) {

  const response =
    await http.delete(
      `/users/${id}`
    );


  return response.data;

}