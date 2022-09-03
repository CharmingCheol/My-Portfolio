export interface ApiInterceptor {
  intercept(): void;
}

export interface ApiRequest {
  request(...args: any[]): Promise<any>;
}
