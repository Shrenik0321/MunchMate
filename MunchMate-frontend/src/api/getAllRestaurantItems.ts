import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function getAllRestaurantItems() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/restaurant-items/get-restaurant-items`,
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
