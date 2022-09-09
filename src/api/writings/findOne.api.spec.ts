import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { HttpMethod } from "types/api";

import FindOneWritingsApi from "./findOne.api";

const mockHttpMethod = {
  get: jest.fn((entity) => entity),
};

describe("FindOneWritingsApi", () => {
  const id = "id";
  let findOneWritingsApi: FindOneWritingsApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    findOneWritingsApi = new FindOneWritingsApi(httpMethod);
  });

  it("전달 된 id가 API 주소에 포함 된다", async () => {
    await findOneWritingsApi.request(id);
    expect(mockHttpMethod.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const apiSuccess: DeepPartial<AxiosResponse> = { data: new WritingFixture(), status: OK };
    mockHttpMethod.get.mockReturnValue(apiSuccess);
    const actual = await findOneWritingsApi.request(id);
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.get.mockRejectedValue(apiError);
    const actual = await findOneWritingsApi.request(id);
    expect(actual.status).toBe(BAD_REQUEST);
  });
});
