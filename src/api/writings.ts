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

  public async pagination<T extends WritingPagination>(page: number): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.get<T>(`${this.BASE_URL}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  }

  public async create<T extends Writing>(body: WritingRequestBody): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.post<T>(`${this.BASE_URL}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  public async update<T extends Writing>(body: WritingRequestBody, id: string): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.patch<T>(`${this.BASE_URL}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  }

  public async delete<T extends null>(id: string): Promise<AxiosResponse<T>> {
    const api = this.baseAxios.delete<T>(`${this.BASE_URL}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  }
}

export default BaseWritingsApi;
