import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerTintColor: "green" }}>
      <Stack.Screen
        name="transfer"
        options={{
          title: "Transfer",
          headerBackTitle: "Users",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};
export default _layout;
