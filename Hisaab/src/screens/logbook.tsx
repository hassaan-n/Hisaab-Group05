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
import styles_Logbook from "../styles/styles.Logbook";
import styles from "../styles";
import RadioButton from "../components/logradiobutton";
import db from "../database";

const Logbook = () => {
  const navigation = useNavigation();

  //props for selected category
  const [selectedRadioButton, setSelectedRadioButton] = React.useState("");
  // const [budget, onChangeBudget] = React.useState("");
  // //props for goal input
  // const [number, onChangeNumber] = React.useState("");

  return (
    // mega container with all the elements
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>View all Expenses</Text>
          <Text style={styles.heading}>Log Book</Text>
        </View>

        <View>
          <Text style={styles.filter_text}>Filters :</Text>
          <ScrollView horizontal={true}>
            <RadioButton />
          </ScrollView>
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

        <View style={styles_Logbook.buttonContainer}>
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

export default Logbook;

// const addGoal = (title, amount, type) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'INSERT INTO goal (title, amount, type) VALUES (?, ?, ?);',
//       [title, amount, type],
//     );
//   });
// };
