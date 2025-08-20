import instance from ".";

const getTransaction = async () => {
  const res = await instance.get("/transactions/my");
  return res.data;
};

const withdrawFunds = async (amount: number) => {
  const res = await instance.put("/transactions/withdraw", { amount });
  return res.data;
};

export { getTransaction, withdrawFunds };
