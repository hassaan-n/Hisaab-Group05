import React, { useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_Profile from "../styles/styles.Profile";
import InputField from "../components/InputField";
import styles_SettingsBox from "../styles/styles.SettingsBox";
import db from "../database";
import { RotateInDownLeft, Value } from "react-native-reanimated";

const ProfileNameSetting = () => {
  const navigation = useNavigation();
 
  const [NewName, onChangeText] = React.useState("");
 
  const addName = (name) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (name) VALUES (?);",
        [name],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("added successfully");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const getuser = () => {
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


  return (
    // mega container with all the elements
    <View style={styles.container}>
        <View style={styles_SettingsBox.card}>
          <View style={styles_SettingsBox.cardHeader}>
            <Text style={styles_SettingsBox.cardHeading}>Profile</Text>
          </View>

          <View style={styles_SettingsBox.cardInside}>
            <View style={{ marginBottom: 15 }}></View>
            <InputField
              title="New Name"
              onChangeText={onChangeText}
              value={NewName}
              inputMode=""
            />
            <View style={{ marginBottom: 25 }}></View>

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {addName(NewName); 
                  getuser();
                  navigation.goBack()}}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}></View>

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.appButtonContainerAlt}
              >
                <Text style={styles.appButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>   
        </View>
      
      
      
      
      
    
    </View>
  );
};

export default ProfileNameSetting;
