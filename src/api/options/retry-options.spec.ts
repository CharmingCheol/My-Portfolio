import { AxiosInstance } from "axios";
import { INTERNAL_SERVER_ERROR } from "http-status";
import RetryOption from "./retry-options";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const apiMock = {
  request: jest.fn(),
  interceptors: {
    response: { use: jest.fn() },
  },
};

describe("RetryOption", () => {
  let baseAxios: AxiosInstance;

  beforeEach(() => {
    baseAxios = (apiMock as unknown) as AxiosInstance;
    new RetryOption(baseAxios).run();
  });

  it("error 데이터가 없을 경우 rejected interceptor를 중단 한다", async () => {
    const error = {};
    const rejectedCallback = apiMock.interceptors.response.use.mock.calls[0][1];
    expect(rejectedCallback(error)).rejects.toStrictEqual(error);
  });

  it("error status가 500보다 작을 경우 rejected interceptor를 중단 한다", () => {
    const error = { response: { status: INTERNAL_SERVER_ERROR - 1 } };
    const rejectedCallback = apiMock.interceptors.response.use.mock.calls[0][1];
    expect(rejectedCallback(error)).rejects.toStrictEqual(error);
  });

  it("error status가 500 이상일 경우 1초 뒤에 API를 호출 한다", () => {
    const rejectedCallback = apiMock.interceptors.response.use.mock.calls[0][1];
    rejectedCallback({ response: { status: 500 } }).catch((error: Error) => error);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it("retry 호출 횟수가 3회를 초과할 경우 API 호출을 중단 한다", async () => {
    const rejectedCallback = apiMock.interceptors.response.use.mock.calls[0][1];
    const error = { response: { status: 500 } };

    rejectedCallback(error).catch((error: Error) => error);
    rejectedCallback(error).catch((error: Error) => error);
    rejectedCallback(error).catch((error: Error) => error);
    jest.runAllTimers();

    expect(rejectedCallback(error)).rejects.toStrictEqual(error);
  });
});
