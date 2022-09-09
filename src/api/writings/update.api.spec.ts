import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { HttpMethod } from "types/api";
import { WritingRequestBody } from "types/writing";

import UpdateWritingsApi from "./update.api";

const mockHttpMethod = {
  patch: jest.fn((entity) => entity),
};

describe("UpdateWritingsApi", () => {
  const body: WritingRequestBody = { title: "title", content: "content" };
  const id = "id";
  let updateWritingsApi: UpdateWritingsApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    updateWritingsApi = new UpdateWritingsApi(httpMethod);
  });

  it("API 호출 시 body와 id도 같이 전달 된다", async () => {
    await updateWritingsApi.request(body, id);
    expect(mockHttpMethod.patch).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`, body);
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const apiSuccess: DeepPartial<AxiosResponse> = { data: new WritingFixture(), status: OK };
    mockHttpMethod.patch.mockReturnValue(apiSuccess);
    const actual = await updateWritingsApi.request(body, id);
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.patch.mockRejectedValue(apiError);
    const actual = await updateWritingsApi.request(body, id);
    expect(actual.status).toBe(BAD_REQUEST);
  });
});
