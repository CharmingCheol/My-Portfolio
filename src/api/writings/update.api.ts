import { AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";
import { Writing, WritingRequestBody } from "types/writing";

class UpdateWritingsApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(body: WritingRequestBody, id: string): Promise<AxiosResponse<Writing>> {
    const api = this.httpMethod.patch(`${API_URL.WRITINGS}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default UpdateWritingsApi;
