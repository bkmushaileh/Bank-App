import axios from "axios";

const instance = axios.create({
  baseURL: "/mini-project/api/auth/",
});

export default instance;
