import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default baseAxios;