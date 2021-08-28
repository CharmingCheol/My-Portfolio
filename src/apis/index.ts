import axios from "axios";

export { getContents } from "./contents";
export { postImages, postThumbnailImages } from "./images";

export const mainAxios = axios.create({
  baseURL: `http://localhost:3001/api`,
});
