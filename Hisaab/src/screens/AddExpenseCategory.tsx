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
import styles_AddExpenseCategory from "../styles/styles.AddExpenseCategory";
import styles from "../styles";

const AddExpenseCategory = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = [
    { name: "Food", id: 1 },
    { name: "Transport", id: 2 },
    { name: "Laundry", id: 3 },
    { name: "Grocery", id: 4 },
    { name: "Subscription", id: 5 },
    { name: "Education", id: 6 },
    { name: "Other", id: 7 },
  ];

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  //   //props for budget input
  //   const [expenseTitle, onChangeTitle] = React.useState("");
  //   //props for goal input
  //   const [expenseAmount, onChangeAmount] = React.useState("");

  return (
    // mega container with all the elements

    <View style={styles.container}>
      <View style={styles_AddExpenseCategory.title}>
        <Text style={styles.text}>Please Select a</Text>
        <Text style={styles.heading}>Category</Text>
      </View>

      <View style={styles_AddExpenseCategory.listContainer}>
        {/* Add stuff here */}
        <ScrollView>
          {options.map((option) => (
            <View style={radio_styles.main} key={option.id}>
              <TouchableOpacity onPress={() => handleOptionSelect(option)}>
                <View style={radio_styles.radioWrap}>
                  <View style={radio_styles.radio}>
                    {selectedOption === null ? null : selectedOption.id ===
                      option.id ? (
                      <View style={radio_styles.radioBg} />
                    ) : null}
                  </View>
                  <Text style={radio_styles.radioText}>
                    <Text style={styles.subHeading}>{option.name}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView>
        <View style={styles_AddExpenseCategory.buttonContainer}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate("Add Expense")}
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
  );
};

const radio_styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  radioText: { fontSize: 20 },

  radio: {
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },

  radioWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBg: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
    margin: 3,
  },
});

export default AddExpenseCategory;
