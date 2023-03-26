import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const styles_AddExpenseTitle = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  inputSingleContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 25,
  },

  buttonContainer: {
    position: "absolute",
    top: 175,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default styles_AddExpenseTitle;
