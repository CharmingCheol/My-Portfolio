import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
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
  private readonly BASE_URL = "/writings";

  constructor(private baseAxios: AxiosInstance, public apiOptions: ApiOptions) {}

  public async findOne<T extends Writing>(id: string): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.get<T>(`${this.BASE_URL}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }

  async pagination<T extends WritingPagination>(page: number): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.get<T>(`${this.BASE_URL}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  }

  async create<T extends Writing>(body: WritingRequestBody): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.post<T>(`${this.BASE_URL}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  async update<T extends Writing>(body: WritingRequestBody, id: string): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.patch<T>(`${this.BASE_URL}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  async delete<T extends null>(id: string): Promise<AxiosError<T> | T> {
    const api = this.baseAxios.delete<T>(`${this.BASE_URL}/${id}`);
    const response = await this.receiveApiRequest(api);
    return response;
  }

  private receiveApiRequest = async <T>(api: Promise<AxiosResponse<T>>) => {
    try {
      const response = await api;
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  };
}

export default BaseWritingsApi;
