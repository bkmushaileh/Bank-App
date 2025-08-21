import { getProfile } from "@/api/auth";
import { updateUser } from "@/api/user";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<string>("");

  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log("------> data", data);
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  if (isFetching) return <ActivityIndicator color={"green"} />;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0].uri;
      setImage(pickedImage);

      mutate(image);
    }
  };

  const handleWithdraw = () => {
    router.push({ pathname: "/(transactions)/withdraw" });
  };

  const handleDeposit = () => {
    router.push({ pathname: "/(transactions)/deposit" });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["green", "#2ecc71"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.bankName}>Banki🫀</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: image || data.image }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <MaterialIcons name="edit" size={12} color="black" />
            </TouchableOpacity>
          </View>
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

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#e74c3c" }]}
          onPress={handleWithdraw}
        >
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "green" }]}
          onPress={handleDeposit}
        >
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
      </View>

      {isPending && (
        <ActivityIndicator style={{ marginTop: 20 }} color="green" />
      )}
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
  avatarContainer: {
    width: 50,
    height: 50,
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
  },
  iconImage: {
    width: 16,
    height: 16,
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
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
