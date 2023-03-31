import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_Logbook from "../styles/styles.Logbook";
import styles from "../styles";
import RadioButton from "../components/logradiobutton";
import db from "../database";

<<<<<<< Updated upstream

const logbook = () => {
=======
const Logbook = () => {
>>>>>>> Stashed changes
  const navigation = useNavigation();

  // state to hold the log data
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    // fetch log data from the database when the component mounts
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM log;",
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>View all Expenses</Text>
          <Text style={styles.heading}>Log Book</Text>
        </View>

        <View>
          <Text style={styles.filter_text}>Filters :</Text>
          <ScrollView horizontal={true}>
            <RadioButton onRadioButtonPress={setSelectedRadioButton} />
          </ScrollView>
        </View>
<<<<<<< Updated upstream
         
        {/* <RadioButton time="Weekly" /> */}
 

          {/* Input section inside the container which contains seperate items as single containers */}
 

        {/* Button Sectoion*/}
        {/* <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Continue</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles_GoalsScreen.card}>
        
        <Text style={styles_GoalsScreen.cardText}>Fusion Burger</Text>
        <Text style={styles.card_subheading}>Food - Dinner</Text>
        <Text style={styles.card_timestmap}> 9:00PM 1st March 2023</Text>
        <Text style={styles_GoalsScreen.price}> RS.400 </Text>

        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Pasta</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              8:00PM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.400 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>McDonalds</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              9:00PM 2st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.100 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Fusion Burger</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              9:30PM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.300 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Omelette</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              7:00AM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.200 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Pasta</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              8:00PM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.400 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Pasta</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              9:00PM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.400 </Text>
          </View>
        </View>

        <View style={styles_Logbook.card}>
          <View style={styles_Logbook.cardLeft}>
            <Text style={styles_Logbook.cardText}>Fusion Burger</Text>
            <Text style={styles_Logbook.card_subheading}>Food - Dinner</Text>
            <Text style={styles_Logbook.card_timestmap}>
              {" "}
              9:00PM 1st March 2023
            </Text>
          </View>
          <View style={styles_Logbook.cardRight}>
            <Text style={styles_Logbook.price}> RS.400 </Text>
          </View>
        </View>
         

        <View style={styles_GoalsScreen.buttonContainer}>
=======

        {/* map over the log data to display each log entry */}
        {logData.map((entry) => (
          <View style={styles_Logbook.card} key={entry.id}>
            <View style={styles_Logbook.cardLeft}>
              <Text style={styles_Logbook.cardText}>{entry.transaction_title}</Text>
              <Text style={styles_Logbook.card_subheading}>
                {entry.category} - {entry.type}
              </Text>
              <Text style={styles_Logbook.card_timestmap}>
                {entry.time_stamp}
              </Text>
            </View>
            <View style={styles_Logbook.cardRight}>
              <Text style={styles_Logbook.price}>Rs. {entry.amount}</Text>
            </View>
          </View>
        ))}

        <View style={styles_Logbook.buttonContainer}>
>>>>>>> Stashed changes
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

<<<<<<< Updated upstream
export default logbook;


const addGoal = (title, amount, type) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO goal (title, amount, type) VALUES (?, ?, ?);',
      [title, amount, type],
    );
  });
};
=======
export default Logbook;
>>>>>>> Stashed changes
