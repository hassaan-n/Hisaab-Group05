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

import InputField from "../components/InputField";
import styles_SettingsBox from "../styles/styles.SettingsBox";
import db from "../database";
import Toggle from "react-native-toggle-input";

const GoalSetting = () => {
  const navigation = useNavigation();
  const [NewGoal, onChangeNumber] = React.useState("");


  //get current name of user id 1 from db and return as string
   
  const addGoal = (amount: string) => {
    const timestamp = new Date().toISOString();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO goal (amount, time_stamp) VALUES (?, ?);",
        [amount, timestamp],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Goal added successfully");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  
  const getGoal = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goal;",
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
          <Text style={styles_SettingsBox.cardHeading}>Goal</Text>
        </View>

        <View style={styles_SettingsBox.cardInside}>
          <View style={{ marginBottom: 15 }}></View>
          

    
          <InputField
            title="Enter New Goal"
            onChangeText={onChangeNumber}
            value={NewGoal}
            inputMode="Numeric"
          />
          <View style={{ marginBottom: 25 }}></View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                addGoal(NewGoal);
                getGoal();
                navigation.goBack();
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}></View>

          

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.appButtonContainerAlt}>
              
              <Text style={styles.appButtonText}>Cancel</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalSetting;
