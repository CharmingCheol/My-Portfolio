import { AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";

class DeleteWritingsApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(id: string): Promise<AxiosResponse<null>> {
    const api = this.httpMethod.delete(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default DeleteWritingsApi;
