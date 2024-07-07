import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function getRestaurantWithAllRestaurantItems(requestObj: any) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/restaurants/get-restaurant-with-restaurant-items`,
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
