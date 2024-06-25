import { baseAxios, SERVER_URL } from "@/utils/axios";

export const addRestaurant = async (finalisedData: any) => {
  const formData = new FormData();

  for (const key in finalisedData) {
    if (finalisedData.hasOwnProperty(key)) {
      if (key === "tags") {
        finalisedData.tags.forEach((tag: any, index: any) =>
          formData.append(`tags[${index}]`, tag)
        );
      } else {
        formData.append(key, finalisedData[key]);
      }
    }
  }

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const response = await baseAxios.post(
    `${SERVER_URL}/api/restaurants/add-restaurant`,
    formData,
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};
