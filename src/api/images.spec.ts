import { AxiosInstance, AxiosRequestConfig } from "axios";
import ImagesApiService from "./images";

const mockFactory = {
  post: jest.fn((entity) => entity),
};

describe("ImagesApiService", () => {
  const BASE_URL = "/images";
  let imagesApiService: ImagesApiService;

  beforeEach(() => {
    const baseAxios = (mockFactory as unknown) as AxiosInstance;
    imagesApiService = new ImagesApiService(baseAxios);
  });

  describe("upload", () => {
    const file = new File([""], "file");
    const path = "writings";
    const contentTypeHeader = { "Content-Type": "multipart/form-data" };

    it("전달 된 path로 이미지 업로드 API가 호출 된다", async () => {
      await imagesApiService.upload(file, path);
      const headers: AxiosRequestConfig = { headers: contentTypeHeader };
      expect(mockFactory.post).toHaveBeenCalledWith(`${BASE_URL}/${path}`, expect.any(FormData), headers);
    });

    it("config를 추가 할 경우 API와 함께 호출 된다", async () => {
      const maxRedirects: AxiosRequestConfig = { maxRedirects: 1000 };
      const config: AxiosRequestConfig = { headers: contentTypeHeader, ...maxRedirects };
      await imagesApiService.upload(file, path, maxRedirects);
      expect(mockFactory.post).toHaveBeenCalledWith(`${BASE_URL}/${path}`, expect.any(FormData), config);
    });

    it("headers config를 추가할 경우 multipart/form-data와 합쳐진다", async () => {
      const fooHeaders: AxiosRequestConfig = { headers: { foo: "foo" } };
      const config: AxiosRequestConfig = { headers: { ...contentTypeHeader, ...{ foo: "foo" } } };
      await imagesApiService.upload(file, path, fooHeaders);
      expect(mockFactory.post).toHaveBeenCalledWith(`${BASE_URL}/${path}`, expect.any(FormData), config);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const returnValue = { path: "path" };
      mockFactory.post.mockReturnValue({ data: returnValue });
      const response = await imagesApiService.upload(file, path);
      expect(response).toStrictEqual(returnValue);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.post.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await imagesApiService.upload(file, path);
      }).rejects.toThrowError(error);
    });
  });
});
