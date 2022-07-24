import axios from "axios";
import WritingsApi from "./writings";

const baseAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const writingsApi = new WritingsApi(baseAxios);
