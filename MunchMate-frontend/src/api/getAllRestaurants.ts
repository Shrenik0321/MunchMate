import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function getAllRestaurants() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/restaurants/get-restaurants`,
      {},
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
