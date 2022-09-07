import { AxiosRequestConfig, AxiosResponse } from "axios";

type ApiResponse = Promise<AxiosResponse<any>>;

export interface HttpMethod {
  get(url: string, config?: AxiosRequestConfig): ApiResponse;

  post(url: string, data: any, config?: AxiosRequestConfig): ApiResponse;

  patch(url: string, data: any, config?: AxiosRequestConfig): ApiResponse;

  delete(url: string, config?: AxiosRequestConfig): ApiResponse;
}

export interface ApiInterceptor {
  intercept(): void;
}

export interface ApiRequest {
  request(...args: any[]): ApiResponse;
}
