import { getProfile } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back {data.username} 🫀 !</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// const HomeScreen = () => {
//   return (
//     <View>

//       <Text >Welcome </Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
