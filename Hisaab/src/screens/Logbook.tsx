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

const Logbook = () => {
  const navigation = useNavigation();
  const [selectedRadioButton, setSelectedRadioButton] = useState("");
  // state to hold the log data
  const [logData, setLogData] = useState([]);

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

  const filteredLogData = selectedRadioButton
    ? logData.filter((entry) => entry.category === selectedRadioButton)
    : logData;
  filteredLogData.sort((a, b) => b.transaction_id - a.transaction_id);

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

        {/* map over the log data to display each log entry */}
        {filteredLogData.map((entry) => (
          <View style={styles_Logbook.card} key={entry.id}>
            <View style={styles_Logbook.cardLeft}>
              <Text style={styles_Logbook.cardText}>
                {entry.transaction_title}
              </Text>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
              console.log(new_arr);
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

export default Logbook;
