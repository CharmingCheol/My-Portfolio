import { AxiosResponse } from "axios";

import { receiveApiRequest } from "apis/utils";
import { API_URL } from "constants/api";
import { HttpMethod } from "types/api";
import { Writing, WritingPagination, WritingRequestBody } from "types/writing";

class WritingsApi {
  private _httpMethod: HttpMethod;
  constructor(private httpMethod: HttpMethod) {
    this._httpMethod = httpMethod;
  }

  async create(body: WritingRequestBody): Promise<AxiosResponse<Writing>> {
    const api = this._httpMethod.post(`${API_URL.WRITINGS}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  async delete(id: string): Promise<AxiosResponse<null>> {
    const api = this._httpMethod.delete(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }

  async findOne(id: string): Promise<AxiosResponse<Writing>> {
    const api = this._httpMethod.get(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }

  async pagination(page: number): Promise<AxiosResponse<WritingPagination>> {
    const api = this._httpMethod.get(`${API_URL.WRITINGS}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  }

  async update(args: { body: WritingRequestBody; id: string }): Promise<AxiosResponse<Writing>> {
    const { body, id } = args;
    const api = this._httpMethod.patch(`${API_URL.WRITINGS}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default WritingsApi;
