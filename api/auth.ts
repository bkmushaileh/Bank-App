import instance from ".";

const register = async () => {
  const res = await instance.post("/register");
  return res;
};

const login = async () => {
  const res = await instance.post("/login");
  return res;
};

export { login, register };
