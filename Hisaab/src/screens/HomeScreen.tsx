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
import { BackHandler } from "react-native";
import db from "../database";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Bar from "./Bar";



const HomeScreen = () => {
  const navigation = useNavigation();
   
  const profilePicture = require("../images/hisaab.png");
  const tomorrowBudget = 200;
  const todayRemaining = 400;
  const percentageRemaining = 100 - (3 / 4) * 100;
  const todayBudget: number = 500;
  const barData = [20, 45, 28, 80, 99, 43, 24];
  const barDataDays = ["M", "T", "W", "T", "F", "S", "S"];

  const [ringColor, setRingColor] = useState("#55C595");

  const [image, setImage] = useState<any>(null);


  //editable layouts
  const [isDailyCollapsed, setIsDailyCollapsed] = useState(false); 
  const [isWeekCollapsed, setIsWeekCollapsed] = useState(false); 
  const [isRecentCollapsed, setIsRecentCollapsed] = useState(false); 
  const [altLayout, setAltLayout] = useState<any>(null);

  const toggleDailyCollapse = () => {
    setIsDailyCollapsed(!isDailyCollapsed);
  };


  const toggleWeekCollapse = () => {
    setIsWeekCollapsed(!isWeekCollapsed);
  };


  const toggleRecentCollapse = () => {
    setIsRecentCollapsed(!isRecentCollapsed);
  };




  const WeekOverviewCard = () => {
    let content = (
      <View style={styles_HomeScreen.card}>
        <TouchableOpacity onPress={toggleWeekCollapse}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Week Overview</Text>
            <Pressable onPressIn={() => {
              if ((latest[0]?.amount || 0) == 0) {
                alert("Please log something first.");
                return;
              }

            navigation.navigate("Analytics");
          
          }}>
            <Image
              style={{ marginTop: 3 }}
              source={require("../images/Arrow.png")}
            />
              </Pressable>

          </View>
        </TouchableOpacity>

        {!isWeekCollapsed && (
          <View style={{ padding:5 }}>
            <Bar />
            <View style={styles_HomeScreen.centerText}>
              <Text style={styles.text}>Days</Text>
            </View>
          </View>
        )}
        </View>
    )
    return content;
  };

  const RecentExpenseCard = () => {
    let content = (
      <View style={styles_HomeScreen.card}>
        <TouchableOpacity onPress={toggleRecentCollapse}>
            <View style={styles_HomeScreen.cardHeader}>
              <Text style={styles_HomeScreen.cardHeading}>Recent Expenses</Text>
              <Pressable onPressIn={() => {
                if ((latest[0]?.amount || 0) == 0) {
                  alert("Please log something first.");
                  return;
                }
                navigation.navigate("Logs");

                }}>
                <Image
                  style={{ marginTop: 3 }}
                  source={require("../images/Arrow.png")}
                />
              </Pressable>
            </View>
        </TouchableOpacity>

        {!isRecentCollapsed && (
            <View style={styles_HomeScreen.cardLog} key={latest[0]?.transaction_id}>
              <View style={styles_HomeScreen.cardLeft}>
                <Text style={styles_HomeScreen.cardText}>
                  {latest[0]?.transaction_title || "No logs yet"}
                </Text>
                <Text style={styles_HomeScreen.card_subheading}>
                  {latest[0]?.category || "No category yet"} - {latest[0]?.sub_category}
                </Text>
                <Text style={styles_HomeScreen.card_timestmap}>
                  {latest[0]?.time_stamp}
                </Text>
              </View>
              <View style={styles_HomeScreen.cardRight}>
              <Text style={styles_HomeScreen.price}>Rs. {latest[0]?.amount || 0}</Text>
              </View>
            </View>
        )}
        </View>
    )
    return content;
  };

  const RecentandExpenseCards = () => {
    let content = (<View></View>)
    //fetch value of altLayout from async storage
    getData().then((value) => {
      setAltLayout(value);
    })


    if (altLayout) {
      content = (
        <View>
          <WeekOverviewCard />
          <RecentExpenseCard />
        </View>
      )
      
    } else {
      content = (
        <View>
        <RecentExpenseCard />
        <WeekOverviewCard />
        </View>
      )
    }
    return content;
  }


  //function to store the layout state in async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@layout', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  //function to retrieve the layout state from async storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Layout')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    // Retrieve the image URI from AsyncStorage when the component mounts
    const getImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("@profileImage");
        if (storedImage !== null) {
          setImage(storedImage);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {}, 10000); // Refresh every second

    return () => clearInterval(intervalId);
  }, []);

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
          //console.log(error);
        }
      );
    });
  }, []);

  const username = displayname[0]?.name;

  const RemainderIndicator = ({ percentage }) => {
    let colorState: string = "#55C595";
    percentage = Math.round(percentage);
    

    if (percentage >= 80) {
      // colorState = "#55C595";
      setRingColor("#E3242B");
    } 

    let content = (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 18,
            color: ringColor,
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

    if (percentage >= 80) {
      
      colorState = "#E3242B";
      colorState2 = "#F2B5AA";
      // colorState2 = "#F2B5AA";
    } else if (percentage >= 30) {
      colorState = "#55C595";
      // "#E3242B"
    }
    console.log(percentage);

    if (percentage >= 100) {
      colorState = "#E3242B";
      percentage=100;
    }
    // percentage = Math.round(percentage);

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
          //console.log(error);
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

  let tester1 = 0;
  let tester2 = 0;
  let threshold = "23:59:00";
  let thresh1 = 0;
  let thresh2 = 0;

   
  tester1 = parseInt(currentTime.slice(11, 13));
  tester2 = parseInt(currentTime.slice(15, 17));

  thresh1 = parseInt(threshold.slice(0, 2));
  thresh2= parseInt(threshold.slice(4,6));


  if ((tester1+tester2) > (thresh1+thresh2)) {
    addsaving((today-0),currentTime);
    console.log(tester1+tester2)
    console.log(tester1+tester2)
    today = tommorow;
    tommorow = remaining;
  }
  
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
          // console.log(error);
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
          //  console.log(error);
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
          // console.log(error);
        }
      );
    });
    700;
  };

  


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
          {image ? (
            <Image
              style={styles_HomeScreen.profilePicture}
              source={{ uri: image }}
            />
          ) : (
            <Image
              style={styles_HomeScreen.profilePicture}
              source={profilePicture}
            />
          )}

        </Pressable>
      </View>

      <ScrollView>
        <View style={styles_HomeScreen.card}>
        <TouchableOpacity onPress={toggleDailyCollapse}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Daily</Text>
          </View>
          </TouchableOpacity>

          {!isDailyCollapsed && (

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
                  <RemainderRing percentage={(spent/remaining) * 100 } />
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
          )}
        </View>

        <RecentandExpenseCards/>


       


    

        

        {/* //view toggle button */}
        
        <TouchableOpacity
          onPress={() => {
          //save to async storage
          setAltLayout(!altLayout)
          AsyncStorage.setItem('@Layout', JSON.stringify(!altLayout))
          }}
          style={styles.appButtonContainerGreen}
        >
          <Text style={styles.appButtonText}>Change Layout</Text>
        </TouchableOpacity>
   
          
        
      
      </ScrollView>
    </View>
  );
};




export default HomeScreen;
