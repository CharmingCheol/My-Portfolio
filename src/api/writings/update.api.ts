import { useHistory } from "react-router-dom";
import { OK } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiManager } from "types/api";
import { Writing, WritingRequestBody } from "types/writing";

type UpdateWritingApi = ApiManager<{ body: WritingRequestBody; id: string }, Writing>;

const isNotEmptyString = (str: string) => {
  if (!str || str.trim().length === 0) {
    return false;
  }
  return true;
};

const updateWritingApi: UpdateWritingApi = (httpMethod) => ({
  validate(args) {
    const { body, id } = args;
    return [body.content, body.title, id].every((value) => isNotEmptyString(value));
  },

  async dispatch(args) {
    const { body, id } = args;
    const api = httpMethod.patch(`${API_URL.WRITINGS}/${id}`, body);
    const response = await receiveApiRequest(api);
    return response;
  },

  receive({ response }) {
    const history = useHistory();
    switch (response.status) {
      case OK: {
        history.replace(`/writing/${response.data.id}`);
        break;
      }
    }
  },
});

export default updateWritingApi;
