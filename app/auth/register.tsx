import CustomButton from "@/components/customButton";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const register = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("/Users/bashaieralmeshaileh/Developments/bank-app/assets/images/atm-card.png")}
        style={{ height: 270, width: 270 }}
      />

      <View style={styles.form}>
        <Text style={styles.textTitle}>Account Details</Text>

        <TextInput
          placeholder="Please enter your username here.."
          style={styles.input}
          placeholderTextColor={"#d4dfd8"}
        />
        <TextInput
          placeholder="Please enter your email here.."
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor={"#d4dfd8"}
        />
        <TextInput
          placeholder="Please enter your password here.."
          style={styles.input}
          placeholderTextColor={"#d4dfd8"}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <CustomButton text={"Register"} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.dismissTo("/auth/login")}>
              <Text style={{ fontWeight: "bold" }}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 80,
  },
  form: {
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    margin: 20,
    gap: 7,
    alignItems: "center",
  },
});
