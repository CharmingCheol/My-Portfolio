import { AxiosInstance } from "axios";
import ApiOptions from "./api-options";

const apiMock = {
  interceptors: {
    response: {
      use: jest.fn(),
    },
  },
};

describe("ApiOptions", () => {
  let baseAxios: AxiosInstance;
  let apiOptions: ApiOptions;

  beforeEach(() => {
    baseAxios = (apiMock as unknown) as AxiosInstance;
    apiOptions = new ApiOptions(baseAxios);
  });

  describe("retry", () => {
    describe("tryCount가 0보다 작을 경우 실행을 중단한다", () => {
      it("retry = 0", () => {
        const response = apiOptions.retry(0, 0);
        expect(response).toBeUndefined();
      });
      it("retry < 0", () => {
        const response = apiOptions.retry(-1, 0);
        expect(response).toBeUndefined();
      });
    });
    describe("delay가 0보다 작을 경우 실행을 중단한다", () => {
      it("delay = 0", () => {
        const response = apiOptions.retry(1, 0);
        expect(response).toBeUndefined();
      });

      it("delay < 0", () => {
        const response = apiOptions.retry(1, -1);
        expect(response).toBeUndefined();
      });
    });
    it("인자값에 이상이 없을 경우 axios interceptor가 호출 된다", () => {
      apiOptions.retry(1, 1000);
      expect(baseAxios.interceptors.response.use).toHaveBeenCalled();
    });
  });
});
