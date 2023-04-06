import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import styles_HomeScreen from "../styles/styles.HomeScreen";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import db from "../database";
import Bar from "./Bar";



import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";

const HomeScreen = () => {
  const navigation = useNavigation();
  const profilePicture = require("../images/hisaab.png");
  const tomorrowBudget = 200;
  const todayRemaining = 400;
  const percentageRemaining = 100 - (3 / 4) * 100;
  const todayBudget: number = 500;
  const barData = [20, 45, 28, 80, 99, 43, 24];
  const barDataDays = ["M", "T", "W", "T", "F", "S", "S"];

  useEffect(() => {
    const intervalId = setInterval(() => {
    }, 1000); // Refresh every second

    return () => clearInterval(intervalId);
  }, [ ]);

  
  const [displayname, setname] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name, MAX(id) FROM user;",
        [],
        (_, { rows }) => {
          setname(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const username =  displayname[0]?.name;

  const RemainderIndicator = ({ percentage }) => {
    let colorState: string = "#55C595";
    percentage = Math.round(percentage);

    if (percentage <= 30) {
      colorState = "#E3242B";
    } else if (percentage <= 80) {
      colorState = "#55C595";
    }

    let content = (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 18,
            color: colorState,
          }}
        >
          {" "}
          {percentage}%
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 12,
            color: "#215273",
            marginTop: -5,
          }}
        >
          Used
        </Text>
      </View>
    );

    return content;
  };

  const RemainderRing = ({ percentage }) => {
    let colorState: string = "#55C595";
    let colorState2: string = "#FFFFFF";

    if (percentage <= 30) {
      colorState = "#E3242B";
      colorState2 = "#F2B5AA";
    } else if (percentage <= 80) {
      colorState = "#55C595";
    }
    percentage = Math.round(100 - percentage);

    let content = (
      <AnimatedCircularProgress
        style={{ position: "absolute" }}
        size={80}
        width={8}
        rotation={0}
        fill={percentage}
        tintColor={colorState}
        backgroundColor={colorState2}
        renderCap={({ center }) => (
          <Circle cx={center.x} cy={center.y} r="4" fill={colorState} />
        )}
      />
    );

    return content;
  };

  
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

  const addLog = (amount, transaction_title, currentTime) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO log (amount, transaction_title, time_stamp) VALUES (?, ?, ?);",
        [amount, transaction_title, currentTime], // pass in parameters as an array
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
    });700
  };

  
   const difference = (budgetData[0]?.current_state - logData[0]?.amount) - 6000;

  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_HomeScreen.welcomeContainer}>
        <View style={styles_HomeScreen.helloText}>
          <Text style={styles.text}>Hello</Text>
          <Text style={styles.heading}>{username}</Text>
        </View>

        <Pressable onPressIn={() => navigation.navigate("Profile")}>
          <View style={{ marginTop: 10 }}></View>
          <Image
            style={styles_HomeScreen.profilePicture}
            source={profilePicture}
          />
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Daily</Text>
          </View>

          <View style={styles_HomeScreen.dailyContainer}>
            <View style={styles_HomeScreen.dailyMiddleRow}>
              <View style={styles_HomeScreen.budgetNumberContainer}>
                <Text style={styles_HomeScreen.budgetNumber}>
                  {difference | 0}
                </Text>
                <Text style={styles_HomeScreen.budgetText}>Remaining</Text>
              </View>

              <Pressable onPressIn={() => navigation.navigate("Add Expense")}>
                <View style={styles_HomeScreen.addButton}>
                  <Image source={require("../images/Add.png")} />
                  <RemainderRing percentage={(1000 - difference)/10 | 0 } />
                </View>
              </Pressable>

              <View style={styles_HomeScreen.budgetNumberContainer}>
              <Text style={styles_HomeScreen.budgetNumber}>
                { (1000 + difference) < 1000 ? 
                  (1000 + difference) | 0 : 1000 }
              </Text>
              <Text style={styles_HomeScreen.budgetText}>Tomorrow</Text>
            </View>

            </View>

            <RemainderIndicator percentage={ (1000 - difference)/10 | 0} />
          </View>
        </View>

        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Week Overview</Text>
            <Pressable onPressIn={() => {navigation.navigate("Analytics")}}>
              <Image
                style={{ marginTop: 3 }}
                source={require("../images/Arrow.png")}
              />
            </Pressable>
          </View>
          <View style ={{top:5}}>
          <Text style = {{position: "absolute",left:-1 ,top: 90, zIndex: 2, fontSize:13, transform: [{ rotate: '270deg' }]}}>PKR</Text>
          < Bar/>
          <View style ={styles_HomeScreen.centerText}>
          <Text>Days</Text>
          </View>
          </View>

          {/* <VerticalBarGraph
            data={barData}
            labels={barDataDays}
            width={290}
            height={140}
            barRadius={5}
            barWidthPercentage={0.2}
            barColor="#55C595"
            baseConfig={{
              hasXAxisBackgroundLines: false,
            }}
            style={styles_HomeScreen.graph}
          /> */}
        </View>

        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Recent Expenses</Text>
            <Pressable onPressIn={() => navigation.navigate("Logs")}>
              <Image
                style={{ marginTop: 3 }}
                source={require("../images/Arrow.png")}
              />
            </Pressable>
          </View>

          <Text style={styles.subHeading}>No recent expenses</Text>
        </View>
      </ScrollView>
    </View>
  );
};



// const dailyTotals: any = [];

// const getDateData = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       // "SELECT DATE(time_stamp) as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days') GROUP BY DATE(time_stamp)",
//       "SELECT DATE(time_stamp, 'localtime') as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days', 'localtime') GROUP BY DATE(time_stamp, 'localtime')",
//       // "DROP TABLE IF EXISTS log;",
//       [],
//       (_, { rows }) => {
//         for (let i = 0; i < rows.length; i++) {
//           const row = rows.item(i);
//           dailyTotals.push({
//             date: row.date,
//             total_amount: row.total_amount,
//           });
//         }
//         console.log(dailyTotals);
//       },
//       (_, error) => {
//         console.log(error);
//       }
//     );
//   });
// };

// 



export default HomeScreen;
