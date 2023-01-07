import ApiCore from "apis/core";

import imagesApiSend from "./images";
import writingsApiSend from "./writings";

export const ImagesApiSend = new imagesApiSend(new ApiCore());
export const WritingsApiSend = new writingsApiSend(new ApiCore());
