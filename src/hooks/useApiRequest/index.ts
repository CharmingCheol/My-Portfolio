import { useEffect, useReducer, Dispatch } from "react";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type DispatchType = "REQUEST" | "SUCCESS" | "FAILURE" | null;

interface State<Res> {
  error?: AxiosError;
  responseData?: Res;
  requestData?: AxiosRequestConfig;
  status?: number;
  type: DispatchType;
}

interface Reducer<Res> {
  (state: State<Res>, action: State<Res>): State<Res>;
}

function reducer<Res>(state: State<Res>, action: State<Res>): State<Res> {
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

const useApiRequest = <Res>(api: (...args: any[]) => Promise<AxiosResponse>): [State<Res>, Dispatch<State<Res>>] => {
  const initialState: State<Res> = {
    type: null,
  };
  const [state, dispatch] = useReducer<Reducer<Res>>(reducer, initialState);

  useEffect(() => {
    if (state.type === "REQUEST") {
      const requestApi = async () => {
        try {
          const { status, data } = state.requestData ? await api(state.requestData) : await api();
          if (status < 300) dispatch({ responseData: data.body, status, type: "SUCCESS" });
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
