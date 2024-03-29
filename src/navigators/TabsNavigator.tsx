import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import CustomBottomTabs from "../components/CustomBottomTabs";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Products from "../screens/Products";
import Categories from "../screens/Categories";
import Cart from "../screens/Cart";

export type TabsStackParamList = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Products: undefined;
  Categories: undefined;
  ProductDetails:undefined;
  Electronics : undefined;
};
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon(props) {
            return <Icons name="category" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon(props) {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      
      <TabsStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

const Example = () => {
  return <View />;
};
