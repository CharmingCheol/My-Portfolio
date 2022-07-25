import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Writing, WritingPagination, WritingRequestBody } from "types/writing";

class WritingsApi {
  private BASE_URL = "/writings" as const;

  constructor(private baseAxios: AxiosInstance) {}

  async findOne(id: string) {
    const api = this.baseAxios.get<Writing>(`${this.BASE_URL}/${id}`);
    const response = await this.receiveApiRequest(api);
    return response;
  }

  async pagination(page: number) {
    const api = this.baseAxios.get<WritingPagination>(`${this.BASE_URL}`, { params: { page } });
    const response = await this.receiveApiRequest(api);
    return response;
  }

  async create(body: WritingRequestBody) {
    const api = this.baseAxios.post<Writing>(`${this.BASE_URL}`, body);
    const response = await this.receiveApiRequest(api);
    return response;
  }

  async update(body: WritingRequestBody, id: string) {
    const api = this.baseAxios.patch<Writing>(`${this.BASE_URL}/${id}`, body);
    const response = await this.receiveApiRequest(api);
    return response;
  }

  async delete(id: string) {
    const api = this.baseAxios.delete<null>(`${this.BASE_URL}/${id}`);
    const response = await this.receiveApiRequest(api);
    return response;
  }

  public isSuccess = <T extends unknown>(response: T | AxiosError<T>): response is T => {
    return (response as AxiosError<T>) === undefined;
  };

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

export default WritingsApi;
