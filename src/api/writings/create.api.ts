import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { globalUIActions } from "reducers/globalUI";
import { StrictApiManager } from "types/api";
import { Writing, WritingRequestBody } from "types/writing";

type CreateWritingApi = StrictApiManager<WritingRequestBody, Writing>;

const createWritingApi: CreateWritingApi = (httpMethod) => ({
  validate(body) {
    const { title, content } = body;
    if (!title?.trim() || !content?.trim()) {
      return false;
    }
    return true;
  },

  async dispatch(body) {
    const api = httpMethod.post(`${API_URL.WRITINGS}`, body);
    const response = await receiveApiRequest(api);
    return response;
  },

  receive(response) {
    const dispatch = useDispatch();
    const history = useHistory();
    switch (response.status) {
      case OK: {
        history.replace(`/writing/${response.data.id}`);
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

export default createWritingApi;
