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
import styles_Logbook from "../styles/styles.Logbook";
import db from "../database";



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


  const addsaving = (amount, currentTime) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO savings (amount,time_stamp) VALUES (?, ?);",
        [amount, currentTime], 
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("savings added successfully");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };


  useEffect(() => {
    // fetch budget data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT current_state,type FROM budget WHERE budget_id = 1;",
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


  const [latestbudgetData, setlatestBudgetData] = useState([]);

  useEffect(() => {
    
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT current_state, MAX(budget_id) FROM budget;",
        [],
        (_, { rows }) => {
          setlatestBudgetData(rows._array);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);


  let remaining: number;

  if (budgetData && budgetData.length > 0 && budgetData[0]?.type === "Weekly") {
    remaining = budgetData[0]?.current_state / 7;
  } else {
    remaining = budgetData[0]?.current_state / 30;
  }

  let spent = 0;
  spent = budgetData[0]?.current_state  - latestbudgetData[0]?.current_state 

  let today = 0;

  today = remaining - spent

  let tommorow = 0;
  if ((remaining - spent) <= 0) {
    tommorow =  remaining + today
  }
  else{
    tommorow = remaining
  }


  const currentTime = new Date()
  .toLocaleString("en-CA", {
    timeZone: "Asia/Karachi",
    hour12: false,
  })
  .replace(",", "")
  .replace("04-02", "03-29");


  let tester = 0;
  let tester2 = 0;
  let threshold = "3:00:00";
  let thresh = 0;

   
  tester = parseInt(currentTime.slice(11, 13));
  thresh = parseInt(threshold.slice(0, 2));


  if (tester <= thresh) {
    addsaving((today-0),currentTime);
    tester2 = 69;
    today = tommorow;
    tommorow = remaining;
  }
  
  const [name, setname] = useState([]);

  useEffect(() => {
    // fetch budget data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name, MAX(budget_id) FROM user;",
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

  const username =  name[0]?.name;


  
  const [latest, setlatest] = useState([]);

  useEffect(() => {
    // fetch budget data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT *, MAX(transaction_id) FROM log;",
        [],
        (_, { rows }) => {
          setlatest(rows._array);
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

  const getsavings= () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM savings;",
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

  
  const difference = (remaining- logData[0]?.amount);

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
                  { today | 0}
                </Text>
                <Text style={styles_HomeScreen.budgetText}>Remaining</Text>
              </View>

              <Pressable onPressIn={() => {
               getsavings();
              const currentTime = new Date()
              .toLocaleString("en-CA", {
                timeZone: "Asia/Karachi",
                hour12: false,
              })
              .replace(",", "")
              .replace("04-02", "03-29");
              console.log(currentTime.slice(11,19))
                getbudget();
                
                navigation.navigate("Add Expense")}}>
                <View style={styles_HomeScreen.addButton}>
                  <Image source={require("../images/Add.png")} />
                  <RemainderRing percentage={0} />
                </View>
              </Pressable>

              <View style={styles_HomeScreen.budgetNumberContainer}>
              <Text style={styles_HomeScreen.budgetNumber}>
                {tommorow |  0 }
              </Text>
              <Text style={styles_HomeScreen.budgetText}>Tomorrow</Text>
            </View>

            </View>

            <RemainderIndicator percentage={ (spent/remaining) * 100 } />
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

          <VerticalBarGraph
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
          />
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
          

          <View style={styles_Logbook.card} key={latest[0]?.transaction_id}>
            <View style={styles_Logbook.cardLeft}>
              <Text style={styles_Logbook.cardText}>
                {latest[0]?.transaction_title || "No logs yet"}
              </Text>
              <Text style={styles_Logbook.card_subheading}>
                {latest[0]?.category || "No category yet"} - {latest[0]?.type}
              </Text>
              <Text style={styles_Logbook.card_timestmap}>
                {latest[0]?.time_stamp}
              </Text>
            </View>
            <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}>Rs. {latest[0]?.amount || 0}</Text>
            </View>
          </View>
 
        </View>
      </ScrollView>
    </View>
  );
};


 



export default HomeScreen;
