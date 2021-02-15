import instance from "./index";

const config = { headers: { "content-type": "multipart/form-data" } };

// 사진 업로드 POST
export const postImageUpload = ({ formData }: { formData: FormData }) => {
  return instance.post("/images", formData, config);
};
