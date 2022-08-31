import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { API_URL } from "constants/api";

import ApiOptions from "./options";
import { receiveApiRequest } from "./utils";

interface UploadParams {
  file: File;
  path: "writings";
}

class ImagesApi {
  constructor(private baseAxios: AxiosInstance, public apiOptions: ApiOptions) {}

  public async upload(params: UploadParams, config?: AxiosRequestConfig): Promise<AxiosResponse<{ path: string }>> {
    const formData = this.getFormData(params);
    const requestConfig = this.getRequestConfig(config);
    const api = this.baseAxios.post(`${API_URL.IMAGES}/${params.path}`, formData, requestConfig);
    const response = await receiveApiRequest(api);
    return response;
  }

  private getFormData = (params: UploadParams): FormData => {
    const formData = new FormData();
    formData.append(params.path, params.file);
    return formData;
  };

  private getRequestConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
    const baseHeader = { "Content-Type": "multipart/form-data" };
    return { ...config, headers: { ...config?.headers, ...baseHeader } };
  };
}

export default ImagesApi;
