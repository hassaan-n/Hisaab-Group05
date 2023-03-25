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
        <View style={styles_GoalsScreen.welcomeContainer}>
          <Text style={styles.text}>Please select the </Text>
          <Text style={styles.heading}>Budget Cycle</Text>
        </View>
        <RadioButton />
        {/* <RadioButton time="Weekly" /> */}

        {/* Budget*/}
        <View style={styles_GoalsScreen.welcomeContainer}>
          <Text style={styles.text}>Please enter the</Text>
          <Text style={styles.heading}>Budget</Text>
          <View style={styles_GoalsScreen.inputContainer}>
            {/* Profile*/}
            <View style={styles_GoalsScreen.inputSingleContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={onChangeBudget}
                placeholder={"400"}
                value={budget}
                maxLength={10}
              />
            </View>
          </View>

          {/* Input section inside the container which contains seperate items as single containers */}

          {/* Budget setter*/}
          <Text style={styles.text}>Please enter the</Text>
          <View style={styles_GoalsScreen.inputSingleContainer}>
            <Text style={styles.heading}>Goal</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="1000"
              keyboardType="numeric"
            />
            <Text style={{ marginTop: 6, marginRight: 5 }}>
              *Leave Empty if you do not wish to save{" "}
            </Text>
          </View>
        </View>

        {/* Button Sectoion*/}
        <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Tut6");
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
