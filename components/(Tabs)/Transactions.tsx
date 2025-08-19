import { getTransaction } from "@/api/transaction";
import Ionicons from "@expo/vector-icons/Ionicons"; // icons from Expo
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Transaction = {
  _id: string;
  amount: number;
  type: string;
  from: string;
  to: string;
  createdAt: string;
};

const TransactionsScreen = () => {
  const { data, isLoading, isSuccess } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransaction,
  });

  const handleWithdraw = () => {
    router.push("/(transactions)/withdraw");
  };

  if (isLoading) return <ActivityIndicator color="green" />;

  const renderItem = ({ item }: { item: Transaction }) => {
    const isDeposit = item.amount > 0;
    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    let iconName: keyof typeof Ionicons.glyphMap = "repeat";
    let iconColor = "#3498db";

    if (item.type.toLowerCase() === "deposit") {
      iconName = "arrow-down-circle";
      iconColor = "#2ecc71";
    } else if (item.amount < 0 || item.type.toLowerCase() === "withdraw") {
      iconName = "arrow-up-circle";
      iconColor = "#e74c3c";
    }

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name={iconName} size={28} color={iconColor} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={[
                styles.amount,
                isDeposit ? styles.deposit : styles.withdraw,
              ]}
            >
              {isDeposit ? `+ ${item.amount} KWD` : ` ${item.amount} KWD`}
            </Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.account}>From: ****{item.from.slice(-4)}</Text>
          <Text style={styles.account}>To: ****{item.to.slice(-4)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleWithdraw}>
        <Text>Withdraw</Text>
      </TouchableOpacity>
      {isSuccess && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
  },
  deposit: {
    color: "#2ecc71",
  },
  withdraw: {
    color: "#e74c3c",
  },
  type: {
    fontSize: 14,
    color: "#7f8c8d",
    textTransform: "capitalize",
  },
  account: {
    fontSize: 13,
    color: "#95a5a6",
  },
  date: {
    fontSize: 13,
    color: "#95a5a6",
  },
});

export default TransactionsScreen;
