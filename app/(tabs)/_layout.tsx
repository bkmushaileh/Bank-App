import { deleteToken } from "@/api/storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router, Tabs } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthContext";
const _layout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogOut = async () => {
    await deleteToken();
    setIsAuthenticated(false);
    router.dismissTo("/landingPage");
  };
  // const handleNotification = async () => {
  //   router.push("../notification");
  // };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        animation: "shift",
        headerTintColor: "green",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={20} color={color} />
          ),

          headerRight: () => (
            <React.Fragment>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/notification")}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="notifications" size={24} color="green" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogOut}>
                <MaterialIcons name="logout" size={20} color={"green"} />
              </TouchableOpacity>
            </React.Fragment>
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transctions",
          tabBarIcon: ({ color }) => (
            <Octicons name="credit-card" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-large" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
function setIsAuthenticated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
