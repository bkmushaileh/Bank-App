import { getUsers } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  _id: string;
  username: string;
  image: string;
  balance: number;
};

const UsersScreen = () => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
  });
  if (isFetching) return <ActivityIndicator color={"green"} />;

  const handleTransfer = (username: string) => {
    router.push({
      pathname: "/(transactions)/transfer",
      params: { username },
    });
  };

  const renderItem = ({ item }: { item: User }) => {
    const imageUrlRegex = /^https/i;

    return (
      <View style={styles.card}>
        <Image
          source={
            imageUrlRegex.test(item.image)
              ? { uri: item.image }
              : require("@/assets/images/profile.png")
          }
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.balance}>
            {item.balance.toLocaleString()} KWD
          </Text>
        </View>
        <TouchableOpacity
          style={styles.transferButton}
          onPress={() => {
            handleTransfer(item.username);
          }}
        >
          <Text style={styles.transferText}>Transfer</Text>
        </TouchableOpacity>
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

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#44b464",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  balance: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  transferButton: {
    backgroundColor: "#44b464",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 20,
  },
  transferText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
