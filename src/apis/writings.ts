import { AxiosRequestConfig } from "axios";
import { mainAxios } from "./index";

export const getWritingList = (now: number, size: number) => {
  return mainAxios.get(`/writings?now=${now}&size=${size}`);
};

export const postWriting = (config: AxiosRequestConfig) => {
  return mainAxios({
    method: "POST",
    url: "/writings",
    ...config,
  });
};
