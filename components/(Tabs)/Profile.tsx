import { getProfile } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
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
      <Image source={{ uri: data.image }} style={styles.avatar} />
      <Text style={styles.userText}>Username: {data.username}</Text>
      <Text
        style={[
          styles.balanceText,
          data.balance < 0 ? styles.negative : styles.positive,
        ]}
      >
        Balance: {data.balance} KD
      </Text>
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
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: "100%",
    borderWidth: 3,
    borderColor: "#44b464",
    marginBottom: 15,
  },
  userText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#44b464",
  },
  balanceText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "medium",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});
