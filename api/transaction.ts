import instance from ".";

const getTransaction = async () => {
  const res = await instance.get("/transactions/my");
  return res.data;
};

export { getTransaction };
