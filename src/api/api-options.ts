import { AxiosInstance } from "axios";

export class ApiOptions {
  constructor(private baseAxios: AxiosInstance) {}

  public retry(tryCount: number, delay: number) {
    if (tryCount <= 0 || delay <= 0) {
      return;
    }
    this.baseAxios.interceptors.response.use();
  }
}

export default ApiOptions;
