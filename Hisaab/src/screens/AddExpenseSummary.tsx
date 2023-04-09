import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
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
import styles from "../styles";
import styles_HomeScreen from "../styles/styles.HomeScreen";
import styles_Summary from "../styles/styles.Summary";
import db from "../database";



import { sendBreakfastNotification } from "../RecomendNotiScheduler";
import { sendLunchNotification } from "../RecomendNotiScheduler";
import { sendDinnerNotification } from "../RecomendNotiScheduler";


  

const AddExpenseSummary = ({ route }: any) => {


  
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

  
  const addLog = (
    amount,
    transaction_title,
    currentTime,
    category,
    sub_category
  ) => {
    db.transaction((tx) => {
      tx.executeSql("PRAGMA table_info(log);")
      tx.executeSql(
        "INSERT INTO log (amount,transaction_title,time_stamp, category, sub_category) VALUES (?,?,?,?,?);",
        [amount, transaction_title, currentTime, category, sub_category], // pass in parameters as an array
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
          // console.log(error);
        }
      );
    });
  };


  const [logData, setLogData] = useState<any>([]);

  useEffect(() => {
    // fetch log data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM log;",
        [],
        (_, { rows }) => {
          console.log(rows);
          setLogData(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);




  
  const navigation = useNavigation();
  const { title, amount, category, sub_category, difference } = route.params;
  console.log(title, amount, category, sub_category,);
  let Title = title;
  let Expense = amount;
  let Category = category;
  //set sub category as not applicaple if value is null 
  const Sub_category = sub_category ? sub_category : "Not Applicable";
  let reultant_state =  difference - amount;



   

  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_Summary.title}>
        <Text style={styles.heading}>Summary</Text>
        <Text style={styles.text}>Please check the details before adding</Text>
      </View>

      <View style={styles_HomeScreen.card}>
        <View style={styles_HomeScreen.cardHeader}>
          <Text style={styles_HomeScreen.cardHeading}>Details</Text>
        </View>

        <View style={styles_Summary.cardContent}>
          <Text style={styles.textBold}>Title:</Text>
          <Text style={styles.text}>{Title}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Expense:</Text>
          <Text style={styles.text}>{Expense}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Category:</Text>
          <Text style={styles.text}>{Category}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Subcategory:</Text>
          <Text style={styles.text}>{Sub_category}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>remaining:</Text>
          <Text style={styles.text}>{reultant_state}</Text>
          <View style={{ height: 10 }}></View>

        </View>
      </View>

      <View style={styles_Summary.buttonContainer}>
      <TouchableOpacity
          onPress={() => {
            const currentTime = new Date()
            .toLocaleString("en-CA", {
              timeZone: "Asia/Karachi",
              hour12: false,
            })
            .replace(",", "")
            addBudget(reultant_state,currentTime);
            addLog(Expense,Title,currentTime,Category,Sub_category);
            getLog();


            // notification code
            getBreakfastLogs(1000)
            .then((titles) => {
              const message = titles.join(', ');
              sendBreakfastNotification("Breakfast Recommendations", message);
              console.log(message); 
            })
            .catch((error) => {
              console.error(error);
            });

            getLunchLogs(1000)
            .then((titles) => {
              const message = titles.join(', ');
              sendLunchNotification("Lunch Recommendations", message);
              console.log(message); 
            })
            .catch((error) => {
              console.error(error);
            });

            getDinnerLogs(1000)
            .then((titles) => {
              const message = titles.join(', ');
              sendDinnerNotification("Dinner Recommendations", message);
              console.log(message); 
            })
            .catch((error) => {
              console.error(error);
            });


            navigation.navigate("Splash")}}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Confirm</Text>
        </TouchableOpacity>
        <View style={{ height: 10 }}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Splash")}
          style={styles.appButtonContainerAlt}
        >
          <Text style={styles.appButtonText}>Cancel</Text>
        </TouchableOpacity>


      </View>
      
    </View>
  );
};




const getBreakfastLogs = (threshold: number): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
        ['Food', 'Breakfast', threshold],
        (_, { rows }) => {
          const data = rows._array;
          const titles = data.map((row) => row.transaction_title);

          resolve(titles);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};


const getLunchLogs = (threshold: number): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
        ['Food', 'Lunch', threshold],
        (_, { rows }) => {
          const data = rows._array;
          const titles = data.map((row) => row.transaction_title);

          resolve(titles);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const getDinnerLogs = (threshold: number): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT transaction_title FROM log WHERE category = ? AND sub_category = ? AND amount < ? ORDER BY RANDOM() LIMIT 2',
        ['Food', 'Dinner', threshold],
        (_, { rows }) => {
          const data = rows._array;
          const titles = data.map((row) => row.transaction_title);

          resolve(titles);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};



export default AddExpenseSummary;
