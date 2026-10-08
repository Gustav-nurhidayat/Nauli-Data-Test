import http from "./api";

export interface UploadResponse {
  status: string;
  message: string;
  data: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
  };
}

export const uploadImage = async (
  file: File
): Promise<UploadResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await http.post<UploadResponse>(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};