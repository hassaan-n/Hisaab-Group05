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
import styles_SubCategory from "../styles/styles.SubCategory";
import styles from "../styles";
import db from "../database";

//not adding anything to database
const SubCategory = () => {
  const navigation = useNavigation();
  //   const { title, amount } = route.params;
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = [
    { name: "Breakfast", id: 1 },
    { name: "Lunch", id: 2 },
    { name: "Dinner", id: 3 },
  ];

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  const addLog = (amount, transaction_title, currentTime, category) => {
    db.transaction((tx) => {
      // tx.executeSql("DROP TABLE IF EXISTS log;");
      // tx.executeSql(
      //   "CREATE TABLE IF NOT EXISTS log (transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, category TEXT, time_stamp TIMESTAMP, amount INTEGER, transaction_title TEXT)"
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
      <View style={styles_SubCategory.title}>
        <Text style={styles.text}>Please Select a</Text>
        <Text style={styles.heading}>Category</Text>
      </View>

      <View style={styles_SubCategory.listContainer}>
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
        <View style={styles_SubCategory.buttonContainer}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              // const currentTime = (new Date().toISOString().slice(0,19).replace('T',' '));
              // const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
              // const now = new Date().toLocaleString('en-CA', { timeZone: 'Asia/Karachi' });
              // const [month, day, year] = now.split('/');
              // const currentTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
              // const currentTime = new Date(now).toISOString();
              // const currentTime = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
              // const currentTime = now.split('/').reverse().join('-');
              const currentTime = new Date();
              //     .toLocaleString("en-CA", {
              //       timeZone: "Asia/Karachi",
              //       hour12: false,
              //     })
              //     .replace(",", "")
              //     .replace("04-02", "03-29");
              //   addLog(amount, title, currentTime, selectedOption.name);
              //   getLog();
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            style={styles.appButtonContainerAlt}
            onPress={() => {
              navigation.navigate("Home");
              // console.log(new Date().toLocaleString()),
              // getDateData();
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

export default SubCategory;

// "SELECT DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date, total_amount FROM (SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY DATE(time_stamp) ORDER BY DATE(time_stamp) ASC LIMIT 7) AS subquery;"

// "SELECT SUM(amount) FROM (SELECT * " +
// "FROM log " +
// "WHERE substr(time_stamp) != null);",

// const currentTime = (new Date().toISOString().slice(0,19).replace('T',' '));
