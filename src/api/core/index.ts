import axios, { AxiosInstance } from "axios";
import Retry from "./retry.interceptor";

class ApiCore {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
    this.initInterceptors();
  }

  private initInterceptors(): void {
    [Retry].map((Interceptor) => {
      const interceptor = new Interceptor(this.axiosInstance);
      interceptor.intercept();
    });
  }
}

export default ApiCore;
