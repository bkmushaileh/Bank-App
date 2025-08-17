import { getToken } from "@/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, []);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTintColor: "#44b464" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth/login"
          options={{
            title: "Login",
            headerBackTitle: "Main",
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: "Register",
            headerBackTitle: "Main",
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#44b464",
  },
});
function setIsAuthenticated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
