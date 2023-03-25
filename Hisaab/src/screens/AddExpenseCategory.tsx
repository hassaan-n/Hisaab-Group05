import React from "react";
import {View,Text,TouchableOpacity, Image,StyleSheet,TextInput,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles_AddExpenseCategory from "../styles/styles.AddExpenseCategory";
import styles from "../styles";


const AddExpenseCategory = () => {
  const navigation = useNavigation();

  //props for budget input
  const [expenseTitle, onChangeTitle] = React.useState("");
  //props for goal input
  const [expenseAmount, onChangeAmount] = React.useState("");

  return (
    // mega container with all the elements
    
      <View style={styles.container}>
        <View style={styles_AddExpenseCategory.title}>
          <Text style={styles.text}>Please Select a</Text>
          <Text style={styles.heading}>Category</Text>
          
        </View>

        <View style={styles_AddExpenseCategory.listContainer}>
          <ScrollView>
            </ScrollView>
        </View>



       

        <KeyboardAvoidingView>
          <View style={styles_AddExpenseCategory.buttonContainer}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => navigation.navigate("Category")}
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

export default AddExpenseCategory;
