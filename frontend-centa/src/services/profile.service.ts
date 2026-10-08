import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (
  name: string,
  email: string
) => {
  const response = await api.patch(
    "/profile",
    {
      name,
      email,
    }
  );

  return response.data;
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await api.patch(
    "/profile/password",
    {
      currentPassword,
      newPassword,
    }
  );

  return response.data;
};

export const uploadAvatar = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.post(
    "/profile/avatar",
    formData
  );

  return response.data;
};