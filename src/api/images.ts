import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import ApiOptions from "./options";
import { receiveApiRequest } from "./utils";

interface UploadParams {
  file: File;
  path: "writings";
}

interface UploadResponse {
  path: string;
}

class ImagesApiService {
  private readonly BASE_URL = "/images";

  constructor(private baseAxios: AxiosInstance, public apiOptions: ApiOptions) {}

  public async upload(params: UploadParams, config: AxiosRequestConfig = {}): Promise<AxiosResponse<UploadResponse>> {
    const formData = this.getFormData(params);
    const requestConfig = this.getRequestConfig(config);
    const api = this.baseAxios.post<UploadResponse>(`${this.BASE_URL}/${params.path}`, formData, requestConfig);
    const response = await receiveApiRequest(api);
    return response;
  }

  private getFormData = (params: UploadParams): FormData => {
    const formData = new FormData();
    formData.append(params.path, params.file);
    return formData;
  };

  private getRequestConfig = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
    const baseHeader = { "Content-Type": "multipart/form-data" };
    return { ...config, headers: { ...config.headers, ...baseHeader } };
  };
}

export default ImagesApiService;
