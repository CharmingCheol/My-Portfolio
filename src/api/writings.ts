import { AxiosError, AxiosInstance } from "axios";
import { Writing, WritingPagination, WritingRequestBody } from "types/writing";

class WritingsApi {
  private BASE_URL = "/writings" as const;

  constructor(private baseAxios: AxiosInstance) {}

  async findOne<T extends Writing>(id: string) {
    try {
      const response = await this.baseAxios.get<T>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  }

  async pagination<T extends WritingPagination>(page: number) {
    try {
      const response = await this.baseAxios.get<T>(`${this.BASE_URL}`, { params: { page } });
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  }

  async create<T extends Writing>(body: WritingRequestBody) {
    try {
      const response = await this.baseAxios.post<T>(`${this.BASE_URL}`, body);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  }

  async update<T extends Writing>(body: WritingRequestBody, id: string) {
    try {
      const response = await this.baseAxios.patch<T>(`${this.BASE_URL}/${id}`, body);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  }

  async delete<T extends null>(id: string) {
    try {
      const response = await this.baseAxios.delete<T>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<T>;
      return typedError;
    }
  }

  public isSuccess = <T extends unknown>(response: T | AxiosError<T>): response is T => {
    return (response as AxiosError<T>) === undefined;
  };
}

export default WritingsApi;
