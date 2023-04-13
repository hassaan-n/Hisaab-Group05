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

  //props for the profile input
  const [text, onChangeText] = React.useState("");
  //props for the pin input
  const [number, onChangeNumber] = React.useState("");
  //props for the pin state

  //store name from route 
  const name = route.params.name;

  const [pinstate, setpinstate] = useState([]);
  const [pin, setPin] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT pin FROM user WHERE name = ?;`,
        [name],
        (_, { rows }) => {
          if (rows.length > 0) {
            const pin = rows.item(0).pin;
            // do something with the pin value, such as storing it in state
            setPin(pin);
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, [name]);


  return (
  

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
              onChangeText={onChangeNumber}
              value={number}
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
              //check if the user of name text exists
              userExists(name, (exists, error) => {
                if (exists) {
                  //if the user exists, check if the pin is correct
                  getPinState(name, (pinstate, error) => {
                    //if pinstate is null navigate to home 
                    if (pinstate === null) {
                      // navigation.navigate("Home");
                      alert("Pinstate is null");
                      
                    }
                    //if pinstate is true, check if the pin is correct
                    else if (pinstate) {
                      //if the pin is correct, navigate to home
                      if (number === number) {
                        // navigation.navigate("Home");
                        alert("Pin is correct");
                      } else {
                        //if the pin is incorrect, show an error
                        alert("Incorrect Pin");
                      }
                    }
               
                  });
                } else {
                  //if the user does not exist, show an error
                  alert("User does not exist");
                }
              });

    
              
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Continue</Text>
          </TouchableOpacity>
        
        
        
        
        
        
        
        
        
        
        
        
        </View>




        <View style={styles_HomeScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              alert(pinstate);
              console.log(pinstate);
            }}

           
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>pin</Text>
          </TouchableOpacity>
        
        
        
        
        
        
        
        
        
        
        
        
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
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

//function that fetches the pinstate of the user from the database and returns it
const getPinState = (name, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT pinstate FROM user WHERE name = ${name};`,
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

//funcition that fetches the pin of the user from the database and returns it
// const getPin = (name, callback) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `SELECT pin FROM user WHERE name = ${name};`,
//       [name],
//       (_, { rows: { _array } }) => {
//         if (_array.length === 0) {
//           callback(false);
//         } else {
//           callback(true);
//         }
//       },
//       (_, error) => {
//         callback(null, error);
//       }
//     );
//   });
// };








export default Login;

// DROP TABLE IF EXISTS user
