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
      <Text style={styles.balanceText}>Balance: {data.balance} KD</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  balanceText: {
    fontSize: 16,
    color: "green",
    marginTop: 4,
  },
});
