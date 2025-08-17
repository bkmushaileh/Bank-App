import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
export default function RootLayout() {
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
