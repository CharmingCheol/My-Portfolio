import { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiValidator<A> {
  validate(args: A): boolean;
}

interface ApiDispatcher<A, R> {
  dispatch(args: A): Promise<AxiosResponse<R>>;
}

interface ApiReceiver<R> {
  receive(response: AxiosResponse<R>): void;
}

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

export interface LooseApiManager<A, R> {
  (httpMethod: HttpMethod): ApiDispatcher<A, R> & ApiReceiver<R>;
}

export interface StrictApiManager<A, R> {
  (httpMethod: HttpMethod): ApiValidator<A> & ApiDispatcher<A, R> & ApiReceiver<R>;
}
