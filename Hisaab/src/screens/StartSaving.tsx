import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_StartSaving from "../styles/styles.StartSaving";

const StartSaving = () => {
  const navigation = useNavigation();

  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_StartSaving.imageContainer}>
        <Image source={require("../images/hisaab.png")} />
        <Text style={styles_StartSaving.Hisaab_Title}>Hisaab</Text>
      </View>

      <View style={styles_StartSaving.textContainer}>
        <Text style={styles.heading}>Let's Start Saving! </Text>
        <Text style={styles.text}>
          The more you log, the smarter the app gets!
        </Text>
      </View>

      {/* Button Sectoion*/}
      <View style={styles_StartSaving.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartSaving;
