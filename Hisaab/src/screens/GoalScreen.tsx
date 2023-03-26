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
import styles_GoalsScreen from "../styles/styles.GoalsScreen";
import styles from "../styles";
import RadioButton from "../components/radioButton";
import db from "../database";

const GoalsScreen = () => {
  const navigation = useNavigation();

  //props for budget input
  const [budgetAmount, onChangeBudget] = React.useState("");
  //props for goal input
  const [goalAmount, onChangeGoal] = React.useState("");

  const [selectedRadioButton, setSelectedRadioButton] = React.useState(null);

  return (
    // mega container with all the elements
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Select the</Text>
          <Text style={styles.heading}>Budget Cycle</Text>
          <RadioButton />
        </View>
        <RadioButton onRadioButtonPress={setSelectedRadioButton} />

        {/* <RadioButton time="Weekly" /> */}

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter your</Text>
          <Text style={styles.heading}>Budget</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBudget}
            placeholder={"400"}
            keyboardType="numeric"
            value={budgetAmount}
          />
        </View>

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter the</Text>
          <Text style={styles.heading}>Goal</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeGoal}
            placeholder={"1000"}
            keyboardType="numeric"
            value={goalAmount}
            autoFocus={true}
          />
        </View>

        <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("spending");
              // console.log(selectedRadioButton);
              addGoal(selectedRadioButton, budget, number);
            }}
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate("Let's Start")}
          >
            <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            style={styles.appButtonContainerAlt}
            onPress={() => navigation.navigate("Tut6")}
          >
            <Text style={styles.appButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GoalsScreen;


const addGoal = (title, amount, type) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO goal (title, amount, type) VALUES (?, ?, ?);", [
      title,
      amount,
      type,
    ]);
  });
};
