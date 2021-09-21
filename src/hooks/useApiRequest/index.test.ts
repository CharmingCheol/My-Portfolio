import { act, renderHook } from "@testing-library/react-hooks";
import useApiRequest from "./index";

describe("hooks/useApiRequest", () => {
  it("dispatch 함수 호출 시, state의 상태값이 변경된다", () => {
    // given
    const api: () => Promise<any> = () => new Promise(() => {});
    const { result: result1 } = renderHook(() => useApiRequest(api));
    const { result: result2 } = renderHook(() => useApiRequest(api));
    const { result: result3 } = renderHook(() => useApiRequest(api));

    // when
    act(() => {
      result1.current[1]({ type: "REQUEST" });
    });
    act(() => {
      result2.current[1]({ type: "REQUEST", url: { id: 1 } });
    });
    act(() => {
      result3.current[1]({ type: "REQUEST", requestData: { timeout: 1 } });
    });

    // then
    expect(result1.current[0]).toStrictEqual({
      url: undefined,
      requestData: undefined,
      type: "REQUEST",
    });
    expect(result2.current[0]).toStrictEqual({
      url: { id: 1 },
      requestData: undefined,
      type: "REQUEST",
    });
    expect(result3.current[0]).toStrictEqual({
      url: undefined,
      requestData: { timeout: 1 },
      type: "REQUEST",
    });
  });

  it("useEffect가 실행 될 때, api 요청이 성공값으로 반환한다", async () => {
    const res = {
      status: 200,
      data: {
        isAdmin: true,
      },
    };
    const api: () => Promise<any> = () => Promise.resolve(res);
    const { result, waitForNextUpdate } = renderHook(() => useApiRequest(api));
    act(() => {
      result.current[1]({ type: "REQUEST" });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toStrictEqual({
      responseData: { isAdmin: true },
      status: 200,
      type: "SUCCESS",
    });
  });

  it("useEffect가 실행 될 때, api 요청이 실패값으로 반환한다", async () => {
    const res = {
      message: "error message",
    };
    const api: () => Promise<any> = () => Promise.reject(res);
    const { result, waitForNextUpdate } = renderHook(() => useApiRequest(api));
    act(() => {
      result.current[1]({ type: "REQUEST" });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toStrictEqual({
      error: { message: "error message" },
      type: "FAILURE",
    });
  });
});
