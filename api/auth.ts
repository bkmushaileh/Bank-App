import { LoggedUserInfo } from "@/data/userInfo";
import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo: FormData) => {
  const res = await instance.post("/auth/register", userInfo);
  await storeToken(res.data.token);
  return res;
};

const login = async (userInfo: LoggedUserInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  await storeToken(res.data.token);
  return res;
};

export { login, register };
