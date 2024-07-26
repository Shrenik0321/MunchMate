import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function getRecentSales() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.get(
      `${SERVER_URL}/api/analytics/get-recent-sales`,
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
