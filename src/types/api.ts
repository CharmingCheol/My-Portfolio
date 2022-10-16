import { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiValidator<A> {
  validate(args: A): boolean;
}

interface ApiDispatcher<A, R> {
  dispatch(args: A): Promise<AxiosResponse<R>>;
}

type HttpMethodResponse = Promise<AxiosResponse>;

export interface HttpMethod {
  get(url: string, config?: AxiosRequestConfig): HttpMethodResponse;

  post(url: string, data: any, config?: AxiosRequestConfig): HttpMethodResponse;

  patch(url: string, data: any, config?: AxiosRequestConfig): HttpMethodResponse;

  delete(url: string, config?: AxiosRequestConfig): HttpMethodResponse;
}

export interface ApiInterceptor {
  intercept(): void;
}

export interface ApiManager<A = any, R = any> {
  (httpMethod: HttpMethod, ...rest: any[]): ApiValidator<A> & ApiDispatcher<A, R>;
}

export type ApiReceiver<T extends ReturnType<ApiManager>> = () => {
  receive: (params: Awaited<ReturnType<T["dispatch"]>>) => void;
};
