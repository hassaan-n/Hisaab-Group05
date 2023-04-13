import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_HomeScreen from "../styles/styles.SignUp";
import styles from "../styles";
import db from "../database";
import { getKey, storeItem } from "../MyAsyncStorage";
//import { sendNotification } from "../Notifications";

import Toggle from "react-native-toggle-input";
//import { sendNotification } from "../Notifications";

const SignUp = ({route} : any) => {
  const navigation = useNavigation();


  //props for the profile input
  const [text, onChangeText] = React.useState("");
  //props for the pin input
  const [number, onChangeNumber] = React.useState("");
  //props for the pin state
  const [toggle, setToggle] = React.useState(false);
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  //function to handle the submit button
  const Card = ({ pinstate }) => {
    let content;

    if (pinstate) {
      content = (
        <View style={styles_HomeScreen.inputSingleContainer}>
          <Text style={styles.subHeading}>Pin</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter password"
            keyboardType="numeric"
          />
        </View>
      );
    } else {
      content = <View></View>;
    }

    return <View style={{ padding: 0 }}>{content}</View>;
  };

  const storingData = async (key: any) => {
    try {
      await storeItem("signed-in", key);
      console.log("Sign in stored successfully");
    } catch (e) {
      console.log("Failed to store the data to the storage");
    }
  };

  const storePin = async (key: any) => {
    try {
      await storeItem("pin", key);
      console.log("pin stored successfully");
    } catch (e) {
      console.log("Failed to store pin in storage");
    }
  };

  return (
    // mega container with all the elements
    // <View style={[styles_HomeScreen.card, { marginTop: 40}]}>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* image inside the container */}
        <View style={[styles_HomeScreen.imageContainer]}>
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

          <View style={styles_HomeScreen.inputSingleContainer}>
            <Text style={styles.subHeading}>Pin</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter password"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
            />
          </View>

          {/* <Card pinstate={toggle} /> */}
        </View>

        {/* Button Sectoion*/}
        <View style={styles_HomeScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (text == "" || (number == "" && toggle)) {
                alert("Please fill all the fields");
                return;
              }

              userExists(text, (nameExists, error) => {
                if (error) {
                  console.error(error);
                } else {
                  if (nameExists) {
                    alert(`User with name ${text} already exists`);
                    navigation.navigate("Login", {name:text});
                    return;
                  } // true or false
                  else {
                    addUser(text, toggle, number);
                    navigation.navigate("Tut1");
                  }
                }
              });
              storingData(true);
              storePin(number);
              navigation.navigate("Tut1");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const addUser = (name, pinstate, pin) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO user (name, pinstate, pin) VALUES (?, ?, ?);", [
      name,
      pinstate,
      pin,
    ]);
  });
};

const userExists = (name, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM user WHERE name = ?;",
      [name],
      (_, { rows: { _array } }) => {
        if (_array.length === 0) {
          callback(false);
        } else {
          callback(true);
        }
      },
      (_, error) => {
        callback(null, error);
      }
    );
  });
};

const getAllUsers = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM user;",
      [],
      (_, { rows }) => {
        console.log(rows);
      },
      (_, error) => {
        console.log(error);
      }
    );
  });
};

export default SignUp;

// DROP TABLE IF EXISTS user