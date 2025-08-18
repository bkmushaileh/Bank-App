import { getTransaction } from "@/api/transaction";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const TransactionsScreen = () => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransaction,
  });
  console.log("data", data);
  if (isFetching) return <ActivityIndicator color={"green"} />;
  return <View style={styles.container}></View>;
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
});
