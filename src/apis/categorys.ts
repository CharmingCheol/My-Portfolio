import instance from "./index";

// 카테고리 리스트 GET
export const getCategorys = () => {
  return instance.get("/categorys");
};
