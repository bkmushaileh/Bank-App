import { withdrawFunds } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

type myAmount = {
  amount: 0;
};
const WithdrawScreen = () => {
  const [amount, setAmount] = useState<number>();
  const { mutate, isPending } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: withdrawFunds,
    onSuccess: (data) => {
      Alert.alert("withdraw successful");
    },
    onError: (erro: any) => {
      Alert.alert("ERROR", erro);
    },
  });
  const handleWithdraw = (amount: number) => {
    if (!amount || amount <= 0) {
      Alert.alert("ERROR", "enter valid amount");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setAmount(+text)}
        placeholder="Please enter your your withdraw amount.."
        style={styles.num}
        placeholderTextColor={"#d4dfd8"}
        keyboardType="numeric"
      />
      {/* <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
        <Text>{isPending ? "withdrawing ..." : "Withdraw"}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({
  num: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: "#000",
  },
  button: {},
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
});
