import { baseAxios, SERVER_URL } from "@/utils/axios";

export const updateOrder = async (updateData: any) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await baseAxios.post(
    `${SERVER_URL}/api/orders/update-order`,
    updateData,
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};
