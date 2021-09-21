import { AxiosRequestConfig } from "axios";
import { mainAxios } from "./index";

export const getWriting = (id: number, config: AxiosRequestConfig) => {
  return mainAxios({
    method: "GET",
    url: `/writings/${id}`,
    ...config,
  });
};

export const getWritingList = (pagination: any, config: AxiosRequestConfig) => {
  const { now, size } = pagination;
  return mainAxios({
    method: "GET",
    url: `/writings?now=${now}&size=${size}`,
    ...config,
  });
};

export const postWriting = (config: AxiosRequestConfig) => {
  return mainAxios({
    method: "POST",
    url: "/writings",
    ...config,
  });
};

export const patchWriting = (id: number, config: AxiosRequestConfig) => {
  return mainAxios({
    method: "PATCH",
    url: `/writings/${id}`,
    ...config,
  });
};

export const deleteWriting = (id: number, config: AxiosRequestConfig) => {
  return mainAxios({
    method: "DELETE",
    url: `/writings/${id}`,
    ...config,
  });
};
