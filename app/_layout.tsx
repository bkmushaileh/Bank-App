import { getToken } from "@/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  console.log(isAuthenticated);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuthenticated(true);
      console.log(token);
    }
  };
  useEffect(() => {
    checkToken();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Stack screenOptions={{ headerTintColor: "green" }}>
          <Stack.Screen name="landingPage" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Login",
              headerBackTitle: "Main",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(transactions)/withdraw"
            options={{ title: "Withdraw", headerBackTitle: "Profile" }}
          />
          <Stack.Screen
            name="(transactions)/deposit"
            options={{ title: "Deposit", headerBackTitle: "Profile" }}
          />
          <Stack.Screen
            name="(transactions)/transfer"
            options={{ title: "Transfer", headerBackTitle: "Users" }}
          />
          <Stack.Screen
            name="(transactions)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="auth/register"
            options={{
              title: "Register",
              headerBackTitle: "Main",
              headerShown: false,
            }}
          />
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />
          </Stack.Protected>
        </Stack>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
