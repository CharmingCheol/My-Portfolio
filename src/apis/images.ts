import { AxiosRequestConfig } from "axios";
import { mainAxios } from "./index";

export const postImages = (config: AxiosRequestConfig) => {
  return mainAxios({
    method: "POST",
    url: "/images",
    ...config,
  });
};
