import CustomLoginButton from "@/components/customButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("/Users/bashaieralmeshaileh/Developments/bank-app/assets/animation/Banking.json")}
        autoPlay
        loop={true}
        style={styles.lottieStyling}
      />
      <View style={styles.buttonContainer}>
        <CustomLoginButton />
        <View style={{ flexDirection: "row" }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={{ fontWeight: "700" }}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 200,
  },
  buttonContainer: {
    gap: 7,
    alignItems: "center",
  },
  lottieStyling: {
    height: 450,
    width: 450,
  },
});
