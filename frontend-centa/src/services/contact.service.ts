import http from "./api";
import type {
  ContactMessage,
  ContactPayload,
} from "../types/contact";

export async function sendContactMessage(
  payload: ContactPayload
) {
  const response = await http.post(
    "/contact",
    payload
  );

  return response.data;
}

export async function getAllContactMessages() {
  const response = await http.get<{
    success: boolean;
    data: ContactMessage[];
  }>("/contact");

  return response.data;
}

export async function deleteContactMessage(
  id: number
) {
  const response = await http.delete(
    `/contact/${id}`
  );

  return response.data;
}