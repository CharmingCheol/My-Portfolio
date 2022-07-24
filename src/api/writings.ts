import { AxiosError, AxiosInstance } from "axios";
import { Writing, WritingPagination, WritingRequestBody } from "types/writing";

class WritingsApi {
  private BASE_URL = "/writings" as const;

  constructor(private baseAxios: AxiosInstance) {}

  async findOne(id: string) {
    try {
      const response = await this.baseAxios.get<Writing>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<Writing>;
      return typedError;
    }
  }

  async pagination(page: number) {
    try {
      const response = await this.baseAxios.get<WritingPagination>(`${this.BASE_URL}`, { params: { page } });
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<Writing>;
      return typedError;
    }
  }

  async create(body: WritingRequestBody) {
    try {
      const response = await this.baseAxios.post<Writing>(`${this.BASE_URL}`, body);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<Writing>;
      return typedError;
    }
  }

  async update(body: WritingRequestBody, id: string) {
    try {
      const response = await this.baseAxios.patch<Writing>(`${this.BASE_URL}/${id}`, body);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<Writing>;
      return typedError;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.baseAxios.delete<null>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError<Writing>;
      return typedError;
    }
  }

  public isSuccess = <T extends unknown>(response: T | AxiosError<Writing>): response is T => {
    return (response as AxiosError<T>) === undefined;
  };
}

export default WritingsApi;
