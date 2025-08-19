import instance from ".";

const getUsers = async () => {
  const res = await instance.get("/auth/users");
  return res.data;
};

export { getUsers };
