import axios from "axios";

const { DEV_SERVER_URL } = process.env;

const instance = axios.create({
  baseURL: DEV_SERVER_URL,
});

export default instance;
