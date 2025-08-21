import { getProfile } from "@/api/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const [tijoriOpened, setTijoriOpened] = useState(false);

  const [savedAmount, setSavedAmount] = useState(50);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositSuccess, setDepositSuccess] = useState(false);
  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="green" />
      </View>
    );
  }

  function handleOpenTijori(event: GestureResponderEvent): void {
    setTijoriOpened(true);
  }
  function handleDeposit(): void {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      setSavedAmount((prev) => prev + amount);
      setDepositAmount("");
      setTijoriOpened(false);
      setDepositSuccess(true);
      setTimeout(() => setDepositSuccess(false), 3000);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back {data.username} 🫀 !</Text>
      <View style={styles.safeBox}>
        <Text style={styles.safeTitle}>
          Your Tijouri{" "}
          <MaterialIcons name="attach-money" size={24} color="#1ac028ff" />
        </Text>
        <Text style={styles.safeAmount}>
          Saved: {savedAmount.toFixed(2)} KD
        </Text>
        <TouchableOpacity style={styles.openButton} onPress={handleOpenTijori}>
          <Text style={styles.openText}>Open Tijouri</Text>
        </TouchableOpacity>
      </View>
      {tijoriOpened && (
        <View style={styles.depositContainer}>
          <Text style={styles.tijoriMessage}>
            Tijouri is open, Add more savings{" "}
            <FontAwesome5 name="coins" size={24} color="#dcdf06ff" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="enter amount"
            keyboardType="numeric"
            value={depositAmount}
            onChangeText={setDepositAmount}
          />
          <TouchableOpacity
            style={styles.depositButton}
            onPress={handleDeposit}
          >
            <Text style={styles.depositText}>Save</Text>
          </TouchableOpacity>
          {depositSuccess && (
            <Text style={styles.successMessage}>
              Amount added successfully!
            </Text>
          )}
        </View>
      )}
      {/* {tijoriOpened && (
        <Text style={styles.tijoriMessage}>
          {data.username}🫀, your Tijouri is now open! Keep saving smart 💸
        </Text>
      )} */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  safeBox: {
    backgroundColor: "#e6fae6ff",
    padding: 50,
    borderRadius: 16,
    marginVertical: 12,
    shadowColor: "#145e03ff",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  safeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1ac028ff",
    marginBottom: 16,
  },
  safeAmount: {
    fontSize: 22,
    color: "#74ea7eff",
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: "#075c0eff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  openText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  tijoriMessage: {
    marginTop: 20,
    fontSize: 16,
    color: "#075c0eff",
    fontWeight: "500",
    textAlign: "center",
  },
  depositContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  depositButton: {
    backgroundColor: "#1ac028ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  depositText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "#1ac028ff",
    fontWeight: "600",
  },
});
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// const HomeScreen = () => {
//   return (
//     <View>

//       <Text >Welcome </Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
