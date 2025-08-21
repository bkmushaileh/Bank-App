import instance from ".";

const getUsers = async () => {
  const res = await instance.get("/auth/users");

  return res.data;
};

const updateUser = async (image: string) => {
  const res = await instance.put("/auth/profile", { image });
  return res.data;
};
export { getUsers, updateUser };
