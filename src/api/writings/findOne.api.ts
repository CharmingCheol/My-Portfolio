import { AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";
import { Writing } from "types/writing";

class FindOneApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(id: string): Promise<AxiosResponse<Writing>> {
    const api = this.httpMethod.get(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default FindOneApi;
