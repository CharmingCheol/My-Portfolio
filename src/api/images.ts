import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import ApiOptions from "./options";

type UploadPath = "writings";

interface UploadResponse {
  path: string;
}

interface ImagesApi {
  upload(
    file: File,
    path: UploadPath,
    config?: AxiosRequestConfig,
  ): Promise<UploadResponse | AxiosError<UploadResponse>>;
}

class ImagesApiService implements ImagesApi {
  private readonly BASE_URL = "/images";

  constructor(private baseAxios: AxiosInstance, public apiOptions: ApiOptions) {}

  async upload(
    file: File,
    path: UploadPath,
    config: AxiosRequestConfig = {},
  ): Promise<UploadResponse | AxiosError<UploadResponse>> {
    try {
      const formData = this.getFormData(file, path);
      const uploadConfig = this.getUploadConfig(config);
      const response = await this.baseAxios.post<UploadResponse>(`${this.BASE_URL}/${path}`, formData, uploadConfig);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<UploadResponse>;
      return typedError;
    }
  }

  private getFormData = (file: File, path: UploadPath) => {
    const formData = new FormData();
    formData.append(path, file);
    return formData;
  };

  private getUploadConfig = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
    const formDataHeader = { "Content-Type": "multipart/form-data" };
    return { ...config, headers: { ...config.headers, ...formDataHeader } };
  };
}

export default ImagesApiService;
