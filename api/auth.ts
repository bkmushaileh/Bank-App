import instance from ".";

const register = async (userInfo: FormData) => {
  const res = await instance.post("/register", userInfo);
  return res;
};

const login = async () => {
  const res = await instance.post("/login");
  return res;
};

export { login, register };
