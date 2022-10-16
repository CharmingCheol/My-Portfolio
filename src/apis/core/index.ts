import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethod } from "types/api";
import Retry from "./retry.interceptor";

class ApiCore implements HttpMethod {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
    this.initInterceptors();
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return await this._axiosInstance.get(url, config);
  }

  public async post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return await this._axiosInstance.post(url, data, config);
  }

  public async patch(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return await this._axiosInstance.patch(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return await this._axiosInstance.delete(url, config);
  }

  private initInterceptors(): void {
    [Retry].map((Interceptor) => {
      const interceptor = new Interceptor(this._axiosInstance);
      interceptor.intercept();
    });
  }
}

export default ApiCore;
