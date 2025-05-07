import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import Navigator from "./navigator";
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";
import Realm from "realm";
import { DBContext } from "./useContext";

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

// 스플래시 스크린이 자동으로 숨겨지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    async function initRealm() {
      try {
        const realmInstance = await Realm.open({
          path: "nomadDiaryDB",
          schema: [FeelingSchema],
        });
        setRealm(realmInstance);
        console.log("Realm 초기화 성공",realmInstance);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Realm 초기화 실패:", error);
      }
    }
    initRealm();
  }, []);

  if (!realm) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </DBContext.Provider>
  );
}