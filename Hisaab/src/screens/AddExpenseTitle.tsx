import React, { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
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
import styles_AddExpenseTitle from "../styles/styles.AddExpenseTitle";
import styles from "../styles";
import styles_Logbook from "../styles/styles.Logbook";
import RadioButton from "../components/radioButton";
import db from "../database";

const AddExpenseTitle = () => {
  const navigation = useNavigation();

  //props for budget input
  const [transaction_title, onChangeTitle] = React.useState("");
  //props for goal input
  const [amount, onChangeAmount] = React.useState("");

  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    // fetch budget data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT current_state, MAX(budget_id) FROM budget;",
        [],
        (_, { rows }) => {
          setBudgetData(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const [logData, setLogData] = useState([]);

  useEffect(() => {
    // fetch log data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT amount, MAX(transaction_id) FROM log;",
        [],
        (_, { rows }) => {
          setLogData(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  // const addLog = (amount, transaction_title, currentTime) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "INSERT INTO log (amount, transaction_title, time_stamp) VALUES (?, ?, ?);",
  //       [amount, transaction_title, currentTime], // pass in parameters as an array
  //       (_, { rowsAffected }) => {
  //         if (rowsAffected > 0) {
  //           console.log("title and amount added successfully");
  //         }
  //       },
  //       (_, error) => {
  //         console.log(error);
  //       }
  //     );
  //   });
  // };

  const [budgetAmount, onChangeBudget] = React.useState("");

  const addBudget = (current_state,currentTime) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO budget (current_state,time_stamp) VALUES (?,?);",
        [current_state, currentTime],
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

  const getLog = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM log;",
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


  const difference = budgetData[0]?.current_state - logData[0]?.amount;
 
    return (
      // mega container with all the elements
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles_AddExpenseTitle.inputSingleContainer}>
            <Text style={styles.text}>Please Enter the</Text>
            <Text style={styles.heading}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTitle}
              placeholder={"Burger"}
              value={transaction_title}
            />
          </View>
  
          <View style={styles_AddExpenseTitle.inputSingleContainer}>
            <Text style={styles.text}>Please Enter the</Text>
            <Text style={styles.heading}>Expense</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeAmount}
              placeholder={"1000"}
              keyboardType="numeric"
              value={amount}
              autoFocus={true}
            />
          </View>

          <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Total Budget Remaining</Text>
            <Text style={styles_Logbook.price}>Rs. {difference}</Text>
          </View>
        </View>

      
          <KeyboardAvoidingView>
            <View style={styles_AddExpenseTitle.buttonContainer}>
              <TouchableOpacity
                style={styles.appButtonContainer}
  
                onPress={() => {
  
  
                  const currentTime = new Date().toLocaleString();
                  // addLog(amount,transaction_title,currentTime);
                  // getLog();

                  const currentTime2 = new Date().toLocaleString();
                  addBudget(difference,currentTime2);
                  navigation.navigate("Choose Category", {
                    title: transaction_title,
                    amount: amount,
                  });
                  
                }}
              >
                <Text style={styles.appButtonText}>Submit</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}></View>
  
              <TouchableOpacity
                style={styles.appButtonContainerAlt}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.appButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default AddExpenseTitle;