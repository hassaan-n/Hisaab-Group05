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
import styles_AddExpenseCategory from "../styles/styles.AddExpenseCategory";
import styles from "../styles";
import db from "../database";

const AddExpenseCategory = ({ route }: any) => {
  const navigation = useNavigation();
  const { title, amount } = route.params;
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = [
    { name: "Food", id: 1 },
    { name: "Transport", id: 2 },
    { name: "Laundry", id: 3 },
    { name: "Grocery", id: 4 },
    { name: "Subscription", id: 5 },
    { name: "Education", id: 6 },
    { name: "Other", id: 7 },
  ];

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const addLog = (amount, transaction_title, currentTime, category) => {
    db.transaction((tx) => {
      // tx.executeSql("DROP TABLE IF EXISTS log;");
      // tx.executeSql(
      //   "CREATE TABLE IF NOT EXISTS log (transaction_id INTEGER AUTO_INCREMENT, username TEXT, category TEXT, time_stamp TIMESTAMP, amount INTEGER, transaction_title TEXT, PRIMARY KEY (transaction_id, username))"
      // );
      tx.executeSql(
        "INSERT INTO log (amount,transaction_title,time_stamp, category) VALUES (?,?,?,?);",
        [amount, transaction_title, currentTime, category], // pass in parameters as an array
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("title and amount added successfully");
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

  //   //props for budget input
  //   const [expenseTitle, onChangeTitle] = React.useState("");
  //   //props for goal input
  //   const [expenseAmount, onChangeAmount] = React.useState("");

  return (
    // mega container with all the elements

    <View style={styles.container}>
      <View style={styles_AddExpenseCategory.title}>
        <Text style={styles.text}>Please Select a</Text>
        <Text style={styles.heading}>Category</Text>
      </View>

      <View style={styles_AddExpenseCategory.listContainer}>
        {/* Add stuff here */}
        <ScrollView>
          {options.map((option) => (
            <View style={radio_styles.main} key={option.id}>
              <TouchableOpacity onPress={() => handleOptionSelect(option)}>
                <View style={radio_styles.radioWrap}>
                  <View style={radio_styles.radio}>
                    {selectedOption === null ? null : selectedOption.id ===
                      option.id ? (
                      <View style={radio_styles.radioBg} />
                    ) : null}
                  </View>
                  <Text style={radio_styles.radioText}>
                    <Text style={styles.subHeading}>{option.name}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView>
        <View style={styles_AddExpenseCategory.buttonContainer}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              const currentTime = new Date().toLocaleString();
              addLog(amount, title, currentTime, selectedOption.name);
              getLog();
              navigation.navigate("Add Expense");
            }}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            style={styles.appButtonContainerAlt}
            onPress={() => {navigation.navigate("Home"), console.log(new Date().toLocaleString()), getDateData()}}
            
          >
            <Text style={styles.appButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const radio_styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  radioText: { fontSize: 20 },

  radio: {
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },

  radioWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBg: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
    margin: 3,
  },
});

// const getDateData = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         // "SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp BETWEEN date('now', '-7 days') AND date('now') GROUP BY date ORDER BY date ASC;",
//         // "SELECT * from log",
//         // "SELECT SUM(amount) FROM ( SELECT * FROM log WHERE substr(time_stamp, 1, 10) = '01/04/2023');",
//         // // "SELECT SUM(amount) FROM (SELECT * FROM log WHERE DATE(time_stamp) BETWEEN date('now', '-7 days') AND date('now'));",
//         // // "SELECT SUM(amount) AS total_amount FROM log WHERE DATE(time_stamp) BETWEEN date('now', '-7 days') AND date('now');",
//         // // "SELECT SUM(amount) AS total_amount FROM log WHERE substr(time_stamp, 1, 10) BETWEEN strftime('%d/%m/%Y', 'now', '-7 days') AND strftime('%d/%m/%Y', 'now');",
//         // "SELECT SUM(amount) AS total_amount FROM log WHERE substr(time_stamp, 1, 10) BETWEEN strftime('%d/%m/%Y', 'now', '-7 days') AND strftime('%d/%m/%Y', 'now');",
//         // "SELECT DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date, total_amount FROM (SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY DATE(time_stamp) ORDER BY DATE(time_stamp) ASC LIMIT 7) AS subquery;",
//         [],
//         (_, { rows }) => {
//           console.log(rows);
//         },
//         (_, error) => {
//           console.log(error);
//         }
//       );
//     });
//     // return rows;
//   };

// const getDateData = () => {
//   let dailyTotals = [];
//   db.transaction((tx) => {
//     tx.executeSql(
//       "SELECT DATE(STR_TO_DATE(time_stamp, '%d/%m/%Y, %H:%i:%s')) AS date, SUM(amount) AS total_amount " +
//       "FROM log " +
//       "WHERE STR_TO_DATE(time_stamp, '%d/%m/%Y, %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 1 WEEK) " +
//       "GROUP BY DATE(STR_TO_DATE(time_stamp, '%d/%m/%Y, %H:%i:%s')) " +
//       "ORDER BY DATE(STR_TO_DATE(time_stamp, '%d/%m/%Y, %H:%i:%s')) ASC;",
//       [],
//       (tx, results) => {
//         let len = results.rows.length;
//         for (let i = 0; i < len; i++) {
//           let row = results.rows.item(i);
//           dailyTotals.push(row.total_amount);
//         }
//       }
//     );
//   });  
// console.log(Date().STR_TO_DATE(new Date().toLocaleString()));
}

export default AddExpenseCategory;


// "SELECT DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date, total_amount FROM (SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY DATE(time_stamp) ORDER BY DATE(time_stamp) ASC LIMIT 7) AS subquery;"