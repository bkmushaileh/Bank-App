import { register } from "@/api/auth";
import AuthContext from "@/app/context/AuthContext";
import CustomButton from "@/components/customButton";
import userInfo from "@/data/userInfo";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useContext, useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const RegisterScreen = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    username: "",
    password: "",
    image: "",
  });

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { mutate, data } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      setIsAuthenticated(true);
      console.log("Registered Successfully");
    },
    onError: (err) => {
      console.log("ERRROORRR!!!!!", err);
      console.log(data);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    }
  };

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("username", userInfo.username);
    formData.append("password", userInfo.password);
    formData.append("image", userInfo.image);
    console.log(formData);
    mutate(formData);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.textTitle}>Account Details</Text>
        <Image
          source={{ uri: userInfo.image }}
          style={{ height: 230, width: 230, borderRadius: "100%" }}
        />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.imageText}>Choose your profile image</Text>
        </TouchableOpacity>
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
            <CustomButton text={"Register"} onPress={handleRegister} />
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

export default RegisterScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 20,
  },
  imageText: {
    color: "#44b464",
    padding: 8,
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
