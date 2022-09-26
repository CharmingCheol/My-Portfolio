import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NO_CONTENT } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { globalUIActions } from "reducers/globalUI";
import { ApiManager } from "types/api";

type DeleteWritingApi = ApiManager<string, null>;

const deleteWritingApi: DeleteWritingApi = (httpMethod) => ({
  validate(id) {
    if (!id) {
      return false;
    }
    return id.trim().length !== 0;
  },

  async dispatch(id) {
    const api = httpMethod.delete(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  },

  receive(response) {
    const dispatch = useDispatch();
    const history = useHistory();
    switch (response.status) {
      case NO_CONTENT: {
        history.replace("/");
        break;
      }
      case BAD_REQUEST:
      case INTERNAL_SERVER_ERROR: {
        dispatch(globalUIActions.addToast({ message: response.statusText }));
        break;
      }
      default: {
        dispatch(globalUIActions.addToast({ message: "알 수 없는 API 결과 입니다" }));
        break;
      }
    }
  },
});

export default deleteWritingApi;
