import axios from "axios";

export { postContentImages, postThumbnailImages } from "./images";
export { getWriting, getWritingList, postWriting } from "./writings";

export const mainAxios = axios.create({
  baseURL: `http://localhost:3001/api`,
});
