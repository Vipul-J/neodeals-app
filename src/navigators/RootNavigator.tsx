import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ProductDetails from "../screens/ProductDetails";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import Categories from "../screens/Categories";
import { Electronics } from "../screens/Electronics";

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  ProductDetails: {
    id: string;
  };
  Categories: undefined;
  Electronics:undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Electronics"
        component={Electronics}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
