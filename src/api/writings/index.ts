import ApiCore from "../core";

import CreateWritingApi from "./create.api";
import DeleteWritingsApi from "./delete.api";
import FindOneWritingsApi from "./findOne.api";
import PaginationWritingsApi from "./pagination.api";
import UpdateWritingsApi from "./update.api";

export const createWritingApi = new CreateWritingApi(new ApiCore());
export const deleteWritingsApi = new DeleteWritingsApi(new ApiCore());
export const findOneWritingsApi = new FindOneWritingsApi(new ApiCore());
export const paginationWritingsApi = new PaginationWritingsApi(new ApiCore());
export const ipdateWritingsApi = new UpdateWritingsApi(new ApiCore());
