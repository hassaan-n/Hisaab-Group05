import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./src/navigation";
import * as Font from "expo-font";
import { useEffect } from "react";
import React from "react";
import  AppLoading  from 'expo-app-loading'
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler'
import 'react-native-reanimated'






export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}

