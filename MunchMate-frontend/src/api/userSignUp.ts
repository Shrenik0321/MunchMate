import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function userSignUp(requestObject: any) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/auth/sign-up`,
      requestObject,
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
