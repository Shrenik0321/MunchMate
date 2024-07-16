import { baseAxios, SERVER_URL } from "@/utils/axios";

export const createOrder = async (orderData: any) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await baseAxios.post(
    `${SERVER_URL}/api/orders/add-order`,
    orderData,
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};
