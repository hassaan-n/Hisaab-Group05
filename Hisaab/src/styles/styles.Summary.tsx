import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const styles_Summary = StyleSheet.create({
  title: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  cardContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 20,
    marginTop: 10,
  },



  buttonContainer: {
    top: 120,
    width: "100%",
    paddingTop:20,
    paddingBottom: 20,
  },
});

export default styles_Summary;
