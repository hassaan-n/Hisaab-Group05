import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const styles_Profile = StyleSheet.create({
  helloText: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },

  welcomeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 15,

  },

  profilePicture: {
    resizeMode: "contain",
    width: 144,
    height: 144,
    borderRadius: 144,
    marginBottom: 10,
  },

  listCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: 12,
    width: "100%",
    height: "auto",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 10,
    marginTop: 30,
    
  },
  listItem: {
    flexDirection: "row",
    columnGap: 10,
    width: "100%",
    height: "auto",
  }
  
  

});

export default styles_Profile;
