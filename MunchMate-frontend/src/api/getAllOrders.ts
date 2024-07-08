import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function getAllOrders(requestObj: any) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/orders/get-orders`,
      requestObj,
      {
        headers: headers,
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
