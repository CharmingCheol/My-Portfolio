import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { HttpMethod } from "types/api";

import UploadImagesApi from "./upload.api";

const mockHttpMethod = {
  post: jest.fn((entity) => entity),
};

describe("UploadImagesApi", () => {
  const file = new File([""], "file");
  const path = "writings";
  const baseHeader = { "Content-Type": "multipart/form-data" };
  let uploadImagesApi: UploadImagesApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    uploadImagesApi = new UploadImagesApi(httpMethod);
  });

  it("headers config를 추가할 경우 multipart/form-data와 합쳐진다", async () => {
    await uploadImagesApi.request({ file, path: "writings" }, { headers: { foo: "bar" } });
    expect(mockHttpMethod.post).toHaveBeenCalledWith(
      `${API_URL.IMAGES}/${path}`,
      expect.any(FormData),
      expect.objectContaining({ headers: { ...baseHeader, foo: "bar" } }),
    );
  });

  it("다른 config를 추가할 경우 multipart/form-data가 포함 된 상태로 API가 호출 된다", async () => {
    await uploadImagesApi.request({ file, path: "writings" }, { maxRedirects: 1000 });
    expect(mockHttpMethod.post).toHaveBeenCalledWith(
      `${API_URL.IMAGES}/${path}`,
      expect.any(FormData),
      expect.objectContaining({ headers: { "Content-Type": "multipart/form-data" }, maxRedirects: 1000 }),
    );
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const apiSuccess: DeepPartial<AxiosResponse> = { data: { path: "path" }, status: OK };
    mockHttpMethod.post.mockReturnValue(apiSuccess);
    const actual = await uploadImagesApi.request({ file, path: "writings" });
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const error: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.post.mockRejectedValue(error);
    const response = await uploadImagesApi.request({ file, path: "writings" });
    expect(response.status).toBe(BAD_REQUEST);
  });
});
