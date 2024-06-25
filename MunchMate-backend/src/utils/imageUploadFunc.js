import { firebaseStorage } from "../configs/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

export { ImageUploadFunc };
