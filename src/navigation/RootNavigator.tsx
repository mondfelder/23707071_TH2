import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "@screens/LoginScreen";
import { MainTabs } from "./MainTabs";
import { useAuthStore } from "@stores/authStore";

export const RootNavigator = () => {
  const token = useAuthStore((s) => s.token);

  return (
    <NavigationContainer>
      {token ? <MainTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
};
