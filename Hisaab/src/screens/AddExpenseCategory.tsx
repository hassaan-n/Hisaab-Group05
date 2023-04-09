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
  const { title, amount, difference } = route.params;
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = [
    { name: "Food", id: 1 },
    { name: "Transport", id: 2 },
    { name: "Laundry", id: 3 },
    { name: "Grocery", id: 4 },
    { name: "Subscription", id: 5 },
    { name: "Other", id: 7 },
    
  ];

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
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

              if (selectedOption === null) {
                alert("Please select a category");
              } else {
  
  
                if (selectedOption.name == "Food" || selectedOption.name == "Transport") {
                  navigation.navigate("Sub Category", {
                    title: title,
                    amount: amount,
                    category: selectedOption.name,
                    difference: difference,
                  });

                } else {
                    navigation.navigate("Summary", {
                    title: title,
                    amount: amount,
                    category: selectedOption.name,
                    difference: difference,
                  });

              
                }
              }

            
            
            }}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            style={styles.appButtonContainerAlt}
            onPress={() => {
              navigation.navigate("Splash"),
                console.log(new Date().toLocaleString()),
                getDateData();
              ///query breakfast lunch dinner
              //amswer
            }}
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

const getDateData = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // "SELECT DATE(time_stamp) as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days') GROUP BY DATE(time_stamp)",
      "SELECT DATE(time_stamp, 'localtime') as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days', 'localtime') GROUP BY DATE(time_stamp, 'localtime')",
      // "DROP TABLE IF EXISTS log;",
      [],
      (_, { rows }) => {
        const dailyTotals = [];
        for (let i = 0; i < rows.length; i++) {
          const row = rows.item(i);
          dailyTotals.push({
            date: row.date,
            total_amount: row.total_amount,
          });
        }
        console.log(dailyTotals);
      },
      (_, error) => {
        console.log(error);
      }
    );
  });
};
// const getBreakfastLogs = (threshold: number): Promise<string[]> => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
//         ['Food', 'Breakfast', threshold],
//         (_, { rows }) => {
//           const data = rows._array;
//           const titles = data.map((row) => row.transaction_title);

//           resolve(titles);
//         },
//         (_, error) => {
//           reject(error);
//         },
//       );
//     });
//   });
// };


// const getLunchLogs = (threshold: number): Promise<string[]> => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
//         ['Food', 'Lunch', threshold],
//         (_, { rows }) => {
//           const data = rows._array;
//           const titles = data.map((row) => row.transaction_title);

//           resolve(titles);
//         },
//         (_, error) => {
//           reject(error);
//         },
//       );
//     });
//   });
// };

// const getDinnerLogs = (threshold: number): Promise<string[]> => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
//         ['Food', 'Dinner', threshold],
//         (_, { rows }) => {
//           const data = rows._array;
//           const titles = data.map((row) => row.transaction_title);

//           resolve(titles);
//         },
//         (_, error) => {
//           reject(error);
//         },
//       );
//     });
//   });
// };

export default AddExpenseCategory;

// "SELECT DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date, total_amount FROM (SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY DATE(time_stamp) ORDER BY DATE(time_stamp) ASC LIMIT 7) AS subquery;"

// "SELECT SUM(amount) FROM (SELECT * " +
// "FROM log " +
// "WHERE substr(time_stamp) != null);",

// const currentTime = (new Date().toISOString().slice(0,19).replace('T',' '));