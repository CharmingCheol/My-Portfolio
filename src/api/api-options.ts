import axios, { AxiosInstance } from "axios";

export class ApiOptions {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
  }

  public retry(tryCount: number, delay: number) {
    if (tryCount <= 0 || delay <= 0) {
      return;
    }
    return true;
  }
}

export default ApiOptions;
