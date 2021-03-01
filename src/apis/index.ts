import axios from "axios";

const { DEV_SERVER_URL, PROD_SERVER_URL, NODE_ENV } = process.env;

const instance = axios.create({
  baseURL: NODE_ENV === "development" ? DEV_SERVER_URL : PROD_SERVER_URL,
});

export default instance;
