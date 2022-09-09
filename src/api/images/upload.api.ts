import { AxiosRequestConfig, AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";

interface UploadParams {
  file: File;
  path: "writings";
}

class UploadApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(params: UploadParams, config?: AxiosRequestConfig): Promise<AxiosResponse<{ path: string }>> {
    const formData = this.getFormData(params);
    const requestConfig = this.getRequestConfig(config);
    const api = this.httpMethod.post(`${API_URL.IMAGES}/${params.path}`, formData, requestConfig);
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

export default UploadApi;
