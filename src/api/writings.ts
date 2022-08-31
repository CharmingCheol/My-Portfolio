import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { API_URL } from "constants/api";
import { Writing, WritingPagination, WritingRequestBody } from "types/writing";

import ApiOptions from "./options";
import { receiveApiRequest } from "./utils";

export interface WritingsApi {
  findOne<T extends Writing>(id: string): Promise<T | AxiosError<T>>;

  pagination<T extends WritingPagination>(page: number): Promise<T | AxiosError<T>>;

  create(body: WritingRequestBody): Promise<Writing | AxiosError<Writing>>;

  update(body: WritingRequestBody, id: string): Promise<Writing | AxiosError<Writing>>;

  delete(id: string): Promise<null | AxiosError<null>>;
}

class BaseWritingsApi {
  constructor(private baseAxios: AxiosInstance, public apiOptions: ApiOptions) {}

  public async findOne(id: string): Promise<AxiosResponse<Writing>> {
    const api = this.baseAxios.get(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }

  public async pagination(page: number): Promise<AxiosResponse<WritingPagination>> {
    const api = this.baseAxios.get(`${API_URL.WRITINGS}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  }

  public async create(body: WritingRequestBody): Promise<AxiosResponse<Writing>> {
    const api = this.baseAxios.post(`${API_URL.WRITINGS}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  public async update(body: WritingRequestBody, id: string): Promise<AxiosResponse<Writing>> {
    const api = this.baseAxios.patch(`${API_URL.WRITINGS}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  public async delete(id: string): Promise<AxiosResponse<null>> {
    const api = this.baseAxios.delete(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default BaseWritingsApi;
