import { baseAxios, SERVER_URL } from "@/utils/axios";

export const updateRestaurant = async (updateData: any) => {
  const formData = new FormData();

  for (const key in updateData) {
    if (updateData.hasOwnProperty(key)) {
      if (key === "tags") {
        updateData.tags.forEach((tag: any, index: any) =>
          formData.append(`tags[${index}]`, tag)
        );
      } else {
        formData.append(key, updateData[key]);
      }
    }
  }

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const response = await baseAxios.post(
    `${SERVER_URL}/api/restaurants/update-restaurant`,
    formData,
    {
      headers: headers,
      withCredentials: true,
    }
  );
  return response.data;
};
