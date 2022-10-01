import { HookCallback } from "@toast-ui/editor/types/editor";
import { CREATED } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { ApiManager } from "types/api";

type WritingContentImageApi = ApiManager<File, { path: string }>;

const writingContentImageApi: WritingContentImageApi = (httpMethod) => ({
  validate(file) {
    if (!file.name) {
      return false;
    }
    if (hasOnlyExtensionName(file.name) || hasOnlyExtensionForm(file.name)) {
      return false;
    }
    if (!hasImageExtension(file.name)) {
      return false;
    }
    return true;
  },

  async dispatch(file) {
    const formData = getFormData(file);
    const api = httpMethod.post(`${API_URL.IMAGES}/writings/contents`, formData);
    const response = await receiveApiRequest(api);
    return response;
  },

  receive(response, callback: HookCallback) {
    switch (response.status) {
      case CREATED: {
        callback(response.data.path);
        break;
      }
    }
  },
});

export default writingContentImageApi;

const getFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("writings", file);
  return formData;
};

/**
 * 확장자 이름만 있는 경우
 * @example "jpg" -> ["jpg"] -> [""] -> true
 * @example "aa.jpg" -> ["aa", "jpg"] -> ["aa"] -> false
 */
const hasOnlyExtensionName = (fileName: string) => {
  const splited = fileName.split(".");
  splited.pop();
  if (splited.length === 0) {
    return true;
  }
  return false;
};

/**
 * 확장자 형식으로만 되어 있는 경우
 * @example ".jpg" -> ["", "jpg"] -> [""] -> true
 * @example "aa.jpg" -> ["aa", "jpg"] -> ["aa"] -> false
 */
const hasOnlyExtensionForm = (fileName: string) => {
  const splited = fileName.split(".");
  splited.pop();
  if (splited.length === 1 && splited[0] === "") {
    return true;
  }
  return false;
};

const hasImageExtension = (fileName: string) => {
  const splited = fileName.split(".");
  const extension = splited.pop();
  if (extension?.match(/jpg|jpeg|png/)) {
    return true;
  }
  return false;
};
