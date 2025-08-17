import { login } from "@/api/auth";
import AuthContext from "@/app/context/AuthContext";
import { LoggedUserInfo } from "@/data/userInfo";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../customButton";

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState<LoggedUserInfo>({
    username: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      console.log("logged in Successfully");
      setIsAuthenticated(true);
      router.dismissTo("/(tabs)/home");
    },
    onError: (err) => {
      console.log("OPPS!! Something went wrong", err);
    },
  });
  const handleLoginButton = () => {
    console.log(userInfo);
    mutate(userInfo);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Image
        source={require("@/assets/images/atm-card.png")}
        style={{ height: 270, width: 270 }}
      />

      <View style={styles.form}>
        <Text style={styles.textTitle}>
          {`Welcome back ${userInfo.username}🫀!`}
        </Text>

        <TextInput
          onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
          placeholder="Please enter your username here.."
          style={styles.input}
          placeholderTextColor={"#d4dfd8"}
        />

        <TextInput
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          placeholder="Please enter your password here.."
          style={styles.input}
          placeholderTextColor={"#d4dfd8"}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <CustomButton text={"Login"} onPress={handleLoginButton} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.dismissTo("/auth/register")}
            >
              <Text style={{ fontWeight: "bold" }}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
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
