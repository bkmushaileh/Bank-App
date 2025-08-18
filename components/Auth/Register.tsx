import { register } from "@/api/auth";
import AuthContext from "@/app/context/AuthContext";
import CustomButton from "@/components/customButton";
import { UserInfo } from "@/data/userInfo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
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

const RegisterScreen = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
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
      router.dismissTo("/(tabs)/home");
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
    formData.append("image", {
      uri: userInfo.image,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
    console.log(formData);
    mutate(formData);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.form}>
        <Text style={styles.textTitle}>Account Details</Text>

        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={
              userInfo.image
                ? { uri: userInfo.image }
                : require("@/assets/images/profile.png")
            }
            style={{ height: 180, width: 180, borderRadius: 100 }}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: "absolute",
              bottom: 0,
              right: "29%",
              backgroundColor: "#44b464",
              borderRadius: 20,
              padding: 8,
              borderWidth: 2,
              borderColor: "#fff",
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 3,
            }}
          >
            <FontAwesome5 name="pen" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  imagePicked: {
    position: "absolute",
    bottom: 0,
    right: "29%",
    backgroundColor: "#44b464",
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
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
