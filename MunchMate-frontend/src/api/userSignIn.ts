import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function userSignIn(requestObject: any) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/auth/sign-in`,
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
