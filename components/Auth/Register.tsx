import { register } from "@/api/auth";
import AuthContext from "@/app/context/AuthContext";
import CustomButton from "@/components/customButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useContext } from "react";
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
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required").min(6, "Error"),
  image: Yup.string().required("Image is required"),
});

const RegisterScreen = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      setIsAuthenticated(true);
      router.dismissTo("/(tabs)");
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });

  const pickImage = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Formik
        initialValues={{ username: "", password: "", image: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("username", values.username);
          formData.append("password", values.password);
          formData.append("image", {
            uri: values.image,
            name: "profile.jpg",
            type: "image/jpeg",
          } as any);
          mutate(formData);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            <Text style={styles.textTitle}>Account Details</Text>

            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Image
                source={
                  values.image
                    ? { uri: values.image }
                    : require("@/assets/images/profile.png")
                }
                style={{ height: 180, width: 180, borderRadius: 100 }}
              />
              <TouchableOpacity
                onPress={() => pickImage(setFieldValue)}
                style={styles.imagePicked}
              >
                <FontAwesome5 name="pen" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {touched.image && errors.image && (
              <Text style={styles.errorText}>{errors.image}</Text>
            )}

            <TextInput
              onChangeText={handleChange("username")}
              placeholder="Please enter your username here.."
              style={styles.input}
              placeholderTextColor="#999"
              value={values.username.trim()}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              onChangeText={handleChange("password")}
              placeholder="Please enter your password here.."
              style={styles.input}
              placeholderTextColor="#999"
              secureTextEntry
              value={values.password.trim()}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.buttonContainer}>
              <CustomButton text="Register" onPress={handleSubmit as any} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.dismissTo("/auth/login")}
                >
                  <Text style={{ fontWeight: "bold" }}>LOG IN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  form: {
    width: "90%",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 20,
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
  },
  buttonContainer: {
    margin: 20,
    gap: 7,
    alignItems: "center",
  },
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
  errorText: {
    color: "#e74c3c",
    marginBottom: 10,
    marginLeft: 5,
  },
});
