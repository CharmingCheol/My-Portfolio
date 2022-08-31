import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";

import { apiOptions } from "./index";
import ImagesApi from "./images";

const mockFactory = {
  post: jest.fn((entity) => entity),
};

describe("ImagesApi", () => {
  let imagesApi: ImagesApi;

  beforeEach(() => {
    const axiosMock = (mockFactory as unknown) as AxiosInstance;
    const apiOptionsMock = jest.mocked(apiOptions, true);
    imagesApi = new ImagesApi(axiosMock, apiOptionsMock);
  });

  describe("upload", () => {
    const path = "writings";
    const baseHeader = { "Content-Type": "multipart/form-data" };

    it("headers config를 추가할 경우 multipart/form-data와 합쳐진다", async () => {
      const config: AxiosRequestConfig = { headers: { foo: "bar" } };
      await setup(config);
      expect(mockFactory.post).toHaveBeenCalledWith(
        `${API_URL.IMAGES}/${path}`,
        expect.any(FormData),
        expect.objectContaining({ headers: { ...baseHeader, ...config.headers } }),
      );
    });

    it("다른 config를 추가할 경우 multipart/form-data가 포함 된 상태로 API가 호출 된다", async () => {
      const config: AxiosRequestConfig = { maxRedirects: 1000 };
      await setup(config);
      expect(mockFactory.post).toHaveBeenCalledWith(
        `${API_URL.IMAGES}/${path}`,
        expect.any(FormData),
        expect.objectContaining(config),
      );
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiResponse: DeepPartial<AxiosResponse> = { data: { path: "path" }, status: OK };
      mockFactory.post.mockReturnValue(apiResponse);
      const response = await setup();
      expect(response).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const error: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.post.mockRejectedValue(error);
      const response = await setup();
      expect(response.status).toBe(BAD_REQUEST);
    });

    async function setup(config?: AxiosRequestConfig) {
      const file = new File([""], "file");
      const response = await imagesApi.upload({ file, path }, { headers: baseHeader, ...config });
      return response;
    }
  });
});
