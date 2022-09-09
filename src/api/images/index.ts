import ApiCore from "../core";

import UploadImagesApi from "./upload.api";

export const uploadImagesApi = new UploadImagesApi(new ApiCore());
