import { baseAxios, SERVER_URL } from "@/utils/axios";

export const updateUser = async (updateData: any) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await baseAxios.post(
    `${SERVER_URL}/api/auth/update-user`,
    updateData,
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};
