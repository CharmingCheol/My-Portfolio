import { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiValidator<A> {
  validate(args: A): boolean;
}

interface ApiDispatcher<A, R> {
  dispatch(args: A): Promise<AxiosResponse<R>>;
}

interface ApiReceiverCallback<R> {
  response: AxiosResponse<R>;
  success?: (response?: R) => void;
  error?: () => void;
}

interface ApiReceiver<R> {
  receive(args: ApiReceiverCallback<R>): void;
}

type ApiResponse = Promise<AxiosResponse>;

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

export interface ApiManager<A, R> {
  (httpMethod: HttpMethod, ...rest: any[]): ApiValidator<A> & ApiDispatcher<A, R> & ApiReceiver<R>;
}
