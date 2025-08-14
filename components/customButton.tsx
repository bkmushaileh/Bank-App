import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomLoginButton = () => {
  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#44b464",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: 280,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomLoginButton;
