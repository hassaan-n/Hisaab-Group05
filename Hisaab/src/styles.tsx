import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //alignItems: 'center',
    padding: 30,
  },
  appButtonContainer: {
    backgroundColor: "#000000",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },

  appButtonContainerAlt: {
    backgroundColor: "#D9D9D9",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },

  appButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    alignSelf: "center",
  },

  input: {
    height: 50,
    marginTop: 5,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontFamily: "Poppins",
    fontSize: 16,
  },

  heading: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    marginBottom: -5,
  },
  subHeading: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins",
  },

  tutorialPage: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  tutorialButton: {
    position: "absolute",
    top: "85%",
    left: 20,
    right: 20,
  },

  filter_text: {
    position: "absolute",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
    paddingTop: 30,
    zIndex: 1,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
  },

  card_subheading: {
    position: "absolute",
    fontSize: 13,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
    paddingTop: 33,
  },

  card_timestmap: {
    position: "absolute",
    fontSize: 10,
    fontFamily: "Poppins ",
    marginLeft: 8,
    paddingTop: 50,
  },

  tutorialImage: {
    height: "90%",
    resizeMode: "contain",
    width: "95%",
    bottom: 50,
    top: -35,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  
  },

  inputSingleContainer: {
    width: "100%",
    alignSelf: "center",
    height: "auto",
    
    flexDirection: "column",
    justifyContent: "space-between",
  
   
    
 
},

  
});

export default styles;
