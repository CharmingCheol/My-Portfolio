import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "./index";

export const postContentImages = async (data: File) => {
  const imageRef = ref(storage, data.name);
  const response = await uploadBytes(imageRef, data);
  const imageUrl = await getDownloadURL(response.ref);
  return imageUrl;
};
