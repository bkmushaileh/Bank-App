import { getProfile } from "@/api/auth";
import { depositFunds } from "@/api/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DepositScreen = () => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(0);
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["deposit"],
    mutationFn: depositFunds,
    onSuccess: () => {
      Alert.alert("Success", "Deposit successful");
      setAmount(0);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.dismissTo("/(tabs)/profile");
    },
    onError: () => {
      Alert.alert("Error", "Something went wrong. Please try again");
    },
  });

  const handleDeposit = (amount: number) => {
    if (!amount || amount <= 0) {
      return Alert.alert("Error", "Please enter a valid amount");
    }

    mutate(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deposit Funds</Text>

      <Text style={styles.label}>Available Balance: {data.balance} KWD</Text>

      <TextInput
        value={amount ? amount.toString() : ""}
        onChangeText={(text) => setAmount(+text)}
        placeholder="Enter amount to withdraw"
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="decimal-pad"
      />

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={() => handleDeposit(amount)}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Processing..." : "Deposit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#95d6a3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
