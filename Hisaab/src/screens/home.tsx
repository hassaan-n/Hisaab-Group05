import React from "react";
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
import styles_GoalsScreen from "../styles/styles.GoalsScreen";
import styles from "../styles";
import RadioButton from "../components/radioButton";
import db from "../database"
import styles_HomeScreen from "../styles/styles.HomeScreen";
import SpendingChart from './spending';



const GoalScreen = () => {
  const navigation = useNavigation();

  //props for budget input
  const [budget, onChangeBudget] = React.useState("");
  //props for goal input
  const [number, onChangeNumber] = React.useState("");

  return (
    // mega container with all the elements
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.analytics}>
          <Text style={styles.text}>Review your spending patterns</Text>
          <Text style={styles.heading}>Analytics</Text>
        </View>

        <View style={styles_HomeScreen.card}>
          <View style={styles_HomeScreen.cardHeader}>
            <Text style={styles_HomeScreen.cardHeading}>Spending Report</Text>
          </View>
          <View style = {styles.analytics}>
            < SpendingChart />
          </View>
        </View>
        {/* <RadioButton /> */}
        {/* <RadioButton time="Weekly" /> */}

        {/* Budget*/}

        {/* Button Sectoion*/}
        {/* <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("home");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Continue</Text>
          </TouchableOpacity> */}
        {/* </View> */}

        {/* <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tut6");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default GoalScreen;


const addGoal = (title, amount, type) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO goal (title, amount, type) VALUES (?, ?, ?);',
      [title, amount, type],
    );
  });
};
