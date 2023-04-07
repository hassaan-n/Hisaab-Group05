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

const BudgetSetting = () => {
  const navigation = useNavigation();
  const [NewBudget, onChangeNumber] = React.useState("");
  
  const [budgetAmount, onChangeBudget] = React.useState("");
  

  const addBudget = (current_state,currentTime) => {
    db.transaction((tx) => {

      tx.executeSql("DROP TABLE IF EXISTS budget;");
      tx.executeSql("CREATE TABLE IF NOT EXISTS budget (budget_id INTEGER PRIMARY KEY, time_stamp TIMESTAMP, current_state INTEGER, FOREIGN KEY ('current_state') REFERENCES budget_notifications('message'))");

      console.log("table dropped and created");

      tx.executeSql(
        "INSERT INTO budget (current_state,budget_id,time_stamp) VALUES (?,?,?);",
        [current_state, 1 ,currentTime],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Budget added successfully");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const getbudget = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM budget;",
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
          <Text style={styles_SettingsBox.cardHeading}>Budget</Text>
        </View>

        <View style={styles_SettingsBox.cardInside}>
          <View style={{ marginBottom: 15 }}></View>
          
          
          
          <InputField
            title="Enter New Budget"
            onChangeText={onChangeNumber}
            value={NewBudget}
            inputMode="Numeric"
          />
          <View style={{ marginBottom: 25 }}></View>

          <View style={{ width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                const currentTime = new Date().toLocaleString();
                addBudget(NewBudget,currentTime);
                getbudget();
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

export default BudgetSetting;
