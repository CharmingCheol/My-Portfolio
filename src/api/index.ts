import axios from "axios";
import BaseWritingsApi from "./writings";

const baseAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const baseWritingsApi = new BaseWritingsApi(baseAxios);
