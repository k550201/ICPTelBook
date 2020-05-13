import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import SearchScreen from "../../screens/SearchScreen";
import { FavoriteScreen } from "../../screens/FavoriteScreen";
import { OrganizationScreen } from "../../screens/OrganizationScreen";
import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";

export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative"}}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="search" component={SearchScreen} />
        <Tab.Screen name="organization" component={OrganizationScreen} />
        <Tab.Screen name="favorite" component={FavoriteScreen}  /> 
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};
