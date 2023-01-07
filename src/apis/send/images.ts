import { AxiosResponse } from "axios";

import { receiveApiRequest } from "apis/utils";
import { API_URL } from "constants/api";
import { HttpMethod } from "types/api";

class ImagesApi {
  constructor(private httpMethod: HttpMethod) {}

  async uploadWritingContent(file: File): Promise<AxiosResponse<{ path: string }>> {
    const formData = this.getFormData(file);
    const api = this.httpMethod.post(`${API_URL.IMAGES}/writings/contents`, formData);
    const response = await receiveApiRequest(api);
    return response;
  }

  private getFormData(file: File): FormData {
    const formData = new FormData();
    formData.append("writing", file);
    return formData;
  }
}

export default ImagesApi;
