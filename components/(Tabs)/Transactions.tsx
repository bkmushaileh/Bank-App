import { getTransaction } from "@/api/transaction";
import Ionicons from "@expo/vector-icons/Ionicons"; // icons from Expo
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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
  const { data, isFetching, isSuccess } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransaction,
  });

  if (isFetching) return <ActivityIndicator color="green" size="large" />;

  const renderItem = ({ item }: { item: Transaction }) => {
    const isDeposit = item.type.toLowerCase() === "deposit";

    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    let iconName: keyof typeof Ionicons.glyphMap = "repeat";
    let iconColor = "#3498db";

    if (isDeposit) {
      iconName = "arrow-down-circle";
      iconColor = "#2ecc71";
    } else if (item.type.toLowerCase() === "withdraw") {
      iconName = "arrow-up-circle";
      iconColor = "#e74c3c";
    }

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name={iconName} size={32} color={iconColor} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text
              style={[
                styles.amount,
                isDeposit ? styles.deposit : styles.withdraw,
              ]}
            >
              {` ${item.amount} KWD`}
            </Text>
            <View style={styles.typeContainer}>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={[styles.rowBetween, { marginTop: 12 }]}>
          <Text style={styles.account}>From: ****{item.from.slice(-4)}</Text>
          <Text style={styles.account}>To: ****{item.to.slice(-4)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: "#f2f3f7",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 20,
    fontWeight: "700",
  },
  deposit: {
    color: "#2ecc71",
  },
  withdraw: {
    color: "#e74c3c",
  },
  typeContainer: {
    marginTop: 4,
    backgroundColor: "#e0e5ec",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  type: {
    fontSize: 12,
    color: "#7f8c8d",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  account: {
    fontSize: 13,
    color: "#95a5a6",
  },
  date: {
    fontSize: 12,
    color: "#95a5a6",
  },
});

export default TransactionsScreen;
