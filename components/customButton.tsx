import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type customText = {
  text: string;
  onPress: () => void;
};

const CustomButton = (props: customText) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "green" : "#44b464" },
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
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

export default CustomButton;
