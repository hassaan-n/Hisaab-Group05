import React from "react";
import {View, Text, TouchableOpacity, Image, TextInput,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_HomeScreen from "../styles/styles.HomeScreen";
import styles from "../styles";
import db from "../database"

import Toggle from "react-native-toggle-input";
import { err } from "react-native-svg/lib/typescript/xml";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  //props for the profile input
  const [text, onChangeText] = React.useState("");
  //props for the pin input
  const [number, onChangeNumber] = React.useState("");
  //props for the pin state
  const [toggle, setToggle] = React.useState(true);

  return (
    // mega container with all the elements
    <View style={styles.container}>
      {/* image inside the container */}
      <View style={styles_HomeScreen.imageContainer}>
        <Image source={require("../images/hisaab.png")} />
      </View>

      {/* Wwelcome section inside the container */}
      <View style={styles_HomeScreen.welcomeContainer}>
        <Text style={styles.heading}>Welcome!</Text>
        <Text style={styles.text}>
          Enter the following details to get started!
        </Text>
      </View>

      {/* Input section inside the container which contains seperate items as single containers */}
      <View style={styles_HomeScreen.inputContainer}>
        {/* Profile*/}
        <View style={styles_HomeScreen.inputSingleContainer}>
          <Text style={styles.subHeading}>Profile Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder={"Enter your name"}
            value={text}
          />
        </View>

        {/* Pin Toggle*/}
        <View style={styles_HomeScreen.inputSingleContainer}>
          <Text style={styles.subHeading}>Enable Pin</Text>
          <Toggle
            color={"#000000"}
            size={20}
            filled={true}
            circleColor={"white"}
            toggle={toggle}
            setToggle={setToggle}
          />
        </View>

        {/* Pin setter*/}
        <View style={styles_HomeScreen.inputSingleContainer}>
          <Text style={styles.subHeading}>Pin</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="*****"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Button Sectoion*/}
      <View style={styles_HomeScreen.buttonContainer}>
        <TouchableOpacity
          onPress={() => {navigation.navigate("Tut1"); addUser(text,toggle,number); getAllUsers();}}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  
const addUser = (name, pinstate, pin) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO user (name, pinstate, pin) VALUES (?, ?, ?);',
      [name, pinstate, pin],
    );
  });
};

const getAllUsers = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user;',
      [],
      (_, { rows }) => {
        console.log(rows);
      },
      (_,error) => {
        console.log(error)
      }
    );
  });
};


export default HomeScreen;
