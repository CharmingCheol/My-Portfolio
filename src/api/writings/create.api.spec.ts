import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { HttpMethod } from "types/api";
import { WritingRequestBody } from "types/writing";

import CreateWritingApi from "./create.api";

const mockHttpMethod = {
  get: jest.fn((entity) => entity),
  post: jest.fn((entity) => entity),
  patch: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
};

describe("CreateWritingApi", () => {
  const body: WritingRequestBody = { title: "title", content: "content" };
  let createWritingApi: CreateWritingApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    createWritingApi = new CreateWritingApi(httpMethod);
  });

  it("API 호출 시 body로 전달 할 데이터도 같이 전달 된다", async () => {
    await createWritingApi.request(body);
    expect(mockHttpMethod.post).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, body);
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const apiSuccess: DeepPartial<AxiosResponse> = { data: new WritingFixture(body), status: OK };
    mockHttpMethod.post.mockReturnValue(apiSuccess);
    const actual = await createWritingApi.request(body);
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.post.mockRejectedValue(apiError);
    const actual = await createWritingApi.request(body);
    expect(actual.status).toBe(BAD_REQUEST);
  });
});
