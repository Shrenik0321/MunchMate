import { firebaseStorage } from "../configs/firebaseConfig.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  StorageError,
} from "firebase/storage";

const ImageUploadFunc = async (imageFileData, folderName) => {
  try {
    const uploadTasks = imageFileData.map(async (imageFileObj) => {
      const metaData = {
        contentType: imageFileObj?.mimetype,
      };

      const imageRef = ref(
        firebaseStorage,
        `munch-mate/${folderName}/` + imageFileObj?.originalname
      );

      const snapShot = await uploadBytesResumable(
        imageRef,
        imageFileObj.buffer,
        metaData
      );

      return getDownloadURL(snapShot.ref);
    });

    const imagePathList = await Promise.all(uploadTasks);

    return imagePathList[0];
  } catch (err) {
    console.log(err);
  }
};

const ImageDeleteFunc = async (imageUrls) => {
  try {
    if (imageUrls !== undefined) {
      if (!Array.isArray(imageUrls)) {
        // If it's not an array, convert it into an array with a single element
        imageUrls = [imageUrls];
      }

      const deletionResults = [];

      for (const imageUrl of imageUrls) {
        // Get a reference to the image based on its URL
        const imageRef = ref(firebaseStorage, imageUrl);

        // Check if the image exists at the given URL
        await getDownloadURL(imageRef);

        // If the getDownloadURL call succeeds, it means the image exists
        // Delete the image from Firebase Storage
        await deleteObject(imageRef);
        deletionResults.push({
          success: true,
          message: `Image ${imageUrl} deleted successfully.`,
        });
      }

      return deletionResults;
    }
  } catch (error) {
    // If an error occurs, check if it's a 'storage/object-not-found' error
    if (
      error instanceof StorageError &&
      error.code === "storage/object-not-found"
    ) {
      // Handle the case where the image does not exist gracefully
      return { success: false, message: "Image does not exist." };
    } else {
      // Handle other errors
      console.error("Error deleting image:", error);
      return { success: false, message: "Error deleting image." };
    }
  }
};

export { ImageUploadFunc, ImageDeleteFunc };
