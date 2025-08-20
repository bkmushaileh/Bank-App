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
const transferAmount = async ({
  username,
  amount,
}: {
  username: string;
  amount: number;
}) => {
  const res = await instance.put(`/transactions/transfer/${username}`, {
    amount,
  });
  return res.data;
};
export { depositFunds, getTransaction, transferAmount, withdrawFunds };
