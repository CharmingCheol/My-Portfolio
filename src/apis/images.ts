import { AxiosRequestConfig } from "axios";
import { mainAxios } from "./index";

export const postContentImages = (config: AxiosRequestConfig) => {
  return mainAxios({
    method: "POST",
    url: "/images/contents",
    ...config,
  });
};

export const postThumbnailImages = (config: AxiosRequestConfig) => {
  return mainAxios({
    method: "POST",
    url: "/images/thumbnails",
    ...config,
  });
};
