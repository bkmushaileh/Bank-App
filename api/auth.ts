import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo: FormData) => {
  const res = await instance.post("/auth/register", userInfo);
  console.log(res.data);
  await storeToken(res.data.token);
  return res;
};

const login = async () => {
  const res = await instance.post("/auth/login");
  return res;
};

export { login, register };
