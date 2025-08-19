import { getProfile } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isFetching) return <ActivityIndicator color={"green"} />;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#3cb662", "#2ecc71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.bankName}>Banki🫀</Text>
          <Image source={{ uri: data.image }} style={styles.avatar} />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.username}>{data.username}</Text>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text
            style={[
              styles.balance,
              data.balance < 0 ? styles.negative : styles.positive,
            ]}
          >
            {data.balance} KD
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          <Text style={styles.validThru}>Valid Thru 12/28</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  cardBody: {
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#eee",
    marginTop: 5,
  },
  balance: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  positive: {
    color: "#fff",
  },
  negative: {
    color: "#ffb3b3",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 16,
    letterSpacing: 2,
    color: "#fff",
  },
  validThru: {
    fontSize: 14,
    color: "#eee",
  },
});
