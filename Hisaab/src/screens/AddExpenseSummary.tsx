import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
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
import styles from "../styles";
import styles_HomeScreen from "../styles/styles.HomeScreen";
import styles_Summary from "../styles/styles.Summary";

import db from "../database";


const AddExpenseSummary = ({ route }: any) => {
  const navigation = useNavigation();
  //   let { title, amount, category, sub_category, resultant_state } = route.params;
  let Title = 0;
  let Expense = 10;
  let Category = "Shopping";
  let Sub_category = "Null";

  const functionToUpdateDB = () => {};

  return (
    // mega container with all the elements
    <View style={styles.container}>
      <View style={styles_Summary.title}>
        <Text style={styles.heading}>Summary</Text>
        <Text style={styles.text}>Please check the details before adding</Text>
      </View>

      <View style={styles_HomeScreen.card}>
        <View style={styles_HomeScreen.cardHeader}>
          <Text style={styles_HomeScreen.cardHeading}>Details</Text>
        </View>

        <View style={styles_Summary.cardContent}>
          <Text style={styles.textBold}>Title:</Text>
          <Text style={styles.text}>{Title}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Expense:</Text>
          <Text style={styles.text}>{Expense}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Title:</Text>
          <Text style={styles.text}>{Category}</Text>
          <View style={{ height: 5 }}></View>

          <Text style={styles.textBold}>Title:</Text>
          <Text style={styles.text}>{Sub_category}</Text>
          <View style={{ height: 5 }}></View>
        </View>
      </View>

      <View style={styles_Summary.buttonContainer}>
      <TouchableOpacity
          onPress={() => {functionToUpdateDB(); navigation.navigate("Splash")}}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Confirm</Text>
        </TouchableOpacity>
        <View style={{ height: 5 }}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Splash")}
          style={styles.appButtonContainerAlt}
        >
          <Text style={styles.appButtonText}>Cancel</Text>
        </TouchableOpacity>


      </View>
      
    </View>
  );
};

export default AddExpenseSummary;
