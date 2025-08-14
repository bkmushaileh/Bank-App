import CustomLoginButton from "@/components/customButton";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 150,
      }}
    >
      <LottieView
        source={require("/Users/bashaieralmeshaileh/Developments/bank-app/assets/animation/Banking.json")}
        autoPlay
        loop={true}
        style={{ height: 400, width: 400 }}
      />
      <CustomLoginButton />
      <View style={{ flexDirection: "row" }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => alert("Sign up pressed")}>
          <Text style={{ fontWeight: "bold" }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
