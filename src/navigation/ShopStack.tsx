import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@screens/HomeScreen";
import { DetailScreen } from "@screens/DetailScreen";
import { VARIANT } from "@constants/student";

const Stack = createNativeStackNavigator();

export const ShopStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ presentation: VARIANT.detailPresentation }}
    />
  </Stack.Navigator>
);
