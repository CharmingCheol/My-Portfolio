import { useEffect, useReducer, Dispatch } from "react";
import { AxiosResponse, AxiosError } from "axios";

type DispatchType = "REQUEST" | "SUCCESS" | "FAILURE" | null;

interface State<Req, Res> {
  error?: AxiosError;
  responseData?: Res;
  requestData?: Req;
  status?: number;
  type: DispatchType;
}

interface Reducer<Req, Res> {
  (state: State<Req, Res>, action: State<Req, Res>): State<Req, Res>;
}

function reducer<Req, Res>(state: State<Req, Res>, action: State<Req, Res>): State<Req, Res> {
  switch (action.type) {
    case "REQUEST": {
      return { requestData: action.requestData, type: action.type };
    }
    case "SUCCESS": {
      return { responseData: action.responseData, status: action.status, type: action.type };
    }
    case "FAILURE": {
      return { error: action.error, type: action.type };
    }
    default: {
      return state;
    }
  }
}

const useApiRequest = <Req, Res>(
  api: (...args: any[]) => Promise<AxiosResponse<Res>>,
): [State<Req, Res>, Dispatch<State<Req, Res>>] => {
  const initialState: State<Req, Res> = {
    type: null,
  };
  const [state, dispatch] = useReducer<Reducer<Req, Res>>(reducer, initialState);

  useEffect(() => {
    if (state.type === "REQUEST") {
      const requestApi = async () => {
        try {
          const { status, data } = state.requestData ? await api(state.requestData) : await api();
          if (status < 300) dispatch({ responseData: data, status, type: "SUCCESS" });
        } catch (error) {
          dispatch({ type: "FAILURE", error });
        }
      };
      requestApi();
    }
  }, [api, state.requestData, state.type]);

  return [state, dispatch];
};

export default useApiRequest;
