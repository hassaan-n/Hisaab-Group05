import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import app name and version from package.json
import { name, version } from "../../package.json";

import { useNavigation } from "@react-navigation/native";
import styles from "../styles";



const SplashScreen = () => {
  const navigation = useNavigation();

  //function to move to home screen
  const MoveToHome = () => {
    navigation.navigate("Home");
  };

  
  return (
    // mega container with all the elements

    // const result = await launchImageLibrary(options?);

    <View style={styles.container}>
      <Text style={styles.heading}>Hisaab</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate("Sign Up")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Summary")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Splashscreen</Text>
        </TouchableOpacity>


      
    
    </View>
    


     

      

    

    
  );
};

export default SplashScreen;
