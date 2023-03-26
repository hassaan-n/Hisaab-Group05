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
import RadioButton from "../components/logradiobutton";
import db from "../database"


const logbook = () => {
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
          <Text style={styles.text}>View all Expenses</Text>
          <Text style={styles.heading}>Log Book</Text>
        </View>

        <View style={styles_GoalsScreen.welcomeContainer}>
          <Text style={styles.filter_text}>Filters :</Text>
          <RadioButton />
        </View>

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

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Pasta</Text>
          <Text style={styles.card_subheading}>Food - Dinner</Text>
          <Text style={styles.card_timestmap}> 8:00PM 1st March 2023</Text>
          <Text style={styles_GoalsScreen.price}> RS.400 </Text>

        </View>

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Mcdonalds</Text>
          <Text style={styles.card_subheading}>Food - Dinner</Text>
          <Text style={styles.card_timestmap}> 9:00PM 2st March 2023</Text>
          <Text style={styles_GoalsScreen.price}> RS.100 </Text>

        </View>

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Fusion Burger</Text>
          <Text style={styles.card_subheading}>Food - Lunch</Text>
          <Text style={styles.card_timestmap}> 9:30PM 1st March 2022</Text>
          <Text style={styles_GoalsScreen.price}> RS.300 </Text>

        </View>


        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Omellete</Text>
          <Text style={styles.card_subheading}>Food -  Breakfast</Text>
          <Text style={styles.card_timestmap}> 7:00 AM 1st March 201</Text>
          <Text style={styles_GoalsScreen.price}> RS.200 </Text>

        </View>

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Pasta</Text>
          <Text style={styles.card_subheading}>Food - Dinner</Text>
          <Text style={styles.card_timestmap}> 8:00PM 1st March 2023</Text>
          <Text style={styles_GoalsScreen.price}> RS.400 </Text>

        </View>

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Pasta</Text>
          <Text style={styles.card_subheading}>Food - Dinner</Text>
          <Text style={styles.card_timestmap}> 8:00PM 1st March 2023</Text>
          <Text style={styles_GoalsScreen.price}> RS.400 </Text>

        </View>

        <View style={styles_GoalsScreen.card}>

          <Text style={styles_GoalsScreen.cardText}>Pasta</Text>
          <Text style={styles.card_subheading}>Food - Dinner</Text>
          <Text style={styles.card_timestmap}> 8:00PM 1st March 2023</Text>
          <Text style={styles_GoalsScreen.price}> RS.400 </Text>

        </View>


        <View style={styles_GoalsScreen.buttonContainer}>
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

export default logbook;


const addGoal = (title, amount, type) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO goal (title, amount, type) VALUES (?, ?, ?);',
      [title, amount, type],
    );
  });
};
