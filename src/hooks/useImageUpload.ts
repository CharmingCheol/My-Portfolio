/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { AxiosResponse } from "axios";

type ReturnTypes = [string, () => void];

const useImageUpload = ({ api }: { api: (...args: any[]) => Promise<AxiosResponse<any>> }): ReturnTypes => {
  const [imageUrl, setImageUrl] = useState("");

  const selectImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = (input.files as FileList)[0];
      const extensions = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
      const reader = new FileReader();
      if (!extensions.includes(file.type)) return;

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const tempImage = new Image();
        tempImage.src = e.target?.result as string;
        tempImage.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

          const BASE_SIZE = 1024 * 1024; // 1MB
          const COMP_SIZE = 1024 * 300; // 200KB
          const { size } = file;
          let { width } = tempImage;
          let { height } = tempImage;

          try {
            if (size > BASE_SIZE) {
              const ratio = Math.ceil(Math.sqrt(size / COMP_SIZE));
              width = tempImage.width / ratio;
              height = tempImage.height / ratio;
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(tempImage, 0, 0, width, height);
              const dataURL = canvas.toDataURL(file.type);

              const byteString = atob(dataURL.split(";base64,")[1]);
              const ia = new Uint8Array(new ArrayBuffer(byteString.length));
              for (let i = 0; i < byteString.length; i += 1) {
                ia[i] = byteString.charCodeAt(i);
              }

              const formData = new FormData();
              const blob = new Blob([ia], { type: file.type });
              formData.append("image", blob);
              const { data } = await api({ formData });
              setImageUrl(data);
            } else {
              const formData = new FormData();
              formData.append("image", file);
              const { data } = await api({ formData });
              setImageUrl(data);
            }
          } catch (error) {
            setImageUrl("");
          }
        };
      };
    };
  }, [api]);

  return [imageUrl, selectImage];
};

export default useImageUpload;
