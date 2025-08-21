import { getProfile } from "@/api/auth";
import { transferAmount } from "@/api/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TransferScreen = () => {
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState<number>();
  const { username } = useLocalSearchParams();
  const receiverUsername = Array.isArray(username) ? username[0] : username;
  const { mutate, isPending } = useMutation({
    mutationKey: ["transfer"],
    mutationFn: transferAmount,
    onSuccess: () => {
      setAmount(0);
      Alert.alert("Transfer done successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.dismissTo("/(tabs)/users");
    },
    onError: (error) => {
      console.log("My EROR", error);
    },
  });
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleTransfer = () => {
    if (!amount || amount <= 0) {
      return Alert.alert("Error", "Please enter a valid amount");
    }
    if (amount > data.balance) {
      return Alert.alert("Error", "Insufficient balance");
    }
    mutate({ username: receiverUsername, amount: amount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer Funds</Text>
      <Text style={styles.label}>Transfer to: {username}</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter amount to transfer"
        onChangeText={(text) => setAmount(+text)}
        value={amount ? amount.toString() : ""}
      />
      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={() => handleTransfer()}
      >
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

export { TransferScreen };

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
