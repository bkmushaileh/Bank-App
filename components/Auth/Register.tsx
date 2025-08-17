import CustomButton from "@/components/customButton";
import userInfo from "@/data/userInfo";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import useMutation from ;

const RegisterScreen = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    username: "",
    password: "",
    image: "",
  });
  // const {mutate} = useMutation({});
  const handleRegisterButton = () => {
    alert("Register pressed");
  };

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
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userInfo.image }}
        style={{ height: 230, width: 230, borderRadius: "100%" }}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <View style={styles.form}>
        <Text style={styles.textTitle}>Account Details</Text>

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
            <CustomButton text={"Register"} onPress={handleRegisterButton} />
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
function useMutation(): [any, any] {
  throw new Error("Function not implemented.");
}
