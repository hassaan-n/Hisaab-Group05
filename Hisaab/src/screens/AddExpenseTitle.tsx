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
import styles_AddExpenseTitle from "../styles/styles.AddExpenseTitle";
import styles from "../styles";
import RadioButton from "../components/radioButton";

const AddExpenseTitle = () => {
  const navigation = useNavigation();

  //props for budget input
  const [expenseTitle, onChangeTitle] = React.useState("");
  //props for goal input
  const [expenseAmount, onChangeAmount] = React.useState("");

  return (
    // mega container with all the elements
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles_AddExpenseTitle.inputSingleContainer}>
          <Text style={styles.text}>Please Enter the</Text>
          <Text style={styles.heading}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            placeholder={"Burger"}
            value={expenseTitle}
          />
        </View>

        <View style={styles_AddExpenseTitle.inputSingleContainer}>
          <Text style={styles.text}>Please Enter the</Text>
          <Text style={styles.heading}>Expense</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeAmount}
            placeholder={"1000"}
            keyboardType="numeric"
            value={expenseAmount}
            autoFocus={true}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={styles_AddExpenseTitle.buttonContainer}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => navigation.navigate("Choose Category")}
            >
              <Text style={styles.appButtonText}>Submit</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}></View>

            <TouchableOpacity
              style={styles.appButtonContainerAlt}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.appButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddExpenseTitle;