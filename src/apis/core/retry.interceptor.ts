import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { INTERNAL_SERVER_ERROR } from "http-status";

import { ApiInterceptor } from "types/api";

const MAX_TRY_COUNT = 3;
const RETRY_TIME_OUT = 1000;

class Retry implements ApiInterceptor {
  private tryCount = MAX_TRY_COUNT;
  private _axiosInstance: AxiosInstance;

  constructor(private axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance;
  }

  public intercept(): void {
    this._axiosInstance.interceptors.response.use(this.onFulfilled, this.onRejected);
  }

  private onFulfilled(response: any) {
    return response;
  }

  private onRejected = (error: AxiosError) => {
    if (this.isServerError(error)) {
      this.tryCount -= 1;
      if (0 <= this.tryCount) {
        return this.retryApi(error.config);
      }
    }
    this.tryCount = MAX_TRY_COUNT;
    return Promise.reject(error);
  };

  private isServerError(error: AxiosError) {
    if (!error.response) {
      return false;
    }
    return INTERNAL_SERVER_ERROR <= error.response.status;
  }

  private retryApi(config: AxiosRequestConfig) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._axiosInstance.request(config));
      }, RETRY_TIME_OUT);
    });
  }
}

export default Retry;
