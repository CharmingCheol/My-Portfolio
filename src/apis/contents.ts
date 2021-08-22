import { mainAxios } from "./index";

export const getContents = (now: number, size: number) => {
  return mainAxios.get(`/contents?now=${now}&size=${size}`);
};
