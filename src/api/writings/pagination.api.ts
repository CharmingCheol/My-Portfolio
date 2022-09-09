import { AxiosResponse } from "axios";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiRequest, HttpMethod } from "types/api";
import { WritingPagination } from "types/writing";

class PaginationApi implements ApiRequest {
  constructor(private httpMethod: HttpMethod) {}

  public async request(page: number): Promise<AxiosResponse<WritingPagination>> {
    const api = this.httpMethod.get(`${API_URL.WRITINGS}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default PaginationApi;
