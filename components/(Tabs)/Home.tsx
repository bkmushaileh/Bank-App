import { getProfile } from "@/api/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  ScrollView,
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
  const [tijoriName, setTijoriName] = useState("");
  const [currentTijoriName, setCurrentTijoriName] = useState("Default Tijouri");
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [tijoriImage, setTijoriImage] = useState<string | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  function handleOpenTijori(event: GestureResponderEvent): void {
    setTijoriOpened(true);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setTijoriImage(result.assets[0].uri);
    }
  }

  function handleDeposit(): void {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      setSavedAmount((prev) => prev + amount);
      setDepositAmount("");
      setTijoriOpened(false);
      setDepositSuccess(true);
      setCurrentTijoriName(tijoriName || currentTijoriName);
      setTijoriName("");
      setTimeout(() => setDepositSuccess(false), 3000);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome back {data.username} 🫀!</Text>

        <View style={styles.safeBox}>
          {tijoriImage && (
            <Image source={{ uri: tijoriImage }} style={styles.tijoriImage} />
          )}
          <Text style={styles.safeTitle}>
            {currentTijoriName}{" "}
            <MaterialIcons name="attach-money" size={24} color="#1ac028" />
          </Text>
          <Text style={styles.safeAmount}>
            Saved: {savedAmount.toFixed(2)} KD
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleOpenTijori}>
            <Text style={styles.buttonText}>Open Tijouri</Text>
          </TouchableOpacity>
        </View>

        {tijoriOpened && (
          <View style={styles.depositContainer}>
            <Text style={styles.tijoriMessage}>
              Tijouri is open. Add a name, image, and more savings{" "}
              <FontAwesome5 name="coins" size={20} color="#f5e71b" />
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Tijouri name"
              placeholderTextColor="#999"
              value={tijoriName}
              onChangeText={setTijoriName}
            />

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>
                {tijoriImage ? "Change Image" : "Pick Image"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
            />

            <TouchableOpacity style={styles.button} onPress={handleDeposit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            {depositSuccess && (
              <Text style={styles.successMessage}>
                Amount added successfully!
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
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
    marginBottom: 20,
    textAlign: "center",
  },
  safeBox: {
    backgroundColor: "#e6fae6",
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginVertical: 12,
    alignItems: "center",
    width: "100%",
    shadowColor: "#145e03",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  tijoriImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  safeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1ac028",
    marginBottom: 16,
    textAlign: "center",
  },
  safeAmount: {
    fontSize: 22,
    color: "#1ac028",
    marginBottom: 20,
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
    width: 280,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: 280,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  depositContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  tijoriMessage: {
    marginBottom: 10,
    fontSize: 16,
    color: "#1ac028",
    fontWeight: "500",
    textAlign: "center",
  },
  successMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "#1ac028",
    fontWeight: "600",
    textAlign: "center",
  },
});
