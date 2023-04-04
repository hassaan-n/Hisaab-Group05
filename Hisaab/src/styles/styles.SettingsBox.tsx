import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const styles_SettingsBox = StyleSheet.create({
  card: {
    zIndex: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "100%",
    height: "auto",
    marginBottom: 15,
    alignSelf: "center",
    position: "absolute",
    top: 200,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor : "#E5E5E5",
    
  },
  cardHeader: {
    zIndex: 1,
    width: "100%",
    height: 40,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "#000000",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
  },

  cardInside:
  {
    width: "90%",
    // alignItems: "center",
    // alignContent: "center",
    alignSelf: "center",
    flexDirection: "column",

  },

  cardHeading: {
    fontSize: 16,
    marginLeft: 7,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },

  blur: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
  },
  inputSingleContainer: {
    width: "100%",
    alignSelf: "center",
    height: "auto",
    
    flexDirection: "column",
    justifyContent: "space-between",
  },

  
   
});

export default styles_SettingsBox;
