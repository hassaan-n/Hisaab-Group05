import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_GoalsScreen from "../styles/styles.GoalsScreen";
import styles from "../styles";
import RadioButton from "../components/radioButton";
import db from "../database";

const GoalsScreen = () => {
  const navigation = useNavigation();

  //props for budget input
  const [budgetAmount, onChangeBudget] = React.useState("");
  //props for goal input
  const [goalAmount, onChangeGoal] = React.useState("");

  const [selectedRadioButton, setSelectedRadioButton] = React.useState("");

  const addGoal = (type: string, amount: string) => {
    const timestamp = new Date().toISOString();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO goal (type, amount, time_stamp) VALUES (?, ?, ?);",
        [type, amount, timestamp],
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

  
  const droplog = () => {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS log;");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS log (transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, category TEXT, time_stamp TIMESTAMP, amount INTEGER, transaction_title TEXT)"
      );
      console.log("table dropped and created");
    });
  };

  const addBudget = (amount, currentTime,selectedRadioButton) => {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS budget;");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS budget (budget_id INTEGER PRIMARY KEY AUTOINCREMENT, time_stamp TIMESTAMP, current_state INTEGER, type TEXT, FOREIGN KEY ('current_state') REFERENCES budget_notifications('message'))"
      );

      console.log("table dropped and created");

      tx.executeSql(
        "INSERT INTO budget (current_state,time_stamp,type) VALUES (?,?,?);",
        [amount,currentTime,selectedRadioButton], // pass in parameters as an array
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("new budget added successfully");
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Select the</Text>
          <Text style={styles.heading}>Budget Cycle</Text>
          <RadioButton onRadioButtonPress={setSelectedRadioButton} />
        </View>

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter your</Text>
          <Text style={styles.heading}>Budget</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBudget}
            placeholder={"400"}
            keyboardType="numeric"
            value={budgetAmount}
          />
        </View>

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter the</Text>
          <Text style={styles.heading}>Goal</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeGoal}
            placeholder={"1000"}
            keyboardType="numeric"
            value={goalAmount}
            autoFocus={true}
          />
        </View>

        <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              console.log(selectedRadioButton);
              addGoal(selectedRadioButton, goalAmount);
              // addBudget(budgetAmount);
              getGoal();
              const currentTime = new Date()
                .toLocaleString("en-CA", {
                  timeZone: "Asia/Karachi",
                  hour12: false,
                })
                .replace(",", "")
                .replace("04-02", "03-29");
              addBudget(budgetAmount, currentTime,selectedRadioButton);
              getbudget();
              droplog();
              navigation.navigate("Notis");
            }}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            style={styles.appButtonContainerAlt}
            onPress={() => navigation.navigate("Tut6")}
          >
            <Text style={styles.appButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GoalsScreen;
