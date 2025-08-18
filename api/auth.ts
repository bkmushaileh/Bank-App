import { LoggedUserInfo, UserProfile } from "@/data/userInfo";
import axios from "axios";
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
// me

const profile = async (userInfo: UserProfile) => {
  const res = await axios.get("/auth/me");
  await storeToken(res.data.token);
  return res;
};
export { login, profile, register };
