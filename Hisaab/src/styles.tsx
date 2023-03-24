import { StyleSheet, View, Text, Pressable, FlatList, Button } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //alignItems: 'center',
    padding: 30,
  },
  appButtonContainer: {
    backgroundColor: "#000000",
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
    borderColor: 'grey',
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tutorialButton: {
    position: "absolute",
    top: "85%",
    left: 20,
    right: 20,
  },


  tutorialImage: {
    height: '100%',
    resizeMode: 'contain',
  },


});


export default styles;

