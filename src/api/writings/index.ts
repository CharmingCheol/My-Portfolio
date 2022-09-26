import ApiCore from "../core";

import CreateWritingApi from "./create.api";
import DeleteWritingApi from "./delete.api";
import FindOneWritingApi from "./findOne.api";
import PaginationWritingApi from "./pagination.api";
import UpdateWritingApi from "./update.api";

export const createWritingApi = CreateWritingApi(new ApiCore());
export const deleteWritingApi = DeleteWritingApi(new ApiCore());
export const findOneWritingApi = FindOneWritingApi(new ApiCore());
export const paginationWritingApi = PaginationWritingApi(new ApiCore());
export const updateWritingApi = UpdateWritingApi(new ApiCore());
