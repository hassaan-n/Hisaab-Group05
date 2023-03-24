import { StyleSheet, View, Text, Pressable, FlatList,Button } from 'react-native';


const styles_HomeScreen = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    paddingBottom: 50,
    },

    helloText: {
        marginBottom: 15,
    },

    welcomeContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },

    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    

    Hisaab_Title: {
      fontSize: 30,
      fontFamily : "Poppins-Bold",
      marginTop: 5,
      color: "#21A286",
    },

    textContainer: {
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 70,
    },



    buttonContainer: {
      position: "absolute",
      top: "90%",
      left: 20,
      right: 20,
      justifyContent: "center",
      paddingTop: 20,
      paddingBottom: 20,
    },
  });





export default styles_HomeScreen;

