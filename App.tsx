import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigator from "./navigator";
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";
import { RealmProvider } from "@realm/react";

const FeelingSchema = {
  name: "Feeling",
  primaryKey: "_id",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
};

// 스플래시 스크린이 자동으로 숨겨지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <RealmProvider schema={[FeelingSchema]}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </RealmProvider>
  );
}