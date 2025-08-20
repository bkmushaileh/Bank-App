import instance from ".";

const getTransaction = async () => {
  const res = await instance.get("/transactions/my");
  return res.data;
};

const withdrawFunds = async (amount: number) => {
  const res = await instance.put("/transactions/withdraw", { amount });
  return res.data;
};
const depositFunds = async (amount: number) => {
  const res = await instance.put("/transactions/deposit", { amount });
  return res.data;
};
const transferAmount = async (user: string) => {
  const res = await instance.put(`/transactions/transfer/${user}}`);
  return res.data;
};
export { depositFunds, getTransaction, withdrawFunds };
