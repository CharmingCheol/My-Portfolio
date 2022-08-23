import RetryOption from "./retry-options";

export interface ApiOptionRun {
  run(...args: any[]): void;
}

class ApiOptions {
  constructor(private retryOption: RetryOption) {
    this.retryOption.run();
  }
}

export default ApiOptions;
