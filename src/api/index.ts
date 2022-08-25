import baseAxios from "./core";

import BaseWritingsApi from "./writings";
import BaseImagesApi from "./images";

import ApiOptions from "./options";
import RetryOption from "./options/retry-options";

// options
const retryOption = new RetryOption(baseAxios);
export const apiOptions = new ApiOptions(retryOption);

// apis
export const baseWritingsApi = new BaseWritingsApi(baseAxios, apiOptions);
export const baseImagesApi = new BaseImagesApi(baseAxios, apiOptions);
