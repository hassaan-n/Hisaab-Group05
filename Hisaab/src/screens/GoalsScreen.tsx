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

const GoalsScreen = () => {
  const navigation = useNavigation();

  //props for budget input
  const [budget, onChangeBudget] = React.useState("");
  //props for goal input
  const [number, onChangeNumber] = React.useState("");

  return (
    // mega container with all the elements
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Select the</Text>
          <Text style={styles.heading}>Budget Cycle</Text>
          <RadioButton />
        </View>

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter your</Text>
          <Text style={styles.heading}>Budget</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBudget}
            placeholder={"400"}
            keyboardType="numeric"
            value={budget}
          />
        </View>

        <View style={styles_GoalsScreen.inputSingleContainer}>
          <Text style={styles.text}>Please Enter the</Text>
          <Text style={styles.heading}>Goal</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBudget}
            placeholder={"1000"}
            keyboardType="numeric"
            value={budget}
            autoFocus={true}
          />
        </View>

        <View style={styles_GoalsScreen.buttonContainer}>
          <TouchableOpacity
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
