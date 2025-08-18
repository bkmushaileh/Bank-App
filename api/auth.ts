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
  console.log(res.data.token);
  await storeToken(res.data.token);
  return res;
};
const getProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data;
};

export { getProfile, login, register };
