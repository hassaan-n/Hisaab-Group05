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

const Login = ({ route }: any) => {
  const navigation = useNavigation();

  // const [enteredPin, onChangePin] = useState("");
  // //props for the pin state

  // //store name from route
  // const name = route.params.name;
  // const [actualPin, setActualPin] = useState({});
  // let myPin:any = 0;

  const [enteredPin, onChangePin] = useState<string>("");
  // const [actualPin, setActualPin] = useState<string | null>(null);
  const [actualPin, setActualPin] = useState<any>();
  let myPin: string | null = null;
  const name: string = route.params.name;

  const MoveTohome = () => {
    navigation.navigate("Home");
    return <View></View>;
  };

  // useEffect(() => {
  //   getPin(name)
  //     .then((pin) => {
  //       if (pin) {
  //         // Task 1: PIN is not null
  //         // myPin = pin;
  //         // setActualPin(pin)
  //         // Flow(pin);
  //         alert("compare pin")
  //         console.log("Task 1:",myPin,pin,actualPin);
  //       } else {
  //         alert("navi home")
  //         console.log("Task 2");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [name]);
  

  const Flow = () => {
    const checkPin = async () => {
      const pin = await getKey("pin");
      console.log("pin", pin);
      if (pin) {
        setActualPin(pin);
      } else {
        setActualPin(null);
      }
    };
    useEffect(() => {
      checkPin();
    }, [checkPin]);

    let content = (
      <View>
        <Text>lora</Text>
      </View>
    );

    // if (actualPin === null) {
      if(true){
        console.log("pin",actualPin)
      content = (
        <View>
          <MoveTohome />
        </View>
      );
      return content;
    } else {
      content = (
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
              <View style={styles_HomeScreen.inputSingleContainer}>
                <Text style={styles.subHeading}>Pin</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePin}
                  value={enteredPin}
                  placeholder="Enter password"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Button Sectoion*/}
            <View style={styles_HomeScreen.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  //if pin is same as entered pin
                  if (actualPin === enteredPin) {
                    navigation.navigate("Home");
                  } else {
                    alert("Wrong Pin");
                  }
                }}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return content;
  };
  return (
    <View>
      <Flow />
    </View>
  );
};

export default Login;

// DROP TABLE IF EXISTS user

// const getPin  = (name) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT pin FROM user WHERE name = ?",
//         [name],
//         (_, { rows }) => {
//           if (rows.length > 0) {
//             const pin = rows.item(0).pin;
//             resolve(pin);
//           } else {
//             reject(new Error("No user found with that name"));
//           }
//         },
//         (_, error) => {
//           reject(error);
//         }
//       );
//     });
//   });
// };

const getPin = (name: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT pin FROM user WHERE name = ?",
        [name],
        (_, { rows }) => {
          if (rows.length > 0) {
            const pin: number = rows.item(0).pin;
            resolve(pin);
          } else {
            reject(new Error("No user found with that name"));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};