import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShopStack } from "./ShopStack";
import { CartScreen } from "@screens/CartScreen";
import { MeScreen } from "@screens/MeScreen";
import { useCartStore } from "@stores/cartStore";
import { theme } from "@constants/theme";

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  const totalQuantity = useCartStore((s) => s.totalQuantity());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      {/* Thứ tự shopFirst: Cửa hàng trước, Giỏ sau */}
      <Tab.Screen name="Cửa hàng" component={ShopStack} />
      <Tab.Screen
        name="Giỏ"
        component={CartScreen}
        options={{
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
        }}
      />
      <Tab.Screen name="Tôi" component={MeScreen} />
    </Tab.Navigator>
  );
};
