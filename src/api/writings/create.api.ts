import { AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";
import { Writing, WritingRequestBody } from "types/writing";

class CreateWritingApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(body: WritingRequestBody): Promise<AxiosResponse<Writing>> {
    const api = this.httpMethod.post(`${API_URL.WRITINGS}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default CreateWritingApi;
