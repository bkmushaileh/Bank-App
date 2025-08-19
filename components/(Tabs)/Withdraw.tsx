import { withdrawFunds } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type myAmount = {
  amount: 0;
};
const WithdrawScreen = () => {
  const [amount, setAmount] = useState<number>();
  const { mutate } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: withdrawFunds,
  });
  const handleWithdraw = (amount: number) => {};

  return (
    <View>
      <TextInput
        onChangeText={(text) => setAmount(+text)}
        placeholder="Please enter your your withdraw amount.."
        style={{}}
        placeholderTextColor={"#d4dfd8"}
      />
    </View>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({});
